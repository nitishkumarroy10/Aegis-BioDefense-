import React, { useState, useEffect, Suspense, lazy } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SectorsShowcase from "./components/SectorsShowcase";
import ServicesSection from "./components/ServicesSection";
import NcrCoverageSection from "./components/NcrCoverageSection";
import FloatingWhatsAppBtn from "./components/FloatingWhatsAppBtn";
import PlanAccordion from "./components/PlanAccordion";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";

const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const AiDiagnosticTool = lazy(() => import("./components/AiDiagnosticTool"));
const PropertyHealthDashboard = lazy(() => import("./components/PropertyHealthDashboard"));
const CostCalculator = lazy(() => import("./components/CostCalculator"));

import type { NavModalCategory } from "./components/NavigationModal";
import type { LegalTab } from "./components/LegalPagesModal";

const AiChatWidget = lazy(() => import("./components/AiChatWidget"));
const OperationsPortalModal = lazy(() => import("./components/OperationsPortalModal"));
const DispatchBookingModal = lazy(() => import("./components/DispatchBookingModal"));
const TierComparisonModal = lazy(() => import("./components/TierComparisonModal"));
const ExpertCallbackModal = lazy(() => import("./components/ExpertCallbackModal"));
const NavigationModal = lazy(() => import("./components/NavigationModal"));
const LegalPagesModal = lazy(() => import("./components/LegalPagesModal"));
const ImageDiagnosticsModal = lazy(() => import("./components/ImageDiagnosticsModal"));

