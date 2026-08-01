import React from "react";
import ProgressiveImage from "./ProgressiveImage";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Home,
  Hotel,
  Hospital,
  Landmark,
  Plane,
  Factory,
  HardHat,
  Flame
} from "lucide-react";
import { motion } from "motion/react";

import imgResidential from "../assets/images/sec_residential_1785567041607.jpg";
import imgCommercial from "../assets/images/sec_commercial_1785567054172.jpg";
import imgHospitality from "../assets/images/sec_hospitality_1785567071052.jpg";
import imgHealthcare from "../assets/images/sec_healthcare_1785567085958.jpg";
import imgGovernment from "../assets/images/sec_government_1785567101748.jpg";
import imgAirport from "../assets/images/sec_airport_1785567114022.jpg";
import imgIndustrial from "../assets/images/sec_industrial_1785567125464.jpg";
import imgConstruction from "../assets/images/sec_construction_1785567140302.jpg";
import imgTermite from "../assets/images/sec_termite_1785567154656.jpg";

interface SectorsShowcaseProps {
  onOpenBooking: () => void;
}

interface SectorItem {
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
}

const SECTORS: SectorItem[] = [
  {
    number: "01",
    title: "Residential Pest Protection",
    subtitle: "Villa Garden Fogging & Luxury Home Shield",
    badge: "Child & Pet Safe",
    icon: Home,
    description: "Botanical mosquito thermal fogging and organic pest defense tailored for luxury villas, apartments, farmhouses, and gated residential estates across Delhi NCR.",
    features: [
      "100% Odourless, non-toxic & hypoallergenic",
      "CPCB & EPA green certified botanical mists",
      "360° Lawn & outdoor estate perimeter protection",
      "Zero-mess application around children & pets"
    ],
    imageSrc: imgResidential,
    imageAlt: "Aegis BioDefense specialist conducting villa garden botanical fogging in luxury residential estate"
  },
  {
    number: "02",
    title: "Commercial Pest Management",
    subtitle: "Shopping Mall Atrium & Retail Complex Control",
    badge: "FSSAI & HACCP Ready",
    icon: Building2,
    description: "Multi-tenant retail complexes, shopping malls, and corporate towers protected with audit-ready digital compliance logging and off-peak night operations.",
    features: [
      "Audit-ready digital compliance documentation",
      "Barcoded bait station scanning & trend logs",
      "Discreet off-peak overnight execution",
      "Dedicated senior entomologist account manager"
    ],
    imageSrc: imgCommercial,
    imageAlt: "Aegis BioDefense specialist operating pest management in high-end shopping mall atrium"
  },
  {
    number: "03",
    title: "Hospitality Bio-Defense",
    subtitle: "Hotel & Restaurant Hygiene Compliance",
    badge: "5-Star Standard",
    icon: Hotel,
    description: "Discreet 5-star hotel and fine dining hygiene compliance featuring odourless German cockroach gel baiting, bed bug immunity, and zero guest disruption.",
    features: [
      "Discreet unbranded technician vehicles",
      "Rapid guest room bed bug heat eradication",
      "Food-grade cockroach gel matrix application",
      "100% FSSAI kitchen audit pass guarantee"
    ],
    imageSrc: imgHospitality,
    imageAlt: "Aegis BioDefense specialist inspecting luxury hotel room & restaurant kitchen"
  },
  {
    number: "04",
    title: "Healthcare Pest Management",
    subtitle: "Hospital ICU, Operating Theaters & Cleanrooms",
    badge: "NABH & WHO Grade",
    icon: Hospital,
    description: "Medical-grade, hypoallergenic bio-defense for ICUs, surgical suites, and diagnostic labs adhering strictly to WHO and NABH cleanroom protocols.",
    features: [
      "100% Odourless & non-corrosive formulations",
      "Aseptic sterile zone bio-fogging protocol",
      "NABH & ISO audit documentation ready",
      "Safe around sensitive life-support systems"
    ],
    imageSrc: imgHealthcare,
    imageAlt: "Aegis BioDefense expert in hospital ICU hallway with medical-grade stainless steel tank"
  },
  {
    number: "05",
    title: "Government Infrastructure",
    subtitle: "India Gate Garden & Diplomatic Office Protection",
    badge: "High Security Standard",
    icon: Landmark,
    description: "High-security bio-defense and public space vector control for national monuments, government secretariats, and diplomatic headquarters in Lutyens Delhi.",
    features: [
      "High-security cleared bio-defense personnel",
      "Botanical public park vector eradication",
      "Heritage architectural preservation care",
      "Continuous government facility monitoring"
    ],
    imageSrc: imgGovernment,
    imageAlt: "Aegis BioDefense technician in black uniform near India Gate monument during garden pest treatment"
  },
  {
    number: "06",
    title: "Airport & Aviation",
    subtitle: "Airport Departures & Baggage Terminal Defense",
    badge: "24/7 Airside SLA",
    icon: Plane,
    description: "Continuous perimeter vector control and rodent exclusion for international airport terminals, passenger lounges, and air cargo hangars.",
    features: [
      "24/7 Barcode-tracked rodent telemetry grid",
      "Zero-downtime, non-interfering application",
      "Airside security cleared specialist crew",
      "Humane bird netting & ultrasonic repellers"
    ],
    imageSrc: imgAirport,
    imageAlt: "Aegis BioDefense specialist carrying out airport terminal pest control in departures lounge"
  },
  {
    number: "07",
    title: "Industrial Bio-Defense",
    subtitle: "Industrial Factory & Logistics Warehouse Barrier",
    badge: "ISO 22000 Certified",
    icon: Factory,
    description: "Heavy-duty pest barrier systems for food processing plants, pharmaceutical manufacturing, and high-volume automated fulfillment centers.",
    features: [
      "Heavy machinery wiring rodent protection",
      "Zero chemical contamination on assembly lines",
      "Perimeter subterranean barrier trenches",
      "ISO 22000 & GMP compliant audit trails"
    ],
    imageSrc: imgIndustrial,
    imageAlt: "Aegis BioDefense technician conducting inspection in automated industrial factory"
  },
  {
    number: "08",
    title: "Construction Protection",
    subtitle: "Pre-Construction Anti-Termite Soil Treatment",
    badge: "15-Year Structural SLA",
    icon: HardHat,
    description: "Deep soil chemical barrier treatment during foundation excavation and plinth construction, creating an impenetrable anti-termite shield before slab pouring.",
    features: [
      "CPCB approved long-acting termiticides",
      "15-Year structural damage warranty",
      "Multi-stage soil trenching & foundation spray",
      "Structural engineer digital certification"
    ],
    imageSrc: imgConstruction,
    imageAlt: "Aegis BioDefense specialist carrying out pre-construction subterranean soil treatment"
  },
  {
    number: "09",
    title: "Advanced Termite Treatment",
    subtitle: "Subterranean Acoustic Radar & Marble Protection",
    badge: "10-Year Warranty",
    icon: Flame,
    description: "Non-destructive subterranean termite eradication using imported acoustic sensors and non-repellent transfer chemistry without drilling fine Italian marble.",
    features: [
      "Subterranean acoustic radar cavity detection",
      "Zero-drilling imported marble preservation",
      "10-Year transferable damage warranty",
      "100% Queen colony elimination guarantee"
    ],
    imageSrc: imgTermite,
    imageAlt: "Aegis BioDefense technician detecting subterranean termites with acoustic radar scanner"
  }
];

