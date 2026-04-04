"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import UploadZone from "@/components/UploadZone";
import InspectionCard from "@/components/InspectionCard";
import ProcessingProgress from "@/components/ProcessingProgress";
import StatCard from "@/components/StatCard";
import { InspectionResult } from "@/lib/types";
import { getInspections, generateInspections } from "@/lib/mock-data";
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Grid3X3,
  List,
  Search,
} from "lucide-react";

type ViewMode = "grid" | "list";
type FilterMode = "all" | "pass" | "fail";

export default function DashboardPage() {
  const [inspections, setInspections] = useState<InspectionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingState, setProcessingState] = useState({ total: 0, processed: 0, pass: 0, fail: 0 });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showHeatmaps, setShowHeatmaps] = useState(true);

  useEffect(() => {
    setInspections(getInspections());
  }, []);

  const handleUpload = useCallback((files: File[]) => {
    setIsProcessing(true);
    const total = files.length;
    setProcessingState({ total, processed: 0, pass: 0, fail: 0 });

    // Simulate batch processing
    const newResults = generateInspections(total);
    let processed = 0;

    const interval = setInterval(() => {
      processed++;
      const current = newResults[processed - 1];
      setProcessingState((prev) => ({
        ...prev,
        processed,
        pass: prev.pass + (current.status === "pass" ? 1 : 0),
        fail: prev.fail + (current.status === "fail" ? 1 : 0),
      }));

      if (processed >= total) {
        clearInterval(interval);
        setTimeout(() => {
          setInspections((prev) => [...newResults, ...prev]);
          setIsProcessing(false);
        }, 500);
      }
    }, 300);
  }, []);

  const filtered = inspections.filter((i) => {
    if (filterMode === "pass" && i.status !== "pass") return false;
    if (filterMode === "fail" && i.status !== "fail") return false;
    if (searchTerm && !i.originalFilename.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const passCount = inspections.filter((i) => i.status === "pass").length;
  const failCount = inspections.filter((i) => i.status === "fail").length;
  const avgTime = inspections.length > 0
    ? Math.round(inspections.reduce((a, i) => a + i.processingTimeMs, 0) / inspections.length)
    : 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Quality Inspector</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Upload product images for AI-powered defect detection
          </p>
        </div>

        {/* Upload Zone */}
        <UploadZone onUpload={handleUpload} isProcessing={isProcessing} />

        {/* Processing Progress */}
        {isProcessing && (
          <div className="mt-4">
            <ProcessingProgress
              total={processingState.total}
              processed={processingState.processed}
              results={{ pass: processingState.pass, fail: processingState.fail }}
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Inspections" value={inspections.length} icon={Eye} color="blue" />
          <StatCard title="Passed" value={passCount} icon={CheckCircle} color="green" trend={{ value: 3, positive: true }} />
          <StatCard title="Failed" value={failCount} icon={XCircle} color="red" trend={{ value: 1, positive: false }} />
          <StatCard title="Avg Processing" value={`${avgTime}ms`} icon={Clock} color="purple" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-8 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Results</h2>
            <span className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">
              {filtered.length}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg focus:outline-none focus:border-blue-500/50 text-[var(--text-primary)]"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)] overflow-hidden">
              {(["all", "pass", "fail"] as FilterMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterMode === mode
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {mode === "all" ? "All" : mode === "pass" ? "✓ Pass" : "✗ Fail"}
                </button>
              ))}
            </div>

            {/* Heatmap toggle */}
            <button
              onClick={() => setShowHeatmaps(!showHeatmaps)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                showHeatmaps
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                  : "border-[var(--border-color)] text-[var(--text-secondary)]"
              }`}
            >
              🔥 Heatmaps
            </button>

            {/* View mode */}
            <div className="flex items-center bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)] overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${viewMode === "grid" ? "text-blue-400 bg-blue-500/20" : "text-[var(--text-muted)]"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 ${viewMode === "list" ? "text-blue-400 bg-blue-500/20" : "text-[var(--text-muted)]"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                : "space-y-3"
            }
          >
            {filtered.map((result) =>
              viewMode === "grid" ? (
                <InspectionCard key={result.id} result={result} showHeatmap={showHeatmaps} />
              ) : (
                <div key={result.id} className="glass-card p-4 flex items-center gap-4">
                  <img
                    src={result.imageUrl}
                    alt={result.originalFilename}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{result.originalFilename}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {result.defects.length} defect{result.defects.length !== 1 ? "s" : ""} •{" "}
                      {result.processingTimeMs}ms
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--text-secondary)]">
                      {result.overallConfidence}%
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        result.status === "pass"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-[var(--text-muted)]">
            <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No inspection results yet. Upload images to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
}
