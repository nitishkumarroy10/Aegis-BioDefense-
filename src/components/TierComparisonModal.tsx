import React from "react";
import { DEFENSE_PLANS } from "../data/websiteData";
import { DefensePlan, CurrencyCode } from "../types";
import { X, Check, Shield, Sparkles, Zap, ArrowRight, Award, CheckCircle2, Minus } from "lucide-react";

interface TierComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onSelectPlan: (plan: DefensePlan) => void;
}

interface TechnicalCriterion {
  category: string;
  feature: string;
  base: string | boolean;
  pro: string | boolean;
  elite: string | boolean;
}

const TECHNICAL_COMPARISON_MATRIX: TechnicalCriterion[] = [
  // Financial & Scope
  {
    category: "Financial & Scope",
    feature: "Ideal Property Scale",
    base: "Up to 2,500 sq.ft.",
    pro: "Up to 8,000 sq.ft.",
    elite: "Unlimited Estate / Park"
  },
  {
    category: "Financial & Scope",
    feature: "Re-Service Guarantee",
    base: "Free within 24 Hours",
    pro: "Immediate Priority",
    elite: "24/7 Dedicated Dispatch"
  },

  // Service Level Agreements (SLAs)
  {
    category: "Service Level Agreements",
    feature: "Emergency Dispatch SLA",
    base: "< 24 Hours",
    pro: "< 4 Hours Priority",
    elite: "< 60 Minutes Rapid"
  },
  {
    category: "Service Level Agreements",
    feature: "Structural Warranty Shield",
    base: "100% Money-Back",
    pro: "Zero-Infestation Guarantee",
    elite: "Comprehensive Structural Shield"
  },
  {
    category: "Service Level Agreements",
    feature: "Audit & Inspection Cadence",
    base: "Quarterly + On-Demand",
    pro: "Bi-Monthly Audits",
    elite: "Monthly + Real-Time Telemetry"
  },

  // Advanced Engineering Technologies
  {
    category: "Engineering Tech",
    feature: "100% Non-Toxic Botanical Micro-Barrier",
    base: true,
    pro: true,
    elite: true
  },
  {
    category: "Engineering Tech",
    feature: "Smart Foundation Moisture Sensors",
    base: true,
    pro: true,
    elite: true
  },
  {
    category: "Engineering Tech",
    feature: "Ultrasonic Acoustic Sonic Repellents",
    base: false,
    pro: "Variable-Freq Array",
    elite: "Multi-Zone Custom Grid"
  },
  {
    category: "Engineering Tech",
    feature: "Subterranean Termite Radar Scans",
    base: "Basic Inspection",
    pro: "Acoustic Radar",
    elite: "Sub-Slab Eradication Matrix"
  },
  {
    category: "Engineering Tech",
    feature: "Aerial Thermal Infrared Drone Audits",
    base: false,
    pro: false,
    elite: "Included (Roof & Wall)"
  },
  {
    category: "Engineering Tech",
    feature: "Humane Wildlife & Snake Relocation",
    base: false,
    pro: "Basic Sanctuary Trap",
    elite: "Dedicated Wildlife Rescue Unit"
  },
  {
    category: "Engineering Tech",
    feature: "Micro-Pheromone Garden Disruption Network",
    base: false,
    pro: false,
    elite: true
  },

  // Support & Operations
  {
    category: "Support & Operations",
    feature: "Telemetry Portal & Mobile Reports",
    base: "Standard Reports",
    pro: "Live Dashboard",
    elite: "Command Center + API"
  },
  {
    category: "Support & Operations",
    feature: "Assigned Service Personnel",
    base: "Certified Field Technician",
    pro: "Dedicated 24/7 Concierge",
    elite: "Senior Bio-Engineer Assignee"
  }
];

