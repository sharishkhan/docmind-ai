import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileText,
  RefreshCw,
  Sparkles,
  Tags,
  WandSparkles,
  X,
} from "lucide-react";
import { generateSummary } from "../services/summaryService";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const loadingStages = [
  "Reading document...",
  "Analyzing content...",
  "Thinking with Gemini...",
  "Generating summary...",
  "Finalizing...",
];

function buildSummaryFile(document, result) {
  const keyPoints = result.key_points.map((point) => `- ${point}`).join("\n");
  const keywords = result.keywords.join(", ");

  return [
    `Document name: ${document.filename}`,
    "",
    "AI Summary",
    result.summary,
    "",
    "Key Points",
    keyPoints || "No key points returned.",
    "",
    "Keywords",
    keywords || "No keywords returned.",
  ].join("\n");
}

function LoadingState({ stage }) {
  return (
    <motion.div
      className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <WandSparkles className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-text">{stage}</p>
          <p className="mt-1 text-sm text-muted">Building a clean research-ready summary.</p>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "45%" }}
        />
      </div>
    </motion.div>
  );
}

function downloadSummaryFile(document, result) {
  const content = buildSummaryFile(document, result);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = window.document.createElement("a");

  link.href = url;
  link.download = "summary.txt";
  window.document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function SummaryPreview({ result, onOpen }) {
  return (
    <motion.div
      className="mt-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative max-h-40 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="whitespace-pre-line text-sm leading-7 text-text/90">
          {result.summary}
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent"
        onClick={onOpen}
      >
        Read Full Summary
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

function SummaryDrawer({ document, result, isOpen, onClose, onRegenerate }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownload = () => {
    downloadSummaryFile(document, result);
  };

  const handleRegenerate = () => {
    onClose();
    onRegenerate();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.aside
            className="absolute bottom-0 right-0 top-0 flex w-full flex-col overflow-hidden border border-white/10 bg-background shadow-soft sm:bottom-4 sm:right-4 sm:top-4 sm:w-[min(480px,calc(100vw-2rem))] sm:rounded-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Full AI summary"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-sm font-semibold text-primary">DocMind AI</p>
                <h2 className="mt-1 text-lg font-semibold text-text">Full Summary</h2>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close summary drawer">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto p-5">
              <section>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Executive Summary
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="whitespace-pre-line text-sm leading-7 text-text/90">
                    {result.summary}
                  </p>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Key Points
                </div>
                <div className="grid gap-3">
                  {result.key_points.map((point, index) => (
                    <motion.div
                      key={point}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-text/90"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                    >
                      {point}
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  <Tags className="h-4 w-4" aria-hidden="true" />
                  Keywords
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword, index) => (
                    <motion.span
                      key={keyword}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-muted"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid gap-3 border-t border-white/10 p-5 sm:grid-cols-2">
              <Button type="button" onClick={handleDownload}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Summary
              </Button>
              <Button type="button" variant="secondary" onClick={handleRegenerate}>
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Regenerate Summary
              </Button>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function EmptyState({ onGenerate }) {
  return (
    <motion.div
      className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <WandSparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-text">AI Summary</h3>
          <p className="mt-1 text-sm leading-6 text-muted">
            Generate an intelligent summary of your uploaded document.
          </p>
        </div>
      </div>
      <Button type="button" className="mt-5 w-full sm:w-auto" onClick={onGenerate}>
        <WandSparkles className="h-4 w-4" aria-hidden="true" />
        Generate AI Summary
      </Button>
    </motion.div>
  );
}

export default function SummaryCard({ document }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  const stage = useMemo(() => loadingStages[stageIndex], [stageIndex]);

  useEffect(() => {
    if (!isLoading) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setStageIndex((current) => Math.min(current + 1, loadingStages.length - 1));
    }, 1100);

    return () => window.clearInterval(intervalId);
  }, [isLoading]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setStageIndex(0);
    setError("");

    try {
      const result = await generateSummary(document.filename);
      setSummary(result);
      setIsDrawerOpen(true);
    } catch (summaryError) {
      setError(summaryError.message || "Summary generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-text">Summary</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Generate an AI summary from the uploaded document.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-300/90">
              <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
              Ready for AI Processing
            </div>
          </div>
        </div>

        {!summary && !isLoading ? (
          <EmptyState onGenerate={handleGenerate} />
        ) : null}

        {isLoading ? <LoadingState stage={stage} /> : null}

        {error ? (
          <motion.div
            className="mt-5 rounded-xl border border-red-400/20 bg-red-950/20 p-4 text-sm leading-6 text-red-100/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.div>
        ) : null}

        {summary && !isLoading ? (
          <>
            <SummaryPreview result={summary} onOpen={() => setIsDrawerOpen(true)} />
            <SummaryDrawer
              document={document}
              result={summary}
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              onRegenerate={handleGenerate}
            />
          </>
        ) : null}
      </Card>
    </motion.div>
  );
}
