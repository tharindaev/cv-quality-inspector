import { ImageResponse } from "next/og";

export const alt = "VisionQC — Industrial AI Inspection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at top, #1a0a0a 0%, #0a0a0f 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
              borderRadius: 22,
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "white",
              letterSpacing: -2,
            }}
          >
            VisionQC
          </div>
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            background: "linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 16,
          }}
        >
          Industrial AI Inspection
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          YOLO defect detection · Severity classification · PDF reports
        </div>
      </div>
    ),
    { ...size }
  );
}
