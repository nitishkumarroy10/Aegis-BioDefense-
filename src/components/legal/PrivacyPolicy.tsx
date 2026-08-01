import React from "react";
import LegalTemplate, { LegalSection } from "./LegalTemplate";
import { Shield, Lock, Database, UserCheck, FileCheck } from "lucide-react";

interface PrivacyPolicyProps {
  onOpenContact?: () => void;
}

export default function PrivacyPolicy({ onOpenContact }: PrivacyPolicyProps) {
  const sections: LegalSection[] = [
    {
      id: "scope-controller",
      title: "Scope & Data Controller Identity",
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      summary: "Aegis BioDefense Pvt. Ltd. is the sole Data Controller under India's Digital Personal Data Protection (DPDP) Act 2023.",
      content: (
        <div className="space-y-3">
          <p>
            This Data Privacy Policy governs how <strong>Aegis BioDefense Pvt. Ltd.</strong> ("Aegis", "We", "Us", "Our"), under the executive leadership of CEO <strong>Vikash Kumar Roy</strong>, collects, processes, stores, and protects personal and estate data across our web application, acoustic sensor network, live quote calculators, and field technician dispatch portals.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
            <h5 className="font-mono text-emerald-400 text-xs font-bold uppercase">Official Data Controller Information:</h5>
            <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-xs">
              <li><strong>Entity:</strong> Aegis BioDefense Pvt. Ltd.</li>
              <li><strong>Headquarters:</strong> 230, D-block, Dwarka Sector 8, Delhi - 110077, Republic of India</li>
              <li><strong>Executive Lead:</strong> Vikash Kumar Roy (CEO & Founder)</li>
              <li><strong>Official Privacy Hotline:</strong> +91 93547 31879</li>
              <li><strong>Privacy Officer Email:</strong> aegisbiodefence@gmail.com</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "data-collection",
      title: "Categories of Data We Collect",
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      summary: "We collect property diagnostic logs, contact information, live quote inputs, and authenticated Google OAuth profiles.",
      content: (
        <div className="space-y-3">
          <p>
            To deliver architectural bio-defense, sub-slab acoustic thermal scans, and rapid field dispatch across Delhi NCR, we collect the following categories of data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white text-xs font-mono font-bold block">1. Estate Diagnostic Telemetry</strong>
              <p className="text-xs text-slate-400">
                Property square footage, structure age, pest infestation history, subterranean moisture levels, and thermal drone scan coordinates.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white text-xs font-mono font-bold block">2. Personal & Contact Information</strong>
              <p className="text-xs text-slate-400">
                Full name, estate address, phone number, email address, preferred dispatch time, and communication logs.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white text-xs font-mono font-bold block">3. Authentication Profiles</strong>
              <p className="text-xs text-slate-400">
                Google OAuth profile information (display name, email, profile image URL) managed securely via Firebase Auth.
              </p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white text-xs font-mono font-bold block">4. Application & Device Metrics</strong>
              <p className="text-xs text-slate-400">
                Browser type, IP address, currency preferences, page load metrics, and active session cookies.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "dpdp-compliance",
      title: "Purpose of Processing & DPDP Act Compliance",
      icon: <FileCheck className="w-4 h-4 text-emerald-400" />,
      summary: "All data processing strictly adheres to India's DPDP Act 2023 for legitimate service fulfillment.",
      content: (
        <div className="space-y-3">
          <p>
            Aegis processes data strictly on legal grounds under the Digital Personal Data Protection (DPDP) Act 2023 of India for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
            <li>Dispatching rapid field technicians and pest bio-engineers to verified estate addresses.</li>
            <li>Issuing legally binding 5-Year Structural Termite Warranty Certificates and Annual Maintenance Contracts (AMCs).</li>
            <li>Powering AI pest threat diagnostic assistants and live cost calculation engines.</li>
            <li>Transmitting real-time GPS technician tracking and service completion certificates.</li>
          </ul>
        </div>
      )
    },
    {
      id: "security-storage",
      title: "ISO 27001 Sovereign Security & No Third-Party Sale",
      icon: <Lock className="w-4 h-4 text-emerald-400" />,
      summary: "Your property data is stored on ISO 27001 sovereign servers and is NEVER sold or shared for marketing.",
      content: (
        <div className="space-y-3">
          <p>
            Aegis enforces enterprise-grade security controls. All property maps, architectural blueprints, and client records are encrypted in transit via TLS 1.3 and at rest via AES-256 on ISO 27001 sovereign cloud infrastructure located in India.
          </p>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-xs">
            <strong>ZERO DATA MONETISATION GUARANTEE:</strong> Aegis BioDefense Pvt. Ltd. never sells, rents, leases, or trades client personal information, property addresses, or diplomatic compound telemetry to third-party advertisers or brokers under any circumstances.
          </div>
        </div>
      )
    },
    {
      id: "user-rights",
      title: "Property Owner Rights & Deletion Requests",
      icon: <UserCheck className="w-4 h-4 text-emerald-400" />,
      summary: "You hold absolute rights to inspect, export, correct, or request complete deletion of your data within 24 hours.",
      content: (
        <div className="space-y-3">
          <p>
            As a property owner or client of Aegis BioDefense, you hold the following explicit rights under Indian law:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">• Right to Access & Export</span>
              <span className="text-slate-400">Receive a complete PDF/CSV report of all diagnostic logs associated with your estate.</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/10">
              <span className="text-amber-400 font-bold block mb-1">• Right to Complete Erasure</span>
              <span className="text-slate-400">Request permanent purge of address and contact records upon service contract completion.</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            To exercise your rights, email our Privacy Desk at <a href="mailto:aegisbiodefence@gmail.com" className="text-emerald-400 underline">aegisbiodefence@gmail.com</a> or call +91 93547 31879. Erasure requests are processed within 24 business hours.
          </p>
        </div>
      )
    }
  ];

  return (
    <LegalTemplate
      title="Data Privacy & Protection Policy"
      subtitle="Architectural Estate Confidentiality & Sovereign Data Protection Framework"
      documentId="AEGIS-LEG-PRIV-2026"
      lastUpdated="July 30, 2026"
      version="3.4.0"
      jurisdiction="Delhi NCR, Republic of India (DPDP Act 2023)"
      sections={sections}
      content={null}
    />
  );
}
