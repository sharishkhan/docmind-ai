import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card } from "./ui/card";

export default function UploadProgressCard({ progress, status }) {
  return (
    <Card className="min-h-[22rem] p-8">
      <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary shadow-glow">
          <Loader2 className="h-10 w-10 animate-spin" aria-hidden="true" />
        </div>
        <motion.h1
          key={status}
          className="mt-8 text-3xl font-bold tracking-normal text-text sm:text-4xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {status}
        </motion.h1>
        <div className="mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
        <p className="mt-4 text-sm font-medium text-muted">{progress}% uploaded</p>
      </div>
    </Card>
  );
}
