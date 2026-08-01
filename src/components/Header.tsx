import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Shield, PhoneCall, Sparkles, Menu, X, ArrowUpRight, Activity, Globe, ChevronDown, Sun, Moon, User as UserIcon, LogOut } from "lucide-react";
import { CurrencyCode } from "../types";
import { NavModalCategory } from "./NavigationModal";
import { auth, signInWithGoogle, logOut } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  onOpenBooking: () => void;
  onScrollToSection: (id: string) => void;
  onOpenModalCategory: (cat: NavModalCategory, itemId?: string) => void;
  onOpenAiChat?: (mode?: any) => void;
  onOpenPortals?: (tab?: any) => void;
}

export default function Header({
  currency,
  onCurrencyChange,
  theme = "dark",
  onToggleTheme,
  onOpenBooking,
  onScrollToSection,
  onOpenModalCategory,
  onOpenAiChat,
  onOpenPortals,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [servicesAccordionOpen, setServicesAccordionOpen] = useState(true);
  const [industriesAccordionOpen, setIndustriesAccordionOpen] = useState(false);

  const triggerHaptic = (pattern: number | number[] = 12) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // ignore if not supported or blocked
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const currencies: { code: CurrencyCode; label: string; flag: string }[] = [
    { code: "INR", label: "₹ INR (India)", flag: "🇮🇳" },
    { code: "USD", label: "$ USD (Global)", flag: "🇺🇸" },
    { code: "AED", label: "AED (Middle East)", flag: "🇦🇪" },
    { code: "GBP", label: "£ GBP (Europe)", flag: "🇬🇧" },
  ];

  const services = [
    { label: "Termite Defense", id: "termite" },
    { label: "Mosquito Eco-Barrier", id: "mosquito" },
    { label: "Rodent Control", id: "rodent" },
    { label: "Bed Bugs Eradication", id: "bed-bugs" },
    { label: "Cockroach Bio-Gel", id: "cockroach" },
    { label: "Snake Wildlife Rescue", id: "snake-rescue" },
    { label: "Bird Control & Lasers", id: "bird-control" },
    { label: "Disinfection Fogging", id: "disinfection" },
  ];

  const industries = [
    { label: "Commercial HQs & Tech Parks", id: "commercial" },
    { label: "Residential Estates & Farmhouses", id: "residential" },
    { label: "Government & Embassies", id: "government" },
    { label: "Hospitals & Healthcare", id: "hospital" },
    { label: "Hotels & Hospitality", id: "hotel" },
    { label: "Warehouses & Cold Storage", id: "warehouse" },
    { label: "Restaurants & Fine Dining", id: "restaurant" },
    { label: "Schools & Educational Campuses", id: "school" },
    { label: "Factories & Manufacturing", id: "factory" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-[76px] flex items-center transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070a]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/90"
          : "bg-[#05070a]/75 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. BRAND LOGO (Left Aligned) */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0 select-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-400 to-emerald-600 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400 group-hover:scale-110 transition-transform duration-300 fill-emerald-500/20" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#080c14] animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-mono leading-none">
                  AEGIS
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded font-mono leading-none">
                  BIODEFENSE
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400/90 font-mono font-medium tracking-wider uppercase truncate max-w-[160px] sm:max-w-none mt-0.5">
                Pest Control Services • Delhi NCR
              </p>
            </div>
          </div>

          {/* 2. DESKTOP & TABLET NAVIGATION (Center Aligned, Apple/Tesla/Stripe Minimal Style) */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-inner text-xs font-mono font-medium">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all"
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all">
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#0b101a] border border-white/15 rounded-2xl shadow-2xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1 text-[10px] font-mono uppercase text-emerald-400 font-bold border-b border-white/10 mb-1">
                    Specialized Pest Defense
                  </div>
                  {services.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        onOpenModalCategory("service", srv.id);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <span>{srv.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("industries")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all">
                <span>Industries</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === "industries" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#0b101a] border border-white/15 rounded-2xl shadow-2xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1 text-[10px] font-mono uppercase text-indigo-400 font-bold border-b border-white/10 mb-1">
                    Sector Solutions
                  </div>
                  {industries.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => {
                        onOpenModalCategory("industry", ind.id);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-indigo-300 hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <span>{ind.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About & Technology */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all">
                <span>About & Tech</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === "about" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#0b101a] border border-white/15 rounded-2xl shadow-2xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <button onClick={() => { onOpenModalCategory("about"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">About Aegis</button>
                  <button onClick={() => { onScrollToSection("technology"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Technology & Physics</button>
                  <button onClick={() => { onOpenModalCategory("safety"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Safety Standards</button>
                  <button onClick={() => { onOpenModalCategory("careers"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Careers & Fellowships</button>
                  <button onClick={() => { onOpenModalCategory("blogs"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Knowledge Center</button>
                </div>
              )}
            </div>

            {/* Enterprise */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("enterprise")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all">
                <span>Enterprise</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === "enterprise" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#0b101a] border border-white/15 rounded-2xl shadow-2xl p-2.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <button onClick={() => { onScrollToSection("plans"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Pricing & Tiers</button>
                  <button onClick={() => { onScrollToSection("calculator"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Quote Calculator</button>
                  <button onClick={() => { onOpenModalCategory("partner"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Partner Program</button>
                  <button onClick={() => { onOpenModalCategory("franchise"); setActiveDropdown(null); }} className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Franchise Expansion</button>
                </div>
              )}
            </div>
          </nav>

          {/* 3. RIGHT ACTION GROUP (Right Aligned Equal Balance) */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* AI Assistant Button */}
            {onOpenAiChat && (
              <button
                onClick={() => onOpenAiChat("chat")}
                className="px-3 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400/80 transition-all font-mono text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                title="Open 24/7 AI Concierge"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Chat</span>
              </button>
            )}

            {/* Portals & GPS */}
            {onOpenPortals && (
              <button
                onClick={() => onOpenPortals("customer")}
                className="px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:border-amber-400/80 transition-all font-mono text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                title="Customer Portal & GPS Tracking"
              >
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Portals & GPS</span>
              </button>
            )}

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={`Switch to ${theme === "dark" ? "Light Mode" : "Dark Mode"}`}
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-white/15 text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:bg-slate-800 transition-all flex items-center justify-center shrink-0"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            )}

            {/* Google Sign In / Account */}
            {authUser ? (
              <div className="flex items-center space-x-2 bg-slate-900/90 border border-emerald-500/40 rounded-xl px-2.5 py-1.5 text-xs font-mono">
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || "User"}
                    className="w-5 h-5 rounded-full border border-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="text-emerald-300 font-semibold max-w-[80px] truncate">
                  {authUser.displayName?.split(" ")[0] || "Account"}
                </span>
                <button
                  onClick={() => logOut()}
                  title="Sign Out"
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle().catch(err => console.error("Login failed:", err))}
                className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 transition-all font-mono text-xs font-semibold flex items-center space-x-1.5 shrink-0"
              >
                <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Currency Selector */}
            <div className="relative flex items-center bg-slate-900/90 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-slate-200">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" />
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent text-white focus:outline-none cursor-pointer text-xs font-mono"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code} className="bg-[#0b101a] text-white">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Hotline */}
            <a
              href="tel:+919354731879"
              className="hidden xl:flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors px-3 py-2 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>+91 93547 31879</span>
            </a>

            {/* Emergency CTA */}
            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-mono tracking-wide shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-slate-950" />
              <span>Emergency Dispatch</span>
            </button>
          </div>

          {/* 4. MOBILE / TABLET MENU TOGGLE BAR (Touch-Friendly min 48x48px targets) */}
          <div className="flex lg:hidden items-center space-x-2 shrink-0">
            {/* Quick Emergency CTA on mobile */}
            <button
              onClick={() => {
                triggerHaptic([15, 30, 15]);
                onOpenBooking();
              }}
              className="px-3.5 py-2.5 text-xs font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 rounded-xl font-mono tracking-tight shrink-0 shadow-md min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              Deploy
            </button>

            {/* Hamburger Menu Button (48x48px minimum target area) */}
            <button
              onClick={() => {
                triggerHaptic(15);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="w-12 h-12 text-slate-200 hover:text-white bg-slate-900/90 border border-white/15 rounded-xl flex items-center justify-center shrink-0 active:bg-slate-800 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. MOBILE DRAWER MENU (Rendered via Portal to document.body to avoid parent backdrop-blur containing block clipping) */}
      {mobileMenuOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            {/* Dark Blurred Semi-Transparent Backdrop Overlay */}
            <div
              onClick={() => {
                triggerHaptic(10);
                setMobileMenuOpen(false);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-250 animate-in fade-in cursor-pointer"
              aria-label="Close navigation overlay"
            />

            {/* Right Drawer Panel (Width: 90vw, Capped at 380px) */}
            <div className="relative z-10 w-[90vw] max-w-[380px] h-full bg-[#05070a] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250 ease-out pr-[env(safe-area-inset-right)]">
              
              {/* Fixed Sticky Header with Title and Fixed Close (X) Button */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-5 pt-[calc(0.75rem+env(safe-area-inset-top))] pb-3 bg-[#05070a]/95 backdrop-blur-xl border-b border-white/10 shrink-0">
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-extrabold text-sm tracking-tight text-white font-mono block truncate">
                      AEGIS BIODEFENSE
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium block truncate">
                      Delhi NCR Bio-Defense Center
                    </span>
                  </div>
                </div>

                {/* Fixed Close (X) Button Top-Right (Min 48px Touch Target) */}
                <button
                  onClick={() => {
                    triggerHaptic(10);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 text-slate-300 hover:text-white bg-slate-900 border border-white/15 rounded-xl flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer min-h-[48px] min-w-[48px]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-emerald-400" />
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5 space-y-4 text-slate-200 font-mono text-sm pb-[calc(2rem+env(safe-area-inset-bottom,20px))]">
                
                {/* Status Live Banner */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 min-h-[48px]">
                  <div className="flex items-center space-x-2 min-w-0">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate text-xs sm:text-sm font-semibold">Delhi NCR Operations</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 font-bold uppercase shrink-0">
                    Active
                  </span>
                </div>

                {/* Main Navigation Items (15-16px font sizes, 48px touch targets, 12-16px spacing) */}
                <div className="space-y-3">
                  {/* 1. Home */}
                  <button
                    onClick={() => {
                      triggerHaptic(10);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-slate-100 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                  >
                    <span>Home</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* 2. Services (Collapsible Accordion) */}
                  <div className="border border-white/10 rounded-xl bg-slate-900/60 overflow-hidden">
                    <button
                      onClick={() => {
                        triggerHaptic(10);
                        setServicesAccordionOpen(!servicesAccordionOpen);
                      }}
                      className="w-full text-left px-4 py-3 text-[15px] font-bold text-emerald-400 bg-slate-900/90 flex items-center justify-between cursor-pointer min-h-[48px]"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <span>Services</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                          {services.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-emerald-400 transition-transform duration-200 shrink-0 ${
                          servicesAccordionOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {servicesAccordionOpen && (
                      <div className="p-2.5 space-y-2 bg-black/60 border-t border-white/10">
                        {services.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => {
                              triggerHaptic(10);
                              onOpenModalCategory("service", srv.id);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-emerald-500/15 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group min-h-[44px]"
                          >
                            <span className="break-words font-medium pr-1">{srv.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Industries (Collapsible Accordion) */}
                  <div className="border border-white/10 rounded-xl bg-slate-900/60 overflow-hidden">
                    <button
                      onClick={() => {
                        triggerHaptic(10);
                        setIndustriesAccordionOpen(!industriesAccordionOpen);
                      }}
                      className="w-full text-left px-4 py-3 text-[15px] font-bold text-indigo-400 bg-slate-900/90 flex items-center justify-between cursor-pointer min-h-[48px]"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <span>Industries & Sectors</span>
                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">
                          {industries.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-indigo-400 transition-transform duration-200 shrink-0 ${
                          industriesAccordionOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {industriesAccordionOpen && (
                      <div className="p-2.5 space-y-2 bg-black/60 border-t border-white/10">
                        {industries.map((ind) => (
                          <button
                            key={ind.id}
                            onClick={() => {
                              triggerHaptic(10);
                              onOpenModalCategory("industry", ind.id);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm text-slate-200 hover:text-white hover:bg-indigo-500/15 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group min-h-[44px]"
                          >
                            <span className="break-words font-medium pr-1">{ind.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 4. About */}
                  <button
                    onClick={() => {
                      triggerHaptic(10);
                      onOpenModalCategory("about");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-slate-100 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                  >
                    <span>About Aegis BioDefense</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* 5. Enterprise */}
                  <button
                    onClick={() => {
                      triggerHaptic(10);
                      onOpenModalCategory("industry", "commercial");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-slate-100 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                  >
                    <span>Enterprise Solutions</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* 6. AI Chat */}
                  {onOpenAiChat && (
                    <button
                      onClick={() => {
                        triggerHaptic(12);
                        onOpenAiChat("chat");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-emerald-400 bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Sparkles className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <span>AI Pest Assistant</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  )}

                  {/* 7. Emergency Dispatch (Visually Distinct Amber Shield) */}
                  <button
                    onClick={() => {
                      triggerHaptic([15, 30, 15]);
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/40 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Shield className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                      <span>Emergency Dispatch</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </button>

                  {/* 8. Contact */}
                  <button
                    onClick={() => {
                      triggerHaptic(10);
                      onScrollToSection("contact");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold text-slate-100 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
                  >
                    <span>Contact & Headquarters</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                {/* Controls Grid (Currency & Theme) */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between bg-slate-900 border border-white/15 rounded-xl px-3 py-2.5 min-h-[48px]">
                    <div className="flex items-center space-x-1.5 text-slate-300 shrink-0">
                      <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs">Curr:</span>
                    </div>
                    <select
                      value={currency}
                      onChange={(e) => {
                        triggerHaptic(10);
                        onCurrencyChange(e.target.value as CurrencyCode);
                      }}
                      className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer text-xs text-right shrink-0"
                    >
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#05070a] text-white">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                  </div>

                  {onToggleTheme && (
                    <button
                      onClick={() => {
                        triggerHaptic(12);
                        onToggleTheme();
                      }}
                      className="flex items-center justify-between bg-slate-900 border border-white/15 rounded-xl px-3 py-2.5 min-h-[48px] text-slate-300 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span className="text-xs">Theme:</span>
                      <div className="flex items-center space-x-1.5 text-amber-400 font-semibold shrink-0">
                        {theme === "dark" ? (
                          <>
                            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="text-xs">Dark</span>
                          </>
                        ) : (
                          <>
                            <Moon className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span className="text-xs">Light</span>
                          </>
                        )}
                      </div>
                    </button>
                  )}
                </div>

                {/* User Auth Profile Status */}
                <div className="pt-1">
                  {authUser ? (
                    <div className="flex items-center justify-between bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 min-h-[48px]">
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        {authUser.photoURL ? (
                          <img
                            src={authUser.photoURL}
                            alt={authUser.displayName || "User"}
                            className="w-6 h-6 rounded-full border border-emerald-400 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <UserIcon className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        )}
                        <span className="text-emerald-300 font-semibold truncate text-xs">
                          {authUser.displayName?.split(" ")[0] || authUser.email?.split("@")[0] || "Account"}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          triggerHaptic(15);
                          logOut();
                        }}
                        className="px-2.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-xs font-bold border border-red-500/30 flex items-center space-x-1 shrink-0 active:scale-95 transition-transform cursor-pointer min-h-[36px]"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Exit</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        triggerHaptic(15);
                        setMobileMenuOpen(false);
                        signInWithGoogle().catch((err) => console.error("Login failed:", err));
                      }}
                      className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl min-h-[48px] font-bold flex items-center justify-center space-x-2 active:scale-[0.98] transition-transform cursor-pointer text-xs"
                    >
                      <UserIcon className="w-4 h-4 text-emerald-400" />
                      <span>Sign In with Google</span>
                    </button>
                  )}
                </div>

                {/* Primary CTA Section: Book Inspection */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <a
                    href="tel:+919354731879"
                    onClick={() => triggerHaptic(15)}
                    className="flex items-center justify-center space-x-2 text-xs font-bold text-emerald-400 bg-slate-900 border border-emerald-500/30 py-3 rounded-xl min-h-[48px] active:scale-[0.98] transition-transform"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Call Hotline: +91 93547 31879</span>
                  </a>
                  {/* Book Free Inspection (Primary Action with Glowing Aesthetic) */}
                  <button
                    onClick={() => {
                      triggerHaptic([15, 30, 15]);
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full py-4 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 rounded-xl shadow-lg shadow-emerald-500/25 tracking-wider uppercase min-h-[52px] cursor-pointer active:scale-[0.98] transition-transform flex items-center justify-center space-x-2 border border-emerald-300/50"
                  >
                    <Shield className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>Book Free Inspection</span>
                  </button>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
