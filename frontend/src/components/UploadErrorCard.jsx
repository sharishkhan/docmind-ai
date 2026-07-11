import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function UploadErrorCard({ message, onDismiss }) {
  if (!message) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="mt-5 border-red-400/20 bg-red-950/20 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-red-100">Upload Error</h2>
              <p className="mt-1 text-sm leading-6 text-red-100/75">{message}</p>
            </div>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
