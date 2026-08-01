export interface ServiceDetail {
  id: string;
  name: string;
  category: "Pest Defense" | "Wildlife Rescue" | "Bio-Sanitation";
  iconName: string;
  tagline: string;
  description: string;
  techHighlights: string[];
  recommendedTiers: string[];
  caseStudyHighlight: string;
}

export interface IndustryDetail {
  id: string;
  name: string;
  sectorType: "Commercial" | "Residential" | "Institutional" | "Industrial";
  challenge: string;
  aegisSolution: string;
  complianceStandard: string;
  keyClients: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: "Entomology Research" | "Estate Maintenance" | "Green Engineering";
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  tag: string;
  description: string;
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: "termite",
    name: "Termite Colony Eradication",
    category: "Pest Defense",
    iconName: "ShieldAlert",
    tagline: "Sub-Slab Acoustic Radar & Zero-Drill Bio-Barrier",
    description: "Detects termite activity inside walls and slab foundations using subterranean acoustic frequency sensors. Eliminates subterranean and drywood termite colonies with zero drilling into hardwood or marble floors.",
    techHighlights: [
      "Seismic Acoustic Radar Wall Scanners",
      "Non-Repellent Chitin Synthesis Inhibitors",
      "Sub-Slab Pheromone Colony Interception",
      "Comprehensive Structural Repair Guarantee"
    ],
    recommendedTiers: ["Aegis Thermal & Acoustic", "Omni-Shield Sovereign"],
    caseStudyHighlight: "DLF Golf Course Road Estate saved $2.4M in Italian marble floor restoration."
  },
  {
    id: "mosquito",
    name: "Mosquito Eco-Barrier & Larvicidal Disruption",
    category: "Pest Defense",
    iconName: "Wind",
    tagline: "Automated Lawn Micro-Misting & Pheromone Neutralization",
    description: "Erases mosquito breeding grounds and repels adult swarms through botanical micro-encapsulation misting systems optimized for Delhi NCR & humid estate lawns.",
    techHighlights: [
      "Zero-Toxic Plant Essential Micro-Emulsions",
      "BTI Biological Larvicide Water Matrix",
      "Automated Dusk/Dawn Micro-Misting Networks",
      "Complete Dengue, Chikungunya & Zika Prevention"
    ],
    recommendedTiers: ["Core Perimeter Shield", "Omni-Shield Sovereign"],
    caseStudyHighlight: "100% mosquito elimination across 5-acre Chanakyapuri diplomatic compound."
  },
  {
    id: "rodent",
    name: "Rodent Ultrasonic & Acoustic Exclusion",
    category: "Pest Defense",
    iconName: "Zap",
    tagline: "Variable-Frequency Acoustic Wave & Bio-Mesh Sealing",
    description: "Prevents roof rats, sewer rats, and bandicoots from entering server rooms, attics, and kitchens using continuous sweep ultrasonic emitters and stainless bio-mesh entry guards.",
    techHighlights: [
      "22 kHz - 65 kHz Swept-Frequency Transducers",
      "Stainless Steel High-Density Bio-Mesh Entry Guards",
      "Tamper-Proof Real-Time Telemetry Trap Stations",
      "Zero Hazardous Chemical Baits or Odors"
    ],
    recommendedTiers: ["Aegis Thermal & Acoustic", "Omni-Shield Sovereign"],
    caseStudyHighlight: "Eradicated server room rodent breaches at CyberCity Gurgaon IT Park."
  },
  {
    id: "bed-bugs",
    name: "Bed Bug Thermal Bio-Eradication",
    category: "Pest Defense",
    iconName: "Flame",
    tagline: "100% Egg & Nymph Heat-Chamber Elimination in 1 Session",
    description: "Utilizes thermodynamic convection heat treatment combined with botanical micro-crystalline powder barriers to penetrate mattresses, upholstery, and wall joints with zero chemical residue.",
    techHighlights: [
      "Structural Convection Thermal Penetration (122°F / 50°C)",
      "Zero Chemical Stain or Odor Guarantee",
      "Complete Elimination of Pesticide-Resistant Strain Eggs",
      "180-Day Guarantee With Real-time Re-inspection"
    ],
    recommendedTiers: ["Core Perimeter Shield", "Aegis Thermal & Acoustic"],
    caseStudyHighlight: "Cleared 45 luxury guest suites at Aerocity Hotel in a single 6-hour window."
  },
  {
    id: "cockroach",
    name: "Cockroach Nano-Encapsulated Bio-Matrix",
    category: "Pest Defense",
    iconName: "Bug",
    tagline: "Targeted Domino Colony Transfer & Drain Sterilization",
    description: "Deploys odourless bio-gel matrix and micro-encapsulated spray along drainage networks, kitchen plinths, and electrical conduits for long-term domino colony eradication.",
    techHighlights: [
      "Targeted Domino Bio-Gel Matrix Baiting",
      "Drainage & Pipe Trench Hydro-Foam Sterilization",
      "Non-Staining Botanical Olfactory Disrupter",
      "Safe for Commercial Food Preparation & Residential Kitchens"
    ],
    recommendedTiers: ["Core Perimeter Shield", "Aegis Thermal & Acoustic"],
    caseStudyHighlight: "FSSAI A+ rating achieved for 12 fine-dining restaurants across Khan Market."
  },
  {
    id: "snake-rescue",
    name: "Snake Rescue & Venomous Wildlife Relocation",
    category: "Wildlife Rescue",
    iconName: "Shield",
    tagline: "24/7 Humane Rescue, Habitat Audit & Eco-Repellent",
    description: "Certified wildlife herpetologists respond under 30 minutes to safely capture and relocate cobras, vipers, and pythons to forest reserves, followed by perimeter vibration repellent installation.",
    techHighlights: [
      "Under 30-Minute Guaranteed Emergency Dispatch",
      "Certified Herpetologist Wildlife Sanctuary Transfer",
      "Subterranean Seismic Vibration Repellent Stakes",
      "Perimeter Serpent Olfactory Barrier Treatment"
    ],
    recommendedTiers: ["Omni-Shield Sovereign"],
    caseStudyHighlight: "Rescued spectacled cobra from Chattarpur farmhouse lawn within 18 minutes."
  },
  {
    id: "bird-control",
    name: "Bird Control & Optical Laser Arrays",
    category: "Pest Defense",
    iconName: "Feather",
    tagline: "Invisible Netting, Stainless Spikes & Optical Deterrents",
    description: "Protects architectural facades, glass domes, balconies, and solar panels from pigeon and crow roosting without harming birds or aesthetic integrity.",
    techHighlights: [
      "UV-Stabilized High-Density Invisible Polyethylene Netting",
      "Automated Green Optical Laser Sweepers for Roofs",
      "316-Grade Stainless Steel Architectural Anti-Roost Spikes",
      "Ultrasonic Bio-Acoustic Distress Frequency Units"
    ],
    recommendedTiers: ["Aegis Thermal & Acoustic", "Omni-Shield Sovereign"],
    caseStudyHighlight: "Protected 8,000 sq ft solar array on Gurgaon corporate HQ with zero drop in energy output."
  },
  {
    id: "disinfection",
    name: "Hospital-Grade Bio-Disinfection & Cold Fogging",
    category: "Bio-Sanitation",
    iconName: "Sparkles",
    tagline: "Ultrasonic Cold-Fogging & Nanometer Anti-Pathogen Shield",
    description: "Decontaminates interior air and high-touch surfaces from viruses, bacteria, spores, and mold using hospital-grade organic peracetic hydrogen peroxide misting.",
    techHighlights: [
      "Sub-Micron Cold Fogging Aeration",
      "Log-6 (99.9999%) Bacterial & Viral Pathogen Reduction",
      "Persistent Monomolecular Antimicrobial Surface Coating",
      "Zero Toxic Fumes – Safe for Immediate Re-entry in 30 Mins"
    ],
    recommendedTiers: ["Core Perimeter Shield", "Aegis Thermal & Acoustic"],
    caseStudyHighlight: "Sanitized 120,000 sq ft embassy facility following high-level diplomatic summit."
  }
];

