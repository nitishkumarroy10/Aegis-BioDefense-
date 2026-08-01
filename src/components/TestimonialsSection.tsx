import React, { useState, useRef } from "react";
import ProgressiveImage from "./ProgressiveImage";
import ScrollToTopButton from "./ScrollToTopButton";
import {
  Play,
  Pause,
  Star,
  Quote,
  CheckCircle2,
  Building2,
  Home,
  Hotel,
  Hospital,
  ShieldCheck,
  Volume2,
  VolumeX,
  X,
  Clock,
  MapPin,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  FileText,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TestimonialsSectionProps {
  onOpenBooking: () => void;
}

type TestimonialCategory = "all" | "residential" | "commercial" | "hospitality" | "healthcare";

interface TestimonialItem {
  id: string;
  category: "residential" | "commercial" | "hospitality" | "healthcare";
  categoryLabel: string;
  clientName: string;
  clientRole: string;
  companyOrLocation: string;
  avatarUrl: string;
  videoThumbnail: string;
  videoUrl: string; // HTML5 video sample or fallback
  duration: string;
  rating: number;
  headline: string;
  quote: string;
  keyResult: string;
  verifiedService: string;
  locationTag: string;
  dateAdded: string;
  fullTranscript: string;
  caseStudyMetrics: {
    label: string;
    value: string;
  }[];
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "dlf-villa-case-study",
    category: "residential",
    categoryLabel: "Residential Estate",
    clientName: "Vikramjit Singh Kapoor",
    clientRole: "Estate Owner & Architect",
    companyOrLocation: "DLF Phase 5 Golf Links, Gurugram",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "1:42",
    rating: 5,
    headline: "Saved Our 14,000 Sq Ft Wooden Estate Without a Single Drill Hole",
    quote: "When subterranean termites threatened our imported Italian teak woodwork, traditional companies suggested drilling holes across the entire marble floor. Aegis used subterranean acoustic radar and botanical barriers. Zero drill marks, zero smell, 100% elimination.",
    keyResult: "100% Termite Elimination & Structural Warranty Active",
    verifiedService: "Drill-Free Subterranean Termite Barrier",
    locationTag: "DLF Phase 5 • Gurugram",
    dateAdded: "July 2026",
    fullTranscript: "We invested over three years constructing our 14,000 square foot residence in DLF Golf Links, utilizing custom teak panels and Italian Statuario marble. When we noticed acoustic signals of subterranean termites near the library skirting, we were panicked. Three legacy pest control companies in Delhi insisted on invasive floor-drilling every two feet. Aegis BioDefense arrived with non-invasive acoustic sensors and micro-encapsulated subterranean barrier tech. They pinpointed the exact colony depth and eradicated it within 72 hours without touching a single marble tile. Their 10-year structural warranty gives us complete peace of mind.",
    caseStudyMetrics: [
      { label: "Colony Elimination Time", value: "72 Hours" },
      { label: "Floor Integrity Preserved", value: "100% Drill-Free" },
      { label: "Warranty Coverage", value: "Comprehensive Structural" }
    ]
  },
  {
    id: "cyber-city-office",
    category: "commercial",
    categoryLabel: "Corporate Tech Park",
    clientName: "Ananya Deshmukh",
    clientRole: "VP of Workplace Operations",
    companyOrLocation: "Cyber City HQ (850,000 Sq Ft Tower), Gurugram",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "2:05",
    rating: 5,
    headline: "Passed ISO & Corporate Health Audits With Zero Office Downtime",
    quote: "Managing an 850,000 sq ft office facility with over 6,000 employees requires flawless precision. Aegis conducts silent night maintenance with barcoded bait stations and real-time digital compliance logs. They are in a class of their own.",
    keyResult: "Zero Work Disruptions & 100% Audit Pass Rate",
    verifiedService: "Commercial AMC & Digital Rodent Matrix",
    locationTag: "Cyber City • Gurugram",
    dateAdded: "June 2026",
    fullTranscript: "In high-density corporate environments, a single rodent incident or chemical spray smell during business hours can halt operations and cause severe reputational harm. Aegis designed a customized IPM protocol with ultrasonic pulse barriers for server rooms, barcoded bait stations, and automated digital activity reports. Their technicians execute all treatments past midnight on weekends, leaving the office completely odorless and pristine for Monday morning. Their digital dashboard makes our annual ISO audit effortless.",
    caseStudyMetrics: [
      { label: "Facility Footprint", value: "850k Sq Ft" },
      { label: "Audit Pass Rate", value: "100% Grade A" },
      { label: "Office Downtime", value: "0 Minutes" }
    ]
  },
  {
    id: "taj-hospitality-review",
    category: "hospitality",
    categoryLabel: "Luxury Hospitality",
    clientName: "Chef Raghavendra Sharma",
    clientRole: "Executive Chef & F&B Director",
    companyOrLocation: "5-Star Heritage Hotel & Fine Dining, New Delhi",
    avatarUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "1:55",
    rating: 5,
    headline: "Food-Grade Kitchen Safety Certified for FSSAI & HACCP Inspections",
    quote: "In 5-star fine dining kitchens, pest control must be 100% food-grade safe, odorless, and ultra-discreet. Aegis bio-gel matrix and drain enzyme treatments keep our prep kitchens 100% pest-free without chemical fumes.",
    keyResult: "FSSAI & HACCP Gold Standard Certified",
    verifiedService: "Food-Grade Kitchen Bio-Defense & AMC",
    locationTag: "Diplomatic Enclave • New Delhi",
    dateAdded: "May 2026",
    fullTranscript: "Kitchen hygiene in a world-class luxury hotel is non-negotiable. Standard pest sprays leave chemical residues near food surfaces, which is unacceptable under FSSAI and HACCP standards. Aegis BioDefense introduced non-toxic micro-dot bio-gel matrix systems and biological drain fly treatments that target pests at the root without polluting the air or prep counters. Their technicians wear sterile uniforms and work during our late-night sanitation window. We have maintained a flawless 5-star inspection rating for three consecutive years thanks to Aegis.",
    caseStudyMetrics: [
      { label: "FSSAI Score", value: "100 / 100" },
      { label: "Odor Level", value: "0% Chemical Fumes" },
      { label: "Kitchen Coverage", value: "12 Prep Outlets" }
    ]
  },
  {
    id: "fortis-hospital-case",
    category: "healthcare",
    categoryLabel: "Healthcare & ICU",
    clientName: "Dr. Meera Nambiar",
    clientRole: "Chief Medical Officer & Operations Lead",
    companyOrLocation: "Multi-Specialty Super Hospital, Noida Sector 62",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoywatches.mp4",
    duration: "2:10",
    rating: 5,
    headline: "Ultra-Sensitive Hypoallergenic Bio-Defense for Sterile ICU Zones",
    quote: "Patient safety is paramount. Chemical sprays can cause respiratory distress in critical care units. Aegis non-chemical ultrasonic barriers and cold-fogging sanitization keep our 500-bed facility 100% compliant with NABH standards.",
    keyResult: "NABH Hospital Accreditation Passed with Honors",
    verifiedService: "Medical-Grade Hypoallergenic Pest Control",
    locationTag: "Sector 62 • Noida",
    dateAdded: "April 2026",
    fullTranscript: "Hospitals represent the most complex pest management environment because patients with compromised immune systems and respiratory conditions reside here 24/7. Traditional pesticides pose severe health hazards in ICU and neonatal wards. Aegis designed a hypoallergenic bio-shield strategy utilizing non-chemical ultrasonic pulse networks, sterile gel application, and botanical cold fogging. Their protocol passed our strict infection control committee review with unanimous approval.",
    caseStudyMetrics: [
      { label: "Bed Capacity", value: "500 Beds" },
      { label: "Patient Risk Rating", value: "Zero Chemical Fumes" },
      { label: "NABH Compliance", value: "100% Certified" }
    ]
  },
  {
    id: "camellias-rwa-review",
    category: "residential",
    categoryLabel: "Residential Condominium",
    clientName: "Rajiv Malhotra",
    clientRole: "RWA President & Community Lead",
    companyOrLocation: "Camellias Luxury Condominium, Golf Course Road",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "1:35",
    rating: 5,
    headline: "Complete Mosquito & Basement Rodent Control for 400 Luxury Units",
    quote: "Mosquitoes near the water bodies and basements were a persistent issue for our residents during monsoon. Aegis bio-larvicide spraying and automated basement rodent barriers eliminated 98% of vectors in under 10 days.",
    keyResult: "98% Vector Reduction & 400 Families Satisfied",
    verifiedService: "Community Bulk AMC & Bio-Larvicide Treatment",
    locationTag: "Golf Course Road • Gurugram",
    dateAdded: "March 2026",
    fullTranscript: "As an RWA managing 400 ultra-luxury residences, our residents expect world-class amenities and zero pest annoyances. Previous vendors used harsh, smelly thermal fogging that bothered residents on morning walks. Aegis introduced eco-safe bio-larvicide water drops and cold-fogging botanical mists that target mosquito larvae without smoke or chemical smell. They also secured all 3 basement parking levels against rodents. Our resident feedback scores jumped to 99.4% positive.",
    caseStudyMetrics: [
      { label: "Units Covered", value: "400 Luxury Flats" },
      { label: "Vector Drop", value: "98% Reduction" },
      { label: "Resident Rating", value: "4.98 / 5.0" }
    ]
  }
];

