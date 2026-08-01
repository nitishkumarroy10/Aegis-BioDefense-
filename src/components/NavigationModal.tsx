import React, { useState, useEffect } from "react";
import { updateMetaTags, resetMetaTags } from "../utils/seoMeta";
import {
  X,
  Shield,
  ShieldAlert,
  Zap,
  Wind,
  Flame,
  Bug,
  Feather,
  Sparkles,
  Building,
  Home,
  CheckCircle2,
  FileText,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  Image as ImageIcon,
  Lock,
  ArrowRight,
  Globe,
  DollarSign
} from "lucide-react";
import {
  SERVICES_LIST,
  INDUSTRIES_LIST,
  BLOG_POSTS,
  GALLERY_ITEMS,
  ServiceDetail,
  IndustryDetail,
  BlogPost
} from "../data/extendedData";

export type NavModalCategory =
  | "service"
  | "industry"
  | "about"
  | "technology"
  | "safety"
  | "careers"
  | "blogs"
  | "knowledge-center"
  | "gallery"
  | "testimonials"
  | "pricing"
  | "faq"
  | "contact"
  | "partner"
  | "franchise"
  | "investors"
  | "media"
  | "privacy"
  | "terms"
  | "cookie";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: NavModalCategory | null;
  selectedItemId?: string;
  onOpenBooking: () => void;
}

