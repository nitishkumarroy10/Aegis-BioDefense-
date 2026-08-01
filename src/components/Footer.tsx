import React from "react";
import { Shield, Phone, Mail, MapPin, CheckCircle2, Lock, ArrowUpRight } from "lucide-react";
import { NavModalCategory } from "./NavigationModal";

export type LegalTab = "privacy" | "terms" | "refund" | "cookie";

interface FooterProps {
  onScrollToSection?: (id: string) => void;
  onOpenModalCategory?: (cat: NavModalCategory, itemId?: string) => void;
  onOpenLegalModal?: (tab: LegalTab) => void;
}

export default function Footer({ onScrollToSection, onOpenModalCategory, onOpenLegalModal }: FooterProps) {
  const trigger = (cat: NavModalCategory, id?: string) => {
    if (cat === "privacy" || cat === "terms" || cat === "cookie") {
      if (onOpenLegalModal) {
        onOpenLegalModal(cat as LegalTab);
        return;
      }
    }
    if (onOpenModalCategory) {
      onOpenModalCategory(cat, id);
    }
  };

  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-400 to-emerald-600 p-[1.5px] shadow-lg shadow-emerald-500/25">
                <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight font-mono">
                  AEGIS BIODEFENSE
                </span>
                <p className="text-[9px] text-amber-400 font-mono font-semibold">
                  OFFICIAL HQ • DELHI NCR
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Architectural bio-defense and precision pest engineering. Protecting India's finest estates, diplomatic compounds, luxury hospitality, and mission-critical infrastructure with zero toxic residue.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[10px] font-mono text-emerald-400">
                CPCB & EPA GREEN CERTIFIED
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[10px] font-mono text-emerald-400">
                COMPREHENSIVE STRUCTURAL GUARANTEE
              </span>
            </div>

            <div className="pt-2 font-mono text-[11px] text-slate-300 space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-white/10">
              <p className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Command Center & Leadership:</p>
              <div className="text-amber-300 font-semibold text-[11px]">
                CEO & Founder: <span className="text-white font-bold">Vikash Kumar Roy</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919354731879" className="hover:underline font-bold">+91 93547 31879</a>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:aegisbiodefence@gmail.com" className="hover:underline text-slate-300">aegisbiodefence@gmail.com</a>
              </div>
              <div className="flex items-start space-x-2 text-slate-400 pt-1 border-t border-white/5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">230, D-block, Dwarka Sector 8, Delhi - 110077</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-white border-b border-white/10 pb-1">
              Services
            </h4>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li><button onClick={() => trigger("service", "termite")} className="hover:text-emerald-400">Termite Defense</button></li>
              <li><button onClick={() => trigger("service", "mosquito")} className="hover:text-emerald-400">Mosquito Eco-Barrier</button></li>
              <li><button onClick={() => trigger("service", "rodent")} className="hover:text-emerald-400">Rodent Exclusion</button></li>
              <li><button onClick={() => trigger("service", "bed-bugs")} className="hover:text-emerald-400">Bed Bugs Eradication</button></li>
              <li><button onClick={() => trigger("service", "cockroach")} className="hover:text-emerald-400">Cockroach Bio-Gel</button></li>
              <li><button onClick={() => trigger("service", "snake-rescue")} className="hover:text-emerald-400">Snake Rescue</button></li>
              <li><button onClick={() => trigger("service", "bird-control")} className="hover:text-emerald-400">Bird Control</button></li>
              <li><button onClick={() => trigger("service", "disinfection")} className="hover:text-emerald-400">Disinfection</button></li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-white border-b border-white/10 pb-1">
              Industries
            </h4>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li><button onClick={() => trigger("industry", "commercial")} className="hover:text-indigo-300">Commercial HQs</button></li>
              <li><button onClick={() => trigger("industry", "residential")} className="hover:text-indigo-300">Residential Estates</button></li>
              <li><button onClick={() => trigger("industry", "government")} className="hover:text-indigo-300">Government & Embassies</button></li>
              <li><button onClick={() => trigger("industry", "hospital")} className="hover:text-indigo-300">Hospitals & Clinics</button></li>
              <li><button onClick={() => trigger("industry", "hotel")} className="hover:text-indigo-300">Hotels & Resorts</button></li>
              <li><button onClick={() => trigger("industry", "warehouse")} className="hover:text-indigo-300">Warehouses</button></li>
              <li><button onClick={() => trigger("industry", "restaurant")} className="hover:text-indigo-300">Restaurants</button></li>
              <li><button onClick={() => trigger("industry", "school")} className="hover:text-indigo-300">Schools & Universities</button></li>
              <li><button onClick={() => trigger("industry", "factory")} className="hover:text-indigo-300">Factories</button></li>
            </ul>
          </div>

          {/* About & Technology */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-white border-b border-white/10 pb-1">
              About & Knowledge
            </h4>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li><button onClick={() => trigger("about")} className="hover:text-white">About Aegis</button></li>
              <li><button onClick={() => onScrollToSection?.("technology")} className="hover:text-white">Technology & Physics</button></li>
              <li><button onClick={() => trigger("safety")} className="hover:text-white">Safety & Certifications</button></li>
              <li><button onClick={() => trigger("careers")} className="hover:text-white">Careers</button></li>
              <li><button onClick={() => trigger("blogs")} className="hover:text-white">Blogs & Articles</button></li>
              <li><button onClick={() => trigger("knowledge-center")} className="hover:text-white">Knowledge Center</button></li>
              <li><button onClick={() => onScrollToSection?.("case-studies")} className="hover:text-white">Case Studies</button></li>
              <li><button onClick={() => trigger("gallery")} className="hover:text-white">Gallery</button></li>
              <li><button onClick={() => trigger("testimonials")} className="hover:text-white">Testimonials</button></li>
            </ul>
          </div>

          {/* Enterprise & Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-white border-b border-white/10 pb-1">
              Enterprise & Legal
            </h4>
            <ul className="space-y-1.5 text-slate-400 font-mono text-[11px]">
              <li><button onClick={() => onScrollToSection?.("plans")} className="hover:text-white">Pricing & Tiers</button></li>
              <li><button onClick={() => trigger("faq")} className="hover:text-white">FAQ</button></li>
              <li><button onClick={() => trigger("contact")} className="hover:text-white">Contact Us</button></li>
              <li><button onClick={() => trigger("partner")} className="hover:text-white">Partner Program</button></li>
              <li><button onClick={() => trigger("franchise")} className="hover:text-white">Franchise Portal</button></li>
              <li><button onClick={() => trigger("investors")} className="hover:text-white">Investors</button></li>
              <li><button onClick={() => trigger("media")} className="hover:text-white">Media & Press</button></li>
              <li><button onClick={() => trigger("privacy")} className="hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => trigger("terms")} className="hover:text-white">Terms & Warranty</button></li>
              <li><button onClick={() => onOpenLegalModal ? onOpenLegalModal("refund") : trigger("terms")} className="hover:text-white">Refund & Cancellation</button></li>
              <li><button onClick={() => trigger("cookie")} className="hover:text-white">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        {/* SEO Keywords Block */}
        <div className="pt-6 border-t border-white/5 space-y-2 text-[10px] font-mono text-slate-400">
          <p className="text-emerald-400 font-bold uppercase tracking-wider">
            Delhi NCR Pest Control Keywords & Coverage:
          </p>
          <p className="leading-relaxed">
            Best Pest Control Services in Delhi NCR • Termite Control Delhi • Commercial Pest Control • Residential Pest Control • Professional Pest Management • Pest Control Company Delhi NCR • Cockroach Control Delhi • Rodent Control Services Gurugram • Mosquito Control Noida • Bed Bug Treatment Greater Noida • Bird Netting Ghaziabad • Snake Rescue Faridabad • Disinfection Services Sonipat • Annual Maintenance Contracts (AMC)
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Aegis BioDefense Pvt. Ltd. Delhi NCR's Premium Pest Control Company. All rights reserved.</p>
          <div className="flex items-center space-x-3 flex-wrap">
            <button onClick={() => trigger("privacy")} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => trigger("terms")} className="hover:text-slate-300">Structural Warranty</button>
            <span>•</span>
            <button onClick={() => onOpenLegalModal ? onOpenLegalModal("refund") : trigger("terms")} className="hover:text-slate-300">Refund Policy</button>
            <span>•</span>
            <button onClick={() => trigger("cookie")} className="hover:text-slate-300">Cookie Policy</button>
            <span>•</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("aegis:openImageDiagnostics"))}
              className="hover:text-emerald-400 text-emerald-500/80 font-bold"
            >
              Asset Audit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