export default function TierComparisonModal({
  isOpen,
  onClose,
  currency,
  onSelectPlan,
}: TierComparisonModalProps) {
  if (!isOpen) return null;

  const basePlan = DEFENSE_PLANS[0]; // Core Perimeter
  const proPlan = DEFENSE_PLANS[1];  // Thermal & Acoustic
  const elitePlan = DEFENSE_PLANS[2]; // Omni-Shield Sovereign

  const formatPrice = (plan: DefensePlan) => {
    return currency === "INR"
      ? `₹${plan.monthlyPriceINR.toLocaleString('en-IN')}`
      : `$${plan.monthlyPriceUSD}`;
  };

  const renderCellContent = (value: string | boolean, isFeatured?: boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="inline-flex items-center space-x-1.5 text-emerald-400 font-semibold text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Included</span>
        </div>
      ) : (
        <div className="inline-flex items-center space-x-1 text-slate-600 text-xs font-mono">
          <Minus className="w-4 h-4 shrink-0" />
          <span>Not Available</span>
        </div>
      );
    }

    return (
      <span className={`text-xs font-medium ${isFeatured ? "text-emerald-300 font-semibold" : "text-slate-300"}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0B0F17] border border-emerald-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[92vh] flex flex-col">
        {/* Header Section */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 shrink-0">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>SIDE-BY-SIDE TECHNICAL MATRIX ({currency})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Compare Protection Tier Specifications
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Granular technical breakdown across Base, Flagship Professional, and Elite Sovereign bio-defense protocols.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-white/10 rounded-full transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="p-2 bg-slate-950/80 border border-white/10 rounded-t-2xl sm:hidden text-center text-[10px] font-mono text-emerald-400">
          ← Scroll sideways to compare all 3 plan tiers →
        </div>
        <div className="overflow-y-auto overflow-x-auto pr-1 flex-1 border border-white/10 rounded-b-2xl sm:rounded-2xl bg-slate-900/60">
          <table className="w-full text-left border-collapse min-w-[580px]">
            {/* Table Header with Plans */}
            <thead className="sticky top-0 z-20 bg-[#0B0F17] shadow-lg border-b border-white/15">
              <tr>
                <th className="py-4 px-5 text-xs font-mono text-slate-400 uppercase tracking-wider w-1/4 bg-[#0B0F17]">
                  Technical Parameter
                </th>
                
                {/* Base Plan Header */}
                <th className="py-4 px-5 text-center w-1/4 bg-[#0B0F17] border-l border-white/10">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-slate-400">Base Protection</span>
                    <h4 className="text-base font-bold text-white">{basePlan.name}</h4>
                    <div className="text-emerald-400 font-mono font-extrabold text-lg">
                      {formatPrice(basePlan)} <span className="text-[10px] text-slate-400 font-normal">/mo</span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectPlan(basePlan);
                        onClose();
                      }}
                      className="mt-2 w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Select Base</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </th>

                {/* Professional (Featured) Header */}
                <th className="py-4 px-5 text-center w-1/4 bg-emerald-950/40 border-x border-emerald-500/40 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[9px] font-mono font-black uppercase tracking-widest">
                    FLAGSHIP RECOMMENDED
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-xs font-mono uppercase text-emerald-400">Professional Tier</span>
                    <h4 className="text-base font-bold text-white">{proPlan.name}</h4>
                    <div className="text-emerald-400 font-mono font-extrabold text-lg">
                      {formatPrice(proPlan)} <span className="text-[10px] text-slate-400 font-normal">/mo</span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectPlan(proPlan);
                        onClose();
                      }}
                      className="mt-2 w-full py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20"
                    >
                      <span>Select Flagship</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </th>

                {/* Elite Header */}
                <th className="py-4 px-5 text-center w-1/4 bg-[#0B0F17]">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-amber-400">Elite Sovereign</span>
                    <h4 className="text-base font-bold text-white">{elitePlan.name}</h4>
                    <div className="text-amber-400 font-mono font-extrabold text-lg">
                      {formatPrice(elitePlan)} <span className="text-[10px] text-slate-400 font-normal">/mo</span>
                    </div>
                    <button
                      onClick={() => {
                        onSelectPlan(elitePlan);
                        onClose();
                      }}
                      className="mt-2 w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Select Elite</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Matrix Body */}
            <tbody className="divide-y divide-white/10 text-xs">
              {TECHNICAL_COMPARISON_MATRIX.map((item, idx) => {
                const isCategoryHeader =
                  idx === 0 ||
                  TECHNICAL_COMPARISON_MATRIX[idx - 1].category !== item.category;

                return (
                  <React.Fragment key={idx}>
                    {isCategoryHeader && (
                      <tr className="bg-slate-950/90 font-mono uppercase text-[10px] tracking-wider text-emerald-400 font-bold border-y border-emerald-500/20">
                        <td colSpan={4} className="py-2 px-5 bg-slate-950/80">
                          {item.category}
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-white border-r border-white/5">
                        {item.feature}
                      </td>
                      <td className="py-3.5 px-5 text-center border-r border-white/5 bg-slate-900/30">
                        {renderCellContent(item.base)}
                      </td>
                      <td className="py-3.5 px-5 text-center border-r border-emerald-500/30 bg-emerald-500/5">
                        {renderCellContent(item.pro, true)}
                      </td>
                      <td className="py-3.5 px-5 text-center bg-slate-900/30">
                        {renderCellContent(item.elite)}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Footer Note & Actions */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 shrink-0">
          <div className="flex items-center space-x-2 text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All tiers include 100% pet-safe bio-polymers and CPCB green certification in Delhi NCR.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Matrix View
          </button>
        </div>
      </div>
    </div>
  );
}