export const INDUSTRIES_LIST: IndustryDetail[] = [
  {
    id: "commercial",
    name: "Commercial HQs & Tech Parks",
    sectorType: "Commercial",
    challenge: "High footfall, server room wire gnawing, cafeteria pest risks, and strict corporate ESG compliance requirements.",
    aegisSolution: "Subterranean acoustic radar monitoring, silent ultrasonic ceiling nodes, and real-time mobile telemetry for CSOs.",
    complianceStandard: "ISO 27001 Security Standard & ESG Green Building Certified",
    keyClients: ["CyberCity Gurgaon", "Noida Tech Park", "Aerocity Worldmark"]
  },
  {
    id: "residential",
    name: "Residential Estates & Farmhouses",
    sectorType: "Residential",
    challenge: "Large sprawling perimeters, subterranean termite attacks on imported timber, mosquito swarms, and pet safety.",
    aegisSolution: "100% botanical micro-encapsulated perimeter barriers, automated lawn misting, and zero-drill floor protection.",
    complianceStandard: "EPA & CPCB Green Certified Residential Bio-Shield",
    keyClients: ["Golf Course Road Penthouses", "Lutyens' Delhi Estates", "Chattarpur Farmhouses"]
  },
  {
    id: "government",
    name: "Government & Diplomatic Enclaves",
    sectorType: "Institutional",
    challenge: "High-security access protocols, diplomatic banquet zero-pest tolerance, and zero chemical odor allowance.",
    aegisSolution: "Background-checked bio-engineers, zero-odor botanical applications, and 60-minute emergency dispatch priority.",
    complianceStandard: "Diplomatic Security Clearance & Log-6 Bio-Security Standard",
    keyClients: ["Chanakyapuri Foreign Embassies", "Ministry Headquarters", "VVIP Guest Residences"]
  },
  {
    id: "hospital",
    name: "Hospitals & Healthcare Facilities",
    sectorType: "Institutional",
    challenge: "Immuno-compromised patients, ICU sterility requirements, zero pesticide spray allowed in operational zones.",
    aegisSolution: "Ultrasound pest exclusion arrays, mechanical bio-gel baiting, and cold-fogging antimicrobial disinfection.",
    complianceStandard: "NABH & WHO Healthcare Environmental Safety Protocols",
    keyClients: ["Max Healthcare Super Specialty", "Fortis Escorts", "Medanta The Medicity"]
  },
  {
    id: "hotel",
    name: "Hotels & Luxury Hospitality",
    sectorType: "Commercial",
    challenge: "Guest review risk from visible pests, bed bug infestation threats, kitchen FSSAI audits, and zero guest disruption.",
    aegisSolution: "24/7 covert night service, thermodynamic heat treatments, and continuous drain bio-matrices.",
    complianceStandard: "5-Star Luxury Hospitality Eco-Excellence Award",
    keyClients: ["The Leela Palaces", "Taj Hotels & Resorts", "Oberoi Luxury Properties"]
  },
  {
    id: "warehouse",
    name: "Warehouses & Logistics Hubs",
    sectorType: "Industrial",
    challenge: "Rodent nesting in pallets, grain/cargo beetle contamination, and sprawling open loading docks.",
    aegisSolution: "Seismic acoustic ground vibration barriers, high-capacity automated trapping stations, and dock laser sweepers.",
    complianceStandard: "AIB International & HACCP Supply Chain Certification",
    keyClients: ["Amazon Fulfillment Hubs", "Cold-Chain Logistics Depots", "Container Freight Stations"]
  },
  {
    id: "restaurant",
    name: "Restaurants & Fine Dining",
    sectorType: "Commercial",
    challenge: "Cockroach drain breeding, fruit fly vectors in bar areas, and stringent FSSAI health inspections.",
    aegisSolution: "Enzymatic drain foam degradation, targeted gel baiting, and UV fly disrupter units hidden from guest view.",
    complianceStandard: "FSSAI Food Safety & Grade-A Hygiene Standard",
    keyClients: ["Khan Market Fine Dining", "CyberHub Restaurants", "BKC Mumbai Bistros"]
  },
  {
    id: "school",
    name: "Schools & Educational Campuses",
    sectorType: "Institutional",
    challenge: "Toddler & child safety, playground wasp/bee hazards, school bus disinfection, and zero synthetic toxins.",
    aegisSolution: "100% plant-derived essential oil barriers, weekend thermal treatments, and non-toxic rodent acoustic arrays.",
    complianceStandard: "Child-Safe Green Campus Bio-Standard",
    keyClients: ["The Doon School", "Delhi Public School RK Puram", "Heritage Xperiential Learning"]
  },
  {
    id: "factory",
    name: "Factories & Manufacturing Plants",
    sectorType: "Industrial",
    challenge: "Machinery electrical wire short-circuits caused by rodents, bird roosting in high rafters, and dust accumulation.",
    aegisSolution: "Heavy-duty stainless bio-mesh wall sealing, acoustic industrial sweepers, and overhead laser bird deterrence.",
    complianceStandard: "ISO 14001 Environmental Management System",
    keyClients: ["Automotive Manufacturing Plants", "Pharma Formulations Facilities", "FMCG Bottling Plants"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "termite-radar-breakthrough",
    title: "How Acoustic Subterranean Radar Eradicates Termites Without Drilling Italian Marble",
    category: "Entomology Research",
    readTime: "5 Min Read",
    date: "July 20, 2026",
    excerpt: "Traditional exterminators drill 100+ holes into luxury flooring. Aegis acoustic radar pinpoint subterranean nests through sound waves, preserving your architecture.",
    content: "Subterranean termites in NCR cause over $100 million in structural timber damage annually. Traditional methods rely on heavy chemical trenching and aggressive floor drilling. Aegis Bio-Defense introduced seismic acoustic radar transducers that record the 20-40 Hz micro-vibrations created by termite mandibles inside wooden framing. By isolating the exact nest coordinates, our bio-engineers deploy micro-targeted bio-baiting matrix that wipes out the queen within 14 days with zero damage to hardwood or marble."
  },
  {
    id: "botanical-microencapsulation",
    title: "The Science of Botanical Micro-Encapsulation: Zero Toxin, 100% Barrier Efficacy",
    category: "Green Engineering",
    readTime: "4 Min Read",
    date: "June 14, 2026",
    excerpt: "Why synthetic neurotoxins like Chlorpyrifos are being phased out in luxury estates in favor of polymer-bound botanical extracts.",
    content: "For decades, chemical pest control relied on organophosphates and synthetic pyrethroids. While effective, these chemicals emit lingering VOCs that trigger asthma and harm pets. Aegis botanical micro-encapsulation binds active thyme, peppermint, and cedarwood bio-extracts inside nanometer-thin polymer shells. When insects cross the barrier, the micro-capsules burst on their legs, shutting down pest nerve receptors without leaving any odor or toxic residue for infants or pets."
  },
  {
    id: "monsoon-pest-protocol",
    title: "Delhi NCR Monsoon Pest Shield: Protecting Estates From Flying Ants, Mosquitoes & Snakes",
    category: "Estate Maintenance",
    readTime: "6 Min Read",
    date: "May 28, 2026",
    excerpt: "Pre-monsoon subterranean moisture shifts drive insects into estate foundations. Here is how our automated lawn misting and perimeter barriers maintain zero intrusion.",
    content: "During the monsoon season across Gurgaon, Delhi, and Noida, soil moisture saturation forces termites, bandicoots, and cobras out of their burrows toward dry residential structures. Implementing a pre-monsoon bio-shield protocol ensures subterranean drainage channels are foam-sterilized and perimeter acoustic stakes are active, preventing 99.8% of seasonal invasions."
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "DLF Golf Course Road Penthouse",
    location: "Gurgaon, NCR",
    tag: "Sub-Slab Acoustic Shield",
    description: "Zero-drilling termite acoustic radar installation on imported teak floorboards."
  },
  {
    id: "2",
    title: "Diplomatic Residence Compound",
    location: "Chanakyapuri, New Delhi",
    tag: "Botanical Micro-Misting",
    description: "Automated organic lawn mosquito barrier protecting international banquet lawns."
  },
  {
    id: "3",
    title: "CyberCity Commercial Server Center",
    location: "Gurgaon, NCR",
    tag: "Ultrasonic Acoustic Array",
    description: "Continuous swept-frequency rodent exclusion protecting fiber optic server trunks."
  },
  {
    id: "4",
    title: "5-Star Aerocity Hotel Suite Audit",
    location: "Aerocity, New Delhi",
    tag: "Thermodynamic Heat Chamber",
    description: "100% bed bug heat eradication system operating covertly overnight."
  }
];
