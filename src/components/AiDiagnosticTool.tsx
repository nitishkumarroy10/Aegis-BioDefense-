import React, { useState } from "react";
import ProgressiveImage from "./ProgressiveImage";
import ScrollToTopButton from "./ScrollToTopButton";
import { DiagnosisResult } from "../types";
import { Sparkles, Camera, Upload, AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, Loader2, Bug, Zap } from "lucide-react";

interface AiDiagnosticToolProps {
  onDeployWithDiagnosis: (diagnosis: DiagnosisResult) => void;
}

export default function AiDiagnosticTool({ onDeployWithDiagnosis }: AiDiagnosticToolProps) {
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("Residential Estate");
  const [locationZip, setLocationZip] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePrompts = [
    "Faint clicking and scratching noises in attic wall insulation at night",
    "Small mud tubes along subterranean concrete garage foundation",
    "Small reddish-brown oval insects found near bedroom baseboards",
    "Wood dust piles underneath outdoor patio deck beam"
  ];

  const handleDiagnose = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!description.trim() && !imagePreview) {
      setError("Please describe the pest observation or upload a photo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/diagnose-pest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          propertyType,
          locationZip,
          imageBase64: imagePreview,
        }),
      });

      const data = await response.json();

      if (data.success && data.diagnosis) {
        setResult(data.diagnosis);
      } else if (data.fallbackDiagnosis) {
        setResult(data.fallbackDiagnosis);
      } else {
        throw new Error("Unable to analyze bio-sample.");
      }
    } catch (err) {
      console.error(err);
      setError("Diagnostic service timeout. Fallback protocol generated.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-scanner" className="py-24 bg-[#090D16] relative border-t border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-500/10 via-emerald-500/15 to-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI MULTIMODAL PEST DIAGNOSTICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Instant AI Threat & Pest Identification
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Upload a photo or describe pest observations. Our Gemini 3.6 entomology model classifies species, structural risk level, and assigns the appropriate Aegis protocol in seconds.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form Column (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <form onSubmit={handleDiagnose} className="space-y-5">
              {/* Property Type & Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Residential Estate">Residential Estate</option>
                    <option value="Luxury Penthouse">Luxury Penthouse</option>
                    <option value="Commercial HQ">Commercial HQ / Office</option>
                    <option value="Hospitality / Resort">Hospitality / Vineyard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Zip / Metro Code
                  </label>
                  <input
                    type="text"
                    value={locationZip}
                    onChange={(e) => setLocationZip(e.target.value)}
                    placeholder="e.g. 90210"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Text Description Area */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Observed Signs & Symptoms
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe sounds, droppings, wood damage, wings, or activity location..."
                  className="w-full bg-slate-950 border border-white/15 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Sample Quick Prompts */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400">Quick Observation Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDescription(prompt)}
                      className="text-[11px] bg-slate-950/70 border border-white/10 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 px-2.5 py-1 rounded-lg transition-colors text-left"
                    >
                      "{prompt.slice(0, 32)}..."
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload Zone */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Upload Photo Sample (Optional)
                </label>
                <div className="relative border-2 border-dashed border-white/15 rounded-2xl p-4 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {imagePreview ? (
                    <div className="relative flex items-center justify-center space-x-3">
                      <ProgressiveImage
                        src={imagePreview}
                        alt="Pest observation preview"
                        containerClassName="w-16 h-16 rounded-xl border border-emerald-500/50 shrink-0"
                      />
                      <div className="text-left">
                        <span className="text-xs font-semibold text-emerald-400 block">Photo Attached</span>
                        <span className="text-[11px] text-slate-400">Click or drag to replace image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-1 py-2">
                      <Camera className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-xs text-slate-300 font-medium">Click or drag photo of insect, wood damage, or nest</span>
                      <span className="text-[10px] text-slate-500">Supports JPG, PNG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Analyzing Bio-Sample with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-slate-950" />
                    <span>Run AI Threat Analysis</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Diagnostic Results Card (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {result ? (
              <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      AI Diagnostic Assessment Complete
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-2">
                      {result.identifiedThreat}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 italic">
                      {result.scientificName}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        result.threatLevel >= 4
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : result.threatLevel === 3
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      THREAT SEVERITY: {result.threatLevel} / 5
                    </span>
                  </div>
                </div>

                {/* Impact Summary */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Structural Risk Assessment:
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                    {result.structuralImpactSummary}
                  </p>
                </div>

                {/* Recommended Protocol */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase">
                      Recommended Defense Protocol:
                    </span>
                    <p className="text-base font-bold text-white">
                      {result.recommendedAegisProtocol}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-300 px-2.5 py-1 bg-slate-900 rounded-lg border border-white/10">
                    {result.estimatedAegisDefenseCost.timeToDeploy}
                  </span>
                </div>

                {/* Action Steps */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Immediate Action Checklist:
                  </span>
                  <div className="space-y-2">
                    {result.immediateActionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eco Safety */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{result.ecoSafetyGuarantee}</span>
                </div>

                {/* Deploy Button pre-filled */}
                <button
                  onClick={() => onDeployWithDiagnosis(result)}
                  className="w-full py-3.5 bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Deploy {result.recommendedAegisProtocol} Now</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[420px] space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center">
                  <Bug className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Awaiting Bio-Sample Input</h3>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  Fill out the report form on the left or click one of the quick prompts to run an instant AI diagnostic evaluation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scroll To Top Button */}
        <ScrollToTopButton label="Back to Top" />
      </div>
    </section>
  );
}
