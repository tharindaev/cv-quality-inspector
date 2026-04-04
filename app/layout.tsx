import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VisionQC — AI-Powered Quality Inspector",
  description: "Detect product defects instantly with YOLOv8 computer vision. Upload photos, get real-time defect analysis with heatmaps, confidence scores, and batch processing.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
