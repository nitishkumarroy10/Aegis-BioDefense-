import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Bug,
  Activity,
  Zap,
  Sparkles,
  AlertTriangle,
  Radio,
  CheckCircle2,
  ChevronRight,
  Flame,
  Droplets,
  Eye,
  Sliders,
  Volume2
} from "lucide-react";

export interface ZoneData {
  id: string;
  name: string;
  subtitle: string;
  vulnerability: "Critical" | "High" | "Moderate";
  pests: string[];
  radarTech: string;
  radarFrequency: string;
  botanicalBarrier: string;
  activeCoveragePct: number;
  svgHighlight: {
    cx?: number;
    cy?: number;
    r?: number;
    path?: string;
    rect?: { x: number; y: number; width: number; height: number; rx?: number };
  };
  details: string;
}

const ZONES: ZoneData[] = [
  {
    id: "foundation",
    name: "Subterranean Foundation & Basement",
    subtitle: "Soil-Structure Interface & Micro-Fissures",
    vulnerability: "Critical",
    pests: ["Subterranean Termites", "Dampwood Roaches", "Silverfish"],
    radarTech: "Aegis Terra-Acoustic Ground Sensor (20–40 kHz)",
    radarFrequency: "32 kHz Acoustic Resonant Pulse",
    botanicalBarrier: "Nano-Encapsulated Clove & Cedarwood Soil Matrix",
    activeCoveragePct: 99.8,
    svgHighlight: {
      rect: { x: 50, y: 310, width: 500, height: 70, rx: 8 }
    },
    details: "Termites construct mud tubes through foundation hair-cracks undetectable by visual inspection. Aegis Acoustic Radar listens to mandibles feeding through concrete density before structural collapse."
  },
  {
    id: "kitchen",
    name: "Kitchen & Plumbing Conduits",
    subtitle: "Sink Shafts, Dishwashers & Drain Traps",
    vulnerability: "High",
    pests: ["German Cockroaches", "Drain Flies", "Sugar Ants"],
    radarTech: "Bio-Thermal Drain Probe & Acoustic Cavitation Meter",
    radarFrequency: "Thermal Infrared + Bio-Gel Matrix",
    botanicalBarrier: "Micro-Dot Enzymatic Gel & Neem Bio-Surfactant",
    activeCoveragePct: 100,
    svgHighlight: {
      rect: { x: 80, y: 190, width: 200, height: 110, rx: 8 }
    },
    details: "High humidity and warmth in drainage sleeves create primary breeding colonies. Aegis gel micro-dots cause a domino-effect colony collapse back to the main nest without contaminating food surfaces."
  },
  {
    id: "living",
    name: "Living Room & Timber Wall Panelling",
    subtitle: "Italian Marble, Teak Furniture & Skirting",
    vulnerability: "High",
    pests: ["Drywood Termites", "Wood-Boring Beetles", "Bed Bugs"],
    radarTech: "Non-Invasive Timber Resonance Acoustic Scanner",
    radarFrequency: "45 kHz Micro-Vibrational Sounding",
    botanicalBarrier: "Zero-Drilling Micro-Injected Botanical Resin",
    activeCoveragePct: 98.5,
    svgHighlight: {
      rect: { x: 290, y: 190, width: 220, height: 110, rx: 8 }
    },
    details: "Traditional treatments involve drilling holes into expensive flooring. Aegis acoustic pulse mapping isolates termite galleries through marble without leaving visual scars or structural damage."
  },
  {
    id: "attic",
    name: "Attic, False Ceiling & HVAC Ducts",
    subtitle: "Air Conduits, Electrical Trays & Insulation",
    vulnerability: "Critical",
    pests: ["Roof Rats", "Mice", "Moths", "Wasps"],
    radarTech: "Dual Ultrasonic Multi-Frequency Transducer",
    radarFrequency: "30–65 kHz Dynamic Variable Sweep",
    botanicalBarrier: "Peppermint & Eucalyptus Vapour Barrier",
    activeCoveragePct: 99.2,
    svgHighlight: {
      rect: { x: 120, y: 70, width: 360, height: 110, rx: 8 }
    },
    details: "Rodents chew optical fiber and AC wiring causing fire hazards. Ultrasonic sweep frequency scrambles rodent auditory pathways preventing nesting in hidden false ceilings."
  },
  {
    id: "perimeter",
    name: "Outdoor Balcony & Garden Perimeter",
    subtitle: "Outdoor AC Units, Planters & Drainage Lines",
    vulnerability: "Moderate",
    pests: ["Mosquito Larvae", "Garden Ants", "Pigeons"],
    radarTech: "Optical Infrared Motion & Fogging Sensor",
    radarFrequency: "Cold-Fog Micro-Particle Hydro-Barrier",
    botanicalBarrier: "Pyrethrin & Essential Oil Outdoor Mist Barrier",
    activeCoveragePct: 97.9,
    svgHighlight: {
      rect: { x: 500, y: 170, width: 70, height: 130, rx: 8 }
    },
    details: "Protects outdoor living spaces from seasonal swarms and vector diseases using eco-friendly cold-fogging that is safe for garden flora and domestic pets."
  }
];

