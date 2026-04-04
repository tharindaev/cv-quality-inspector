"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  color?: string;
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = "blue" }: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400",
    green: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
    red: "from-red-500/20 to-red-600/5 border-red-500/30 text-red-400",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400",
    yellow: "from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400",
    cyan: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400",
  };

  const classes = colorMap[color] || colorMap.blue;

  return (
    <div className={`glass-card p-5 bg-gradient-to-br ${classes} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-[var(--text-secondary)] mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-1 ${trend.positive ? "text-emerald-400" : "text-red-400"}`}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% vs last week
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${classes}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
