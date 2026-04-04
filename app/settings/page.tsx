"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Settings } from "@/lib/types";
import {
  Sliders,
  Cpu,
  Target,
  Eye,
  Layers,
  Save,
  RotateCcw,
  CheckCircle,
  Info,
} from "lucide-react";

const DEFAULT_SETTINGS: Settings = {
  sensitivityThreshold: 65,
  modelSize: "yolov8s",
  passThreshold: 75,
  enableHeatmap: true,
  maxBatchSize: 50,
};

const MODEL_OPTIONS = [
  {
    value: "yolov8n" as const,
    label: "YOLOv8n (Nano)",
    description: "Fastest inference, lower accuracy",
    speed: "~15ms",
    accuracy: "78%",
  },
  {
    value: "yolov8s" as const,
    label: "YOLOv8s (Small)",
    description: "Balanced speed and accuracy",
    speed: "~45ms",
    accuracy: "89%",
  },
  {
    value: "yolov8m" as const,
    label: "YOLOv8m (Medium)",
    description: "Best accuracy, slower inference",
    speed: "~120ms",
    accuracy: "95%",
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Configure detection sensitivity, model selection, and processing options
          </p>
        </div>

        <div className="space-y-6">
          {/* Sensitivity Threshold */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold">Detection Sensitivity</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Lower values detect fine scratches and subtle defects. Higher values only flag major issues.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Fine Defects</span>
                <span className="text-sm font-mono font-bold text-blue-400">
                  {settings.sensitivityThreshold}%
                </span>
                <span className="text-xs text-[var(--text-muted)]">Major Only</span>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                value={settings.sensitivityThreshold}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, sensitivityThreshold: Number(e.target.value) }))
                }
                className="w-full h-2 bg-[var(--bg-primary)] rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <p className="text-xs text-blue-300">
                  At {settings.sensitivityThreshold}% sensitivity, the model will
                  {settings.sensitivityThreshold < 50
                    ? " detect fine scratches, micro-dents, and subtle misalignment"
                    : settings.sensitivityThreshold < 75
                    ? " balance between minor and major defect detection"
                    : " focus on major defects like large dents and severe misalignment"}
                </p>
              </div>
            </div>
          </div>

          {/* Model Selection */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold">Model Selection</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Choose the YOLOv8 model variant. Larger models are more accurate but slower.
            </p>

            <div className="space-y-3">
              {MODEL_OPTIONS.map((model) => (
                <button
                  key={model.value}
                  onClick={() => setSettings((s) => ({ ...s, modelSize: model.value }))}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    settings.modelSize === model.value
                      ? "border-purple-500/50 bg-purple-500/10"
                      : "border-[var(--border-color)] hover:border-purple-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{model.label}</span>
                    {settings.modelSize === model.value && (
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{model.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-cyan-400">⚡ {model.speed}</span>
                    <span className="text-emerald-400">🎯 {model.accuracy}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pass/Fail Threshold */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold">Pass/Fail Threshold</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Products with defect confidence above this threshold will be marked as FAIL.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Lenient</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {settings.passThreshold}%
                </span>
                <span className="text-xs text-[var(--text-muted)]">Strict</span>
              </div>
              <input
                type="range"
                min={30}
                max={95}
                value={settings.passThreshold}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, passThreshold: Number(e.target.value) }))
                }
                className="w-full h-2 bg-[var(--bg-primary)] rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold">Display Options</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Enable Heatmap Overlays</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Show color-coded defect bounding boxes on inspection images
                  </p>
                </div>
                <button
                  onClick={() => setSettings((s) => ({ ...s, enableHeatmap: !s.enableHeatmap }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    settings.enableHeatmap ? "bg-blue-500" : "bg-[var(--bg-primary)]"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.enableHeatmap ? "translate-x-5.5 left-0.5" : "left-0.5"
                    }`}
                    style={{ left: settings.enableHeatmap ? "22px" : "2px" }}
                  />
                </button>
              </div>

              <div className="border-t border-[var(--border-color)] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Max Batch Size</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Maximum number of images per batch upload
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          maxBatchSize: Math.max(5, s.maxBatchSize - 5),
                        }))
                      }
                      className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-sm hover:border-blue-500/50"
                    >
                      −
                    </button>
                    <span className="text-sm font-mono w-8 text-center font-bold">
                      {settings.maxBatchSize}
                    </span>
                    <button
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          maxBatchSize: Math.min(100, s.maxBatchSize + 5),
                        }))
                      }
                      className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-sm hover:border-blue-500/50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 border border-[var(--border-color)] hover:border-blue-500/50 text-[var(--text-secondary)] font-medium rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Defaults
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
