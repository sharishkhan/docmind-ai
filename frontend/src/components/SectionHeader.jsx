import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      className="mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-normal text-text sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>
      ) : null}
    </motion.div>
  );
}
