import React from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopButtonProps {
  label?: string;
  className?: string;
}

export default function ScrollToTopButton({
  label = "Back to Top",
  className = ""
}: ScrollToTopButtonProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`flex justify-center pt-8 ${className}`}>
      <button
        onClick={handleScrollTop}
        className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-300 text-xs font-mono transition-all duration-200 shadow-lg cursor-pointer"
        aria-label={label}
      >
        <ChevronUp className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
        <span className="tracking-wide">{label}</span>
      </button>
    </div>
  );
}
