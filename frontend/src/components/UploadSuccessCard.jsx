import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  FileText,
  Hash,
  Layers3,
  Type,
} from "lucide-react";
import { Card } from "./ui/card";

const stats = [
  { label: "Filename", key: "filename", icon: FileText },
  { label: "Pages", key: "pages", icon: Layers3 },
  { label: "Words", key: "words", icon: Type },
  { label: "Characters", key: "characters", icon: Hash },
  { label: "Estimated Reading Time", key: "reading_time", icon: Clock3 },
];

export default function UploadSuccessCard({ document }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden p-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left Section */}
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h1 className="mt-6 text-4xl font-bold text-text">
              Upload Successful
            </h1>

            <p className="mt-3 text-base leading-7 text-muted">
              Your PDF was uploaded and processed successfully.
            </p>

          </div>

          {/* Right Section */}
          <div className="space-y-3">
            {stats.map(({ label, key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted">
                      {label}
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-text">
                      {document[key]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}