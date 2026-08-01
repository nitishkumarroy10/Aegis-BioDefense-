import React, { useState, useEffect } from "react";
import { X, Shield, Lock, FileText, RefreshCw, Cookie, AlertTriangle, PhoneCall, Mail } from "lucide-react";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import TermsConditions from "./legal/TermsConditions";
import RefundPolicy from "./legal/RefundPolicy";
import CookiePolicy from "./legal/CookiePolicy";
import DisclaimerPolicy from "./legal/DisclaimerPolicy";

export type LegalTab = "privacy" | "terms" | "refund" | "cookie" | "disclaimer";

interface LegalPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
  onOpenBooking?: () => void;
}

export default function LegalPagesModal({
  isOpen,
  onClose,
  initialTab = "privacy",
  onOpenBooking
}: LegalPagesModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0B0F17] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-slate-900/95 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                AEGIS LEGAL & COMPLIANCE PORTAL
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white uppercase font-display">
                Official Legal Documentation & Policies
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 bg-slate-950 border-b border-white/10 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border flex items-center space-x-2 shrink-0 cursor-pointer ${
              activeTab === "privacy"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold shadow-md shadow-emerald-500/10"
                : "bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border flex items-center space-x-2 shrink-0 cursor-pointer ${
              activeTab === "terms"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold shadow-md shadow-emerald-500/10"
                : "bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Warranty</span>
          </button>

          <button
            onClick={() => setActiveTab("refund")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border flex items-center space-x-2 shrink-0 cursor-pointer ${
              activeTab === "refund"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold shadow-md shadow-emerald-500/10"
                : "bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refund & Cancellation</span>
          </button>

          <button
            onClick={() => setActiveTab("cookie")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border flex items-center space-x-2 shrink-0 cursor-pointer ${
              activeTab === "cookie"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold shadow-md shadow-emerald-500/10"
                : "bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie & Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("disclaimer")}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border flex items-center space-x-2 shrink-0 cursor-pointer ${
              activeTab === "disclaimer"
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold shadow-md shadow-emerald-500/10"
                : "bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disclaimer</span>
          </button>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {activeTab === "privacy" && <PrivacyPolicy onOpenContact={onClose} />}
          {activeTab === "terms" && <TermsConditions onOpenContact={onClose} />}
          {activeTab === "refund" && <RefundPolicy onOpenContact={onClose} />}
          {activeTab === "cookie" && <CookiePolicy onOpenContact={onClose} />}
          {activeTab === "disclaimer" && <DisclaimerPolicy />}
        </div>

        {/* Footer Support Quick Callout */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Aegis Legal Desk: Dwarka Sector 8, Delhi NCR</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+919354731879" className="text-emerald-400 hover:underline font-bold flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+91 93547 31879</span>
            </a>
            <a href="mailto:aegisbiodefence@gmail.com" className="text-slate-300 hover:underline flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>aegisbiodefence@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
