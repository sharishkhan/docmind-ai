import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, BarChart3, MessageCircle, NotebookText } from "lucide-react";
import DisabledFeatureCard from "../components/DisabledFeatureCard";
import GradientBackground from "../components/GradientBackground";
import UploadErrorCard from "../components/UploadErrorCard";
import UploadDropzone from "../components/UploadDropzone";
import UploadProgressCard from "../components/UploadProgressCard";
import UploadSuccessCard from "../components/UploadSuccessCard";
import { Button } from "../components/ui/button";
import { uploadPdf } from "../services/uploadService";

const lockedCards = [
  { title: "Summary", icon: NotebookText },
  { title: "Chat", icon: MessageCircle },
  { title: "Insights", icon: BarChart3 },
];

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function validateFile(file) {
  if (!file) {
    return "No file selected.";
  }

  const isPdfName = file.name.toLowerCase().endsWith(".pdf");
  const isPdfType = !file.type || file.type === "application/pdf";

  if (!isPdfName || !isPdfType) {
    return "Only PDF files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds the 50 MB limit.";
  }

  return null;
}

export default function UploadPage() {
  const [error, setError] = useState("");
  const [documentMetadata, setDocumentMetadata] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (file) => {
    const validationError = validateFile(file);

    setError("");
    setDocumentMetadata(null);

    if (validationError) {
      setError(validationError);
      return;
    }

    let preparingTimer = null;

    try {
      setIsUploading(true);
      setProgress(0);
      setStatus("Uploading Document...");

      const response = await uploadPdf(file, (nextProgress) => {
        setProgress(nextProgress);

        if (nextProgress >= 100) {
          setStatus("Extracting Text...");
          preparingTimer ??= window.setTimeout(() => {
            setStatus("Preparing Research Workspace...");
          }, 900);
        }
      });

      setProgress(100);
      setStatus("Preparing Research Workspace...");
      setDocumentMetadata(response);
    } catch (uploadError) {
      setError(uploadError.message || "Upload failed. Please try again.");
    } finally {
      if (preparingTimer) {
        window.clearTimeout(preparingTimer);
      }

      setIsUploading(false);
    }
  };

  const renderUploadArea = () => {
    if (isUploading) {
      return <UploadProgressCard progress={progress} status={status} />;
    }

    if (documentMetadata) {
      return <UploadSuccessCard document={documentMetadata} />;
    }

    return <UploadDropzone onFileSelect={handleFileSelect} />;
  };

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
          {renderUploadArea()}
          <UploadErrorCard message={error} onDismiss={() => setError("")} />
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
