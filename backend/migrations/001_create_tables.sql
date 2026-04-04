-- VisionQC Database Schema
-- Run against Supabase SQL editor

-- Inspections table
CREATE TABLE IF NOT EXISTS inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  heatmap_url TEXT,
  original_filename TEXT NOT NULL,
  defects JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL CHECK (status IN ('pass', 'fail')),
  overall_confidence NUMERIC(5,2) NOT NULL DEFAULT 0,
  processing_time_ms NUMERIC(8,1),
  sensitivity NUMERIC(3,2) DEFAULT 0.65,
  model_size TEXT DEFAULT 'yolov8n',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Batch jobs table
CREATE TABLE IF NOT EXISTS batch_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status TEXT NOT NULL CHECK (status IN ('queued', 'processing', 'completed', 'failed')) DEFAULT 'queued',
  total_images INTEGER NOT NULL DEFAULT 0,
  processed_count INTEGER NOT NULL DEFAULT 0,
  results_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Analytics cache table
CREATE TABLE IF NOT EXISTS analytics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pass_rate NUMERIC(5,2),
  fail_rate NUMERIC(5,2),
  total_inspections INTEGER DEFAULT 0,
  avg_confidence NUMERIC(5,2),
  defect_type_stats JSONB DEFAULT '{}',
  trend_data JSONB DEFAULT '[]',
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inspections_status ON inspections(status);
CREATE INDEX IF NOT EXISTS idx_inspections_created_at ON inspections(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_batch_jobs_status ON batch_jobs(status);

-- RLS Policies (for multi-tenant, add user_id column and policies)
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo (restrict in production)
CREATE POLICY "Allow public access to inspections" ON inspections FOR ALL USING (true);
CREATE POLICY "Allow public access to batch_jobs" ON batch_jobs FOR ALL USING (true);
