import React, { useState } from "react";
import { Shield, Printer, Copy, Check, Clock, FileText, ChevronRight, AlertCircle, Award } from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  summary?: string;
  content: React.ReactNode;
}

export interface LegalTemplateProps {
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
  subtitle?: string;
  documentId?: string;
  version?: string;
  jurisdiction?: string;
  sections?: LegalSection[];
}

export default function LegalTemplate({
  title,
  lastUpdated,
  content,
  subtitle = "Official Governance & Compliance Document",
  documentId = "AEGIS-GOV-2026",
  version = "3.2.0",
  jurisdiction = "Delhi NCR, Republic of India",
  sections
}: LegalTemplateProps) {
  const [copied, setCopied] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(sections && sections[0] ? sections[0].id : "");

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 text-slate-200 font-sans">
      {/* Header Glass Panel Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 space-y-5 border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>OFFICIAL AEGIS LEGAL SPECIFICATION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {title}
            </h1>
            {subtitle && <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">{subtitle}</p>}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-white/15 text-slate-300 hover:text-white rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Copy page reference"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase block">Document Ref ID</span>
            <span className="text-white font-bold">{documentId}</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase block">Last Updated</span>
            <span className="text-emerald-400 font-bold">{lastUpdated}</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase block">Version</span>
            <span className="text-amber-400 font-bold">v{version}</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase block">Jurisdiction</span>
            <span className="text-slate-300 font-bold truncate block">{jurisdiction}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      {sections && sections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Section TOC Sidebar */}
          <div className="md:col-span-1 space-y-3 sticky top-4">
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3 space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
              <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
                Document Sections ({sections.length})
              </div>
              {sections.map((sec, i) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between group ${
                    activeSectionId === sec.id
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span className="truncate pr-1">
                    {i + 1}. {sec.title}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${activeSectionId === sec.id ? "rotate-90 text-emerald-400" : "text-slate-600 group-hover:text-slate-400"}`} />
                </a>
              ))}
            </div>

            {/* Support Callout */}
            <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Legal & Compliance Support</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                For formal inquiry regarding structural warranty certificates or data protection:
              </p>
              <div className="pt-1 space-y-1 font-mono text-[11px]">
                <a href="mailto:aegisbiodefence@gmail.com" className="text-emerald-400 hover:underline block truncate">
                  aegisbiodefence@gmail.com
                </a>
                <a href="tel:+919354731879" className="text-amber-300 font-bold hover:underline block">
                  +91 93547 31879
                </a>
              </div>
            </div>
          </div>

          {/* Main Document Body */}
          <div className="md:col-span-3 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
              {sections.map((sec, idx) => (
                <section
                  id={sec.id}
                  key={sec.id}
                  className="bg-slate-950/60 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-white/20 transition-all scroll-mt-20"
                >
                  <div className="flex items-start justify-between border-b border-white/10 pb-3 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
                        {sec.icon || <FileText className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                          SECTION {idx + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-display">
                          {sec.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {sec.summary && (
                    <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/20 text-xs text-emerald-300 font-mono flex items-start space-x-2">
                      <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white uppercase text-[10px] block">Key Takeaway:</strong>
                        <span>{sec.summary}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                    {sec.content}
                  </div>
                </section>
              ))}
            </div>

            {/* General Policy Content Wrapper if provided */}
            {content && (
              <div className="glass-panel rounded-2xl p-6 sm:p-8 text-xs sm:text-sm leading-relaxed text-slate-300">
                {content}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 text-xs sm:text-sm leading-relaxed text-slate-300 space-y-4">
          {content}
        </div>
      )}
    </div>
  );
}
