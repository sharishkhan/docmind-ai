from flask import Blueprint, jsonify, request

from routes.summary import resolve_uploaded_pdf
from services.chat_service import ChatServiceError, GeminiChatService
from services.pdf_service import PdfExtractionError, extract_pdf_metadata


chat_bp = Blueprint("chat", __name__)
conversation_store = {}


def error_response(message, status_code):
    return jsonify({"success": False, "message": message}), status_code


@chat_bp.post("/chat")
def chat_with_document():
    payload = request.get_json(silent=True) or {}
    filename = payload.get("filename", "")
    question = (payload.get("question", "") or "").strip()
    file_path = resolve_uploaded_pdf(filename)

    if not file_path:
        return error_response("Invalid PDF. Please upload the document again.", 400)

    if not question:
        return error_response("Please enter a question about the uploaded document.", 400)

    try:
        metadata = extract_pdf_metadata(file_path)
    except PdfExtractionError:
        return error_response("Invalid PDF. Text extraction failed.", 422)

    history = conversation_store.setdefault(filename, [])

    try:
        answer = GeminiChatService().answer_question(metadata["text"], question, history)
    except ChatServiceError as exc:
        return error_response(str(exc), exc.status_code)

    history.extend(
        [
            {"role": "user", "content": question},
            {"role": "assistant", "content": answer},
        ]
    )
    conversation_store[filename] = history[-16:]

    return jsonify({"success": True, "answer": answer})
