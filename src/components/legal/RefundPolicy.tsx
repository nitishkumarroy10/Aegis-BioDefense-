import React from "react";
import LegalTemplate, { LegalSection } from "./LegalTemplate";
import { RefreshCw, DollarSign, CheckCircle2, Clock, Mail } from "lucide-react";

interface RefundPolicyProps {
  onOpenContact?: () => void;
}

export default function RefundPolicy({ onOpenContact }: RefundPolicyProps) {
  const sections: LegalSection[] = [
    {
      id: "satisfaction-guarantee",
      title: "100% Bio-Defense Satisfaction & 48-Hr Re-Treatment",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      summary: "If pest activity persists after 48 hours of treatment, Aegis dispatches a senior engineer for 100% free re-treatment.",
      content: (
        <div className="space-y-3">
          <p>
            At <strong>Aegis BioDefense Pvt. Ltd.</strong>, led by CEO <strong>Vikash Kumar Roy</strong>, client satisfaction and complete structural pest elimination are our highest priorities.
          </p>
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 font-mono text-xs space-y-2">
            <strong className="text-white uppercase font-bold block">ZERO-RISK RE-TREATMENT GUARANTEE:</strong>
            <p className="text-slate-200">
              If active pest infestations (cockroaches, termites, rodents, mosquitoes, bed bugs) persist in any treated area after 48 hours following service completion, Aegis will immediately dispatch a field engineer to perform a comprehensive re-inspection and re-treatment at <strong>zero additional charge</strong>.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "amc-cancellation",
      title: "AMC Cancellation & Pro-Rata Refund Window",
      icon: <RefreshCw className="w-4 h-4 text-emerald-400" />,
      summary: "Full refund within 7 days of AMC contract signing if no field dispatch has occurred; pro-rata refund thereafter.",
      content: (
        <div className="space-y-3">
          <p>
            For Clients who purchase Annual Maintenance Contracts (AMCs) or multi-year protection packages:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold block">1. Initial 7-Day Cooling Period</span>
              <p className="text-slate-300">
                You may cancel your AMC for a <strong>100% full refund</strong> within 7 calendar days of signing, provided no initial deep field treatment or drone scan has been performed.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/10 space-y-1">
              <span className="text-amber-400 font-bold block">2. Pro-Rata Cancellation</span>
              <p className="text-slate-300">
                After 7 days or following initial treatment, cancellation requests receive a <strong>pro-rata refund</strong> for remaining unserved quarters, minus standard single-service treatment costs already completed.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "diagnostic-fee-credit",
      title: "Diagnostic & Inspection Fee Policy",
      icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
      summary: "Diagnostic inspection fees are 100% credited toward any defense plan chosen by the property owner.",
      content: (
        <div className="space-y-3">
          <p>
            Standalone rapid response inspection or subterranean radar diagnostic fees (typically ₹499 - ₹1,499 depending on estate acreage in Delhi NCR) cover senior entomologist travel and precision sensor deployment.
          </p>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-500/20 text-xs font-mono text-slate-300">
            <span className="text-emerald-400 font-bold block mb-1 font-mono uppercase">100% FEE CREDIT:</span>
            When you proceed with any Aegis Bio-Defense plan or AMC contract within 14 days of inspection, <strong>100% of the diagnostic inspection fee is credited directly as a discount</strong> against your total plan invoice.
          </div>
        </div>
      )
    },
    {
      id: "processing-method",
      title: "Refund Timelines & Disbursement Method",
      icon: <Clock className="w-4 h-4 text-emerald-400" />,
      summary: "Approved refunds are processed within 3-5 business days directly to the original bank account or UPI.",
      content: (
        <div className="space-y-3">
          <p>
            Once a refund or pro-rata cancellation request is approved by our billing desk:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
            <li>Refunds are processed within <strong>3 to 5 business days</strong>.</li>
            <li>Funds are disbursed back to the original method of payment (UPI, Net Banking, Credit/Debit Card, or NEFT/RTGS).</li>
            <li>A written GST credit note and transaction confirmation certificate is emailed to the client.</li>
          </ul>
        </div>
      )
    },
    {
      id: "how-to-claim",
      title: "How to Submit a Refund or Re-Treatment Request",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      summary: "Contact our 24/7 billing & service desk via hotline +91 93547 31879 or email aegisbiodefence@gmail.com.",
      content: (
        <div className="space-y-3">
          <p>
            To initiate a re-treatment request or formal refund application, please contact our Command Desk:
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-white/10 space-y-2 font-mono text-xs">
            <div className="text-emerald-400 font-bold uppercase">Refund & Re-Treatment Concierge:</div>
            <div className="text-white">Email: <a href="mailto:aegisbiodefence@gmail.com" className="text-emerald-400 underline">aegisbiodefence@gmail.com</a></div>
            <div className="text-white">Hotline: <a href="tel:+919354731879" className="text-amber-300 font-bold hover:underline">+91 93547 31879</a></div>
            <div className="text-slate-400">HQ Address: 230, D-block, Dwarka Sector 8, Delhi - 110077</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <LegalTemplate
      title="Refund & Cancellation Policy"
      subtitle="Transparent 100% Re-Treatment Guarantee & AMC Refund Provisions"
      documentId="AEGIS-LEG-REFUND-2026"
      lastUpdated="July 30, 2026"
      version="2.1.0"
      jurisdiction="Delhi NCR, Republic of India"
      sections={sections}
      content={null}
    />
  );
}
