import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


class Config:
    BASE_DIR = Path(__file__).resolve().parents[1]
    UPLOAD_FOLDER = BASE_DIR / "uploads"
    MAX_UPLOAD_SIZE_MB = 50
    MAX_CONTENT_LENGTH = MAX_UPLOAD_SIZE_MB * 1024 * 1024
    ALLOWED_EXTENSIONS = {"pdf"}
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    SUMMARY_CHUNK_CHARACTER_LIMIT = 24000

   CORS_ORIGINS = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",

    "https://docmind-ai-three.vercel.app",
    "https://docmind-ai-git-main-sharish-k.vercel.app",
    ]

    @classmethod
    def ensure_directories(cls):
        cls.UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
