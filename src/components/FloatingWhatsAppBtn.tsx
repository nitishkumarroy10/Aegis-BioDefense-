import React, { useState, useEffect } from "react";
import { Send, Bot, Navigation, Sparkles, X, ChevronUp, ArrowUp } from "lucide-react";

interface FloatingWhatsAppBtnProps {
  onOpenAiChat: (mode?: "chat" | "whatsapp" | "voice" | "quote") => void;
  onOpenPortals: (tab?: "customer" | "technician" | "crm") => void;
  onOpenBooking: () => void;
}

export default function FloatingWhatsAppBtn({
  onOpenAiChat,
  onOpenPortals,
  onOpenBooking,
}: FloatingWhatsAppBtnProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] right-[calc(24px+env(safe-area-inset-right,0px))] z-40 flex flex-col items-end space-y-3 font-mono text-xs max-w-[calc(100vw-3rem)] transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Quick Action Popover Menu */}
      {menuOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-72 max-w-[320px] bg-[#090D16]/95 border border-emerald-500/30 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              AEGIS DISPATCH HUB
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg active:scale-95 transition-transform min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenAiChat("chat");
            }}
            className="w-full text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 flex items-center space-x-2.5 text-slate-200 hover:text-emerald-400 min-h-[48px] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-xs">24/7 AI Concierge</div>
              <div className="text-[10px] text-slate-400 font-sans">Instant bio-defense advice</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenAiChat("quote");
            }}
            className="w-full text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 flex items-center space-x-2.5 text-slate-200 hover:text-indigo-400 min-h-[48px] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-xs">AI Instant Quote</div>
              <div className="text-[10px] text-slate-400 font-sans">Calculate AMC & treatment</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenPortals("customer");
            }}
            className="w-full text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 flex items-center space-x-2.5 text-slate-200 hover:text-amber-400 min-h-[48px] active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Navigation className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-xs">Live GPS Tracker & AMC</div>
              <div className="text-[10px] text-slate-400 font-sans">Track technician & invoices</div>
            </div>
          </button>

          <a
            href="https://wa.me/919354731879?text=Hello%20Aegis%20BioDefense,%20I%20would%20like%20to%20book%20an%20urgent%20inspection."
            target="_blank"
            rel="noreferrer"
            className="w-full p-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center justify-center space-x-2 hover:bg-emerald-400 min-h-[48px] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open WhatsApp (+91 93547 31879)</span>
          </a>
        </div>
      )}

      {/* Main Floating Buttons Cluster */}
      <div className="flex items-center space-x-2.5">
        {/* Back to Top Floating Button */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-slate-900/95 border border-white/15 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 rounded-full shadow-2xl backdrop-blur-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Scroll to top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Quick Dispatch Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 bg-slate-900/95 border border-emerald-500/40 text-emerald-400 rounded-full shadow-2xl backdrop-blur-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Toggle Quick Dispatch Menu"
          aria-label="Toggle Quick Dispatch Menu"
        >
          <ChevronUp className={`w-5 h-5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Direct WhatsApp Action Button */}
        <a
          href="https://wa.me/919354731879?text=Hi%20Aegis%20BioDefense,%20I%20need%20a%20bio-defense%20inspection."
          target="_blank"
          rel="noreferrer"
          className="relative w-12 h-12 bg-emerald-500 text-slate-950 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Contact via WhatsApp"
        >
          <Send className="w-5 h-5 text-slate-950 fill-slate-950 ml-0.5" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-slate-950 animate-ping" />
        </a>
      </div>
    </div>
  );
}

