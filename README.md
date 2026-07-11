# DocMind AI

DocMind AI is a production-focused foundation for an intelligent research and document assistant. The product will eventually help users upload PDFs, chat with documents, generate summaries, extract insights, inspect document statistics, and download generated research outputs.

Milestone 2 implements PDF upload and document extraction only. No AI features, RAG pipeline, embeddings, vector database, chat, summaries, or fake AI responses are included.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, shadcn/ui-style components, Framer Motion, Lucide React
- Routing: React Router
- Backend: Python, Flask, Flask-CORS, PyMuPDF, Werkzeug, python-dotenv
- Future deployment targets: Vercel for frontend, Render for backend

## Folder Structure

```text
docmind-ai/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- ui/
|   |   |-- pages/
|   |   |-- layouts/
|   |   |-- hooks/
|   |   |-- assets/
|   |   |-- lib/
|   |   |-- services/
|   |   |-- styles/
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   |-- vite.config.js
|   |-- eslint.config.js
|-- backend/
|   |-- app.py
|   |-- requirements.txt
|   |-- routes/
|   |   |-- upload.py
|   |-- services/
|   |   |-- pdf_service.py
|   |-- utils/
|   |   |-- config.py
|   |-- rag/
|   |-- uploads/
|-- README.md
```

## Milestone 1 Complete

- Created the React + Vite frontend foundation.
- Configured Tailwind CSS, routing, reusable UI primitives, and global styling.
- Built the premium dark landing page.
- Built the initial upload workspace UI.
- Created the backend folder structure.

## Milestone 2 Complete

- Added a Flask upload API at `POST /api/upload`.
- Validates PDF-only uploads with a 50 MB maximum size.
- Saves PDFs securely in `backend/uploads/` using unique safe filenames.
- Extracts PDF text and metadata with PyMuPDF.
- Returns page count, character count, word count, and estimated reading time.
- Connected the React upload page to the backend with progress, status, success, and error states.

## Backend Upload API

Endpoint:

```text
POST /api/upload
```

Request:

```text
Content-Type: multipart/form-data
Field name: file
Allowed type: PDF
Maximum size: 50 MB
```

Success response:

```json
{
  "success": true,
  "filename": "document-safe-id.pdf",
  "pages": 12,
  "characters": 21874,
  "words": 3942,
  "reading_time": "20 min"
}
```

Error response:

```json
{
  "success": false,
  "message": "Only PDF files are allowed."
}
```

## Installation

Frontend:

```bash
cd docmind-ai/frontend
npm install
```

Backend:

```bash
cd docmind-ai/backend
python -m pip install -r requirements.txt
```

## Run Locally

Start the backend:

```bash
cd docmind-ai/backend
python app.py
```

Start the frontend:

```bash
cd docmind-ai/frontend
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Current Progress

- Frontend foundation complete.
- PDF upload UI connected to the backend.
- Backend upload validation complete.
- Secure PDF saving complete.
- PDF text extraction and metadata response complete.

## Future Features

- RAG pipeline
- AI chat with document context
- Summary generation
- Key insight extraction
- Document statistics dashboard
- Summary export and download