function SectorsShowcase({ onOpenBooking }: SectorsShowcaseProps) {
  return (
    <section id="solutions" className="py-20 sm:py-28 bg-[#05070a] relative border-t border-white/10 overflow-hidden">
      {/* Subtle background glow accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase shadow-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>EXPERT SECTOR SOLUTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Targeted Bio-Defense Across <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              Every Core Sector
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans">
            From high-end luxury residences to critical airport infrastructure and government secretariat facilities, Aegis BioDefense delivers specialized, audit-ready pest management.
          </p>
        </div>

        {/* Alternating Sections List */}
        <div className="space-y-20 sm:space-y-28">
          {SECTORS.map((sector, index) => {
            // Layout Pattern: Section 1 (Image Left), Section 2 (Content Left), Section 3 (Image Left)...
            const isImageLeft = index % 2 === 0;

            return (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isImageLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Card Column */}
                <div className="w-full lg:w-1/2 shrink-0">
                  <div className="relative group p-2 sm:p-2.5 bg-slate-900/60 border border-white/15 rounded-[22px] backdrop-blur-md shadow-2xl shadow-emerald-950/30 overflow-visible">
                    <div className="relative rounded-[20px] overflow-visible aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900">
                      <ProgressiveImage
                        src={sector.imageSrc}
                        alt={sector.imageAlt}
                        loading={index === 0 ? "eager" : "lazy"}
                        containerClassName="absolute inset-0 w-full h-full"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                      {/* Subtle dark gradient overlay on bottom of card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 pointer-events-none" />

                      {/* Top Corner Sector Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-xl shadow-lg flex items-center space-x-1.5">
                        <sector.icon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{sector.badge}</span>
                      </div>

                      {/* Bottom Number Marker */}
                      <div className="absolute bottom-4 right-4 font-mono text-3xl font-extrabold text-white/30 tracking-tighter">
                        {sector.number}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <div className="inline-flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{sector.subtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                    {sector.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {sector.description}
                  </p>

                  <ul className="space-y-2.5 py-2">
                    {sector.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <button
                      onClick={onOpenBooking}
                      className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-slate-900 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 font-mono text-xs uppercase font-extrabold tracking-wider transition-all shadow-xl group cursor-pointer min-h-[44px]"
                    >
                      <span>Book {sector.title}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default React.memo(SectorsShowcase);
