export interface Defect {
  type: "scratch" | "dent" | "misalignment" | "blur" | "crack" | "stain";
  confidence: number;
  bbox: { x: number; y: number; w: number; h: number };
  severity: "low" | "medium" | "high";
}

export interface InspectionResult {
  id: string;
  imageUrl: string;
  originalFilename: string;
  defects: Defect[];
  status: "pass" | "fail";
  overallConfidence: number;
  inspectedAt: string;
  processingTimeMs: number;
}

export interface BatchJob {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  totalImages: number;
  processedCount: number;
  results: InspectionResult[];
  createdAt: string;
  completedAt?: string;
}

export interface AnalyticsData {
  totalInspections: number;
  passRate: number;
  failRate: number;
  avgConfidence: number;
  defectTypeBreakdown: { type: string; count: number; percentage: number }[];
  trendData: { date: string; pass: number; fail: number; total: number }[];
  confidenceDistribution: { range: string; count: number }[];
  recentInspections: InspectionResult[];
}

export interface Settings {
  sensitivityThreshold: number;
  modelSize: "yolov8n" | "yolov8s" | "yolov8m";
  passThreshold: number;
  enableHeatmap: boolean;
  maxBatchSize: number;
}
