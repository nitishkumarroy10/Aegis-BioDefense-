import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart
} from "recharts";
import {
  ShieldCheck,
  Activity,
  Bug,
  Radio,
  Zap,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingDown,
  TrendingUp,
  Cpu,
  RefreshCw,
  Sparkles,
  Home,
  Sliders
} from "lucide-react";
import { auth, db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Sample Monthly Property Health Data
const MONTHLY_DATA_12M = [
  { month: "Jan", pestActivity: 42, barrierEfficacy: 94.5, acousticTriggers: 28, riskFactor: 38 },
  { month: "Feb", pestActivity: 35, barrierEfficacy: 95.8, acousticTriggers: 22, riskFactor: 30 },
  { month: "Mar", pestActivity: 28, barrierEfficacy: 97.2, acousticTriggers: 18, riskFactor: 24 },
  { month: "Apr", pestActivity: 19, barrierEfficacy: 98.4, acousticTriggers: 12, riskFactor: 18 },
  { month: "May", pestActivity: 12, barrierEfficacy: 99.1, acousticTriggers: 8, riskFactor: 12 },
  { month: "Jun (Monsoon)", pestActivity: 68, barrierEfficacy: 98.8, acousticTriggers: 52, riskFactor: 76 },
  { month: "Jul (Monsoon)", pestActivity: 74, barrierEfficacy: 99.4, acousticTriggers: 60, riskFactor: 82 },
  { month: "Aug", pestActivity: 48, barrierEfficacy: 99.5, acousticTriggers: 34, riskFactor: 54 },
  { month: "Sep", pestActivity: 22, barrierEfficacy: 99.7, acousticTriggers: 14, riskFactor: 22 },
  { month: "Oct", pestActivity: 14, barrierEfficacy: 99.8, acousticTriggers: 9, riskFactor: 14 },
  { month: "Nov", pestActivity: 8, barrierEfficacy: 99.9, acousticTriggers: 5, riskFactor: 10 },
  { month: "Dec", pestActivity: 5, barrierEfficacy: 99.9, acousticTriggers: 3, riskFactor: 8 }
];

const MONSOON_SURGE_DATA = [
  { month: "Jan", pestActivity: 42, barrierEfficacy: 94.5, acousticTriggers: 28, riskFactor: 38 },
  { month: "Feb", pestActivity: 35, barrierEfficacy: 95.8, acousticTriggers: 22, riskFactor: 30 },
  { month: "Mar", pestActivity: 28, barrierEfficacy: 97.2, acousticTriggers: 18, riskFactor: 24 },
  { month: "Apr", pestActivity: 19, barrierEfficacy: 98.4, acousticTriggers: 12, riskFactor: 18 },
  { month: "May", pestActivity: 12, barrierEfficacy: 99.1, acousticTriggers: 8, riskFactor: 12 },
  { month: "Jun (Monsoon)", pestActivity: 110, barrierEfficacy: 97.5, acousticTriggers: 88, riskFactor: 92 },
  { month: "Jul (Monsoon)", pestActivity: 135, barrierEfficacy: 98.2, acousticTriggers: 104, riskFactor: 98 },
  { month: "Aug", pestActivity: 95, barrierEfficacy: 98.9, acousticTriggers: 72, riskFactor: 80 },
  { month: "Sep", pestActivity: 45, barrierEfficacy: 99.4, acousticTriggers: 30, riskFactor: 42 },
  { month: "Oct", pestActivity: 18, barrierEfficacy: 99.8, acousticTriggers: 11, riskFactor: 18 },
  { month: "Nov", pestActivity: 10, barrierEfficacy: 99.9, acousticTriggers: 6, riskFactor: 12 },
  { month: "Dec", pestActivity: 6, barrierEfficacy: 99.9, acousticTriggers: 4, riskFactor: 9 }
];

// Species Distribution Data
const SPECIES_DISTRIBUTION = [
  { name: "Subterranean Termites", value: 42, color: "#10b981" },
  { name: "German Cockroaches", value: 24, color: "#0ea5e9" },
  { name: "Roof Rodents / Mice", value: 16, color: "#f59e0b" },
  { name: "Wood-Boring Beetles", value: 10, color: "#a855f7" },
  { name: "Mosquito Larvae", value: 8, color: "#14b8a6" }
];

// Zone Defense Health
const ZONE_HEALTH_DATA = [
  { zone: "Foundation & Basement", health: 99.8, alerts: 0, status: "Optimal" },
  { zone: "Kitchen Plumbing", health: 100.0, alerts: 0, status: "Optimal" },
  { zone: "Living Timber Panels", health: 98.5, alerts: 1, status: "Guarded" },
  { zone: "Attic / HVAC Ducts", health: 99.2, alerts: 0, status: "Optimal" },
  { zone: "Outdoor Balcony", health: 97.9, alerts: 2, status: "Guarded" }
];

export default function PropertyHealthDashboard() {
  const [timeframe, setTimeframe] = useState<"6M" | "12M" | "YTD">("12M");
  const [isMonsoonSurgeSim, setIsMonsoonSurgeSim] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<string>("DLF Phase 5 Villa (4,500 sqft)");
  const [exportingReport, setExportingReport] = useState<boolean>(false);
  const [showPestBars, setShowPestBars] = useState<boolean>(true);
  const [showBarrierEfficacy, setShowBarrierEfficacy] = useState<boolean>(true);
  const [showAcousticTriggers, setShowAcousticTriggers] = useState<boolean>(true);

  // Filter dataset based on time range and surge simulation
  const rawData = isMonsoonSurgeSim ? MONSOON_SURGE_DATA : MONTHLY_DATA_12M;
  const chartData = timeframe === "6M" ? rawData.slice(6, 12) : rawData;

  // Compute summary stats
  const currentEfficacy = chartData[chartData.length - 1].barrierEfficacy;
  const totalTriggers = chartData.reduce((acc, curr) => acc + curr.acousticTriggers, 0);
  const avgPestActivity = Math.round(
    chartData.reduce((acc, curr) => acc + curr.pestActivity, 0) / chartData.length
  );

  const handleExportHealthReport = async () => {
    setExportingReport(true);
    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "health_reports"), {
          userId: auth.currentUser.uid,
          property: selectedProperty,
          efficacyPct: currentEfficacy,
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      console.warn("Report export log error:", err);
    } finally {
      setTimeout(() => {
        setExportingReport(false);
        alert(`Aegis Property Health Telemetry Report exported for ${selectedProperty}. Saved to client portal.`);
      }, 1000);
    }
  };

  return (
    <section id="health-dashboard" className="py-20 bg-slate-950 text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Real-Time Property Telemetry & Health Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              Aegis Bio-Defense Property Health Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Track detected bio-acoustic pest activity, acoustic sensor trigger frequencies, and botanical barrier effectiveness over time across your estate.
            </p>
          </div>

          {/* Property Selector & Export Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-xs font-mono text-slate-300">
              <Home className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer pr-2"
              >
                <option value="DLF Phase 5 Villa (4,500 sqft)" className="bg-slate-900">DLF Phase 5 Villa (4,500 sqft)</option>
                <option value="Golf Course Rd Penthouse (3,200 sqft)" className="bg-slate-900">Golf Course Rd Penthouse (3,200 sqft)</option>
                <option value="Cyber City Tech Office (12,000 sqft)" className="bg-slate-900">Cyber City Tech Office (12,000 sqft)</option>
                <option value="Sohna Road Estate (8,000 sqft)" className="bg-slate-900">Sohna Road Estate (8,000 sqft)</option>
              </select>
            </div>

            <button
              onClick={handleExportHealthReport}
              disabled={exportingReport}
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {exportingReport ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{exportingReport ? "Generating..." : "Export Audit PDF"}</span>
            </button>
          </div>
        </div>

        {/* TOP KPI STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* KPI 1: Barrier Efficacy */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>BARRIER EFFICACY INDEX</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white font-mono">{currentEfficacy}%</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +0.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Botanical barrier active across 5 property zones
            </p>
          </div>

          {/* KPI 2: Intercepted Pests */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/30 shadow-xl backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>PEST INTERCEPTIONS</span>
              <Bug className="w-4 h-4 text-teal-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white font-mono">{totalTriggers}</span>
              <span className="text-xs font-mono text-teal-300 font-semibold">
                Neutralized
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Avg {avgPestActivity} acoustic events intercepted / mo
            </p>
          </div>

          {/* KPI 3: Acoustic Sensor Online */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 shadow-xl backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>RADAR TELEMETRY</span>
              <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white font-mono">16 / 16</span>
              <span className="text-xs font-mono text-blue-400 font-semibold">100% Online</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Ultrasonic sensors calibrated 24/7
            </p>
          </div>

          {/* KPI 4: Seasonal Risk Level */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>ESTATE RISK LEVEL</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-extrabold font-mono ${isMonsoonSurgeSim ? "text-amber-400" : "text-emerald-400"}`}>
                {isMonsoonSurgeSim ? "HIGH (Monsoon)" : "LOW (Protected)"}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Monsoon Surge Test:</span>
              <button
                onClick={() => setIsMonsoonSurgeSim(!isMonsoonSurgeSim)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  isMonsoonSurgeSim
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold"
                    : "bg-slate-800 text-slate-400 border-white/10 hover:text-white"
                }`}
              >
                {isMonsoonSurgeSim ? "Surge Mode ON" : "Toggle Surge"}
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CHART BLOCK: COMPOSED CHART (PEST ACTIVITY VS BARRIER EFFICACY) */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl mb-8">
          {/* Chart Toolbar Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2 font-serif">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Monthly Pest Activity vs. Bio-Barrier Effectiveness Trend</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Primary Y-Axis: Barrier Efficacy % (Green Area) • Secondary Y-Axis: Detected Pest Incidents (Bar & Line)
              </p>
            </div>

            {/* Timeframe & Series Toggle Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Metric Toggles */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-white/10 text-[11px] font-mono">
                <button
                  onClick={() => setShowPestBars(!showPestBars)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    showPestBars ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-500"
                  }`}
                >
                  Pest Incidents
                </button>
                <button
                  onClick={() => setShowBarrierEfficacy(!showBarrierEfficacy)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    showBarrierEfficacy ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-slate-500"
                  }`}
                >
                  Efficacy %
                </button>
                <button
                  onClick={() => setShowAcousticTriggers(!showAcousticTriggers)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    showAcousticTriggers ? "bg-teal-500/20 text-teal-300 font-bold" : "text-slate-500"
                  }`}
                >
                  Radar Triggers
                </button>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-white/10 text-[11px] font-mono">
                {(["6M", "12M"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      timeframe === tf
                        ? "bg-emerald-500 text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recharts Container */}
          <div className="w-full h-[360px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 15, right: 20, bottom: 20, left: 0 }}
              >
                <defs>
                  <linearGradient id="efficacyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="pestBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.3} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#334155" }}
                />
                
                {/* Left Y-Axis: Efficacy Percentage */}
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  domain={[80, 100]}
                  stroke="#10b981"
                  fontSize={11}
                  tickFormatter={(val) => `${val}%`}
                  axisLine={{ stroke: "#059669" }}
                  tickLine={false}
                />

                {/* Right Y-Axis: Pest Incidents Count */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, isMonsoonSurgeSim ? 150 : 80]}
                  stroke="#f59e0b"
                  fontSize={11}
                  axisLine={{ stroke: "#d97706" }}
                  tickLine={false}
                />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3.5 rounded-2xl bg-slate-950/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl text-xs font-mono space-y-1.5 min-w-[200px]">
                          <div className="font-bold text-white border-b border-white/10 pb-1 flex items-center justify-between">
                            <span>Month: {label}</span>
                            <span className="text-[10px] text-emerald-400 font-normal">Aegis Telemetry</span>
                          </div>
                          {payload.map((entry, idx) => (
                            <div key={idx} className="flex items-center justify-between space-x-3">
                              <span style={{ color: entry.color }} className="font-semibold">
                                {entry.name}:
                              </span>
                              <span className="font-bold text-white">
                                {entry.value}
                                {entry.name.includes("Efficacy") ? "%" : " incidents"}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: "11px", fontFamily: "monospace", color: "#94a3b8" }}
                />

                {/* Area 1: Bio-Barrier Efficacy % */}
                {showBarrierEfficacy && (
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="barrierEfficacy"
                    name="Bio-Barrier Efficacy (%)"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#efficacyGradient)"
                  />
                )}

                {/* Bar 1: Detected Pest Activity Count */}
                {showPestBars && (
                  <Bar
                    yAxisId="right"
                    dataKey="pestActivity"
                    name="Detected Pest Incidents"
                    fill="url(#pestBarGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={32}
                  />
                )}

                {/* Line 2: Radar Acoustic Sensor Triggers */}
                {showAcousticTriggers && (
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="acousticTriggers"
                    name="Radar Sensor Triggers"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#14b8a6", strokeWidth: 1, stroke: "#0f172a" }}
                    activeDot={{ r: 6, fill: "#2dd4bf" }}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM ROW: RECHARTS PIE SPECIES DISTRIBUTION & ZONE DEFENSE HEALTH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Species Distribution Pie Chart (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white font-serif flex items-center space-x-2">
                  <Bug className="w-4 h-4 text-emerald-400" />
                  <span>Detected Pest Species Breakdown</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Telemetry Share
                </span>
              </div>

              <div className="w-full h-[220px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SPECIES_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {SPECIES_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs font-mono space-y-1">
                              <div className="font-bold text-white">{data.name}</div>
                              <div className="text-emerald-400">{data.value}% of total acoustic activity</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Custom Species Legend */}
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
              {SPECIES_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 truncate">{item.name}</span>
                  <span className="text-white font-bold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Zone Protection Status Bar List (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white font-serif flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zone Bio-Barrier Integrity & Sensor Health</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  5/5 Calibrated
                </span>
              </div>

              <div className="space-y-4">
                {ZONE_HEALTH_DATA.map((z, idx) => (
                  <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-200">{z.zone}</span>
                      <div className="flex items-center space-x-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                          z.status === "Optimal"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        }`}>
                          {z.status}
                        </span>
                        <span className="font-bold text-emerald-400">{z.health}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-500"
                        style={{ width: `${z.health}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated monthly acoustic telemetry audit active for {selectedProperty}</span>
              </div>
              <a
                href="#calculator"
                className="text-emerald-400 hover:text-emerald-300 underline font-bold whitespace-nowrap"
              >
                Upgrade AMC Plan →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
