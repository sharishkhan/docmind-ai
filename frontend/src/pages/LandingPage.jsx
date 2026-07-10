import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  FileText,
  Library,
  MessageSquareText,
  NotebookPen,
  Upload,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import GradientBackground from "../components/GradientBackground";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import { Button } from "../components/ui/button";

const features = [
  {
    icon: FileText,
    title: "Upload PDFs",
    description: "Securely upload PDF documents.",
  },
  {
    icon: Brain,
    title: "AI Chat",
    description: "Ask questions naturally.",
  },
  {
    icon: NotebookPen,
    title: "Smart Summaries",
    description: "Generate concise summaries.",
  },
  {
    icon: Library,
    title: "Insights",
    description: "Extract key points and document metadata.",
  },
];

const steps = ["Upload", "Process", "Ask", "Learn"];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <GradientBackground />

        <section className="page-shell flex min-h-[calc(100vh-4rem)] flex-col justify-center py-24 sm:py-28">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted backdrop-blur-xl">
              <MessageSquareText className="h-4 w-4 text-primary" aria-hidden="true" />
              Intelligent research workspace
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-normal text-text sm:text-6xl lg:text-7xl">
              Research Smarter.
              <span className="block bg-gradient-to-r from-text via-accent to-primary bg-clip-text text-transparent">
                Understand Faster.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Upload PDFs, ask intelligent questions, generate AI summaries,
              and discover insights instantly.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/upload">
                  <Upload className="h-5 w-5" aria-hidden="true" />
                  Upload Document
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#features">
                  Learn More
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="features" className="page-shell py-20">
          <SectionHeader
            eyebrow="Features"
            title="A calm workspace for dense documents"
            description="The interface is ready for the core workflows that will arrive in future milestones."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section id="how-it-works" className="page-shell py-20">
          <SectionHeader
            eyebrow="Workflow"
            title="How It Works"
            description="A simple path from raw PDF to useful understanding."
          />
          <div className="relative mt-14 grid gap-4 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
            {steps.map((step, index) => (
              <motion.div
                key={step}
                className="glass-panel relative rounded-2xl p-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-text">{step}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
