import React, { useState, useEffect } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import { DEFENSE_PLANS } from "../data/websiteData";
import { DefensePlan, CurrencyCode } from "../types";
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, Award, Leaf, Building, FileText, CheckCircle2 } from "lucide-react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface CostCalculatorProps {
  currency: CurrencyCode;
  onSelectPlanAndBook: (plan: DefensePlan, sqFt: number, totalMonthly: number) => void;
  preselectedPlanId?: string;
}

// Official Standard Pest Control Benchmark Rates (INR)
const OFFICIAL_PRICE_BENCHMARKS = [
  { service: "General Pest Control (GPC / Cockroach Gel)", single: "₹1,299", amc1yr: "₹2,999", warranty: "1-Yr AMC (3 Visits)", bestFor: "1BHK / 2BHK Apartments" },
  { service: "Termite Control (Gold Seal Drill-Fill-Seal)", single: "₹3,999", amc1yr: "₹5,499", warranty: "1-Yr / 5-Yr Guarantee", bestFor: "Subterranean Slab Protection" },
  { service: "Bed Bug Eradication (BBi - Heat & Spray)", single: "₹2,499", amc1yr: "₹3,499", warranty: "2 Sessions Guarantee", bestFor: "Bedrooms & Mattresses" },
  { service: "Rodent Management (RMM - Bait & Seal)", single: "₹1,999", amc1yr: "₹3,999", warranty: "365-Day Sealing", bestFor: "Kitchens & Server Rooms" },
  { service: "Woodborer Syringe & Spray (WBi)", single: "₹2,199", amc1yr: "₹3,299", warranty: "1-Yr Timber Defense", bestFor: "Wardrobes & Furniture" },
  { service: "Mosquito 360° Misting & Bio-Larvicide", single: "₹1,999", amc1yr: "₹4,999", warranty: "Seasonal Swarm Shield", bestFor: "Lawns & Balconies" },
];

