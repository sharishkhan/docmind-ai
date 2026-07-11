import math
import re

import fitz


class PdfExtractionError(Exception):
    """Raised when text or metadata cannot be extracted from a PDF."""


def extract_pdf_metadata(file_path):
    try:
        with fitz.open(file_path) as document:
            page_text = [page.get_text("text") for page in document]
            full_text = "\n".join(page_text).strip()
            page_count = document.page_count
    except Exception as exc:
        raise PdfExtractionError("Unable to extract text from the uploaded PDF.") from exc

    character_count = len(full_text)
    words = re.findall(r"\b[\w'-]+\b", full_text)
    word_count = len(words)
    reading_minutes = math.ceil(word_count / 200) if word_count else 0

    return {
        "text": full_text,
        "pages": page_count,
        "characters": character_count,
        "words": word_count,
        "reading_time": f"{reading_minutes} min",
    }