export default function InteractiveHomeRadar() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>("foundation");
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [pulseActive, setPulseActive] = useState<boolean>(true);

  const activeZoneId = hoveredZoneId || selectedZoneId;
  const activeZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];

  // Dynamic Zone Status recalculation based on focus/hover state
  const zoneStatuses = ZONES.map((zone) => {
    if (zone.id === activeZoneId) {
      return { ...zone, status: "Active" as const };
    } else if (zone.activeCoveragePct >= 99.0) {
      return { ...zone, status: "Secured" as const };
    } else {
      return { ...zone, status: "Monitoring" as const };
    }
  });

  const activeZones = zoneStatuses.filter((z) => z.status === "Active");
  const securedZones = zoneStatuses.filter((z) => z.status === "Secured");
  const monitoringZones = zoneStatuses.filter((z) => z.status === "Monitoring");

  return (
    <div className="w-full bg-slate-950 border border-emerald-500/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Radar Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Bio-Defense Radar Scanner</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
            Residential Entry Point Acoustic & Botanical Radar Map
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Hover over or select structural zones to view how Aegis non-invasive acoustic sensors detect hidden pest activity and deploy eco-safe botanical barriers.
          </p>
        </div>

        {/* Radar Pulse Toggle */}
        <div className="flex items-center space-x-3 bg-slate-900 border border-white/10 px-3.5 py-2 rounded-2xl shrink-0">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${pulseActive ? "bg-emerald-400 animate-ping" : "bg-slate-600"}`} />
            <span className="text-xs font-mono text-slate-300 font-semibold">
              {pulseActive ? "Acoustic Telemetry Active" : "Radar Paused"}
            </span>
          </div>
          <button
            onClick={() => setPulseActive(!pulseActive)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-colors"
          >
            {pulseActive ? "Pause Radar" : "Start Pulse"}
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Home Diagram (Left) & Zone Inspector Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Interactive SVG Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/80 rounded-2xl border border-white/10 p-4 sm:p-6 relative group overflow-hidden">
          {/* Top Status Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 px-1">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE TRANSMISSION: DELHI NCR ESTATE SCAN</span>
            </span>
            <span className="text-emerald-400 font-bold">5 DEFENSE ZONES ACTIVE</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full max-w-[580px] aspect-[580/390] relative">
            <svg
              viewBox="0 0 580 390"
              className="w-full h-full drop-shadow-2xl select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Radar Sweep Gradient */}
                <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#059669" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                </radialGradient>

                {/* Zone Glow Filters */}
                <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="activeZoneGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Sky / Outside Atmosphere */}
              <rect x="10" y="10" width="560" height="370" rx="16" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />

              {/* Garden Grass & Outdoor Soil Line */}
              <rect x="20" y="310" width="540" height="60" fill="#064e3b" opacity="0.3" rx="4" />
              <line x1="20" y1="310" x2="560" y2="310" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

              {/* HOUSE OUTLINE STRUCTURE */}
              {/* Roof Pitched Ceiling */}
              <polygon points="120,70 290,15 460,70" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />

              {/* Attic Wall Box */}
              <rect x="120" y="70" width="340" height="110" fill="#0f172a" stroke="#334155" strokeWidth="2" />

              {/* Ground Floor Walls (Kitchen + Living) */}
              <rect x="80" y="180" width="420" height="130" fill="#0b1329" stroke="#334155" strokeWidth="2" />

              {/* Internal Wall Divider (Kitchen vs Living) */}
              <line x1="280" y1="180" x2="280" y2="310" stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />

              {/* Subterranean Basement Foundation */}
              <rect x="50" y="310" width="480" height="65" fill="#090d16" stroke="#059669" strokeWidth="1.5" strokeDasharray="6 3" />

              {/* ARCHITECTURAL DETAILS & FURNISHING GRAPHICS */}

              {/* Attic / False Ceiling Details */}
              <g opacity="0.8">
                {/* AC Duct */}
                <rect x="150" y="90" width="280" height="20" fill="#1e293b" rx="4" stroke="#475569" strokeWidth="1" />
                <path d="M 170 100 L 410 100" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="5 5" />
                {/* Rodent / Pest Alert Dot */}
                <circle cx="210" cy="130" r="4" fill="#ef4444" className="animate-ping" />
                <circle cx="210" cy="130" r="3" fill="#f87171" />
                <text x="222" y="134" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Attic / HVAC Duct</text>
              </g>

              {/* Kitchen Details (Left Ground Floor) */}
              <g opacity="0.85">
                {/* Countertop */}
                <rect x="90" y="240" width="170" height="10" fill="#334155" rx="2" />
                {/* Sink & Pipe Sleeve */}
                <path d="M 120 240 L 120 260 L 160 260 L 160 240" stroke="#64748b" strokeWidth="2" fill="none" />
                <line x1="140" y1="260" x2="140" y2="310" stroke="#0284c7" strokeWidth="2.5" />
                {/* Cockroach / Drain Flies Alert Dot */}
                <circle cx="140" cy="285" r="4" fill="#f59e0b" className="animate-ping" />
                <circle cx="140" cy="285" r="3" fill="#fbbf24" />
                <text x="152" y="289" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Plumbing Sleeve</text>
              </g>

              {/* Living Room Details (Right Ground Floor) */}
              <g opacity="0.85">
                {/* Teakwood Panelling */}
                <rect x="300" y="200" width="180" height="100" fill="#1e1b18" stroke="#78350f" strokeWidth="1.5" rx="4" />
                <line x1="340" y1="200" x2="340" y2="300" stroke="#451a03" strokeWidth="1" />
                <line x1="390" y1="200" x2="390" y2="300" stroke="#451a03" strokeWidth="1" />
                <line x1="440" y1="200" x2="440" y2="300" stroke="#451a03" strokeWidth="1" />
                {/* Termite Gallery Alert Dot */}
                <circle cx="390" cy="250" r="4" fill="#ef4444" className="animate-ping" />
                <circle cx="390" cy="250" r="3" fill="#f87171" />
                <text x="402" y="254" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Hardwood Wall</text>
              </g>

              {/* Foundation Subterranean Details */}
              <g opacity="0.9">
                {/* Mud Tubes Graphic */}
                <path d="M 100 375 L 120 340 L 130 310" stroke="#b45309" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
                <path d="M 320 375 L 310 345 L 320 310" stroke="#b45309" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
                <circle cx="120" cy="340" r="4" fill="#ef4444" className="animate-ping" />
                <circle cx="120" cy="340" r="3" fill="#f87171" />
                <text x="132" y="344" fill="#cbd5e1" fontSize="9" fontFamily="monospace">Subterranean Soil</text>
              </g>

              {/* Exterior Perimeter / Balcony Details */}
              <g opacity="0.85">
                {/* Outdoor AC Unit */}
                <rect x="510" y="220" width="45" height="50" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx="4" />
                <circle cx="532" cy="245" r="14" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
                <circle cx="532" cy="245" r="3" fill="#0284c7" />
                <text x="502" y="285" fill="#cbd5e1" fontSize="8" fontFamily="monospace">AC Balcony</text>
              </g>

              {/* RADAR PULSE WAVES (IF PULSE ACTIVE) */}
              {pulseActive && (
                <g opacity="0.6">
                  {/* Sweep Concentric Circles centered on active zone */}
                  {activeZoneId === "foundation" && (
                    <g>
                      <circle cx="280" cy="340" r="30" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" />
                      <circle cx="280" cy="340" r="60" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
                    </g>
                  )}
                  {activeZoneId === "kitchen" && (
                    <g>
                      <circle cx="180" cy="240" r="25" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" />
                      <circle cx="180" cy="240" r="50" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
                    </g>
                  )}
                  {activeZoneId === "living" && (
                    <g>
                      <circle cx="390" cy="240" r="25" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" />
                      <circle cx="390" cy="240" r="50" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
                    </g>
                  )}
                  {activeZoneId === "attic" && (
                    <g>
                      <circle cx="290" cy="120" r="30" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" />
                      <circle cx="290" cy="120" r="60" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
                    </g>
                  )}
                  {activeZoneId === "perimeter" && (
                    <g>
                      <circle cx="530" cy="230" r="20" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" />
                    </g>
                  )}
                </g>
              )}

              {/* HOVER / SELECTION OVERLAY RECTANGLES FOR INTERACTION */}
              {ZONES.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                const isHovered = zone.id === hoveredZoneId;
                const isFocused = zone.id === activeZoneId;
                const rect = zone.svgHighlight.rect;
                if (!rect) return null;

                return (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    onMouseEnter={() => setHoveredZoneId(zone.id)}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    className="cursor-pointer group/zone"
                  >
                    <rect
                      x={rect.x}
                      y={rect.y}
                      width={rect.width}
                      height={rect.height}
                      rx={rect.rx || 6}
                      fill={isFocused ? "#10b981" : "#0f172a"}
                      fillOpacity={isFocused ? (isHovered ? 0.35 : 0.25) : 0.05}
                      stroke={isFocused ? "#10b981" : "#334155"}
                      strokeWidth={isFocused ? 2.5 : 1}
                      className="transition-all duration-300 group-hover/zone:fill-emerald-500/20 group-hover/zone:stroke-emerald-400"
                      filter={isFocused ? "url(#activeZoneGlow)" : undefined}
                    />

                    {/* Zone Badge Tag inside SVG */}
                    <rect
                      x={rect.x + 8}
                      y={rect.y + 8}
                      width={isFocused ? 110 : 85}
                      height="18"
                      rx="4"
                      fill={isFocused ? "#047857" : "#1e293b"}
                      fillOpacity="0.9"
                    />
                    <text
                      x={rect.x + 14}
                      y={rect.y + 20}
                      fill={isFocused ? "#ffffff" : "#94a3b8"}
                      fontSize="9"
                      fontWeight={isFocused ? "bold" : "normal"}
                      fontFamily="sans-serif"
                    >
                      {isFocused ? `► ${zone.name.split("&")[0]}` : zone.name.split("&")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Quick Zone Switcher Tabs */}
          <div className="w-full flex items-center justify-center gap-1.5 flex-wrap mt-4">
            {ZONES.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              const isHovered = zone.id === hoveredZoneId;
              const isFocused = zone.id === activeZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  onMouseEnter={() => setHoveredZoneId(zone.id)}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all flex items-center space-x-1.5 ${
                    isFocused
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-white/10 hover:border-emerald-500/30"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      zone.vulnerability === "Critical"
                        ? "bg-red-400"
                        : zone.vulnerability === "High"
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                  />
                  <span className="truncate max-w-[110px]">{zone.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* DYNAMIC LEGEND BAR BELOW SVG DIAGRAM */}
          <div className="w-full mt-4 pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center space-x-1.5 font-semibold text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>DYNAMIC DEFENSE STATUS LEGEND</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {hoveredZoneId ? "⚡ Hover Scan Mode" : "Selected Zone Mode"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Active Zone Card */}
              <div
                className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 flex flex-col justify-between space-y-1 shadow-md hover:border-emerald-400 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredZoneId(activeZones[0]?.id || selectedZoneId)}
                onMouseLeave={() => setHoveredZoneId(null)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span>Active Target</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                    {activeZones.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-200 truncate font-semibold">
                  {activeZones.map((z) => z.name.split(" ")[0]).join(", ")}
                </div>
                <div className="text-[9px] text-emerald-400/80 font-mono italic">
                  Radar Pulse Targeting
                </div>
              </div>

              {/* Secured Zones Card */}
              <div className="p-2.5 rounded-xl bg-slate-950/90 border border-teal-500/30 flex flex-col justify-between space-y-1 shadow-md hover:border-teal-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>Secured</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-300 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30">
                    {securedZones.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-300 truncate font-medium">
                  {securedZones.map((z) => z.name.split(" ")[0]).join(", ")}
                </div>
                <div className="text-[9px] text-teal-400/80 font-mono italic">
                  Botanical Shield Sealed
                </div>
              </div>

              {/* Monitoring Zones Card */}
              <div className="p-2.5 rounded-xl bg-slate-950/90 border border-blue-500/30 flex flex-col justify-between space-y-1 shadow-md hover:border-blue-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-blue-400 shrink-0 animate-pulse" />
                    <span>Monitoring</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-300 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                    {monitoringZones.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-300 truncate font-medium">
                  {monitoringZones.map((z) => z.name.split(" ")[0]).join(", ")}
                </div>
                <div className="text-[9px] text-blue-400/80 font-mono italic">
                  Acoustic Telemetry Guard
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone Inspector Detail Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Zone Title & Vulnerability Badge */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wide border ${
                      activeZone.vulnerability === "Critical"
                        ? "bg-red-500/20 text-red-300 border-red-500/40"
                        : activeZone.vulnerability === "High"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    }`}
                  >
                    Risk Level: {activeZone.vulnerability}
                  </span>

                  <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeZone.activeCoveragePct}% Efficacy</span>
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white font-serif">
                  {activeZone.name}
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeZone.subtitle}
                </p>
              </div>

              {/* Target Pests Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
                  Detected Vulnerable Pests:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeZone.pests.map((pest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-slate-200"
                    >
                      <Bug className="w-3 h-3 text-emerald-400" />
                      <span>{pest}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Aegis Acoustic Detection Spec */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300">
                  <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Aegis Acoustic Radar Detection</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {activeZone.radarTech}
                </p>
                <div className="text-[10px] text-teal-400 font-mono bg-teal-950/40 px-2 py-1 rounded border border-teal-500/20 inline-block">
                  Frequency Output: {activeZone.radarFrequency}
                </div>
              </div>

              {/* Botanical Shield Technology */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300">
                  <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Eco-Safe Botanical Shield Applied</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {activeZone.botanicalBarrier}
                </p>
              </div>

              {/* Diagnostic Overview */}
              <p className="text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                {activeZone.details}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Footer Button */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <div className="text-[11px] font-mono text-slate-400">
              Zero Chemical Residuals • Safe for Children & Pets
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("ai-chat-drawer");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <span>Scan My Estate</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
