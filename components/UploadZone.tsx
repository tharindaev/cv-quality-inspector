"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon, Loader2, CheckCircle, X } from "lucide-react";

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
  isProcessing: boolean;
  maxFiles?: number;
}

export default function UploadZone({ onUpload, isProcessing, maxFiles = 50 }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (files.length > 0) {
        setSelectedFiles((prev) => [...prev, ...files].slice(0, maxFiles));
      }
    },
    [maxFiles]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, maxFiles));
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-[var(--border-color)] hover:border-blue-500/50 hover:bg-[var(--bg-tertiary)]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          {isProcessing ? (
            <>
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
              <p className="text-sm text-[var(--text-secondary)]">Processing images...</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Drop product images here or{" "}
                  <span className="text-blue-400">browse</span>
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Supports JPG, PNG, WebP • Up to {maxFiles} images per batch
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} selected
            </h3>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Inspect All
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, i) => (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden bg-[var(--bg-primary)]"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-20 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="absolute top-1 right-1 p-0.5 rounded-full bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-0.5">
                  <p className="text-[9px] text-white truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
