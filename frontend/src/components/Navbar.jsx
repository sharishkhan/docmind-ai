import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "./ui/button";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <nav className="page-shell flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-semibold text-text">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>DocMind AI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button asChild size="sm">
          <Link to="/upload">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
