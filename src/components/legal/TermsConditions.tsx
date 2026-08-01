import React from "react";
import LegalTemplate, { LegalSection } from "./LegalTemplate";
import { ShieldCheck, Scale, FileText, AlertTriangle, Award, Building2 } from "lucide-react";

interface TermsConditionsProps {
  onOpenContact?: () => void;
}

export default function TermsConditions({ onOpenContact }: TermsConditionsProps) {
  const sections: LegalSection[] = [
    {
      id: "service-scope",
      title: "Scope of Bio-Defense & Engineering Services",
      icon: <Building2 className="w-4 h-4 text-emerald-400" />,
      summary: "Governs all architectural bio-defense, pest exclusion, subterranean radar scans, and AMCs provided by Aegis BioDefense Pvt. Ltd.",
      content: (
        <div className="space-y-3">
          <p>
            These Terms of Service and Structural Warranty Agreement ("Terms") constitute a legally binding agreement between the Property Owner or Authorized Representative ("Client") and <strong>Aegis BioDefense Pvt. Ltd.</strong> ("Aegis"), headquartered at 230, D-block, Dwarka Sector 8, Delhi - 110077, under the executive leadership of CEO <strong>Vikash Kumar Roy</strong>.
          </p>
          <p>
            Aegis provides non-toxic bio-physics pest management, subterranean acoustic termite radar barriers, botanical micro-encapsulations, thermal drone inspections, and Annual Maintenance Contracts (AMCs) across Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad, Faridabad, and surrounding Delhi NCR territories.
          </p>
        </div>
      )
    },
    {
      id: "structural-warranty",
      title: "Aegis 5-Year Binding Structural Termite Warranty",
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      summary: "Includes 100% free re-treatments and up to ₹5,00,000 structural repair compensation for subterranean termite damage occurring after shield installation.",
      content: (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-slate-900 p-4 rounded-xl border border-emerald-500/30 space-y-2">
            <h5 className="font-mono text-emerald-400 font-bold text-xs uppercase flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OFFICIAL STRUCTURAL GUARANTEE PROVISION</span>
            </h5>
            <p className="text-xs text-slate-200 leading-relaxed">
              For Clients enrolled in the <strong>Thermal & Acoustic Barrier</strong> or <strong>Sovereign Estate Shield</strong> plans, Aegis issues an official 5-Year Subterranean Termite Structural Protection Certificate.
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <p><strong>1. Free Re-treatment Mandate:</strong> If subterranean termite re-infestation occurs within the warranty period in any treated perimeter, Aegis will deploy field bio-engineers within 24 hours to re-treat the affected zone at zero cost to the Client.</p>
            <p><strong>2. Structural Repair Indemnity:</strong> Subject to annual inspection compliance, Aegis provides up to <strong>₹5,00,000 (Five Lakh Indian Rupees)</strong> in structural repair indemnity for wood/foundational damage caused directly by termite activity initiated post-installation.</p>
            <p><strong>3. Warranty Continuity:</strong> Warranty remains valid upon transfer of property ownership, provided Aegis is notified within 30 days of estate conveyance.</p>
          </div>
        </div>
      )
    },
    {
      id: "client-obligations",
      title: "Property Access & Safety Protocol Compliance",
      icon: <AlertTriangle className="w-4 h-4 text-emerald-400" />,
      summary: "Clients must provide clear perimeter access and observe specified non-entry re-entry windows following deep fogging.",
      content: (
        <div className="space-y-3">
          <p>
            To maintain optimal bio-defense efficiency and zero-hazard safety standards, the Client agrees to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
            <li>Grant Aegis field specialists unimpeded access to foundation walls, plumbing shafts, basements, and garden perimeters.</li>
            <li>Refrain from washing or applying toxic off-the-shelf aerosol chemicals over Aegis botanical bio-barrier zones for at least 14 days post-application.</li>
            <li>Adhere strictly to recommended re-entry times (typically 30-60 minutes for specialized cold-fogging procedures).</li>
          </ul>
        </div>
      )
    },
    {
      id: "pricing-billing",
      title: "Pricing, Currency Conversion & AMC Terms",
      icon: <Scale className="w-4 h-4 text-emerald-400" />,
      summary: "Transparent quotes in INR, USD, AED, and GBP with GST compliance and structured AMC payment schedules.",
      content: (
        <div className="space-y-3">
          <p>
            All service quotes generated through our live quote calculator or command hotline are transparent, inclusive of applicable Goods and Services Tax (GST 18%), and valid for 30 calendar days.
          </p>
          <p className="text-xs text-slate-300">
            Annual Maintenance Contracts (AMCs) include scheduled quarterly preventive inspections and unlimited emergency callouts. AMC payments may be structured in up to 4 interest-free quarterly installments.
          </p>
        </div>
      )
    },
    {
      id: "governing-law",
      title: "Governing Law & New Delhi Exclusive Jurisdiction",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      summary: "This agreement is governed strictly by the laws of India, with exclusive jurisdiction in the Courts of New Delhi.",
      content: (
        <div className="space-y-3">
          <p>
            This agreement shall be governed by, construed, and enforced in accordance with the substantive laws of the Republic of India.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-xs text-slate-300">
            Any legal dispute, arbitration, or proceeding arising out of or relating to services rendered by Aegis BioDefense Pvt. Ltd. shall fall under the <strong>exclusive jurisdiction of the competent courts in New Delhi, India</strong>.
          </div>
        </div>
      )
    }
  ];

  return (
    <LegalTemplate
      title="Terms of Service & Structural Warranty"
      subtitle="Master Architectural Bio-Defense Service Agreement & Warranty Terms"
      documentId="AEGIS-LEG-TERMS-2026"
      lastUpdated="July 30, 2026"
      version="4.2.0"
      jurisdiction="New Delhi, Republic of India"
      sections={sections}
      content={null}
    />
  );
}
