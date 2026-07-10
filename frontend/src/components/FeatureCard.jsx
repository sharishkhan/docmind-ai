import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Card className="h-full p-6">
        <CardHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
