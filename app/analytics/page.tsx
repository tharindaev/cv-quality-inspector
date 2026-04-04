"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { AnalyticsData } from "@/lib/types";
import { getAnalytics } from "@/lib/mock-data";
import {
  BarChart3,
  TrendingUp,
  CheckCircle,
  XCircle,
  Target,
  Activity,
  Eye,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const PIE_COLORS = ["#ef4444", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899", "#10b981"];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    setData(getAnalytics());
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Quality inspection trends and defect analysis
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Inspections"
            value={data.totalInspections}
            icon={Eye}
            color="blue"
            subtitle="Last 30 days"
          />
          <StatCard
            title="Pass Rate"
            value={`${data.passRate}%`}
            icon={CheckCircle}
            color="green"
            trend={{ value: 5, positive: true }}
          />
          <StatCard
            title="Fail Rate"
            value={`${data.failRate}%`}
            icon={XCircle}
            color="red"
            trend={{ value: 2, positive: false }}
          />
          <StatCard
            title="Avg Confidence"
            value={`${data.avgConfidence}%`}
            icon={Target}
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Trend Chart */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold">Inspection Trend (7 days)</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6868a0", fontSize: 11 }}
                    axisLine={{ stroke: "#2a2a4a" }}
                  />
                  <YAxis
                    tick={{ fill: "#6868a0", fontSize: 11 }}
                    axisLine={{ stroke: "#2a2a4a" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#16162a",
                      border: "1px solid #2a2a4a",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Line
                    type="monotone"
                    dataKey="pass"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 3 }}
                    name="Pass"
                  />
                  <Line
                    type="monotone"
                    dataKey="fail"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", r: 3 }}
                    name="Fail"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Defect Type Pie */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold">Defect Type Breakdown</h3>
            </div>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie
                    data={data.defectTypeBreakdown}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={3}
                  >
                    {data.defectTypeBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#16162a",
                      border: "1px solid #2a2a4a",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {data.defectTypeBreakdown.map((item, i) => (
                  <div key={item.type} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-xs text-[var(--text-secondary)]">{item.type}</span>
                    <span className="text-xs font-mono text-[var(--text-muted)] ml-auto">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Distribution */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold">Confidence Distribution</h3>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.confidenceDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis
                    dataKey="range"
                    tick={{ fill: "#6868a0", fontSize: 11 }}
                    axisLine={{ stroke: "#2a2a4a" }}
                  />
                  <YAxis
                    tick={{ fill: "#6868a0", fontSize: 11 }}
                    axisLine={{ stroke: "#2a2a4a" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#16162a",
                      border: "1px solid #2a2a4a",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Inspections" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pass/Fail Donut */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold">Pass / Fail Ratio</h3>
            </div>
            <div className="h-56 flex items-center justify-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Pass", value: data.passRate },
                      { name: "Fail", value: data.failRate },
                    ]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={50}
                    paddingAngle={4}
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#16162a",
                      border: "1px solid #2a2a4a",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">{data.passRate}%</p>
                  <p className="text-xs text-[var(--text-muted)]">Pass Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-400">{data.failRate}%</p>
                  <p className="text-xs text-[var(--text-muted)]">Fail Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Inspections Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-[var(--border-color)]">
            <h3 className="text-sm font-semibold">Recent Inspections</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left p-3 text-xs font-medium text-[var(--text-muted)]">Image</th>
                  <th className="text-left p-3 text-xs font-medium text-[var(--text-muted)]">Filename</th>
                  <th className="text-left p-3 text-xs font-medium text-[var(--text-muted)]">Status</th>
                  <th className="text-left p-3 text-xs font-medium text-[var(--text-muted)]">Defects</th>
                  <th className="text-left p-3 text-xs font-medium text-[var(--text-muted)]">Confidence</th>
                  <th className="text-left p-3 text-xs font-medium text-[var(--text-muted)]">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentInspections.map((ins) => (
                  <tr key={ins.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors">
                    <td className="p-3">
                      <img src={ins.imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                    </td>
                    <td className="p-3 font-mono text-xs">{ins.originalFilename}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          ins.status === "pass"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {ins.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-[var(--text-secondary)]">
                      {ins.defects.length > 0
                        ? ins.defects.map((d) => d.type).join(", ")
                        : "None"}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              ins.overallConfidence > 80 ? "bg-emerald-500" : ins.overallConfidence > 60 ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${ins.overallConfidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono">{ins.overallConfidence}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-[var(--text-muted)]">{ins.processingTimeMs}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
