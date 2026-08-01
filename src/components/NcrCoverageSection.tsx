import React, { useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import {
  MapPin,
  Building2,
  Home,
  Briefcase,
  Utensils,
  Hotel,
  Hospital,
  Factory,
  Warehouse,
  GraduationCap,
  Shield,
  Sparkles,
  Layers,
  HardHat,
  Compass,
  Users,
  Navigation,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  Activity,
  Zap
} from "lucide-react";

interface NcrCoverageSectionProps {
  onOpenBooking: () => void;
  onOpenModalCategory: (cat: any, itemId?: string) => void;
}

export default function NcrCoverageSection({
  onOpenBooking,
  onOpenModalCategory,
}: NcrCoverageSectionProps) {
  const [activeTab, setActiveTab] = useState<"locations" | "sectors">("locations");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const locations = [
    {
      id: "delhi",
      name: "Delhi",
      tagline: "Central, South, North, West & Lutyens' Zone",
      dispatchSla: "15-25 Mins",
      hubs: ["Chanakyapuri Embassies", "Vasant Vihar Estates", "Greater Kailash", "Khan Market Hub", "Connaught Place HQs", "Golf Links"],
      estatesSecured: "1,240+",
      heroImage: "🏛️"
    },
    {
      id: "gurugram",
      name: "Gurugram",
      tagline: "Golf Course Road, CyberCity, Sohna Rd & DLF Estates",
      dispatchSla: "15-20 Mins",
      hubs: ["DLF Phase 1-5 Penthouses", "CyberCity Tech Parks", "Golf Course Ext Rd", "Sohna Rd Estates", "Ambience Island"],
      estatesSecured: "980+",
      heroImage: "🏙️"
    },
    {
      id: "noida",
      name: "Noida",
      tagline: "Sectors 1 to 150, Expressways & Film City",
      dispatchSla: "20-25 Mins",
      hubs: ["Noida Expressway Towers", "Sector 44/15A Estates", "Tech Zones", "Film City Studios", "Sector 128 Gated Communities"],
      estatesSecured: "750+",
      heroImage: "🏢"
    },
    {
      id: "greater-noida",
      name: "Greater Noida",
      tagline: "Knowledge Parks, Pari Chowk & Extension Sector",
      dispatchSla: "25-30 Mins",
      hubs: ["Knowledge Park Campuses", "Pari Chowk Logistics", "Jaypee Greens Estates", "Noida Extension High-rises"],
      estatesSecured: "420+",
      heroImage: "🏗️"
    },
    {
      id: "ghaziabad",
      name: "Ghaziabad",
      tagline: "Indirapuram, Vaishali, Vasundhara & Raj Nagar",
      dispatchSla: "20-30 Mins",
      hubs: ["Indirapuram Societies", "Vaishali Towers", "Vasundhara Sectors", "Raj Nagar Farmhouses", "Sahibabad Industrial Area"],
      estatesSecured: "510+",
      heroImage: "🏘️"
    },
    {
      id: "faridabad",
      name: "Faridabad",
      tagline: "Sectors 14-21, Surajkund & Neharpar Belt",
      dispatchSla: "25-35 Mins",
      hubs: ["Surajkund Luxury Villas", "Sector 14-15 Enclaves", "Neharpar Townships", "Mathura Road Industrial Belt"],
      estatesSecured: "380+",
      heroImage: "🏭"
    },
    {
      id: "bahadurgarh",
      name: "Bahadurgarh",
      tagline: "Industrial Corridor & Residential Townships",
      dispatchSla: "30-40 Mins",
      hubs: ["Footwear & Auto Industrial Parks", "Modern Residential Townships", "Logistics Warehouses"],
      estatesSecured: "210+",
      heroImage: "🚚"
    },
    {
      id: "entire-ncr",
      name: "Entire Delhi NCR",
      tagline: "Unified Command Center & Rapid Response Fleet",
      dispatchSla: "Sub-30 Mins Guaranteed",
      hubs: ["24/7 Dispatch Fleet", "Mobile Acoustic Radar Units", "Emergency Serpent & Pest Teams"],
      estatesSecured: "4,500+ Total",
      heroImage: "🛰️"
    }
  ];

  const propertySectors = [
    { id: "residential", name: "Residential", icon: Home, desc: "Apartments, villas, and independent builder floors with 100% pet/child-safe bio-shields.", color: "emerald" },
    { id: "luxury-homes", name: "Luxury Homes", icon: Sparkles, desc: "Ultra-luxury penthouses and heritage mansions with zero-drilling termite acoustic radar.", color: "amber" },
    { id: "farmhouses", name: "Farmhouses", icon: Compass, desc: "Multi-acre estates requiring automated lawn misting and perimeter serpent repellents.", color: "teal" },
    { id: "societies", name: "Gated Societies & RWAs", icon: Users, desc: "Comprehensive tower-wide bio-shield contracts, common area drainage foam, and elevator shaft protection.", color: "indigo" },
    { id: "commercial", name: "Commercial HQs", icon: Building2, desc: "A+ corporate towers, glass facades, and IT parks with zero tenant disruption.", color: "emerald" },
    { id: "corporate", name: "Corporate Parks", icon: Briefcase, desc: "CyberCity & Tech Park server rooms, acoustic rodent exclusion, and wire gnawing shields.", color: "indigo" },
    { id: "restaurants", name: "Restaurants & Cafes", icon: Utensils, desc: "Khan Market & CyberHub fine-dining FSSAI Grade-A bio-gel and drain foam sanitation.", color: "amber" },
    { id: "hotels", name: "Hotels & Hospitality", icon: Hotel, desc: "5-star hotel suites, overnight bed bug thermodynamic heat elimination, and guest privacy.", color: "teal" },
    { id: "hospitals", name: "Hospitals & Healthcare", icon: Hospital, desc: "NABH & WHO compliant ICU sterility cold-fogging with zero chemical spray in treatment zones.", color: "emerald" },
    { id: "factories", name: "Factories & Plants", icon: Factory, desc: "Heavy industrial manufacturing, machinery cable preservation, and laser bird deterrence.", color: "indigo" },
    { id: "warehouses", name: "Warehouses & Logistics", icon: Warehouse, desc: "Amazon & cold-chain distribution hubs with high-capacity automated telemetry traps.", color: "amber" },
    { id: "schools", name: "Schools & Campuses", icon: GraduationCap, desc: "Child-safe green bio-shields, weekend eco-misting, and non-toxic playground protection.", color: "teal" },
    { id: "government", name: "Government & Embassies", icon: Shield, desc: "Chanakyapuri foreign embassies, high-security clearance teams, and zero-odor protocols.", color: "emerald" },
    { id: "industries", name: "Industrial Parks", icon: Layers, desc: "Auto, pharma, and electronics manufacturing belts across Gurgaon, Noida, and Faridabad.", color: "indigo" },
    { id: "builders", name: "Builders & Construction", icon: HardHat, desc: "Pre-construction subterranean soil bio-barriers and anti-termite slab treatments with 10-year warranty.", color: "amber" },
    { id: "real-estate", name: "Real Estate Developers", icon: Navigation, desc: "Turnkey bio-defense handovers for DLF, M3M, Central Park, and Godrej developments.", color: "emerald" }
  ];

  return (
    <section id="ncr-coverage" className="py-24 bg-[#05070a] relative overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-lg">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            <span className="uppercase tracking-widest font-bold">100% NCR COVERAGE • 24/7 COMMAND CENTER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Protecting Every Space Across <span className="emerald-gradient-text">Delhi NCR.</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
            From Lutyens’ diplomatic compounds to CyberCity IT towers, Greater Noida tech hubs, and Gurugram golf course penthouses—our mobile acoustic radar and bio-shield fleets are deployed 24/7.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl font-mono text-xs">
            <button
              onClick={() => setActiveTab("locations")}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 ${
                activeTab === "locations"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Delhi NCR Locations ({locations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sectors")}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 ${
                activeTab === "sectors"
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Sectors & Property Types ({propertySectors.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: NCR Locations Grid */}
        {activeTab === "locations" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Quick Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
              <span className="text-slate-400 mr-2">Filter Region:</span>
              <button
                onClick={() => setSelectedCity("all")}
                className={`px-3 py-1 rounded-lg border ${
                  selectedCity === "all"
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold"
                    : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                All NCR Regions
              </button>
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedCity(loc.id)}
                  className={`px-3 py-1 rounded-lg border ${
                    selectedCity === loc.id
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold"
                      : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {locations
                .filter((loc) => selectedCity === "all" || loc.id === selectedCity)
                .map((loc) => (
                  <div
                    key={loc.id}
                    className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 space-y-4 group relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{loc.heroImage}</span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>SLA: {loc.dispatchSla}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">
                        {loc.tagline}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                        Key Hubs & Enclaves:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {loc.hubs.map((hub, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-white/5 text-slate-300"
                          >
                            • {hub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 text-[11px]">Estates Secured: <strong className="text-white">{loc.estatesSecured}</strong></span>
                      <button
                        onClick={onOpenBooking}
                        className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Dispatch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Sectors & Property Types Grid */}
        {activeTab === "sectors" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
            {propertySectors.map((sec) => {
              const IconComp = sec.icon;
              return (
                <div
                  key={sec.id}
                  onClick={() => onOpenModalCategory("industry", sec.id === "residential" || sec.id === "luxury-homes" ? "residential" : "commercial")}
                  className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 border border-white/10 px-2 py-0.5 rounded">
                      VERIFIED BIO-DEFENSE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-mono group-hover:text-amber-400 transition-colors">
                      {sec.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center text-xs font-mono text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>View Bio-Shield Protocols</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom NCR Emergency Dispatch Action Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B101D] to-slate-900 border border-emerald-500/30 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-xs font-mono text-emerald-400">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>NCR MOBILE FLEET DISPATCH ACTIVE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              Require Immediate Bio-Defense Inspection in Delhi NCR?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Our certified bio-engineers arrive equipped with subterranean acoustic radar, thermal cameras, and 100% botanical micro-encapsulated barriers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+919354731879"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 border border-white/10 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 hover:bg-slate-700"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Call +91 93547 31879</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-mono text-xs uppercase font-extrabold shadow-xl hover:scale-105 transition-all"
            >
              Book Rapid Inspection
            </button>
          </div>
        </div>

        {/* Subtle Scroll to Top Button for mobile/tablet UX */}
        <ScrollToTopButton label="Back to Top" />
      </div>
    </section>
  );
}
