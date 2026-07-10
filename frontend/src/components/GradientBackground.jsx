import { motion } from "framer-motion";

export default function GradientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
        animate={{ opacity: [0.28, 0.48, 0.28], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        animate={{ opacity: [0.18, 0.34, 0.18], x: [0, -24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
    </div>
  );
}
