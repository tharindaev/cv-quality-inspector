# VisionQC — AI-Powered Quality Inspector

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?style=flat-square)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)

Full-stack computer vision application for automated product quality inspection. Upload product photos and detect defects (scratches, dents, misalignment) using YOLOv8 with real-time heatmap visualization, batch processing, and analytics dashboard.

## ✨ Features

- **Real-time Defect Detection** — YOLOv8 identifies scratches, dents, cracks, misalignment, blur, and stains
- **Heatmap Visualization** — Color-coded bounding boxes overlaid on original images showing defect locations
- **Batch Processing** — Upload and process 50+ images with real-time progress tracking
- **Analytics Dashboard** — Pass/fail rates, defect type breakdown (pie chart), trend analysis (line chart), confidence distribution
- **Configurable Sensitivity** — Adjust detection threshold from fine scratches to major defects only
- **Model Selection** — Choose between YOLOv8n (fast), YOLOv8s (balanced), YOLOv8m (accurate)
- **Pass/Fail Logic** — Configurable confidence threshold for automated QC decisions
- **Dark Professional Theme** — Modern SaaS UI, fully responsive
- **GPU Accelerated** — CUDA support for production throughput, CPU fallback

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, Recharts |
| **Backend** | FastAPI, Python, OpenCV, Pillow |
| **ML Model** | YOLOv8 (Ultralytics) |
| **Database** | Supabase (PostgreSQL) |
| **Charts** | Recharts (Line, Pie, Bar) |

## 🚀 Getting Started

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Configure environment
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Database

Run `backend/migrations/001_create_tables.sql` in Supabase SQL editor.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/inspect` | Upload single image for defect detection |
| `POST` | `/api/inspect/batch` | Upload multiple images, returns job ID |
| `GET` | `/api/jobs/{id}` | Get batch job status and results |
| `GET` | `/api/analytics` | Aggregated defect stats and trends |
| `GET` | `/api/results/{filename}` | Serve heatmap/result images |

## 📸 Screenshots

### Landing Page
Dark professional theme with feature highlights and how-it-works section.

### Inspector Dashboard
Batch upload, real-time processing progress, results grid with pass/fail badges, confidence scores, and defect heatmaps.

### Analytics
Interactive charts: pass/fail trends, defect type pie chart, confidence distribution histogram.

### Settings
Sensitivity slider, model selection (YOLOv8n/s/m), pass/fail threshold configuration.

## 🔧 Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `sensitivityThreshold` | Detection confidence cutoff (10-95%) | 65% |
| `modelSize` | YOLOv8 variant (n/s/m) | yolov8s |
| `passThreshold` | Pass/fail decision boundary | 75% |
| `enableHeatmap` | Show defect overlays on images | true |
| `maxBatchSize` | Max images per batch upload | 50 |

## 📁 Project Structure

```
cv-quality-inspector/
├── app/                    # Next.js pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Inspector dashboard
│   ├── analytics/         # Analytics charts
│   └── settings/          # Configuration
├── components/            # React components
│   ├── Navbar.tsx
│   ├── StatCard.tsx
│   ├── DefectHeatmap.tsx
│   ├── InspectionCard.tsx
│   ├── UploadZone.tsx
│   └── ProcessingProgress.tsx
├── lib/                   # Utilities
│   ├── types.ts           # TypeScript types
│   └── mock-data.ts       # Demo data generator
├── backend/               # FastAPI backend
│   ├── app/main.py        # API server
│   ├── requirements.txt
│   ├── migrations/        # SQL migrations
│   └── .env.example
└── README.md
```

## License

MIT
