# 🧠 DocMind AI

An AI-powered document assistant that helps users understand lengthy PDF documents through intelligent summarization and conversational question answering.

🌐 **Live Demo:** https://docmind-ai-three.vercel.app/

---

## 📖 Overview

DocMind AI is a full-stack web application that enables users to upload PDF documents, generate AI-powered summaries, extract important keywords, and interact with the document using natural language questions.

The application is designed for students, researchers, and professionals who need to quickly understand large documents without reading every page.

---

## ✨ Features

- 📄 Upload PDF documents
- 🤖 AI-generated document summaries
- 📝 Key points extraction
- 🔑 Automatic keyword extraction
- 💬 Chat with uploaded PDF
- 🧠 Conversation memory during chat session
- 📊 Document metadata extraction
- 📥 Download AI-generated summary
- 🌐 Fully deployed web application

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Flask
- Flask-CORS
- PyMuPDF
- Google Gemini API
- Python

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
docmind-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/sharishkhan/docmind-ai.git

cd docmind-ai
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend directory.

```
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

Run backend

```bash
python app.py
```

Backend runs at

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

Frontend runs at

```
http://127.0.0.1:5173
```

---

## 📷 Application Workflow

```
Upload PDF
      │
      ▼
Extract Text
      │
      ▼
Generate Summary
      │
      ▼
Extract Keywords
      │
      ▼
Chat with Document
      │
      ▼
Download Summary
```

---

## 🎯 Use Cases

- Student study assistant
- Research paper summarization
- Quick document understanding
- Educational note generation
- PDF question answering

---

## 📌 Current Limitations

- Supports one PDF at a time.
- Supports text-based PDFs only.
- Scanned/image PDFs require OCR.
- Chat responses are based only on the uploaded document.

---

## 🔮 Future Enhancements

- Retrieval-Augmented Generation (RAG)
- OCR support for scanned PDFs
- Multi-document chat
- AI-generated quizzes
- Document insights dashboard
- User authentication
- Chat history persistence

---

## 👩‍💻 Author

**Saharish Fatima Khan**

B.Tech CSE (Artificial Intelligence)

Bhilai Institute of Technology, Durg

GitHub:
https://github.com/sharishkhan

LinkedIn:
https://www.linkedin.com/in/saharish-fatima-khan-91ab2a283/

---

## 📄 License

This project is developed for academic and educational purposes.