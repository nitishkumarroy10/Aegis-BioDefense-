import React, { useState, useEffect } from "react";
import { Shield, Sparkles, Play, ArrowRight, ShieldAlert, X, Volume2, VolumeX, Activity, CheckCircle2, Zap } from "lucide-react";

import heroStaticEstate from "../assets/images/hero_estate_banner_1785567022136.jpg";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToSection: (id: string) => void;
}

export default function HeroSection({ onOpenBooking, onScrollToSection }: HeroSectionProps) {
  const [brandFilmOpen, setBrandFilmOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const existingLink = document.querySelector(`link[href="${heroStaticEstate}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroStaticEstate;
    (link as any).fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-36 overflow-visible bg-[#05070a] select-none max-w-full"
    >
      {/* Static Luxury Hero Image with Subtle Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-visible pointer-events-none select-none">
        <img
          src={heroStaticEstate}
          alt="Aegis BioDefense Luxury Estate & Property Protection Environment"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 brightness-[0.9] contrast-[1.05]"
        />
        {/* Deep Matte Overlay (#05070a) for high-contrast readability */}
        <div className="absolute inset-0 bg-[#05070a]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/50 via-transparent to-[#05070a]/80 pointer-events-none" />
      </div>

      {/* Radial Dark Gradient Overlay behind text for enhanced readability */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl h-[70%] bg-[#05070a]/30 blur-2xl rounded-full pointer-events-none z-0" />

      {/* Soft Emerald Radial Glow & Subtle Blueprint Grid Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] h-[350px] sm:h-[500px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_60%,transparent_100%)] opacity-25 pointer-events-none z-0" />

      {/* Main Hero Content Container */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full"
      >
        {/* Minimal Tesla/Apple Style Badge */}
        <div
          className="inline-flex items-center space-x-2 px-3.5 sm:px-5 py-2 rounded-full bg-slate-900/95 border border-emerald-500/50 text-emerald-400 text-xs font-mono shadow-2xl backdrop-blur-2xl mb-4 sm:mb-8 group hover:border-emerald-500/80 transition-all cursor-pointer max-w-full"
          onClick={onOpenBooking}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="tracking-widest uppercase font-extrabold text-[9px] sm:text-[11px] md:text-xs truncate max-w-[280px] sm:max-w-none">
            PREMIUM PEST CONTROL & BIO-DEFENSE SERVICES • DELHI NCR'S #1 PEST CONTROL COMPANY
          </span>
        </div>

        {/* SEO Eyebrow */}
        <div className="text-emerald-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3 font-semibold drop-shadow-md">
          Professional Pest Management & Eco-Safe Bio-Defense
        </div>

        {/* Huge Tesla-style Headline */}
        <h1 className="text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[0.98] max-w-5xl mx-auto font-sans break-words px-1 drop-shadow-2xl">
          Protecting Every Space.
          <span className="block mt-1 sm:mt-3 bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-2xl">
            Pest-Free. Perfectly.
          </span>
        </h1>

        {/* Sub headline: Science. Technology. Trust. */}
        <div className="mt-4 sm:mt-8 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-sm sm:text-xl md:text-2xl font-mono tracking-widest text-slate-200 font-light uppercase drop-shadow-lg">
            <span className="text-emerald-400 font-semibold">Science.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 hidden sm:inline-block" />
            <span className="text-teal-300 font-semibold">Technology.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60 hidden sm:inline-block" />
            <span className="text-indigo-300 font-semibold">Trust.</span>
          </div>
          <p className="mt-2.5 sm:mt-4 text-slate-200 text-xs sm:text-base font-normal leading-relaxed px-1 sm:px-2 drop-shadow-md">
            The <strong className="text-white font-semibold">Best Pest Control Services in Delhi NCR</strong>. Engineered for zero toxic smell or chemicals. Subterranean acoustic radar and micro-encapsulated botanical barriers for luxury residences, commercial offices, hotels, and industrial sites.
          </p>
        </div>

        {/* CTAs: Book Inspection, Emergency Service, Play Brand Film */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto px-2">
          {/* Primary CTA: Book Inspection (Visual Focus) */}
          <button
            onClick={() => onScrollToSection("calculator")}
            className="w-full sm:w-auto px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-mono text-xs uppercase font-extrabold tracking-wider shadow-2xl shadow-emerald-500/35 hover:shadow-emerald-500/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 border border-emerald-200/60 cursor-pointer min-h-[48px]"
          >
            <span>Book Inspection</span>
            <ArrowRight className="w-4.5 h-4.5 text-slate-950" />
          </button>

          {/* Secondary CTA: Emergency Service (Visually Distinct Amber Shield) */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:bg-slate-800 hover:border-amber-400 font-mono text-xs uppercase font-bold tracking-wider shadow-xl backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer min-h-[48px]"
          >
            <ShieldAlert className="w-4.5 h-4.5 text-amber-400" />
            <span>Emergency Service</span>
          </button>

          {/* Brand Film CTA: Play Brand Film */}
          <button
            onClick={() => setBrandFilmOpen(true)}
            className="w-full sm:w-auto px-6 sm:px-7 py-4 rounded-2xl bg-white/10 border border-white/20 text-slate-100 hover:bg-white/20 hover:text-white font-mono text-xs uppercase font-bold tracking-wider backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer min-h-[48px]"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 fill-emerald-400 ml-0.5" />
            </div>
            <span>Play Brand Film</span>
          </button>
        </div>

        {/* Minimal Glass Bar - Zero Clutter Telemetry */}
        <div className="mt-10 sm:mt-16 max-w-4xl mx-auto rounded-2xl bg-slate-900/60 sm:bg-slate-900/40 border border-white/10 p-3.5 sm:p-4 shadow-2xl backdrop-blur-2xl grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-slate-300">
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
            <span>2,840+ ESTATES SECURED</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>CPCB & EPA GREEN CERTIFIED</span>
          </div>

          <div className="flex items-center justify-center sm:justify-end space-x-2 text-emerald-400 font-bold">
            <Zap className="w-4 h-4 shrink-0" />
            <span>FULL DAMAGE WARRANTY</span>
          </div>
        </div>

        {/* Short Service Line Marquee / Badge */}
        <div className="mt-6 max-w-4xl mx-auto py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] sm:text-xs font-mono font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="text-white font-bold uppercase tracking-wider text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
            Core Pest Services:
          </span>
          <span>Termite</span>
          <span className="text-emerald-500">•</span>
          <span>Cockroach</span>
          <span className="text-emerald-500">•</span>
          <span>Rodent</span>
          <span className="text-emerald-500">•</span>
          <span>Mosquito</span>
          <span className="text-emerald-500">•</span>
          <span>Bed Bugs</span>
          <span className="text-emerald-500">•</span>
          <span>Ants</span>
          <span className="text-emerald-500">•</span>
          <span>Bird Control</span>
          <span className="text-emerald-500">•</span>
          <span>Snake Rescue</span>
          <span className="text-emerald-500">•</span>
          <span className="text-amber-400 font-bold">Commercial Pest Management</span>
        </div>

        {/* Coverage Areas Tagline */}
        <p className="mt-3 text-[11px] font-mono text-slate-400">
          <span className="text-slate-300 font-semibold">Service Coverage:</span> Delhi • New Delhi • Gurugram • Noida • Greater Noida • Ghaziabad • Faridabad • Sonipat • Bahadurgarh • Entire Delhi NCR
        </p>
      </div>

      {/* Cinematic Brand Film Modal */}
      {brandFilmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-[#0B0F17] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto space-y-4 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                    AEGIS BRAND FILM & CINEMATIC SHOWCASE
                  </span>
                  <h3 className="text-lg font-bold text-white font-mono">
                    Protecting Every Space. Perfectly.
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setBrandFilmOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated 4K Cinematic Video Player Showcase */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group flex items-center justify-center">
              {/* Dynamic Animated Radar Wave Canvas for Film */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-emerald-500/40 animate-ping absolute" />
                  <div className="w-16 h-16 rounded-full border border-teal-400/60 animate-pulse absolute" />
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                    <Play className="w-6 h-6 text-emerald-400 fill-emerald-400 ml-1" />
                  </div>
                </div>

                <div className="space-y-2 max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                    4K ULTRA-HD BIO-DEFENSE CINEMATIC
                  </span>
                  <h4 className="text-xl font-extrabold text-white font-mono">
                    Acoustic Radar & Botanical Micro-Encapsulation
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Demonstrating zero-drill subterranean termite elimination on imported marble at DLF Golf Course Road Penthouse.
                  </p>
                </div>

                {/* Simulated Audio Wave Visualizer */}
                <div className="flex items-center space-x-1.5 h-8">
                  {[40, 75, 25, 90, 50, 80, 30, 95, 60, 85, 45, 70, 35].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-emerald-500 to-teal-300 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Video HUD Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-slate-900/90 border border-white/10 rounded-xl backdrop-blur-md text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-400 font-bold">01:42 / 03:00</span>
                  <span className="text-slate-500">|</span>
                  <span>Acoustic Frequency: 32 kHz</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="flex items-center space-x-1 text-slate-300 hover:text-emerald-400"
                  >
                    {isPlayingAudio ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                    <span>{isPlayingAudio ? "Mute Acoustic Feed" : "Listen to Transducer"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
              <span>Directed for Aegis Global Architectural Media</span>
              <button
                onClick={() => {
                  setBrandFilmOpen(false);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-emerald-400 text-slate-950 font-bold rounded-xl uppercase hover:bg-emerald-300"
              >
                Deploy Protection Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
