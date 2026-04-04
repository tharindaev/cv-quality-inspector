"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Eye,
  Zap,
  BarChart3,
  Shield,
  Upload,
  Cpu,
  ArrowRight,
  CheckCircle,
  Layers,
  Gauge,
} from "lucide-react";

const FEATURES = [
  {
    icon: Eye,
    title: "YOLOv8 Detection",
    description: "State-of-the-art object detection identifies scratches, dents, misalignment, and more in milliseconds.",
    color: "blue",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Upload entire production batches. Process 50+ images simultaneously with real-time progress tracking.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Track pass/fail rates, defect trends, and confidence distributions with interactive dashboards.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Heatmap Overlays",
    description: "See exactly where defects were detected with color-coded bounding boxes overlaid on original images.",
    color: "red",
  },
  {
    icon: Gauge,
    title: "Configurable Sensitivity",
    description: "Adjust detection thresholds from fine scratches to major defects. Choose your model size for speed vs accuracy.",
    color: "yellow",
  },
  {
    icon: Cpu,
    title: "GPU Accelerated",
    description: "CUDA-optimized inference for production-grade throughput. CPU fallback for accessibility.",
    color: "green",
  },
];

const STEPS = [
  { num: "01", title: "Upload", description: "Drag & drop product photos or upload entire batches" },
  { num: "02", title: "Detect", description: "YOLOv8 analyzes each image for defects in real-time" },
  { num: "03", title: "Review", description: "View results with heatmaps, confidence scores, and pass/fail status" },
  { num: "04", title: "Analyze", description: "Track trends, export reports, and optimize your QC pipeline" },
];

const COLOR_MAP: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  cyan: "from-cyan-500 to-cyan-600",
  red: "from-red-500 to-red-600",
  yellow: "from-amber-500 to-amber-600",
  green: "from-emerald-500 to-emerald-600",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Powered by YOLOv8 Computer Vision
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            AI-Powered{" "}
            <span className="gradient-text">Quality Inspection</span>
            <br />
            for Manufacturing
          </h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Upload product photos and instantly detect defects — scratches, dents, misalignment, and more.
            Real-time heatmap visualization, batch processing, and analytics dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
            >
              <Upload className="w-4 h-4" />
              Start Inspecting
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] hover:border-blue-500/50 text-[var(--text-primary)] font-medium rounded-xl transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-14">
            {[
              { value: "<200ms", label: "Inference Time" },
              { value: "95%+", label: "Detection Accuracy" },
              { value: "50+", label: "Batch Size" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Everything You Need for{" "}
              <span className="gradient-text">Quality Control</span>
            </h2>
            <p className="text-[var(--text-secondary)]">
              Enterprise-grade defect detection in a modern, intuitive interface
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-6 hover:border-blue-500/30 transition-all group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      COLOR_MAP[feature.color]
                    } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              How <span className="gradient-text">VisionQC</span> Works
            </h2>
            <p className="text-[var(--text-secondary)]">
              Four simple steps from image to insight
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="glass-card p-6 text-center h-full">
                  <span className="text-3xl font-bold gradient-text">{step.num}</span>
                  <h3 className="text-lg font-semibold mt-3 mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{step.description}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-10 gradient-border">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Ready to Automate Your QC?</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Start inspecting product images now — no setup required for the demo.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
            >
              Launch Inspector
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold gradient-text">VisionQC</span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Built with Next.js, FastAPI, and YOLOv8 • Computer Vision Quality Inspector
          </p>
        </div>
      </footer>
    </div>
  );
}
