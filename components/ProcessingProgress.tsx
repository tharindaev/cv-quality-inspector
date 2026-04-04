"use client";

import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface ProcessingProgressProps {
  total: number;
  processed: number;
  results: { pass: number; fail: number };
}

export default function ProcessingProgress({ total, processed, results }: ProcessingProgressProps) {
  const percent = total > 0 ? Math.round((processed / total) * 100) : 0;
  const isComplete = processed >= total;

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          )}
          <h3 className="text-sm font-semibold">
            {isComplete ? "Batch Complete" : "Processing..."}
          </h3>
        </div>
        <span className="text-sm font-mono text-[var(--text-secondary)]">
          {processed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete ? "bg-emerald-500" : "bg-blue-500 animate-pulse-glow"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Results summary */}
      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" />
          {results.pass} passed
        </span>
        <span className="flex items-center gap-1 text-red-400">
          <XCircle className="w-3.5 h-3.5" />
          {results.fail} failed
        </span>
        <span className="text-[var(--text-muted)]">{percent}% complete</span>
      </div>
    </div>
  );
}
