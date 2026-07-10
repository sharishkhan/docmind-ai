# DocMind AI

DocMind AI is a production-focused foundation for an intelligent research and document assistant. The product will eventually help users upload PDFs, chat with documents, generate summaries, extract insights, inspect document statistics, and download generated research outputs.

This milestone intentionally implements only the frontend foundation and project structure. No AI features, RAG pipeline, backend APIs, fake responses, or placeholder service calls are included.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, shadcn/ui-style components, Framer Motion, Lucide React
- Routing: React Router
- Backend: Flask folder foundation for Python 3.11
- Future deployment targets: Vercel for frontend, Render for backend

## Folder Structure

```text
docmind-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── lib/
│   │   ├── services/
│   │   └── styles/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── rag/
│   ├── utils/
│   └── uploads/
└── README.md
```

## Current Milestone

- Created a clean React + Vite frontend foundation.
- Configured Tailwind CSS, routing, reusable UI primitives, and global styling.
- Built a premium dark landing page with navbar, hero, features, timeline, and footer.
- Built an upload workspace UI with a drag-and-drop area and disabled future feature cards.
- Created the backend folder structure without implementing backend logic.

## Installation

```bash
cd docmind-ai/frontend
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173
```

## Future Features

- PDF upload handling
- Document parsing
- RAG pipeline
- AI chat with document context
- Summary generation
- Key insight extraction
- Document statistics
- Summary export and download
- Flask API integration
