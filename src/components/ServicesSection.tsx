import React, { useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import InteractiveHomeRadar from "./InteractiveHomeRadar";
import {
  ShieldCheck,
  Bug,
  Building2,
  Home,
  Hotel,
  Utensils,
  Hospital,
  Warehouse,
  Factory,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Flame,
  Zap,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  PhoneCall,
  Activity,
  FileCheck2,
  AlertTriangle,
  Feather,
  Droplets
} from "lucide-react";
import { motion } from "motion/react";

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

type CategoryFilter = "all" | "specialized" | "commercial" | "residential_amc";

interface ServiceItem {
  id: string;
  category: "specialized" | "commercial" | "residential_amc";
  categoryName: string;
  title: string;
  seoKeyword: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  badge: string;
  guarantee: string;
  popularFor?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  // SPECIALIZED TREATMENTS
  {
    id: "termite-control",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Termite Control Delhi & Subterranean Protection",
    seoKeyword: "Termite Control Delhi",
    icon: Flame,
    description: "Pioneering drill-free acoustic subterranean radar and micro-encapsulated botanical barrier technology for homes and high-value structures.",
    features: [
      "Subterranean acoustic radar detection",
      "Zero-drilling imported marble protection",
      "10-Year transferable structural damage warranty",
      "Eco-safe non-repellent transfer chemistry"
    ],
    badge: "10-Year Warranty",
    guarantee: "100% Colony Elimination Guarantee",
    popularFor: "Villas, Apartments, Historic Properties & Offices"
  },
  {
    id: "cockroach-control",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Cockroach Control & Gel Matrix Eradication",
    seoKeyword: "Cockroach Control Delhi NCR",
    icon: Bug,
    description: "Odourless micro-dot gel matrix treatment targeting German & American cockroaches in kitchens, drains, and electrical conduits.",
    features: [
      "100% Odourless & non-messy application",
      "Safe around pets, food preparation & infants",
      "Cascading domino-effect colony eradication",
      "Drain trap biological enzyme barrier"
    ],
    badge: "Zero Odour",
    guarantee: "Single Service 90-Day Protection",
    popularFor: "Kitchens, Restaurants & Luxury Residences"
  },
  {
    id: "rodent-control",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Rodent Control & Smart Sonic Exclusion",
    seoKeyword: "Rodent Control Services Delhi",
    icon: Activity,
    description: "Multi-layered rodent management combining ultrasonic frequency repellers, tamper-proof bait stations, and architectural entry point sealing.",
    features: [
      "Ultrasonic multi-frequency transducer pulse",
      "Tamper-proof lockable bait stations",
      "Copper mesh & silicone entry sealing",
      "Zero carcass decay smell protocol"
    ],
    badge: "Smart Sensor Tech",
    guarantee: "360° Structural Rodent Barrier",
    popularFor: "Warehouses, Server Rooms, Offices & Homes"
  },
  {
    id: "mosquito-control",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Mosquito Bio-Larvicide & Thermal Fogging",
    seoKeyword: "Mosquito Control Services Delhi NCR",
    icon: Droplets,
    description: "Targeted bio-larvicide water treatment and outdoor botanical thermal fogging to eliminate Dengue, Chikungunya, and Malaria threats.",
    features: [
      "CPCB approved eco bio-larvicides",
      "Cold-fogging for indoor botanical shield",
      "Stagnant water breeding site destruction",
      "Long-lasting outdoor foliage barrier"
    ],
    badge: "Dengue Shield",
    guarantee: "Immediate 95%+ Vector Population Drop",
    popularFor: "Societies, Gardens, Hotels & Educational Campuses"
  },
  {
    id: "bedbug-treatment",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Bed Bug Thermal & Cryo Vapor Treatment",
    seoKeyword: "Bed Bug Treatment Delhi",
    icon: Flame,
    description: "Superheated dry steam and botanical contact spray penetrating mattress seams, headboards, and furniture crevices.",
    features: [
      "180°C Dry steam thermal egg eradication",
      "Zero toxic residue on linen or mattresses",
      "Deep seam & wall outlet vacuuming",
      "Two-phase guaranteed eradication protocol"
    ],
    badge: "Egg & Nymph Kill",
    guarantee: "Complete Bed Bug Clearance",
    popularFor: "Bedrooms, Hotels, Hostels & PG Accommodations"
  },
  {
    id: "ant-control",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Ant Control & Queen Colony Neutralization",
    seoKeyword: "Ant Control Services Delhi NCR",
    icon: Bug,
    description: "Protein & sugar baiting systems designed to eliminate carpenter ants, red ants, and crazy ants at the queen source.",
    features: [
      "Targeted sweet & protein protein baits",
      "Perimeter foundation barrier spray",
      "Safe for food preparation counters",
      "Prevents re-entry via electrical piping"
    ],
    badge: "Queen Source Kill",
    guarantee: "Long-term Colony Destruction",
    popularFor: "Homes, Pantries, Commercial Kitchens & Gardens"
  },
  {
    id: "bird-control",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Bird Netting & Ultrasonic Spike Barriers",
    seoKeyword: "Bird Netting & Pigeon Control Delhi",
    icon: Feather,
    description: "HDPE UV-stabilized transparent pigeon netting and stainless steel deterrent spikes for balconies, windows, and industrial roofs.",
    features: [
      "100% High-density translucent HDPE netting",
      "316 Stainless steel anti-roosting spikes",
      "Weatherproof, rust-proof & high tensile strength",
      "Zero harm humane bird deterrence"
    ],
    badge: "Humanely Certified",
    guarantee: "3-Year Netting Warranty",
    popularFor: "Balconies, Facades, Factories & Monuments"
  },
  {
    id: "snake-rescue",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Snake Rescue & Reptile Perimeter Barrier",
    seoKeyword: "Snake Rescue & Reptile Repellent Delhi NCR",
    icon: AlertTriangle,
    description: "24/7 emergency certified wildlife handler snake rescue and long-lasting sulfur-free botanical reptile repellents.",
    features: [
      "Certified emergency wildlife rescue dispatch",
      "Non-toxic sulfur-free perimeter repeller granules",
      "Property boundary survey & hiding spot sealing",
      "Safe forest department release protocol"
    ],
    badge: "24/7 Emergency",
    guarantee: "Certified Humane Handler Team",
    popularFor: "Farmhouses, Golf Courses, Estates & Construction Sites"
  },
  {
    id: "disinfection-sanitization",
    category: "specialized",
    categoryName: "Specialized Pest Treatment",
    title: "Disinfection & Medical-Grade Sanitization",
    seoKeyword: "Disinfection Services Delhi NCR",
    icon: Sparkles,
    description: "ULV cold-fogging electrostatic disinfectant misting certified effective against 99.99% of bacteria, viruses, and airborne pathogens.",
    features: [
      "Hospital grade quaternary ammonium mist",
      "Non-corrosive to electronics & fine finishes",
      "Zero dampness fast drying micro-particulate",
      "Ideal for post-infestation cleanup"
    ],
    badge: "99.99% Pathogen Kill",
    guarantee: "ISO 9001 Certified Sanitation",
    popularFor: "Hospitals, Offices, Schools & Residences"
  },

  // COMMERCIAL SECTORS
  {
    id: "commercial-pest-control",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Commercial Pest Control & Audit Compliance",
    seoKeyword: "Commercial Pest Control Delhi NCR",
    icon: Building2,
    description: "Comprehensive IPM (Integrated Pest Management) programs tailored to pass HACCP, FSSAI, ISO, and corporate audits.",
    features: [
      "Audit-ready digital compliance documentation",
      "Barcoded bait station scanning & trend analysis",
      "Dedicated key account manager & entomologist",
      "Off-peak hours discreet night service"
    ],
    badge: "HACCP & FSSAI Ready",
    guarantee: "100% Audit Compliance SLA",
    popularFor: "Corporate Headquarters & Multi-tenant Towers"
  },
  {
    id: "corporate-offices",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Corporate Offices & IT Park Pest Management",
    seoKeyword: "Office Pest Control Services Delhi",
    icon: Building2,
    description: "Zero-disruption, odourless pest defense tailored for open-plan IT workspaces, executive cabins, and server infrastructure.",
    features: [
      "Silent after-hours maintenance",
      "Server room cable rodent protection",
      "Pantry & cafeteria sanitization",
      "Monthly digital pest activity reports"
    ],
    badge: "Zero Office Downtime",
    guarantee: "Silent Night Operations",
    popularFor: "Cyber City Gurugram, Noida Film City & Okhla"
  },
  {
    id: "hotels-hospitality",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Hotels & Luxury Hospitality Pest Defense",
    seoKeyword: "Hotel Pest Control Services Delhi NCR",
    icon: Hotel,
    description: "Discreet luxury hospitality bio-protection ensuring flawless guest reviews, room bed bug immunity, and kitchen hygiene.",
    features: [
      "Discreet unbranded technician vehicles",
      "Rapid guest room bed bug clearance",
      "Kitchen fly trap & cockroach matrix",
      "5-Star guest experience standards"
    ],
    badge: "5-Star Standard",
    guarantee: "Discreet 24/7 Response",
    popularFor: "Boutique Hotels, 5-Star Resorts & Banquet Halls"
  },
  {
    id: "restaurants-cafes",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Restaurants, Cafes & Food Outlets",
    seoKeyword: "Restaurant Pest Control Delhi",
    icon: Utensils,
    description: "FSSAI compliant kitchen pest eradication for food prep areas, grease traps, storage rooms, and dining spaces.",
    features: [
      "Food-grade non-toxic bio gel application",
      "Flying insect light trap installation",
      "Drain fly & gnat larvae treatment",
      "FSSAI food safety audit certificate"
    ],
    badge: "FSSAI Certified",
    guarantee: "100% Inspection Pass Guarantee",
    popularFor: "Connaught Place, CyberHub, Khan Market & Hauz Khas"
  },
  {
    id: "hospitals-healthcare",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Hospitals & Healthcare Facilities",
    seoKeyword: "Hospital Pest Control Services Delhi",
    icon: Hospital,
    description: "Ultra-sensitive, hypoallergenic bio-defense for ICU units, operating theaters, patient rooms, and pharmaceutical stores.",
    features: [
      "100% Chemical-odour free bio-gel & traps",
      "Aseptic sterile zone pest protocols",
      "NABH audit documentation ready",
      "Patient safe botanical formulations"
    ],
    badge: "NABH Compliant",
    guarantee: "Medical Zone Safe",
    popularFor: "Hospitals, Clinics & Diagnostic Labs"
  },
  {
    id: "warehouses-logistics",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Warehouses & Logistics Distribution Hubs",
    seoKeyword: "Warehouse Pest Control Delhi NCR",
    icon: Warehouse,
    description: "Heavy-duty industrial rodent, bird, and storer product pest management for high-capacity fulfillment centers.",
    features: [
      "High-velocity perimeter baiting grids",
      "Automated sensor activity tracking",
      "Pallet & grain beetle fumigation",
      "Large-scale bird netting installations"
    ],
    badge: "Industrial Heavy-Duty",
    guarantee: "Multi-Acre Protection Grid",
    popularFor: "Binola, Farrukhnagar, Greater Noida & Kundli"
  },
  {
    id: "factories-manufacturing",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Factories & Manufacturing Plants",
    seoKeyword: "Industrial Pest Control Company Delhi",
    icon: Factory,
    description: "Customized IPM protocols preventing machinery wire chewing, product contamination, and worker safety hazards.",
    features: [
      "Heavy machinery wire protection",
      "Zero chemical contamination on production line",
      "Perimeter fence subterranean barrier",
      "ISO 22000 / GMP compliant"
    ],
    badge: "GMP Certified",
    guarantee: "24/7 Plant Operational Safety",
    popularFor: "Manesar, Faridabad, Mayapuri & Noida Industrial Area"
  },
  {
    id: "schools-colleges",
    category: "commercial",
    categoryName: "Commercial Sector Solution",
    title: "Schools, Colleges & Educational Campuses",
    seoKeyword: "School Pest Control Delhi NCR",
    icon: GraduationCap,
    description: "Child-safe, non-toxic eco pest management for classrooms, libraries, sports grounds, and student hostels.",
    features: [
      "100% Non-toxic kid-safe green chemicals",
      "Weekend & holiday execution schedule",
      "Canteen & hostel bed bug control",
      "Mosquito bio-larvicide grounds treatment"
    ],
    badge: "Child-Safe Certified",
    guarantee: "Zero Hazardous Residue",
    popularFor: "Schools, Universities, Daycares & Sports Complexes"
  },
  {
    id: "societies-apartments",
    category: "residential_amc",
    categoryName: "Residential & Community",
    title: "Residential Societies & Gated Apartments",
    seoKeyword: "Residential Pest Control Delhi NCR",
    icon: Home,
    description: "Bulk community pricing for RWA (Resident Welfare Associations) covering common areas, shafts, basements, and individual flats.",
    features: [
      "RWA bulk discounted packages",
      "Basement & lift shaft rodent baiting",
      "Park & garden mosquito cold fogging",
      "Dedicated resident booking app portal"
    ],
    badge: "RWA Bulk Discount",
    guarantee: "Entire Society Coverage",
    popularFor: "Dwarka, Gurgaon Expressway, Noida Sectors & Indirapuram"
  },
  {
    id: "villas-farmhouses",
    category: "residential_amc",
    categoryName: "Residential & Community",
    title: "Villas, Farmhouses & High-Value Estates",
    seoKeyword: "Luxury Villa Pest Control Delhi",
    icon: Landmark,
    description: "Bespoke estate bio-defense protecting sprawling lawns, wooden interiors, outdoor swimming pools, and private gazebos.",
    features: [
      "360° Lawn & perimeter bio-shield",
      "Antiquated wood & Italian marble care",
      "Snake & reptile perimeter repel barrier",
      "Quarterly preventive entomology audit"
    ],
    badge: "Estate Elite Tier",
    guarantee: "Custom Property Master Plan",
    popularFor: "Chhatarpur, Vasant Kunj, Golf Links & DLF Phase 1-5"
  },
  {
    id: "annual-maintenance-contracts",
    category: "residential_amc",
    categoryName: "Contracts & Emergency",
    title: "Annual Maintenance Contracts (AMC)",
    seoKeyword: "Pest Control AMC Services Delhi NCR",
    icon: FileCheck2,
    description: "All-inclusive 365-day pest protection with scheduled quarterly visits, free emergency call-outs, and zero unexpected charges.",
    features: [
      "Unlimited free emergency re-visits",
      "4 Scheduled quarterly deep bio-services",
      "Covers Termites, Cockroaches, Rodents & Ants",
      "Priority dispatch in under 2 hours"
    ],
    badge: "365-Day Total Coverage",
    guarantee: "Free Unlimited Call-outs",
    popularFor: "Homes, Offices, Showrooms & Retail Outlets"
  },
  {
    id: "emergency-pest-response",
    category: "residential_amc",
    categoryName: "Contracts & Emergency",
    title: "24/7 Emergency Pest Response Dispatch",
    seoKeyword: "Emergency Pest Control Service Delhi",
    icon: ShieldAlert,
    description: "Rapid deployment strike team for sudden infestations, severe wasp nests, snake spottings, or pre-event venue emergencies.",
    features: [
      "Guaranteed dispatch under 120 minutes",
      "Equipped with specialized containment gear",
      "24/7 Hotline hotline dispatch line",
      "Discreet unmarked emergency unit"
    ],
    badge: "< 2 Hour Dispatch",
    guarantee: "Rapid Eradication SLA",
    popularFor: "Events, VIP Visits, Sudden Infestations & Wildlife"
  }
];

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilter === "all") return true;
    return service.category === activeFilter;
  });

  return (
    <section id="services" className="py-24 bg-[#05070a] relative border-t border-white/10 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OUR SERVICES • DELHI NCR'S PREMIUM PEST CONTROL COMPANY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive Pest Control & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              Bio-Defense Services
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans max-w-3xl mx-auto">
            Providing the <strong className="text-white">Best Pest Control Services in Delhi NCR</strong> with 100% eco-friendly, CPCB & EPA green certified protocols. From residential homes to large-scale commercial facilities, we eliminate pests with scientific precision.
          </p>
        </div>

        {/* Interactive Home Entry Points Radar Diagram */}
        <div className="mt-12 mb-14">
          <InteractiveHomeRadar />
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl max-w-full">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeFilter === "all"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>

            <button
              onClick={() => setActiveFilter("specialized")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeFilter === "specialized"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Specialized Treatments
            </button>

            <button
              onClick={() => setActiveFilter("commercial")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeFilter === "commercial"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Commercial Sectors
            </button>

            <button
              onClick={() => setActiveFilter("residential_amc")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeFilter === "residential_amc"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Residential & AMC
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Shimmer Light Sweep Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-10">
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: [0, 0.45, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -skew-x-12"
                  />
                </div>

                {/* Subtle Hover Gradient Ambient Glow */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Card Header Badge & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider text-right">
                      {service.badge}
                    </span>
                  </div>

                  {/* Category Name */}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold block mb-1">
                    {service.categoryName}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-sans leading-snug mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  {service.popularFor && (
                    <div className="text-[11px] font-mono text-slate-400">
                      <span className="text-emerald-400 font-bold">Ideal For:</span> {service.popularFor}
                    </div>
                  )}

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 text-white hover:text-slate-950 border border-white/10 hover:border-emerald-400 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 group/btn cursor-pointer"
                  >
                    <span>Book Instant Service</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Delhi NCR Service Coverage Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>EXPRESS PEST CONTROL DISPATCH NETWORK • DELHI NCR COVERAGE</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-white">
            Pest Control Company Serving Entire Delhi NCR & Suburbs
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm font-mono max-w-4xl mx-auto leading-relaxed">
            <strong className="text-emerald-300">Delhi</strong> • <strong className="text-emerald-300">New Delhi</strong> • <strong className="text-emerald-300">Gurugram (Cyber City, Golf Course Road, Sohna Road)</strong> • <strong className="text-emerald-300">Noida & Greater Noida</strong> • <strong className="text-emerald-300">Ghaziabad & Indirapuram</strong> • <strong className="text-emerald-300">Faridabad</strong> • <strong className="text-emerald-300">Sonipat</strong> • <strong className="text-emerald-300">Bahadurgarh</strong>
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-2xl bg-emerald-400 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Emergency Pest Service Now</span>
            </button>
          </div>
        </div>

        {/* Scroll To Top Button */}
        <ScrollToTopButton label="Back to Top" />
      </div>
    </section>
  );
}
