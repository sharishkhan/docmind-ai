# 🧠 DocMind AI

### Intelligent AI-powered Research & Document Assistant

Upload PDFs • Generate Executive Summaries • Chat with Documents using Google Gemini

---

## 📖 Overview

DocMind AI is a modern AI-powered document assistant that enables users to upload PDF documents, extract metadata, generate AI-powered summaries, and interact with their documents through a conversational chat interface.

The project combines **React**, **Flask**, and **Google Gemini** to create a fast and intuitive document analysis experience.

---

## ✨ Features

### 📄 Document Processing
- Upload PDF documents (up to 50 MB)
- Secure PDF validation
- Automatic text extraction
- Document metadata extraction
- Reading time estimation

### 🤖 AI Summary
- Executive summary generation
- Key points extraction
- Keyword extraction
- Regenerate summary
- Download summary as `.txt`

### 💬 AI Chat
- Chat with uploaded PDFs
- Suggested questions
- Conversation memory
- Context-aware answers
- Markdown formatted responses

### 🎨 User Experience
- Modern responsive interface
- Drag & Drop upload
- Upload progress indicator
- Animated transitions
- Dark theme workspace

---

# 🏗 Project Architecture

```text
                Upload PDF
                     │
                     ▼
          PDF Validation & Storage
                     │
                     ▼
        Text & Metadata Extraction
             │               │
             │               ▼
             │        Document Metadata
             │
             ▼
      Google Gemini AI
      ┌──────────────┐
      │              │
      ▼              ▼
 AI Summary      AI Chat
      │              │
      └──────┬───────┘
             ▼
        User Workspace
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- Flask
- Flask-CORS
- PyMuPDF
- Google Gemini API
- Python

---

# 📂 Project Structure

```text
docmind-ai/
│
├── backend/
│   ├── routes/
│   │   ├── upload.py
│   │   ├── summary.py
│   │   └── chat.py
│   │
│   ├── services/
│   │   ├── pdf_service.py
│   │   ├── summary_service.py
│   │   └── chat_service.py
│   │
│   ├── utils/
│   ├── uploads/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/sharishkhan/docmind-ai.git

cd docmind-ai
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://127.0.0.1:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload PDF |
| POST | `/api/summary` | Generate AI Summary |
| POST | `/api/chat` | Chat with uploaded document |

---

# 🌟 Current Capabilities

- ✅ PDF Upload
- ✅ Metadata Extraction
- ✅ AI Executive Summary
- ✅ AI Chat
- ✅ Suggested Questions
- ✅ Conversation Memory
- ✅ Summary Download
- ✅ Responsive UI

---

# 🔮 Future Enhancements

- Retrieval-Augmented Generation (RAG)
- Semantic Search with Vector Database
- Multi-document Chat
- OCR Support for Scanned PDFs
- Citation-based Responses
- Authentication & User Accounts
- Cloud Storage Support

---

# 📸 Screenshots

Screenshots will be added after deployment.

- Landing Page
- Upload Workspace
- AI Summary
- Chat Interface

---

# 👩‍💻 Author

**Saharish Fatima Khan**

B.Tech CSE (Artificial Intelligence)

Bhilai Institute of Technology, Durg

**GitHub**

https://github.com/sharishkhan

**LinkedIn**

https://www.linkedin.com/in/saharish-fatima-khan-91ab2a283/

---

# 📜 License

This project is developed for educational and research purposes.

---

⭐ If you found this project useful, consider giving it a **star** on GitHub!