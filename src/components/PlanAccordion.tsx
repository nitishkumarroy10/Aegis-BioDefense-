import React, { useState } from "react";
import { DefensePlan } from "../types";
import { generatePlanPdf } from "../utils/pdfGenerator";
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  Clock,
  ShieldCheck,
  Check,
  Calendar,
  Award,
  Zap,
  ShieldAlert,
  Sparkles,
  FileDown,
  HelpCircle,
  CheckCircle2
} from "lucide-react";

interface PlanAccordionProps {
  plan: DefensePlan;
  prices?: { monthly: string; setup: string };
}

export default function PlanAccordion({ plan, prices }: PlanAccordionProps) {
  // Default first section ('tech') open
  const [openSection, setOpenSection] = useState<"tech" | "frequency" | "warranty" | null>("tech");
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleSection = (section: "tech" | "frequency" | "warranty") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      await generatePlanPdf(plan, prices);
    } catch (err) {
      console.error("Failed to generate PDF brochure", err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  // Helper for 'Why this plan?' highlight bar data
  const getWhyThisPlanDetails = () => {
    if (plan.id === "omni-sovereign") {
      return {
        badgeText: "10-Yr Guarantee • < 60 Min SLA",
        headline: "Comprehensive Structural Guarantee & VIP Priority Dispatch",
        description: "Built for luxury estates, embassies & commercial facilities requiring aerial drone scans, dedicated bio-engineers & wildlife sanctuary transfer.",
        metricTag: "Structural Guarantee"
      };
    } else if (plan.id === "thermal-acoustic") {
      return {
        badgeText: "Zero-Drill Acoustic Radar",
        headline: "Sub-Slab Acoustic Radar & Ultrasonic Wave Barrier",
        description: "Eradicates hidden subterranean termites & wood-borers using non-invasive acoustic sensors and 100% non-toxic botanical micro-encapsulation.",
        metricTag: "Zero-Infestation Guarantee"
      };
    } else {
      return {
        badgeText: "100% Money-Back • < 24 Hr SLA",
        headline: "Eco-Friendly Perimeter Defense & Pet-Safe Barrier",
        description: "Ideal for family residences requiring smart perimeter surveillance, 100% child-safe botanical sprays, and free emergency re-services.",
        metricTag: "100% Money-Back"
      };
    }
  };

  const whyPlan = getWhyThisPlanDetails();

  // Build structured data based on plan details
  const getFrequencyItems = () => {
    if (plan.id === "omni-sovereign") {
      return [
        { label: "Audit Schedule", val: "Monthly On-Site Audits + 24/7 Live Telemetry" },
        { label: "Emergency SLA", val: "Guaranteed < 60 Minute Rapid Field Dispatch" },
        { label: "Drone Scans", val: "Quarterly Aerial Infrared Thermal Roof & Wall Audits" },
        { label: "Priority Queue", val: "VIP Level 1 Command Center Priority SLA" }
      ];
    } else if (plan.id === "thermal-acoustic") {
      return [
        { label: "Audit Schedule", val: "Bi-Monthly In-Depth Bio-Defense Audits" },
        { label: "Emergency SLA", val: "Priority Same-Day Dispatch (< 4 Hours Guaranteed)" },
        { label: "Radar Checks", val: "Bi-Monthly Subterranean Acoustic Radar Logs" },
        { label: "Concierge", val: "24/7 Direct Concierge Bio-Engineer Access" }
      ];
    } else {
      return [
        { label: "Audit Schedule", val: "Quarterly Comprehensive Inspections + On-Demand" },
        { label: "Emergency SLA", val: "Guaranteed < 24 Hour Response Queue in Delhi NCR" },
        { label: "Sensor Audits", val: "Quarterly Smart Perimeter Station Battery & Logs" },
        { label: "Re-service", val: "Free Unlimited Emergency Re-Treatments" }
      ];
    }
  };

  const getWarrantyItems = () => {
    if (plan.id === "omni-sovereign") {
      return [
        { title: "Comprehensive Structural Guarantee", desc: "Comprehensive structural repair financial guarantee against termite or wood-borer destruction." },
        { title: "Zero Impact Organic Standard", desc: "100% Non-toxic, CPCB embassy-grade botanical micro-encapsulation safe for rare flora & pets." },
        { title: "Wildlife Protection SLA", desc: "Humane trapping, veterinary check & sanctuary relocation for snakes and wild fauna." }
      ];
    } else if (plan.id === "thermal-acoustic") {
      return [
        { title: "Zero-Infestation Guarantee", desc: "Full refund or continuous treatment until 100% pest eradication is confirmed." },
        { title: "100% Zero-Chemical Residue", desc: "Non-staining, odor-free botanical micro-encapsulation safe for children & pets." },
        { title: "Sub-Slab Termite Protection", desc: "5-Year full warranty covering subterranean acoustic barrier integrity." }
      ];
    } else {
      return [
        { title: "100% Money-Back Guarantee", desc: "If pests return between scheduled quarterly visits, we re-treat at zero additional cost." },
        { title: "CPCB & EPA Green Certified", desc: "Eco-friendly, eco-barrier formula engineered for indoor & outdoor perimeter safety." },
        { title: "3-Year Foundation Warranty", desc: "Covering perimeter barrier integrity and tamper-proof sensor stations." }
      ];
    }
  };

  const frequencyItems = getFrequencyItems();
  const warrantyItems = getWarrantyItems();

  return (
    <div className="space-y-3 pt-2 border-t border-white/10 font-sans">
      {/* 'WHY THIS PLAN?' HIGHLIGHT BAR */}
      <div className="rounded-2xl p-3.5 bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-xl shadow-emerald-500/10 space-y-2 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-xl rounded-full pointer-events-none" />

        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>WHY THIS PLAN?</span>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-300 bg-slate-900/90 px-2.5 py-0.5 rounded-md border border-white/10 flex items-center space-x-1">
            <Award className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{whyPlan.metricTag}</span>
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-bold text-white font-sans flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{whyPlan.headline}</span>
          </h4>
          <p className="text-[11px] text-slate-300 leading-snug font-sans">
            {whyPlan.description}
          </p>
        </div>
      </div>

      {/* SECTION 1: Tech Features */}
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => toggleSection("tech")}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors group cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <div className={`p-1.5 rounded-lg border transition-colors ${openSection === "tech" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-slate-900 border-white/10 text-slate-400 group-hover:text-white"}`}>
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                Tech Features
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {plan.features.length} Precision Protocols
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Active
            </span>
            {openSection === "tech" ? (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white" />
            )}
          </div>
        </button>

        {openSection === "tech" && (
          <div className="px-4 pb-4 pt-1 space-y-2 border-t border-white/5 bg-slate-950/40">
            {plan.features.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: Service Frequency */}
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => toggleSection("frequency")}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors group cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <div className={`p-1.5 rounded-lg border transition-colors ${openSection === "frequency" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-slate-900 border-white/10 text-slate-400 group-hover:text-white"}`}>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                Service Frequency & SLA
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {plan.specs.inspectionFreq}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {plan.specs.responseTime}
            </span>
            {openSection === "frequency" ? (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white" />
            )}
          </div>
        </button>

        {openSection === "frequency" && (
          <div className="px-4 pb-4 pt-2 space-y-2.5 border-t border-white/5 bg-slate-950/40">
            {frequencyItems.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between text-xs space-x-2">
                <span className="text-slate-400 font-mono text-[11px] shrink-0">{item.label}:</span>
                <span className="text-white font-mono text-[11px] font-semibold text-right">{item.val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: Warranty Details */}
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 overflow-hidden transition-all duration-200">
        <button
          type="button"
          onClick={() => toggleSection("warranty")}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors group cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <div className={`p-1.5 rounded-lg border transition-colors ${openSection === "warranty" ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-slate-900 border-white/10 text-slate-400 group-hover:text-white"}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block">
                Warranty & Guarantees
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {plan.specs.warranty}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-teal-400 font-semibold px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              Verified
            </span>
            {openSection === "warranty" ? (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white" />
            )}
          </div>
        </button>

        {openSection === "warranty" && (
          <div className="px-4 pb-4 pt-2 space-y-3 border-t border-white/5 bg-slate-950/40">
            {warrantyItems.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-300 pl-5 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Download PDF Brochure Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/5 group cursor-pointer"
        >
          <FileDown className={`w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform ${isDownloading ? "animate-bounce" : ""}`} />
          <span>{isDownloading ? "Generating PDF Brochure..." : "Download PDF Brochure"}</span>
        </button>
      </div>
    </div>
  );
}

