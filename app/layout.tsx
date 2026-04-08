import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cv-quality-inspector-v2.vercel.app"),
  title: {
    default: "VisionQC — AI Quality Inspection System",
    template: "%s | VisionQC",
  },
  description:
    "Industrial quality inspection powered by computer vision. YOLO defect detection, severity classification, PDF reports.",
  keywords: [
    "computer vision",
    "quality inspection",
    "YOLO",
    "defect detection",
    "industrial AI",
  ],
  openGraph: {
    title: "VisionQC — AI Quality Inspection",
    description: "Industrial AI inspection.",
    type: "website",
    url: "https://cv-quality-inspector-v2.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisionQC",
    description: "AI quality inspection system.",
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0a0a0f" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
