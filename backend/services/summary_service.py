import json
import re
from json import JSONDecodeError

from google import genai
from google.genai import errors, types

from utils.config import Config


class SummaryServiceError(Exception):
    status_code = 500

    def __init__(self, message, status_code=None):
        super().__init__(message)
        if status_code:
            self.status_code = status_code


class MissingApiKeyError(SummaryServiceError):
    status_code = 500


class EmptyDocumentError(SummaryServiceError):
    status_code = 422


class GeminiApiError(SummaryServiceError):
    status_code = 502


def clean_text(text):
    text = re.sub(r"[ \t]+", " ", text or "")
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def split_text_into_chunks(text, max_characters=None):
    max_characters = max_characters or Config.SUMMARY_CHUNK_CHARACTER_LIMIT
    paragraphs = [paragraph.strip() for paragraph in text.split("\n\n") if paragraph.strip()]
    chunks = []
    current = ""

    for paragraph in paragraphs:
        if len(paragraph) > max_characters:
            if current:
                chunks.append(current.strip())
                current = ""

            for start in range(0, len(paragraph), max_characters):
                chunks.append(paragraph[start : start + max_characters].strip())
            continue

        next_chunk = f"{current}\n\n{paragraph}".strip() if current else paragraph

        if len(next_chunk) > max_characters and current:
            chunks.append(current.strip())
            current = paragraph
        else:
            current = next_chunk

    if current:
        chunks.append(current.strip())

    return chunks


def build_chunk_prompt(chunk, chunk_number, total_chunks):
    return f"""
You are DocMind AI, a careful research-document summarizer.

Summarize this PDF text chunk using only the information present in the text.
Do not invent facts. If there is insufficient information, say so.

Return only valid JSON in this shape:
{{
  "summary": "concise chunk summary",
  "key_points": ["point 1", "point 2", "point 3"],
  "keywords": ["keyword 1", "keyword 2", "keyword 3"]
}}

Chunk {chunk_number} of {total_chunks}:
\"\"\"
{chunk}
\"\"\"
""".strip()


def build_final_prompt(chunk_summaries):
    source_json = json.dumps(chunk_summaries, ensure_ascii=False)
    return f"""
You are DocMind AI, a professional research-document assistant.

Merge these chunk-level summaries into one final answer. Use only the information
inside the chunk summaries. Do not hallucinate. If the source material is thin or
unclear, state that the document has insufficient information.

Return only valid JSON in this exact shape:
{{
  "summary": "a concise, polished summary of the document",
  "key_points": ["important point 1", "important point 2", "important point 3", "important point 4"],
  "keywords": ["keyword 1", "keyword 2", "keyword 3"]
}}

Chunk summaries:
{source_json}
""".strip()


def normalize_summary_payload(payload):
    summary = str(payload.get("summary", "")).strip()
    key_points = payload.get("key_points", [])
    keywords = payload.get("keywords", [])

    if not isinstance(key_points, list):
        key_points = []

    if not isinstance(keywords, list):
        keywords = []

    key_points = [str(point).strip() for point in key_points if str(point).strip()]
    keywords = [str(keyword).strip() for keyword in keywords if str(keyword).strip()]

    if not summary:
        summary = "The document does not contain enough readable information to generate a reliable summary."

    return {
        "summary": summary,
        "key_points": key_points[:8],
        "keywords": keywords[:10],
    }


def parse_json_response(response_text):
    text = (response_text or "").strip()
    text = re.sub(r"^```(?:json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()

    try:
        payload = json.loads(text)
    except JSONDecodeError as exc:
        raise GeminiApiError("AI summary response could not be parsed.") from exc

    return normalize_summary_payload(payload)


class GeminiSummaryService:
    def __init__(self, api_key=None, model=None):
        self.api_key = api_key if api_key is not None else Config.GEMINI_API_KEY
        self.model = model or Config.GEMINI_MODEL

        if not self.api_key:
            raise MissingApiKeyError("Gemini API key is missing. Add GEMINI_API_KEY to the backend .env file.")

        self.client = genai.Client(api_key=self.api_key)

    def generate_summary(self, document_text):
        text = clean_text(document_text)

        if not text:
            raise EmptyDocumentError("The uploaded PDF does not contain readable text.")

        chunks = split_text_into_chunks(text)
        chunk_summaries = [
            self._generate_json(build_chunk_prompt(chunk, index + 1, len(chunks)))
            for index, chunk in enumerate(chunks)
        ]

        if len(chunk_summaries) == 1:
            return chunk_summaries[0]

        return self._generate_json(build_final_prompt(chunk_summaries))

    def _generate_json(self, prompt):
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.2,
                    response_mime_type="application/json",
                ),
            )
        except errors.APIError as exc:
            message = str(exc)
            status_code = getattr(exc, "code", None)

            if status_code == 429 or "429" in message:
                raise GeminiApiError("Gemini rate limit reached. Please try again shortly.", 429) from exc

            raise GeminiApiError("Gemini API request failed. Please try again later.") from exc
        except TimeoutError as exc:
            raise GeminiApiError("Gemini API request timed out. Please try again.", 504) from exc
        except Exception as exc:
            raise GeminiApiError("Gemini API request failed. Please try again later.") from exc

        return parse_json_response(response.text)