export default function NavigationModal({
  isOpen,
  onClose,
  activeCategory,
  selectedItemId,
  onOpenBooking,
}: NavigationModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(selectedItemId || "termite");
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(selectedItemId || "residential");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [franchiseSubmitted, setFranchiseSubmitted] = useState(false);

  useEffect(() => {
    if (selectedItemId && activeCategory === "service") {
      setSelectedServiceId(selectedItemId);
    }
    if (selectedItemId && activeCategory === "industry") {
      setSelectedIndustryId(selectedItemId);
    }
  }, [selectedItemId, activeCategory]);

  useEffect(() => {
    if (!isOpen || !activeCategory) {
      resetMetaTags();
      return;
    }

    if (activeCategory === "service") {
      const srv = SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];
      updateMetaTags({
        title: `${srv.name} | Aegis BioDefense Pest Control Delhi NCR`,
        description: `${srv.tagline}. ${srv.description} Serving Gurgaon, Noida, Delhi NCR.`,
        url: `https://aegis-biodefense.com/?service=${srv.id}`,
      });
    } else if (activeCategory === "industry") {
      const ind = INDUSTRIES_LIST.find((i) => i.id === selectedIndustryId) || INDUSTRIES_LIST[0];
      updateMetaTags({
        title: `${ind.name} Pest Management | Aegis BioDefense Delhi NCR`,
        description: `Specialized ${ind.name} pest defense solution. ${ind.challenge}. Compliance: ${ind.complianceStandard}.`,
        url: `https://aegis-biodefense.com/?industry=${ind.id}`,
      });
    } else {
      updateMetaTags({
        title: `Aegis BioDefense | ${activeCategory.toUpperCase()} - Delhi NCR Bio-Defense`,
        description: `Aegis BioDefense architectural pest engineering and bio-sanitation solutions for residential and commercial estates in Delhi NCR.`,
        url: `https://aegis-biodefense.com/?portal=${activeCategory}`,
      });
    }

    return () => {
      resetMetaTags();
    };
  }, [isOpen, activeCategory, selectedServiceId, selectedIndustryId]);

  if (!isOpen || !activeCategory) return null;

  const currentService = SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];
  const currentIndustry = INDUSTRIES_LIST.find((i) => i.id === selectedIndustryId) || INDUSTRIES_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0B0F17] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center space-x-2.5 sm:space-x-3 pr-2">
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                AEGIS ARCHITECTURAL PORTAL
              </span>
              <h3 className="text-sm sm:text-lg font-bold text-white uppercase font-mono line-clamp-1">
                {activeCategory === "service" && `Specialized Service: ${currentService.name}`}
                {activeCategory === "industry" && `Industry Solution: ${currentIndustry.name}`}
                {activeCategory === "about" && "About Aegis Bio-Defense Systems"}
                {activeCategory === "technology" && "Patented Bio-Shield Technology & Physics"}
                {activeCategory === "safety" && "100% Zero-Toxic Safety & Certifications"}
                {activeCategory === "careers" && "Bio-Engineering Careers & Fellowships"}
                {activeCategory === "blogs" && "Entomology & Bio-Defense Journal"}
                {activeCategory === "knowledge-center" && "Knowledge Base & Prevention Protocols"}
                {activeCategory === "gallery" && "Estate Installation & Thermal Drone Gallery"}
                {activeCategory === "testimonials" && "Verified Estate & Embassy Reviews"}
                {activeCategory === "pricing" && "Transparent Bio-Defense Pricing & Tiers"}
                {activeCategory === "faq" && "Frequently Asked Questions"}
                {activeCategory === "contact" && "24/7 Command Center & Dispatch Hotline"}
                {activeCategory === "partner" && "Architect & Interior Designer Partner Network"}
                {activeCategory === "franchise" && "Aegis Franchise & Expansion Portal"}
                {activeCategory === "investors" && "Investor Relations & ESG Performance"}
                {activeCategory === "media" && "Press Releases & Media Kit"}
                {activeCategory === "privacy" && "Data Privacy Policy"}
                {activeCategory === "terms" && "Terms of Service & Structural Warranty"}
                {activeCategory === "cookie" && "Cookie & Telemetry Policy"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1 text-slate-200">
          {/* 1. SERVICES VIEW */}
          {activeCategory === "service" && (
            <div className="space-y-6">
              {/* Service Tabs */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
                {SERVICES_LIST.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                      selectedServiceId === srv.id
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold"
                        : "bg-slate-900 text-slate-400 border-white/5 hover:text-white"
                    }`}
                  >
                    {srv.name}
                  </button>
                ))}
              </div>

              {/* Active Service Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-5">
                  <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-3">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                      <span>{currentService.category}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{currentService.name}</h2>
                    <p className="text-sm text-emerald-400 font-mono">{currentService.tagline}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{currentService.description}</p>
                  </div>

                  <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Technical Engineering Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentService.techHighlights.map((tech, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs bg-slate-950 p-3 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-6 rounded-2xl space-y-5">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                      Proven Case Study
                    </span>
                    <p className="text-xs text-slate-300 mt-2 italic bg-slate-950 p-3 rounded-xl border border-white/10">
                      "{currentService.caseStudyHighlight}"
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                      Recommended Tiers
                    </span>
                    <div className="space-y-1.5">
                      {currentService.recommendedTiers.map((tier, i) => (
                        <div key={i} className="text-xs font-mono text-white bg-slate-800/80 px-3 py-1.5 rounded-lg border border-white/10">
                          • {tier}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="w-full py-3.5 bg-emerald-400 text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Deploy Service Protection
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. INDUSTRIES VIEW */}
          {activeCategory === "industry" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
                {INDUSTRIES_LIST.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustryId(ind.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                      selectedIndustryId === ind.id
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold"
                        : "bg-slate-900 text-slate-400 border-white/5 hover:text-white"
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-6">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    {currentIndustry.sectorType} Sector Protocol
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">{currentIndustry.name}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-950 p-5 rounded-xl border border-white/5 space-y-2">
                    <h4 className="text-xs font-mono text-red-400 uppercase font-bold">
                      Sector Specific Challenge
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentIndustry.challenge}</p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/20 space-y-2">
                    <h4 className="text-xs font-mono text-emerald-400 uppercase font-bold">
                      Aegis Bio-Defense Solution
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentIndustry.aegisSolution}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10 bg-slate-950/60 p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Compliance Standard</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{currentIndustry.complianceStandard}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Notable Clients / Enclaves</span>
                    <span className="text-xs font-mono text-slate-200">{currentIndustry.keyClients.join(" • ")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ABOUT & BRAND */}
          {activeCategory === "about" && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
                <h2 className="text-2xl font-bold text-white">Engineering Architectural Autonomy</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Founded in 2011 and led by CEO <strong className="text-white font-semibold">Vikash Kumar Roy</strong>, Aegis Bio-Defense was created to replace outdated chemical pest control with advanced bio-physics, ultrasonic acoustic arrays, and non-toxic botanical micro-encapsulations. Under Vikash Kumar Roy's executive leadership, Aegis has protected over 2,840 luxury estates, embassies, and industrial hubs across Delhi NCR.
                </p>
                <div className="p-4 bg-slate-950/80 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Executive Leadership</span>
                    <span className="text-sm font-bold text-white font-mono">Vikash Kumar Roy</span>
                    <span className="text-xs text-slate-400 block font-sans">Chief Executive Officer & Founder, Aegis BioDefense</span>
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-400 font-bold">
                    Direct Line: +91 93547 31879
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-bold font-mono text-emerald-400">2,840+</span>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase mt-1">Estates Protected</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-bold font-mono text-emerald-400">99.8%</span>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase mt-1">Toxin Reduction</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-2xl font-bold font-mono text-emerald-400">&lt; 60 Min</span>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase mt-1">Dispatch Speed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CAREERS */}
          {activeCategory === "careers" && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
                <h2 className="text-2xl font-bold text-white">Join the Aegis Bio-Defense Fellowship</h2>
                <p className="text-sm text-slate-300">
                  We are hiring Senior Entomologists, Acoustic Engineers, Drone Thermal Technicians, and Rapid Field Dispatch Specialists across Delhi NCR, Mumbai, Dubai, and London.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { role: "Senior Entomologist (Subterranean Radar Specialist)", loc: "Gurgaon NCR Hub" },
                    { role: "Acoustic Bio-Physics Field Engineer", loc: "Delhi Diplomatic Sector" },
                    { role: "Drone Thermal Scanner Operator", loc: "NCR & Dubai Airport Base" },
                  ].map((job, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-white/10">
                      <div>
                        <h4 className="text-xs font-bold text-white font-mono">{job.role}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{job.loc}</span>
                      </div>
                      <a href="mailto:aegisbiodefence@gmail.com" className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-lg hover:bg-emerald-500/20">
                        Apply Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. BLOGS & KNOWLEDGE CENTER */}
          {(activeCategory === "blogs" || activeCategory === "knowledge-center") && (
            <div className="space-y-6">
              {activeBlog ? (
                <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl space-y-4">
                  <button onClick={() => setActiveBlog(null)} className="text-xs font-mono text-emerald-400 hover:underline">
                    ← Back to Articles List
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 block">{activeBlog.date} • {activeBlog.readTime}</span>
                  <h2 className="text-2xl font-bold text-white">{activeBlog.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2">{activeBlog.content}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white font-mono">Entomology & Precision Pest Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {BLOG_POSTS.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setActiveBlog(post)}
                        className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all space-y-3"
                      >
                        <span className="text-[10px] font-mono text-emerald-400 uppercase">{post.category}</span>
                        <h4 className="text-sm font-bold text-white leading-snug">{post.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-3">{post.excerpt}</p>
                        <span className="text-[10px] font-mono text-slate-400 block">{post.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. GALLERY */}
          {activeCategory === "gallery" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white font-mono">Estate Field Deployments</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GALLERY_ITEMS.map((g) => (
                  <div key={g.id} className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl space-y-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      {g.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white">{g.title}</h4>
                    <p className="text-xs text-slate-400 font-mono">{g.location}</p>
                    <p className="text-xs text-slate-300">{g.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. PARTNER & FRANCHISE */}
          {activeCategory === "partner" && (
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold text-white">Architect & Interior Designer Partner Program</h2>
              <p className="text-sm text-slate-300">
                Integrate Aegis Sub-Slab Acoustic Radar into blueprints before foundation pour. Offer client projects zero termite infestation guarantees.
              </p>
              {partnerSubmitted ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono">
                  Thank you! Our Architect Partnership Concierge will contact your firm within 2 hours.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPartnerSubmitted(true);
                  }}
                  className="space-y-3 pt-2"
                >
                  <input
                    type="text"
                    required
                    placeholder="Architect Architectural Firm Name"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Contact Email"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button type="submit" className="px-5 py-2.5 bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl uppercase">
                    Submit Partner Registration
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 8. FRANCHISE & INVESTORS */}
          {activeCategory === "franchise" && (
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
              <h2 className="text-2xl font-bold text-white">Aegis Regional Franchise Opportunities</h2>
              <p className="text-sm text-slate-300">
                Bring Aegis Bio-Defense to new tier-1 metro hubs (Mumbai, Bengaluru, Hyderabad, Kolkata, Dubai, Singapore).
              </p>
              {franchiseSubmitted ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono">
                  Franchise dossier request received. Our Expansion Director will schedule a discovery call.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFranchiseSubmitted(true);
                  }}
                  className="space-y-3 pt-2"
                >
                  <input
                    type="text"
                    required
                    placeholder="Target Territory / City"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Investor Name / Company"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                  <button type="submit" className="px-5 py-2.5 bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl uppercase">
                    Request Franchise Prospectus
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 9. LEGAL & TERMS */}
          {(activeCategory === "privacy" || activeCategory === "terms" || activeCategory === "cookie") && (
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white font-mono uppercase">
                {activeCategory === "privacy" && "Aegis Bio-Defense Privacy Policy"}
                {activeCategory === "terms" && "Terms of Service & Structural Warranty"}
                {activeCategory === "cookie" && "Cookie & Telemetry Data Policy"}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {activeCategory === "privacy" && "Aegis Bio-Defense respects estate confidentiality. Telemetry data collected by subterranean sensors and drone scans is encrypted end-to-end and stored in ISO 27001 sovereign servers."}
                {activeCategory === "terms" && "All Aegis Thermal & Acoustic and Sovereign plans include a binding structural repair protection warranty backed by audit for subterranean termite damage occurring after initial shield deployment."}
                {activeCategory === "cookie" && "We utilize essential cookies for currency switching, live binding quote calculations, and AI threat scanner state management."}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    // trigger window dispatch or direct open if needed
                    const event = new CustomEvent("aegis:openLegalModal", { detail: { tab: activeCategory } });
                    window.dispatchEvent(event);
                  }}
                  className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold rounded-xl flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Open Full Dedicated Legal Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Fallback Contact / FAQ / Pricing Modal Content */}
          {(activeCategory === "faq" || activeCategory === "contact" || activeCategory === "pricing" || activeCategory === "investors" || activeCategory === "media" || activeCategory === "safety" || activeCategory === "technology" || activeCategory === "testimonials") && (
            <div className="bg-slate-900/60 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase font-mono">{activeCategory === "contact" ? "Contact Aegis BioDefense" : `${activeCategory} Information Center`}</h2>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">
                  For immediate assistance, quote inquiries, or emergency dispatch in Delhi NCR, connect with our command team:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-1">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">Phone Hotline</span>
                  <a href="tel:+919354731879" className="text-white text-sm font-bold hover:underline block">+91 93547 31879</a>
                  <span className="text-slate-500 text-[10px]">24/7 Rapid Response</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-1">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">Official Email</span>
                  <a href="mailto:aegisbiodefence@gmail.com" className="text-white text-xs font-bold hover:underline block break-all">aegisbiodefence@gmail.com</a>
                  <span className="text-slate-500 text-[10px]">Guaranteed response &lt; 2 hrs</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold block text-[10px] uppercase">Office Address</span>
                  <span className="text-white text-xs font-semibold block leading-tight">230, D-block, Dwarka Sector 8, Delhi - 110077</span>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button onClick={() => { onClose(); onOpenBooking(); }} className="px-6 py-3 bg-emerald-400 text-slate-950 font-bold text-xs uppercase rounded-xl shadow-lg hover:bg-emerald-300 transition-all">
                  Open Emergency Dispatch
                </button>
                <a
                  href="https://wa.me/919354731879?text=Hello%20Aegis%20BioDefense,%20I%20would%20like%20to%20get%20in%20touch."
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-slate-800 border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase rounded-xl hover:bg-slate-700 transition-all"
                >
                  WhatsApp Us (+91 93547 31879)
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
