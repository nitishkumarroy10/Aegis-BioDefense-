import React from "react";
import LegalTemplate, { LegalSection } from "./LegalTemplate";
import { Cookie, Settings, ShieldCheck } from "lucide-react";

interface CookiePolicyProps {
  onOpenContact?: () => void;
}

export default function CookiePolicy({ onOpenContact }: CookiePolicyProps) {
  const sections: LegalSection[] = [
    {
      id: "cookie-overview",
      title: "Overview of Cookies & Session Telemetry",
      icon: <Cookie className="w-4 h-4 text-emerald-400" />,
      summary: "We use essential session tokens and performance cookies to power live quote calculations and currency selectors.",
      content: (
        <div className="space-y-3">
          <p>
            This Cookie & Telemetry Data Policy explains how <strong>Aegis BioDefense Pvt. Ltd.</strong> ("Aegis", "We", "Us") uses small data files ("cookies") and local storage tokens to provide a seamless, high-performance web experience across Delhi NCR and international markets.
          </p>
          <p className="text-xs text-slate-300">
            Cookies allow our site to remember your selected currency (INR, USD, AED, GBP), active diagnostic quote inputs, and authenticated Google user session state.
          </p>
        </div>
      )
    },
    {
      id: "cookie-categories",
      title: "Categories of Cookies We Employ",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      summary: "Strictly essential cookies, functional preference cookies, and performance optimization telemetry.",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
              <strong className="text-emerald-400 block font-bold">1. Strictly Essential</strong>
              <p className="text-slate-400">
                Required for core authentication via Firebase and dispatch booking modal states.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
              <strong className="text-amber-400 block font-bold">2. Preferences & State</strong>
              <p className="text-slate-400">
                Stores selected currency (INR/USD/AED/GBP) and property square footage inputs.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
              <strong className="text-indigo-300 block font-bold">3. Performance Telemetry</strong>
              <p className="text-slate-400">
                Anonymized load time and Largest Contentful Paint (LCP) performance metrics.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "managing-cookies",
      title: "Managing & Disabling Browser Cookies",
      icon: <Settings className="w-4 h-4 text-emerald-400" />,
      summary: "You can control or clear cookies in your browser settings at any time.",
      content: (
        <div className="space-y-3">
          <p>
            Most modern web browsers allow you to manage or block cookies through their settings menu. However, disabling essential cookies may impact the operation of our live cost calculator or Google Sign-In authentication.
          </p>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-white/5 font-mono text-xs text-slate-300">
            To opt-out or adjust settings in Chrome, Safari, Firefox, or Edge, visit your browser's Privacy & Security preferences.
          </div>
        </div>
      )
    }
  ];

  return (
    <LegalTemplate
      title="Cookie & Telemetry Policy"
      subtitle="Transparent Session Tracking & Browser Storage Framework"
      documentId="AEGIS-LEG-COOKIE-2026"
      lastUpdated="July 30, 2026"
      version="1.8.0"
      jurisdiction="Delhi NCR, Republic of India"
      sections={sections}
      content={null}
    />
  );
}