import { DEFENSE_PLANS } from "./data/websiteData";
import { DefensePlan, DiagnosisResult, CurrencyCode } from "./types";
import { Shield, Sparkles, Check, ArrowRight, Star, Clock, Columns3, Calculator, Info, PhoneCall, Award, ShieldCheck, Leaf } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DefensePlan | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisResult | null>(null);
  const [selectedPlanForQuote, setSelectedPlanForQuote] = useState<DefensePlan | null>(null);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [selectedPlanForCallback, setSelectedPlanForCallback] = useState<DefensePlan | null>(null);

  // Synchronize document root theme class & global custom event listener
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    const handleCustomLegalEvent = (e: any) => {
      const tab = e?.detail?.tab || "privacy";
      setLegalModalTab(tab);
      setLegalModalOpen(true);
    };

    const handleCustomImageDiagnostics = () => {
      setImageDiagnosticsOpen(true);
    };

    window.addEventListener("aegis:openLegalModal", handleCustomLegalEvent);
    window.addEventListener("aegis:openImageDiagnostics", handleCustomImageDiagnostics);
    return () => {
      window.removeEventListener("aegis:openLegalModal", handleCustomLegalEvent);
      window.removeEventListener("aegis:openImageDiagnostics", handleCustomImageDiagnostics);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Image Diagnostics Modal State
  const [imageDiagnosticsOpen, setImageDiagnosticsOpen] = useState(false);

  // Navigation Modal State
  const [navModalOpen, setNavModalOpen] = useState(false);
  const [activeNavCategory, setActiveNavCategory] = useState<NavModalCategory | null>(null);
  const [selectedNavItemId, setSelectedNavItemId] = useState<string | undefined>(undefined);

  // Tier Comparison Matrix Modal State
  const [tierComparisonOpen, setTierComparisonOpen] = useState(false);

  // AI & Operations Widgets State
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatMode, setAiChatMode] = useState<"chat" | "whatsapp" | "voice" | "quote">("chat");
  const [operationsPortalOpen, setOperationsPortalOpen] = useState(false);
  const [portalTab, setPortalTab] = useState<"customer" | "technician" | "crm">("customer");

  const handleOpenAiChat = (mode: "chat" | "whatsapp" | "voice" | "quote" = "chat") => {
    setAiChatMode(mode);
    setAiChatOpen(true);
  };

  const handleOpenAiQuoteForPlan = (plan: DefensePlan) => {
    setSelectedPlanForQuote(plan);
    setAiChatMode("quote");
    setAiChatOpen(true);
    const el = document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCallbackForPlan = (plan: DefensePlan) => {
    setSelectedPlanForCallback(plan);
    setCallbackModalOpen(true);
  };

  const handleOpenPortals = (tab: "customer" | "technician" | "crm" = "customer") => {
    setPortalTab(tab);
    setOperationsPortalOpen(true);
  };

  // Legal Pages Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>("privacy");

  const handleOpenLegalModal = (tab: LegalTab = "privacy") => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleOpenNavModal = (cat: NavModalCategory, itemId?: string) => {
    if (cat === "privacy" || cat === "terms" || cat === "cookie") {
      handleOpenLegalModal(cat as LegalTab);
      return;
    }
    setActiveNavCategory(cat);
    setSelectedNavItemId(itemId);
    setNavModalOpen(true);
  };

  const handleOpenBooking = () => {
    setSelectedPlan(null);
    setSelectedDiagnosis(null);
    setBookingModalOpen(true);
  };

  const handleSelectPlan = (plan: DefensePlan) => {
    setSelectedPlan(plan);
    setSelectedDiagnosis(null);
    setBookingModalOpen(true);
  };

  const handleDeployWithDiagnosis = (diagnosis: DiagnosisResult) => {
    setSelectedDiagnosis(diagnosis);
    setSelectedPlan(null);
    setBookingModalOpen(true);
  };

  const handleSelectPlanAndBook = (plan: DefensePlan) => {
    setSelectedPlan(plan);
    setSelectedDiagnosis(null);
    setBookingModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      if (id === "technology" || id === "case-studies" || id === "comparison") {
        handleOpenNavModal("about");
      }
    }
  };

  const formatPlanPrice = (plan: DefensePlan) => {
    switch (currency) {
      case "INR":
        return {
          monthly: `₹${plan.monthlyPriceINR.toLocaleString("en-IN")}`,
          setup: `₹${plan.initialSetupPriceINR.toLocaleString("en-IN")}`,
        };
      case "AED":
        return {
          monthly: `AED ${Math.round(plan.monthlyPriceUSD * 3.67).toLocaleString()}`,
          setup: `AED ${Math.round(plan.initialSetupPriceUSD * 3.67).toLocaleString()}`,
        };
      case "GBP":
        return {
          monthly: `£${Math.round(plan.monthlyPriceUSD * 0.78).toLocaleString()}`,
          setup: `£${Math.round(plan.initialSetupPriceUSD * 0.78).toLocaleString()}`,
        };
      case "USD":
      default:
        return {
          monthly: `$${plan.monthlyPriceUSD.toLocaleString()}`,
          setup: `$${plan.initialSetupPriceUSD.toLocaleString()}`,
        };
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-[#04070e] text-slate-100" : "bg-[#f8fafc] text-slate-900"
    } font-sans selection:bg-emerald-500 selection:text-slate-950`}>
      {/* Top Gold Gradient Scroll Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-gradient-to-r from-amber-500 via-amber-300 via-emerald-400 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenBooking={handleOpenBooking}
        onScrollToSection={scrollToSection}
        onOpenModalCategory={handleOpenNavModal}
        onOpenAiChat={handleOpenAiChat}
        onOpenPortals={handleOpenPortals}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          onScrollToSection={scrollToSection}
        />

        {/* 9 Core Expert Sector Solutions (Alternating Image & Content Showcase) */}
        <SectorsShowcase onOpenBooking={handleOpenBooking} />

        {/* Our Comprehensive Pest Control Services */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        <Suspense fallback={<div className="py-12 bg-[#05070a]" />}>
          {/* AI Multimodal Pest Diagnostics Scanner */}
          <AiDiagnosticTool onDeployWithDiagnosis={handleDeployWithDiagnosis} />

          {/* Visual Recharts Property Health Telemetry & Metrics Dashboard */}
          <PropertyHealthDashboard />

          {/* Client Video Testimonials & Success Stories */}
          <TestimonialsSection onOpenBooking={handleOpenBooking} />
        </Suspense>

        {/* Defense Plans Tier Showcase */}
        <section id="plans" className="py-24 bg-[#05070a] relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>ARCHITECTURAL DEFENSE TIERS ({currency})</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Integrated Property Protection Plans
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Choose the bio-barrier tier engineered specifically for your square footage, structural design, and location profile.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setTierComparisonOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-slate-900/90 hover:bg-emerald-500/10 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-mono font-semibold transition-all shadow-lg hover:shadow-emerald-500/20 group cursor-pointer"
                >
                  <Columns3 className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  <span>Compare Tiers Side-by-Side</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <motion.div
              className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.18,
                    delayChildren: 0.08
                  }
                }
              }}
            >
              {DEFENSE_PLANS.map((plan) => {
                const prices = formatPlanPrice(plan);
                return (
                  <motion.div
                    key={plan.id}
                    variants={{
                      hidden: { opacity: 0, y: 32, scale: 0.96 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }
                    }}
                    className={`relative bg-slate-900/80 border rounded-3xl p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-8 transition-all duration-300 hover:scale-[1.01] ${
                      plan.featured
                        ? "border-emerald-500/80 shadow-emerald-500/10 ring-1 ring-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-md">
                        {plan.badge}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                        <p className="text-xs text-slate-400 mt-1 font-mono">{plan.tagline}</p>
                      </div>

                      <div className="py-4 border-y border-white/10 flex items-baseline justify-between relative">
                        <div>
                          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
                            {prices.monthly}
                          </span>
                          <span className="text-xs font-mono text-slate-400"> / month</span>
                        </div>

                        <div className="relative group/tooltip flex items-center space-x-1 cursor-pointer py-1">
                          <span className="text-xs font-mono text-slate-400">
                            Setup: {prices.setup}
                          </span>
                          <Info className="w-3.5 h-3.5 text-emerald-400/80 hover:text-emerald-300 transition-colors shrink-0" />

                          {/* Tooltip Popup on Hover / Focus */}
                          <div className="absolute right-0 bottom-full mb-2.5 hidden group-hover/tooltip:block group-focus-within/tooltip:block w-72 p-4 rounded-2xl bg-slate-950/95 border border-emerald-500/40 text-left shadow-2xl shadow-emerald-500/20 backdrop-blur-xl z-30 transition-all duration-200">
                            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold mb-2 pb-1.5 border-b border-white/10">
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span>What's included in {prices.setup} Setup:</span>
                            </div>
                            <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                              {(plan.setupIncludes || [
                                "Initial 360° property vulnerability & foundation audit",
                                "Tamper-proof sensor & station installation",
                                "Foundation crack sealing & barrier prep",
                                "Initial deep molecular barrier treatment"
                              ]).map((item, i) => (
                                <li key={i} className="flex items-start space-x-1.5">
                                  <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                              <span>One-time deployment fee</span>
                              <span className="text-emerald-400 font-bold">100% Warranted</span>
                            </div>
                            {/* Arrow Pointer */}
                            <div className="absolute top-full right-4 -mt-[1px] w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-950/95" />
                          </div>
                        </div>
                      </div>

                      {/* Trust Indicators Row */}
                      <div className="flex items-center justify-between gap-1 text-[10px] font-mono py-1.5 px-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-slate-300 shadow-inner">
                        <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                          <Award className="w-3 h-3 shrink-0 text-emerald-400" />
                          <span>ISO 9001</span>
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center space-x-1 text-teal-300 font-semibold">
                          <ShieldCheck className="w-3 h-3 shrink-0 text-teal-400" />
                          <span>NABH Compliant</span>
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center space-x-1 text-emerald-300 font-semibold">
                          <Leaf className="w-3 h-3 shrink-0 text-emerald-400" />
                          <span>100% Non-Toxic</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {plan.description}
                      </p>

                      <PlanAccordion plan={plan} prices={prices} />
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <button
                        onClick={() => handleSelectPlan(plan)}
                        className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 min-h-[44px] cursor-pointer ${
                          plan.featured
                            ? "bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 hover:shadow-emerald-500/30 hover:scale-[1.01]"
                            : "bg-slate-800 hover:bg-slate-700 text-white border border-white/10"
                        }`}
                      >
                        <span>Deploy {plan.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Small Secondary Action Buttons Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOpenCallbackForPlan(plan)}
                          className="w-full py-2.5 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 hover:border-amber-300 text-amber-300 hover:text-amber-200 text-[11px] font-mono font-semibold transition-all flex items-center justify-center space-x-1.5 group cursor-pointer shadow-sm min-h-[44px]"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                          <span className="truncate">Request Callback</span>
                        </button>

                        <button
                          onClick={() => handleOpenAiQuoteForPlan(plan)}
                          className="w-full py-2.5 px-2.5 rounded-xl bg-slate-950/80 hover:bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 text-[11px] font-mono font-semibold transition-all flex items-center justify-center space-x-1.5 group cursor-pointer shadow-sm min-h-[44px]"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform shrink-0" />
                          <span className="truncate">Get Custom Quote</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Scroll To Top Button */}
            <ScrollToTopButton label="Back to Top" />
          </div>
        </section>

        <Suspense fallback={<div className="py-12 bg-[#05070a]" />}>
          {/* Interactive Quote Calculator */}
          <CostCalculator
            currency={currency}
            onSelectPlanAndBook={handleSelectPlanAndBook}
            preselectedPlanId={selectedPlanForQuote?.id}
          />
        </Suspense>

        {/* Delhi NCR Coverage & Property Sectors */}
        <NcrCoverageSection
          onOpenBooking={handleOpenBooking}
          onOpenModalCategory={handleOpenNavModal}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenModalCategory={handleOpenNavModal}
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Lazy Loaded Dynamic Modals & Widgets */}
      <Suspense fallback={null}>
        {/* Navigation & Services Portal Modal */}
        <NavigationModal
          isOpen={navModalOpen}
          onClose={() => setNavModalOpen(false)}
          activeCategory={activeNavCategory}
          selectedItemId={selectedNavItemId}
          onOpenBooking={handleOpenBooking}
        />

        {/* Rapid Field Dispatch Concierge Booking Modal */}
        <DispatchBookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          preselectedPlan={selectedPlan}
          preselectedDiagnosis={selectedDiagnosis}
        />

        {/* Technical Tier Comparison Matrix Modal */}
        <TierComparisonModal
          isOpen={tierComparisonOpen}
          onClose={() => setTierComparisonOpen(false)}
          currency={currency}
          onSelectPlan={(plan) => handleSelectPlan(plan)}
        />

        {/* AI Expert Consultation Callback Modal */}
        <ExpertCallbackModal
          isOpen={callbackModalOpen}
          onClose={() => setCallbackModalOpen(false)}
          plan={selectedPlanForCallback}
          currency={currency}
        />

        {/* Operations, Customer & Technician Portal Modal */}
        <OperationsPortalModal
          isOpen={operationsPortalOpen}
          onClose={() => setOperationsPortalOpen(false)}
          initialTab={portalTab}
        />

        {/* Dedicated Legal Pages & Compliance Modal */}
        <LegalPagesModal
          isOpen={legalModalOpen}
          onClose={() => setLegalModalOpen(false)}
          initialTab={legalModalTab}
          onOpenBooking={handleOpenBooking}
        />

        {/* Image Diagnostics Audit Panel */}
        <ImageDiagnosticsModal
          isOpen={imageDiagnosticsOpen}
          onClose={() => setImageDiagnosticsOpen(false)}
        />

        {/* Floating AI Chat & Voice Assistant Widget */}
        <AiChatWidget
          isOpen={aiChatOpen}
          onClose={() => setAiChatOpen(false)}
          onOpenBooking={handleOpenBooking}
          initialMode={aiChatMode}
          preselectedPlan={selectedPlanForQuote}
        />
      </Suspense>

      {/* Persistent Floating WhatsApp & Quick Action Button */}
      <FloatingWhatsAppBtn
        onOpenAiChat={handleOpenAiChat}
        onOpenPortals={handleOpenPortals}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
