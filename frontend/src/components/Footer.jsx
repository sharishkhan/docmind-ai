import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer id="about" className="border-t border-white/10">
      <div className="page-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold text-text">DocMind AI</p>
            <p className="text-sm text-muted">Built using React + Flask + AI</p>
          </div>
        </div>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-muted transition hover:text-text"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
