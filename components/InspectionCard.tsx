"use client";

import { InspectionResult } from "@/lib/types";
import DefectHeatmap from "./DefectHeatmap";
import { CheckCircle, XCircle, Clock, Zap } from "lucide-react";

interface InspectionCardProps {
  result: InspectionResult;
  showHeatmap?: boolean;
}

export default function InspectionCard({ result, showHeatmap = true }: InspectionCardProps) {
  const isPassing = result.status === "pass";

  return (
    <div className="glass-card overflow-hidden animate-fade-in group hover:border-blue-500/30 transition-all">
      {/* Image with heatmap */}
      <div className="relative">
        {showHeatmap && result.defects.length > 0 ? (
          <DefectHeatmap
            imageUrl={result.imageUrl}
            defects={result.defects}
            width={400}
            height={300}
          />
        ) : (
          <img
            src={result.imageUrl}
            alt={result.originalFilename}
            className="w-full h-[300px] object-cover"
          />
        )}

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
            isPassing
              ? "bg-emerald-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {isPassing ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {isPassing ? "PASS" : "FAIL"}
        </div>

        {/* Defect count */}
        {result.defects.length > 0 && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-xs text-white font-medium">
            {result.defects.length} defect{result.defects.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold truncate mr-2">{result.originalFilename}</h3>
          <span className="text-xs text-[var(--text-muted)]">
            {new Date(result.inspectedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Confidence bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[var(--text-secondary)]">Confidence</span>
            <span className={isPassing ? "text-emerald-400" : "text-red-400"}>
              {result.overallConfidence}%
            </span>
          </div>
          <div className="h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isPassing ? "bg-emerald-500" : "bg-red-500"
              }`}
              style={{ width: `${result.overallConfidence}%` }}
            />
          </div>
        </div>

        {/* Defect tags */}
        {result.defects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {result.defects.map((d, i) => (
              <span
                key={i}
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  d.severity === "high"
                    ? "bg-red-500/20 text-red-400"
                    : d.severity === "medium"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {d.type} ({d.confidence}%)
              </span>
            ))}
          </div>
        )}

        {/* Processing info */}
        <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {result.processingTimeMs}ms
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            YOLOv8
          </span>
        </div>
      </div>
    </div>
  );
}
