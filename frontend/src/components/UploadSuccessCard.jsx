import { motion } from "framer-motion";
import { CheckCircle2, Clock3, FileText, Hash, Layers3, Type } from "lucide-react";
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
      <Card className="min-h-[22rem] p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-normal text-text sm:text-4xl">
              Upload Successful
            </h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Your PDF was saved and text metadata was extracted successfully.
            </p>
            <div className="mt-6 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              Status: Ready for AI Processing
            </div>
          </div>

          <div className="grid w-full gap-3 lg:max-w-md">
            {stats.map(({ label, key, icon: Icon }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-muted">{label}</span>
                </div>
                <span className="truncate text-right text-sm font-semibold text-text">
                  {document[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
