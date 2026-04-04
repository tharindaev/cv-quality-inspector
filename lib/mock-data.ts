import { InspectionResult, AnalyticsData, BatchJob, Defect } from "./types";
import { v4 as uuidv4 } from "uuid";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=400&h=400&fit=crop",
];

const FILENAMES = [
  "product_A001.jpg", "headphones_unit_12.png", "lens_cap_batch3.jpg",
  "sunglasses_QC.png", "watch_face_07.jpg", "sneaker_left_42.png",
  "phone_case_red.jpg", "circuit_board_v2.png", "shoe_right_42.jpg",
  "beads_sample.png", "headphones_black.jpg", "candle_jar_05.png",
  "toy_car_blue.jpg", "makeup_kit_01.png", "bottle_green.jpg",
  "tablet_screen.png", "watch_band_03.jpg", "shoe_sole_09.png",
  "speaker_mini.jpg", "lamp_base_02.png",
];

const DEFECT_TYPES: Defect["type"][] = ["scratch", "dent", "misalignment", "blur", "crack", "stain"];

function randomDefects(count: number): Defect[] {
  const defects: Defect[] = [];
  for (let i = 0; i < count; i++) {
    const type = DEFECT_TYPES[Math.floor(Math.random() * DEFECT_TYPES.length)];
    const confidence = Math.floor(Math.random() * 40) + 60;
    const severity: Defect["severity"] = confidence > 85 ? "high" : confidence > 70 ? "medium" : "low";
    defects.push({
      type,
      confidence,
      bbox: {
        x: Math.floor(Math.random() * 250) + 20,
        y: Math.floor(Math.random() * 250) + 20,
        w: Math.floor(Math.random() * 80) + 40,
        h: Math.floor(Math.random() * 80) + 40,
      },
      severity,
    });
  }
  return defects;
}

export function generateInspections(count: number = 20): InspectionResult[] {
  return Array.from({ length: count }, (_, i) => {
    const hasDefects = Math.random() > 0.4;
    const defects = hasDefects ? randomDefects(Math.floor(Math.random() * 3) + 1) : [];
    const overallConfidence = defects.length > 0
      ? Math.round(defects.reduce((a, d) => a + d.confidence, 0) / defects.length)
      : Math.floor(Math.random() * 10) + 90;
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
      id: uuidv4(),
      imageUrl: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
      originalFilename: FILENAMES[i % FILENAMES.length],
      defects,
      status: defects.length > 0 ? "fail" as const : "pass" as const,
      overallConfidence,
      inspectedAt: date.toISOString(),
      processingTimeMs: Math.floor(Math.random() * 800) + 200,
    };
  });
}

export function generateAnalytics(inspections: InspectionResult[]): AnalyticsData {
  const passCount = inspections.filter((i) => i.status === "pass").length;
  const failCount = inspections.filter((i) => i.status === "fail").length;
  const total = inspections.length;

  const defectCounts: Record<string, number> = {};
  inspections.forEach((ins) => {
    ins.defects.forEach((d) => {
      defectCounts[d.type] = (defectCounts[d.type] || 0) + 1;
    });
  });

  const totalDefects = Object.values(defectCounts).reduce((a, b) => a + b, 0);
  const defectTypeBreakdown = Object.entries(defectCounts).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: Math.round((count / (totalDefects || 1)) * 100),
  }));

  // Trend data for last 7 days
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStr = date.toISOString().split("T")[0];
    const dayInspections = inspections.filter((ins) => ins.inspectedAt.startsWith(dayStr));
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      pass: dayInspections.filter((i) => i.status === "pass").length || Math.floor(Math.random() * 8) + 2,
      fail: dayInspections.filter((i) => i.status === "fail").length || Math.floor(Math.random() * 5) + 1,
      total: dayInspections.length || Math.floor(Math.random() * 12) + 3,
    };
  });

  const confidenceDistribution = [
    { range: "60-70%", count: Math.floor(Math.random() * 5) + 1 },
    { range: "70-80%", count: Math.floor(Math.random() * 8) + 3 },
    { range: "80-90%", count: Math.floor(Math.random() * 12) + 5 },
    { range: "90-100%", count: Math.floor(Math.random() * 10) + 4 },
  ];

  return {
    totalInspections: total,
    passRate: Math.round((passCount / (total || 1)) * 100),
    failRate: Math.round((failCount / (total || 1)) * 100),
    avgConfidence: Math.round(inspections.reduce((a, i) => a + i.overallConfidence, 0) / (total || 1)),
    defectTypeBreakdown,
    trendData,
    confidenceDistribution,
    recentInspections: inspections.slice(0, 10),
  };
}

export function generateBatchJob(imageCount: number): BatchJob {
  return {
    id: uuidv4(),
    status: "completed",
    totalImages: imageCount,
    processedCount: imageCount,
    results: generateInspections(imageCount),
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
}

// Singleton inspections
let _inspections: InspectionResult[] | null = null;
export function getInspections(): InspectionResult[] {
  if (!_inspections) _inspections = generateInspections(20);
  return _inspections;
}

export function getAnalytics(): AnalyticsData {
  return generateAnalytics(getInspections());
}