export default function CostCalculator({ currency, onSelectPlanAndBook, preselectedPlanId }: CostCalculatorProps) {
  const [sqFt, setSqFt] = useState<number>(3500);
  const [propertyType, setPropertyType] = useState<string>("estate");
  const [severity, setSeverity] = useState<number>(2); // 1 to 4
  const [selectedPlanId, setSelectedPlanId] = useState<string>("thermal-acoustic");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("gpc");

  useEffect(() => {
    if (preselectedPlanId) {
      setSelectedPlanId(preselectedPlanId);
    }
  }, [preselectedPlanId]);

  const selectedPlan = DEFENSE_PLANS.find((p) => p.id === selectedPlanId) || DEFENSE_PLANS[1];

  // Currency multiplier & symbol mapping
  const getCurrencyDetails = (curr: CurrencyCode) => {
    switch (curr) {
      case "INR":
        return { symbol: "₹", monthlyBase: selectedPlan.monthlyPriceINR, setupBase: selectedPlan.initialSetupPriceINR, suffix: "" };
      case "AED":
        return { symbol: "AED ", monthlyBase: Math.round(selectedPlan.monthlyPriceUSD * 3.67), setupBase: Math.round(selectedPlan.initialSetupPriceUSD * 3.67), suffix: "" };
      case "GBP":
        return { symbol: "£", monthlyBase: Math.round(selectedPlan.monthlyPriceUSD * 0.78), setupBase: Math.round(selectedPlan.initialSetupPriceUSD * 0.78), suffix: "" };
      case "USD":
      default:
        return { symbol: "$", monthlyBase: selectedPlan.monthlyPriceUSD, setupBase: selectedPlan.initialSetupPriceUSD, suffix: "" };
    }
  };

  const currInfo = getCurrencyDetails(currency);

  // Price Calculation Logic
  const sqFtMultiplier = sqFt > 2000 ? 1 + ((sqFt - 2000) / 10000) * 0.4 : 1.0;
  const propertyMultiplier = propertyType === "commercial" ? 1.35 : propertyType === "hospitality" ? 1.4 : 1.0;
  const severityMultiplier = 1 + (severity - 1) * 0.15;

  const adjustedMonthly = Math.round(currInfo.monthlyBase * sqFtMultiplier * propertyMultiplier * severityMultiplier);
  const adjustedSetup = Math.round(currInfo.setupBase * sqFtMultiplier * severityMultiplier);

  const formatPrice = (val: number) => {
    return `${currInfo.symbol}${val.toLocaleString(currency === "INR" ? "en-IN" : "en-US")}`;
  };

  return (
    <section id="calculator" className="py-24 bg-[#05070a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>TRANSPARENT BENCHMARKED PRICING CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            Official Pest Control Rate Card & Quote Estimator
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Transparent standard rate cards for General Pest Control, Termite Gold Seal, Bed Bug, and Rodent AMC services in India ({currency}).
          </p>
        </div>

        {/* Standard Price Reference Table */}
        <div className="mt-10 bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white font-serif flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Official Standard Pest Control Service Rate Card</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Standard single service charges and 1-Year Annual Maintenance Contracts (AMC) in India
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
              100% Guaranteed Rate Match
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase">
                  <th className="py-3 px-3">Service Classification</th>
                  <th className="py-3 px-3">Single Service Rate</th>
                  <th className="py-3 px-3">1-Year AMC Contract</th>
                  <th className="py-3 px-3">Official Warranty</th>
                  <th className="py-3 px-3">Recommended Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {OFFICIAL_PRICE_BENCHMARKS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-white flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item.service}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-400">{item.single}</td>
                    <td className="py-3.5 px-3 font-bold text-teal-300">{item.amc1yr}</td>
                    <td className="py-3.5 px-3 text-slate-300">{item.warranty}</td>
                    <td className="py-3.5 px-3 text-slate-400">{item.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Builder Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            {/* Square Footage Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-slate-300 uppercase">
                  Property Size (Square Footage)
                </label>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {sqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="250"
                value={sqFt}
                onChange={(e) => setSqFt(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>500 sq ft</span>
                <span>5,000 sq ft</span>
                <span>10,000 sq ft</span>
                <span>20,000+ sq ft</span>
              </div>
            </div>

            {/* Property Type Radio Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-300 uppercase">
                Property Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "estate", label: "Residential Farmhouse/Estate" },
                  { id: "penthouse", label: "Urban Penthouse / Triplex" },
                  { id: "commercial", label: "Commercial HQ / Tech Park" },
                  { id: "hospitality", label: "Hospitality / Resort" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPropertyType(item.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                      propertyType === item.id
                        ? "bg-slate-800 border-emerald-500 text-emerald-300 shadow-md"
                        : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Level */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-300 uppercase">
                Current Pest Activity / Urgency Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                {[
                  { level: 1, name: "Preventative Shield" },
                  { level: 2, name: "Minor Sightings" },
                  { level: 3, name: "Active Infestation" },
                  { level: 4, name: "Emergency Wood Damage" },
                ].map((sev) => (
                  <button
                    key={sev.level}
                    onClick={() => setSeverity(sev.level)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      severity === sev.level
                        ? "bg-slate-800 border-emerald-500 text-white shadow-md"
                        : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-[10px] font-mono block text-emerald-400 uppercase">
                      Level 0{sev.level}
                    </span>
                    <span className="text-xs font-semibold block mt-0.5">{sev.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Tier Cards */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono text-slate-300 uppercase">
                Choose Defense Plan Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DEFENSE_PLANS.map((plan) => {
                  const isSelected = plan.id === selectedPlanId;
                  const planPrice = currency === "INR" ? plan.monthlyPriceINR : currency === "AED" ? Math.round(plan.monthlyPriceUSD * 3.67) : currency === "GBP" ? Math.round(plan.monthlyPriceUSD * 0.78) : plan.monthlyPriceUSD;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "bg-slate-800 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20"
                          : "bg-slate-950/60 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div>
                        {plan.badge && (
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                            {plan.badge}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-white">{plan.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <span className="text-lg font-bold font-mono text-white">
                          {currInfo.symbol}{planPrice.toLocaleString(currency === "INR" ? "en-IN" : "en-US")}
                        </span>
                        <span className="text-[10px] text-slate-400"> / mo</span>

                        {/* Trust Indicators */}
                        <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                          <span className="flex items-center space-x-0.5 text-emerald-400">
                            <Award className="w-2.5 h-2.5 shrink-0" />
                            <span>Standard Rate</span>
                          </span>
                          <span className="flex items-center space-x-0.5 text-teal-300">
                            <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
                            <span>NABH</span>
                          </span>
                          <span className="flex items-center space-x-0.5 text-emerald-300">
                            <Leaf className="w-2.5 h-2.5 shrink-0" />
                            <span>Non-Toxic</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Binding Quote Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  Binding Service Quote ({currency})
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {selectedPlan.name}
                </h3>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Price Cards */}
            <div className="bg-slate-950/80 rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400 font-mono">Monthly AMC Equivalent:</span>
                <div className="text-right">
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">
                    {formatPrice(adjustedMonthly)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono"> / mo</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-white/10 text-xs">
                <span className="text-slate-400 font-mono">Initial Inspection & Setup Fee:</span>
                <span className="font-mono font-bold text-slate-200">{formatPrice(adjustedSetup)}</span>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400">Included In Defense Contract:</span>
              <div className="space-y-2">
                {selectedPlan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <button
              onClick={async () => {
                if (auth.currentUser) {
                  try {
                    await addDoc(collection(db, "quotes"), {
                      userId: auth.currentUser.uid,
                      planName: selectedPlan.name,
                      amount: adjustedMonthly,
                      city: "Delhi NCR",
                      sqft: sqFt,
                      createdAt: serverTimestamp(),
                    });
                  } catch (e) {
                    console.warn("Quote firestore save fallback:", e);
                  }
                }
                onSelectPlanAndBook(selectedPlan, sqFt, adjustedMonthly);
              }}
              className="w-full py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Lock Guaranteed Rate Quote</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Scroll To Top Button */}
        <ScrollToTopButton label="Back to Top" />
      </div>
    </section>
  );
}
