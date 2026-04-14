import Link from "next/link";
import {
  ShieldCheck,
  Eye,
  ScanEye,
  AlertTriangle,
  Camera,
  FileText,
  Layers,
  LineChart,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Factory,
  Package,
  Car,
  Cpu,
} from "lucide-react";

const FEATURES = [
  {
    icon: ScanEye,
    title: "Defect Detection",
    desc: "YOLO-powered object detection pinpoints scratches, dents, cracks, and misalignment in milliseconds.",
  },
  {
    icon: AlertTriangle,
    title: "Severity Classification",
    desc: "Automatically grade defects as critical, major, or minor to prioritize rework and scrap decisions.",
  },
  {
    icon: Camera,
    title: "Real-Time Camera",
    desc: "Inspect products live from any connected camera or mobile device — no extra hardware required.",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    desc: "Generate audit-ready reports with annotated images, confidence scores, and timestamps.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    desc: "Push entire production runs through the pipeline and track progress with live telemetry.",
  },
  {
    icon: LineChart,
    title: "Historical Tracking",
    desc: "Trend defect rates over time, compare shifts, and catch quality drift before it becomes a recall.",
  },
];

const STEPS = [
  { n: "01", icon: Camera, title: "Capture", desc: "Snap a photo or stream from the line camera." },
  { n: "02", icon: ScanEye, title: "Analyze", desc: "YOLO models scan every pixel for anomalies." },
  { n: "03", icon: AlertTriangle, title: "Classify", desc: "Each defect is ranked by severity and type." },
  { n: "04", icon: FileText, title: "Report", desc: "Export a shareable PDF with the full audit trail." },
];

const USE_CASES = [
  { icon: Factory, title: "Manufacturing", desc: "Detect surface defects on metal, plastic, and composite parts." },
  { icon: Package, title: "Packaging", desc: "Catch torn labels, seal failures, and print errors on the line." },
  { icon: Car, title: "Automotive", desc: "Inspect panels, welds, and assemblies with sub-millimeter precision." },
  { icon: Cpu, title: "Electronics", desc: "Flag solder faults, component misplacement, and PCB damage instantly." },
];

const TRUST = [
  { icon: Target, label: "YOLO-Powered" },
  { icon: Zap, label: "Real-Time" },
  { icon: CheckCircle2, label: "99%+ Accuracy" },
  { icon: FileText, label: "PDF Reports" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">VisionQC</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#use-cases" className="hover:text-white">Use cases</a>
          </nav>
          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/40"
          >
            Launch App
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8 lg:pt-32">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Industrial Computer Vision
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Inspect With{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 bg-clip-text text-transparent">
                AI Precision
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
              VisionQC turns any camera into a quality control engineer. Detect defects, classify severity,
              and generate audit-ready reports — all in real time.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/50"
              >
                Start Inspecting
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>

            {/* Trust bar */}
            <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur sm:grid-cols-4 sm:gap-4 sm:p-5">
              {TRUST.map((t) => (
                <div key={t.label} className="flex items-center justify-center gap-2 text-sm text-slate-300">
                  <t.icon className="h-4 w-4 text-purple-400" />
                  <span className="font-medium">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">Features</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship perfect parts
            </h2>
            <p className="mt-4 text-slate-400">
              A complete inspection suite — from raw pixels to signed reports.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-blue-500/30 hover:bg-white/[0.05]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 ring-1 ring-blue-500/30">
                  <f.icon className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-purple-400">How it works</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From camera to compliance in four steps
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              >
                <div className="text-xs font-bold text-blue-400">{s.n}</div>
                <div className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">Use cases</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for every quality-critical line
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-purple-500/30"
              >
                <u.icon className="h-8 w-8 text-purple-400" />
                <h3 className="mt-4 font-semibold">{u.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-purple-600/10 p-10 text-center backdrop-blur sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Stop defects before they ship
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-400">
                Bring AI quality control to your production line today. No extra hardware. No lock-in.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/50"
              >
                Launch VisionQC
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#07070b]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">VisionQC</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Industrial AI quality inspection for the modern production line.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how" className="hover:text-white">How it works</a></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Use cases</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>Manufacturing</li>
                <li>Packaging</li>
                <li>Automotive</li>
                <li>Electronics</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
            <div>© {new Date().getFullYear()} VisionQC. All rights reserved.</div>
            <div>Built with YOLO · Next.js · Vercel</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
