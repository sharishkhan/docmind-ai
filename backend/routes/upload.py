from pathlib import Path
from uuid import uuid4

from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename

from services.pdf_service import PdfExtractionError, extract_pdf_metadata
from utils.config import Config


upload_bp = Blueprint("upload", __name__)


def error_response(message, status_code):
    return jsonify({"success": False, "message": message}), status_code


def has_pdf_extension(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in Config.ALLOWED_EXTENSIONS


def has_pdf_signature(file_storage):
    header = file_storage.stream.read(5)
    file_storage.stream.seek(0)
    return header == b"%PDF-"


def build_unique_filename(original_filename):
    safe_name = secure_filename(original_filename)
    stem = Path(safe_name).stem or "document"
    extension = Path(safe_name).suffix.lower() or ".pdf"
    upload_folder = current_app.config["UPLOAD_FOLDER"]

    while True:
        filename = f"{stem}-{uuid4().hex}{extension}"
        destination = upload_folder / filename
        if not destination.exists():
            return filename, destination


def validate_upload(file_storage):
    if not file_storage or file_storage.filename == "":
        return "No file selected."

    if not has_pdf_extension(file_storage.filename):
        return "Only PDF files are allowed."

    if not has_pdf_signature(file_storage):
        return "Only valid PDF files are allowed."

    return None


@upload_bp.post("/upload")
def upload_pdf():
    if "file" not in request.files:
        return error_response("No file selected.", 400)

    file_storage = request.files["file"]
    validation_error = validate_upload(file_storage)

    if validation_error:
        return error_response(validation_error, 400)

    filename, destination = build_unique_filename(file_storage.filename)

    try:
        file_storage.save(destination)
    except OSError:
        return error_response("Upload failed. Please try again.", 500)

    try:
        metadata = extract_pdf_metadata(destination)
    except PdfExtractionError:
        destination.unlink(missing_ok=True)
        return error_response("Extraction failed. Please upload a readable PDF.", 422)

    return jsonify(
        {
            "success": True,
            "filename": filename,
            "pages": metadata["pages"],
            "characters": metadata["characters"],
            "words": metadata["words"],
            "reading_time": metadata["reading_time"],
        }
    )
