import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  Plus,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { askDocumentQuestion } from "../services/chatService";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const suggestedQuestions = [
  "Summarize this document",
  "Explain the important concepts",
  "What are the key takeaways?",
  "Quiz me on this document",
];

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={`${part}-${index}`} className="rounded bg-white/10 px-1 py-0.5 text-xs text-text">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function MarkdownMessage({ content }) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-3 text-sm leading-7">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").filter(Boolean);
        const isList = lines.every((line) => /^[-*]\s+/.test(line.trim()));

        if (isList) {
          return (
            <ul key={`${block}-${blockIndex}`} className="space-y-2 pl-4">
              {lines.map((line, lineIndex) => (
                <li key={`${line}-${lineIndex}`} className="list-disc">
                  {renderInline(line.replace(/^[-*]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block}-${blockIndex}`} className="whitespace-pre-line">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}

function ThinkingMessage() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <Bot className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-muted"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.12 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const Icon = isUser ? UserRound : Bot;

  return (
    <motion.div
      className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      {!isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      ) : null}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-white"
            : "border border-white/10 bg-white/5 text-text/90"
        }`}
      >
        <MarkdownMessage content={message.content} />
      </div>
      {isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      ) : null}
    </motion.div>
  );
}

export default function ChatCard({ document, className = "" }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  const sendQuestion = async (nextQuestion = question) => {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion) {
      setError("Please enter a question about the uploaded document.");
      return;
    }

    setError("");
    setQuestion("");
    setIsThinking(true);
    setMessages((current) => [
      ...current,
      { role: "user", content: trimmedQuestion },
    ]);

    try {
      const response = await askDocumentQuestion(document.filename, trimmedQuestion);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.answer },
      ]);
    } catch (chatError) {
      setError(chatError.message || "Unable to answer right now. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendQuestion();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendQuestion();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setQuestion("");
    setError("");
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex h-[34rem] flex-col p-0">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-text">Chat</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Ask questions answered only from the uploaded PDF.
            </p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={startNewChat}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {messages.length === 0 ? (
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Suggested Questions
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Start with a prompt, or ask your own question about this document.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestedQuestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-left text-sm leading-5 text-text/90 transition hover:border-primary/40 hover:bg-primary/10"
                    onClick={() => sendQuestion(suggestion)}
                    disabled={isThinking}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}-${message.content}`} message={message} />
              ))}
              {isThinking ? <ThinkingMessage /> : null}
              <div ref={scrollRef} />
            </div>
          )}
        </div>

        {error ? (
          <motion.div
            className="mx-5 mb-3 rounded-xl border border-red-400/20 bg-red-950/20 p-3 text-sm leading-6 text-red-100/80"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        ) : null}

        <form className="border-t border-white/10 p-4" onSubmit={handleSubmit}>
          <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 focus-within:border-primary/50">
            <textarea
              className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-6 text-text outline-none placeholder:text-muted"
              placeholder="Ask anything about the uploaded PDF..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isThinking}
              rows={1}
            />
            <Button type="submit" size="icon" disabled={isThinking || !question.trim()} aria-label="Send question">
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
