from google import genai
from google.genai import errors, types

from services.summary_service import clean_text, split_text_into_chunks
from utils.config import Config


NOT_FOUND_RESPONSE = "I couldn't find that information in the uploaded document."


class ChatServiceError(Exception):
    status_code = 500

    def __init__(self, message, status_code=None):
        super().__init__(message)
        if status_code:
            self.status_code = status_code


class MissingApiKeyError(ChatServiceError):
    status_code = 500


class EmptyQuestionError(ChatServiceError):
    status_code = 400


class EmptyDocumentError(ChatServiceError):
    status_code = 422


class GeminiChatError(ChatServiceError):
    status_code = 502


def format_history(history):
    if not history:
        return "No previous conversation."

    recent_messages = history[-8:]
    return "\n".join(
        f"{message['role'].title()}: {message['content']}"
        for message in recent_messages
    )


def build_chunk_prompt(chunk, question, history, chunk_number, total_chunks):
    return f"""
You are DocMind AI.

Answer ONLY using the uploaded PDF text in this chunk. Never invent information.
Use the previous conversation only to understand follow-up references, but do not
use it as a source of facts unless the same facts appear in the PDF text.

If this chunk does not contain information needed to answer the question, reply
exactly with:
NO_RELEVANT_INFORMATION

Previous conversation:
{format_history(history)}

User question:
{question}

PDF text chunk {chunk_number} of {total_chunks}:
\"\"\"
{chunk}
\"\"\"
""".strip()


def build_final_prompt(partial_answers, question, history):
    joined_answers = "\n\n".join(partial_answers)
    return f"""
You are DocMind AI.

Create a final answer to the user's question using ONLY the supported answers
extracted from the uploaded PDF. Never invent information. If the supported
answers do not answer the question, reply exactly:
{NOT_FOUND_RESPONSE}

Keep the answer helpful, concise, and readable. Markdown is allowed.

Previous conversation:
{format_history(history)}

User question:
{question}

Supported PDF-based answers:
\"\"\"
{joined_answers}
\"\"\"
""".strip()


class GeminiChatService:
    def __init__(self, api_key=None, model=None):
        self.api_key = api_key if api_key is not None else Config.GEMINI_API_KEY
        self.model = model or Config.GEMINI_MODEL

        if not self.api_key:
            raise MissingApiKeyError("Gemini API key is missing. Add GEMINI_API_KEY to the backend .env file.")

        self.client = genai.Client(api_key=self.api_key)

    def answer_question(self, document_text, question, history=None):
        question = (question or "").strip()
        text = clean_text(document_text)
        history = history or []

        if not question:
            raise EmptyQuestionError("Please enter a question about the uploaded document.")

        if not text:
            raise EmptyDocumentError("The uploaded PDF does not contain readable text.")

        chunks = split_text_into_chunks(text)
        chunk_answers = []

        for index, chunk in enumerate(chunks):
            answer = self._generate_text(
                build_chunk_prompt(chunk, question, history, index + 1, len(chunks))
            ).strip()

            if answer and answer != "NO_RELEVANT_INFORMATION":
                chunk_answers.append(answer)

        if not chunk_answers:
            return NOT_FOUND_RESPONSE

        if len(chunk_answers) == 1:
            return chunk_answers[0]

        return self._generate_text(build_final_prompt(chunk_answers, question, history)).strip()

    def _generate_text(self, prompt):
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(temperature=0.1),
            )
        except errors.APIError as exc:
            message = str(exc)
            status_code = getattr(exc, "code", None)

            if status_code == 429 or "429" in message:
                raise GeminiChatError("Gemini rate limit reached. Please try again shortly.", 429) from exc

            raise GeminiChatError("Gemini is unavailable. Please try again later.") from exc
        except TimeoutError as exc:
            raise GeminiChatError("Gemini request timed out. Please try again.", 504) from exc
        except Exception as exc:
            raise GeminiChatError("Gemini is unavailable. Please try again later.") from exc

        return response.text or NOT_FOUND_RESPONSE
