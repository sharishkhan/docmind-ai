import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, MessageCircle, NotebookText } from "lucide-react";
import DisabledFeatureCard from "../components/DisabledFeatureCard";
import GradientBackground from "../components/GradientBackground";
import UploadDropzone from "../components/UploadDropzone";
import { Button } from "../components/ui/button";

const lockedCards = [
  { title: "Summary", icon: NotebookText },
  { title: "Chat", icon: MessageCircle },
  { title: "Insights", icon: BarChart3 },
];

export default function UploadPage() {
  return (
    <main className="relative min-h-screen py-6">
      <GradientBackground />
      <div className="page-shell">
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Link>
          </Button>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-muted">
            Workspace
          </div>
        </div>

        <section className="mx-auto max-w-5xl">
          <UploadDropzone />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {lockedCards.map((card) => (
              <DisabledFeatureCard key={card.title} {...card} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
