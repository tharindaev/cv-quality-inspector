"use client";

import { Defect } from "@/lib/types";

interface DefectHeatmapProps {
  imageUrl: string;
  defects: Defect[];
  width?: number;
  height?: number;
}

const DEFECT_COLORS: Record<string, string> = {
  scratch: "#ef4444",
  dent: "#f59e0b",
  misalignment: "#8b5cf6",
  blur: "#06b6d4",
  crack: "#ec4899",
  stain: "#10b981",
};

const SEVERITY_OPACITY: Record<string, number> = {
  low: 0.3,
  medium: 0.5,
  high: 0.7,
};

export default function DefectHeatmap({ imageUrl, defects, width = 400, height = 400 }: DefectHeatmapProps) {
  const scale = width / 400;

  return (
    <div className="relative inline-block rounded-lg overflow-hidden" style={{ width, height }}>
      {/* Product Image */}
      <img
        src={imageUrl}
        alt="Product inspection"
        className="w-full h-full object-cover"
        style={{ width, height }}
      />

      {/* Defect Overlays */}
      <svg
        className="absolute inset-0"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {defects.map((defect, i) => {
          const color = DEFECT_COLORS[defect.type] || "#ef4444";
          const opacity = SEVERITY_OPACITY[defect.severity] || 0.5;
          const x = defect.bbox.x * scale;
          const y = defect.bbox.y * scale;
          const w = defect.bbox.w * scale;
          const h = defect.bbox.h * scale;

          return (
            <g key={i}>
              {/* Heatmap fill */}
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={color}
                opacity={opacity}
                rx={4}
              />
              {/* Border */}
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="none"
                stroke={color}
                strokeWidth={2}
                rx={4}
              />
              {/* Label */}
              <rect
                x={x}
                y={y - 18}
                width={Math.max(w, 70)}
                height={18}
                fill={color}
                rx={3}
              />
              <text
                x={x + 4}
                y={y - 5}
                fill="white"
                fontSize={10}
                fontWeight="bold"
                fontFamily="system-ui"
              >
                {defect.type} {defect.confidence}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Scan line effect for active items */}
      {defects.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-[scan-line_3s_linear_infinite]" />
        </div>
      )}
    </div>
  );
}