export default function TestimonialsSection({ onOpenBooking }: TestimonialsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TestimonialCategory>("all");
  const [activeModalItem, setActiveModalItem] = useState<TestimonialItem | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const filteredTestimonials = TESTIMONIALS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const toggleInlinePlay = (id: string) => {
    if (playingVideoId === id) {
      if (videoRefs.current[id]) {
        videoRefs.current[id]?.pause();
      }
      setPlayingVideoId(null);
    } else {
      // Pause any currently playing
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        videoRefs.current[playingVideoId]?.pause();
      }
      setPlayingVideoId(id);
      if (videoRefs.current[id]) {
        videoRefs.current[id]?.play().catch(() => {});
      }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#05070a] relative border-t border-white/10 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>CLIENT SUCCESS STORIES • VERIFIED VIDEO CASE STUDIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Trusted by Delhi NCR’s Most <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              Prestigious Estates & Brands
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans max-w-3xl mx-auto">
            Hear directly from estate owners, corporate facility heads, hospitality chefs, and medical directors about why Aegis BioDefense is Delhi NCR’s #1 choice for non-toxic pest management.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl max-w-full">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === "all"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All Video Stories ({TESTIMONIALS.length})
            </button>

            <button
              onClick={() => setActiveCategory("residential")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === "residential"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Residential & Estates
            </button>

            <button
              onClick={() => setActiveCategory("commercial")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === "commercial"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Corporate HQs
            </button>

            <button
              onClick={() => setActiveCategory("hospitality")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === "hospitality"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Luxury Hospitality
            </button>

            <button
              onClick={() => setActiveCategory("healthcare")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === "healthcare"
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Healthcare Facilities
            </button>
          </div>
        </div>

        {/* Video Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredTestimonials.map((item) => {
            const isPlaying = playingVideoId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative bg-slate-900/90 border border-white/10 hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between hover:shadow-emerald-500/20"
              >
                {/* Shimmer Light Sweep Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-30">
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileHover={{ x: "200%", opacity: [0, 0.45, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -skew-x-12"
                  />
                </div>

                <div>
                  {/* Video Thumbnail Box */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 group/video cursor-pointer">
                    {/* HTML5 Video element */}
                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      src={item.videoUrl}
                      poster={item.videoThumbnail}
                      muted={isMuted}
                      loop
                      playsInline
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isPlaying ? "scale-100" : "group-hover/video:scale-105"
                      }`}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md">
                        {item.categoryLabel}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-950/80 text-white text-[10px] font-mono font-semibold flex items-center space-x-1 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{item.duration}</span>
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div
                      onClick={() => setActiveModalItem(item)}
                      className="absolute inset-0 flex items-center justify-center z-20 group/play"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-slate-950 border-2 border-emerald-300 flex items-center justify-center shadow-2xl shadow-emerald-500/50 group-hover/play:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 ml-1" />
                      </div>
                    </div>

                    {/* Bottom Location & Verified Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 z-10 pointer-events-none">
                      <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.locationTag}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 text-[9px] font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>VERIFIED CLIENT</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Star Rating & Headline */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                        <span className="text-xs font-mono text-slate-400 ml-1 font-bold">5.0 / 5.0</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-sans leading-snug line-clamp-2">
                        "{item.headline}"
                      </h3>
                    </div>

                    {/* Client Quote Excerpt */}
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 italic">
                      "{item.quote}"
                    </p>

                    {/* Key Result Banner */}
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{item.keyResult}</span>
                    </div>

                    {/* Client Profile Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center space-x-3">
                      <ProgressiveImage
                        src={item.avatarUrl}
                        alt={item.clientName}
                        containerClassName="w-10 h-10 rounded-full border border-emerald-500/40 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white font-mono truncate">
                          {item.clientName}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono truncate">
                          {item.clientRole}
                        </p>
                        <p className="text-[10px] text-emerald-400/90 font-mono truncate font-semibold">
                          {item.companyOrLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Watch Full Case Study Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 text-white hover:text-slate-950 border border-white/10 hover:border-emerald-400 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group/btn"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Full Video Story</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Trust Bar */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center shadow-2xl backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Star className="w-6 h-6 fill-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">4.98 / 5.0</div>
              <div className="text-xs text-slate-400 font-mono">2,840+ Verified Reviews</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">650+ Commercial</div>
              <div className="text-xs text-slate-400 font-mono">HQs, Hotels & Hospitals</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">100% Guaranteed</div>
              <div className="text-xs text-slate-400 font-mono">10-Yr Termite Warranty</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">CPCB & EPA</div>
              <div className="text-xs text-slate-400 font-mono">Green Certified Eco-Tech</div>
            </div>
          </div>
        </div>

        {/* Scroll To Top Button */}
        <ScrollToTopButton label="Back to Top" />
      </div>

      {/* Full-Screen Interactive Video Testimonial Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-[#090D16] border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/90 shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                      VERIFIED CLIENT CASE STUDY • {activeModalItem.categoryLabel}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white uppercase font-mono">
                      {activeModalItem.clientName} — {activeModalItem.companyOrLocation}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Embedded Large Video Player Container */}
                <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <video
                    src={activeModalItem.videoUrl}
                    poster={activeModalItem.videoThumbnail}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Metrics Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeModalItem.caseStudyMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-center space-y-1"
                    >
                      <div className="text-xs font-mono text-slate-400 uppercase">{metric.label}</div>
                      <div className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Case Study Details */}
                <div className="space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase font-bold">
                    <FileText className="w-4 h-4" />
                    <span>Case Study Overview & Client Statement</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">"{activeModalItem.headline}"</h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {activeModalItem.fullTranscript}
                  </p>
                  <div className="pt-2 text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">Service Deployed:</span> {activeModalItem.verifiedService} • {activeModalItem.locationTag}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div className="text-xs font-mono text-slate-400">
                    Need similar results for your residence or commercial facility?
                  </div>
                  <button
                    onClick={() => {
                      setActiveModalItem(null);
                      onOpenBooking();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs font-extrabold uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Schedule Free Inspection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
