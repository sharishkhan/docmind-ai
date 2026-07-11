from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename

from services.pdf_service import PdfExtractionError, extract_pdf_metadata
from services.summary_service import GeminiSummaryService, SummaryServiceError


summary_bp = Blueprint("summary", __name__)


def error_response(message, status_code):
    return jsonify({"success": False, "message": message}), status_code


def resolve_uploaded_pdf(filename):
    safe_filename = secure_filename(filename or "")

    if not safe_filename or not safe_filename.lower().endswith(".pdf"):
        return None

    upload_folder = current_app.config["UPLOAD_FOLDER"].resolve()
    file_path = (upload_folder / safe_filename).resolve()

    if upload_folder not in file_path.parents or not file_path.exists():
        return None

    return file_path


@summary_bp.post("/summary")
def generate_summary():
    payload = request.get_json(silent=True) or {}
    file_path = resolve_uploaded_pdf(payload.get("filename", ""))

    if not file_path:
        return error_response("Invalid PDF. Please upload the document again.", 400)

    try:
        metadata = extract_pdf_metadata(file_path)
    except PdfExtractionError:
        return error_response("Invalid PDF. Text extraction failed.", 422)

    try:
        result = GeminiSummaryService().generate_summary(metadata["text"])
    except SummaryServiceError as exc:
        return error_response(str(exc), exc.status_code)

    return jsonify(
        {
            "success": True,
            "summary": result["summary"],
            "key_points": result["key_points"],
            "keywords": result["keywords"],
        }
    )
