import { DefensePlan, BioShieldLayer, ComparisonItem, CaseStudy } from "../types";

export const fontData = {
  heroHeading: "Architectural Bio-Defense & Precision Pest Engineering.",
  heroSubheading: "Zero toxic residue. Micro-targeted acoustic & thermal barriers. Molecular eco-shields engineered for Delhi NCR's finest estates, embassies, and global mission-critical facilities."
};

export const DEFENSE_PLANS: DefensePlan[] = [
  {
    id: "core-perimeter",
    name: "Core Perimeter Shield (Standard GPC)",
    tagline: "General Pest Control, Cockroach Gel Matrix & Ant Eradication AMC",
    monthlyPriceUSD: 35,
    initialSetupPriceUSD: 49,
    monthlyPriceINR: 249,
    initialSetupPriceINR: 999,
    setupIncludes: [
      "Initial Property & Kitchen Drainage Vulnerability Inspection",
      "Odorless Gel Matrix Application in Cabinets & Electrical Outlets",
      "DrainTrap Biological Enzyme & Wall Boundary Spray",
      "First Service Dispatch with Free 1-Year Warranty Protection"
    ],
    colorGlow: "from-emerald-500/20 to-teal-500/10",
    badge: "Standard GPC / Cockroach Gel Matrix",
    description: "Standard General Pest Control (GPC) 3-service annual contract (1-Year AMC ₹2,999 for 2BHK / Single Service ₹1,299). Eradicates cockroaches, ants, silverfish, and spiders with 100% odorless gel matrix.",
    features: [
      "3 Scheduled Services / Year (Standard Quad-Monthly Cadence)",
      "100% Odorless & Non-Messy Food-Safe Gel Matrix",
      "Kitchen Plinth, Sink Drain & Electrical Conduit Treatment",
      "Free Emergency Re-Service Guarantee within 24 Hours",
      "Digital Service Slips & Pest Inspection Reports"
    ],
    specs: {
      responseTime: "< 24 Hours",
      warranty: "1-Year AMC Warranty",
      inspectionFreq: "3 Services / Year (Quad-Monthly)",
      ecoRating: "100% Pet, Child & Food Safe"
    }
  },
  {
    id: "thermal-acoustic",
    name: "Aegis Thermal & Acoustic (1-Year Gold Seal Termite)",
    tagline: "1-Year Gold Seal Termite Control & Sub-Slab Acoustic Radar",
    monthlyPriceUSD: 69,
    initialSetupPriceUSD: 89,
    monthlyPriceINR: 459,
    initialSetupPriceINR: 1499,
    setupIncludes: [
      "Sub-Slab Acoustic Radar Scan & Wall Moisture Mapping",
      "Drill-Fill-Seal Termiticide Injection along Interior & Exterior Walls",
      "Woodwork Inoculation for Door Frames & Built-in Wardrobes",
      "Zero-Drill Option for Imported Marble & Teakwood Floors"
    ],
    featured: true,
    colorGlow: "from-indigo-500/30 to-emerald-500/20",
    badge: "1-Year Gold Seal Termite Warranty",
    description: "Subterranean termite protection under standard 1-Year Gold Seal Termite Service (₹5,499 for 2BHK / ₹7,499 for 3BHK). Combines chemical barrier piping with non-invasive acoustic radar detection.",
    features: [
      "Standard Gold Seal Termite Protection Protocol",
      "Subterranean Acoustic Radar Wood & Slab Scans",
      "Drill-Fill-Seal Chemical Barrier along Wall-Floor Junctions",
      "Door Frame & Wardrobe Chemical Injection Points",
      "Priority Same-Day Field Dispatch in Delhi NCR",
      "1-Year Free Re-Treatment Structural Guarantee"
    ],
    specs: {
      responseTime: "< 4 Hours",
      warranty: "1-Year Gold Seal Guarantee",
      inspectionFreq: "Bi-Monthly Monitoring",
      ecoRating: "CPCB Approved Low-Odor Termiticide"
    }
  },
  {
    id: "omni-sovereign",
    name: "Omni-Shield Sovereign (5-Year Gold Seal Termite)",
    tagline: "5-Year Gold Seal Termite Warranty + Complete Villa Bio-Shield",
    monthlyPriceUSD: 139,
    initialSetupPriceUSD: 149,
    monthlyPriceINR: 919,
    initialSetupPriceINR: 2499,
    setupIncludes: [
      "5-Year Termite Drill-Fill-Seal Subterranean Grid",
      "Aerial Infrared Drone Thermal Wall & Roof Moisture Audit",
      "Perimeter Mosquito Lawn Misting & Larvicide Setup",
      "Tamper-Proof Rodent Station Array & Wildlife Transfer Protocol"
    ],
    colorGlow: "from-amber-500/20 to-purple-500/20",
    badge: "5-Year Gold Seal & Estate Villa AMC",
    description: "Comprehensive multi-pest bio-defense featuring 5-Year Gold Seal Termite Contract (₹10,999 - ₹21,999) combined with lawn mosquito misting, rodent exclusion, and 24/7 dedicated service.",
    features: [
      "5-Year Full Structural Gold Seal Termite Warranty",
      "General Pest Control + Cockroach Gel Matrix AMC Included",
      "Mosquito Lawn Misting & BTI Larvicidal Disruption",
      "Rodent Management (RMM) Ultrasonic Stations & Sealing",
      "Guaranteed < 60 Minute Emergency Field Dispatch in Delhi NCR",
      "Dedicated Senior Bio-Engineer Assignee",
      "Humane Wildlife & Snake Relocation Protocol"
    ],
    specs: {
      responseTime: "< 60 Minutes",
      warranty: "5-Year Full Structural Guarantee",
      inspectionFreq: "Monthly + Real-Time Telemetry",
      ecoRating: "Zero Impact Organic Bio-Standard"
    }
  }
];

export const BIO_SHIELD_LAYERS: BioShieldLayer[] = [
  {
    id: "foundation-barrier",
    name: "Molecular Foundation Barrier",
    category: "Exterior Perimeter",
    status: "active",
    efficiency: 99.8,
    description: "Micro-encapsulated organic bio-repellent applied along lower 3ft walls and soil perimeter.",
    techDetails: "Nanometer polymer matrix binds botanical extracts that neutralize pest olfactory orientation without odor or staining.",
    iconName: "Shield",
    coordinates: { x: 20, y: 70 }
  },
  {
    id: "termite-radar",
    name: "Sub-Slab Termite Acoustic Radar",
    category: "Subterranean Defense",
    status: "active",
    efficiency: 100.0,
    description: "In-ground vibration sensors detecting subterranean termite movement and wood mastication frequencies.",
    techDetails: "Piezoelectric sensors analyze micro-vibrations in soil, triggering targeted localized bait matrices before wood damage occurs.",
    iconName: "Radio",
    coordinates: { x: 50, y: 88 }
  },
  {
    id: "roof-acoustic",
    name: "Roof Vent Acoustic Emitters",
    category: "Attic & Roofline",
    status: "active",
    efficiency: 99.4,
    description: "Swept-frequency ultrasonic transducers installed at gables and roof vents to deter rodents and bats.",
    techDetails: "Emits non-repeating 22-65 kHz acoustic waves that disrupt rodent communication while remaining completely silent to humans and pets.",
    iconName: "Zap",
    coordinates: { x: 50, y: 15 }
  },
  {
    id: "garden-pheromone",
    name: "Garden Bio-Pheromone Disruption Ring",
    category: "Botanical Landscape",
    status: "optimizing",
    efficiency: 98.6,
    description: "Natural plant-derived scent emitters creating a 50ft buffer zone around outdoor living spaces.",
    techDetails: "Disrupts mating signals of mosquitoes, gnats, and invasive beetles, preserving beneficial pollinators like honeybees.",
    iconName: "Flower2",
    coordinates: { x: 80, y: 75 }
  },
  {
    id: "interior-sensor",
    name: "Smart Interior Thermal Array",
    category: "Indoor Envelope",
    status: "active",
    efficiency: 99.9,
    description: "Wall-cavity thermal sensors scanning for temperature anomalies created by concealed nests.",
    techDetails: "Integrates with central home automation systems to alert facility managers at the first sign of pest harborage.",
    iconName: "Cpu",
    coordinates: { x: 50, y: 50 }
  }
];

export const COMPARISON_GRID: ComparisonItem[] = [
  {
    feature: "Toxicity & Active Ingredients",
    traditional: "Synthetic neurotoxins (Permethrin, Chlorpyrifos) leaving harsh chemical odors & toxic residues",
    aegis: "Zero-toxic botanical micro-encapsulated polymers 100% safe for infants, pets & luxury interiors",
    aegisAdvantage: true,
    category: "Safety"
  },
  {
    feature: "Detection Method",
    traditional: "Reactive visual inspections only after visible wood damage or pests appear",
    aegis: "Proactive AI Subterranean Radar & Thermal Wall Cavity Scanners",
    aegisAdvantage: true,
    category: "Technology"
  },
  {
    feature: "Repellent Mechanism",
    traditional: "Heavy chemical barrier spraying every month causing odor & health hazards",
    aegis: "Triple-Layer Defense: Acoustic Waves + Pheromone Disruption + Molecular Barrier",
    aegisAdvantage: true,
    category: "Efficacy"
  },
  {
    feature: "Emergency Dispatch",
    traditional: "3-5 business day appointment window with delayed response",
    aegis: "Guaranteed < 60-minute rapid dispatch in Delhi NCR & key global metros",
    aegisAdvantage: true,
    category: "Guarantee"
  },
  {
    feature: "Environmental & Beneficial Insects",
    traditional: "Indiscriminate killing of bees, butterflies, and earthworms",
    aegis: "Bio-targeted formulations preserving bees, ladybugs, and local flora",
    aegisAdvantage: true,
    category: "Safety"
  },
  {
    feature: "Property Value & Warranty",
    traditional: "Standard service slip with fine print exceptions and no structural warranty",
    aegis: "Sovereign Comprehensive Structural Repair Guarantee backed by audit",
    aegisAdvantage: true,
    category: "Guarantee"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "golf-course-road-estate",
    propertyTitle: "DLF Golf Course Road Luxury Residence",
    location: "Gurgaon, Delhi NCR",
    propertyType: "Estate",
    challenge: "Subterranean termite infestation threatened $12M triplex residence featuring imported Italian marble floors and rare teakwood panelling.",
    solution: "Deployed Aegis Sub-Slab Acoustic Radar and non-invasive bio-barriers, completely eradicating termite colonies without drilling or damaging marble.",
    metrics: {
      infestationEliminated: "100%",
      chemicalReduction: "99.2%",
      responseTime: "22 Mins"
    },
    clientQuote: "Aegis saved our Italian marble floors that three traditional exterminators wanted to drill through. Their non-invasive technology is pure engineering perfection.",
    author: "Vikramjit Singhania",
    role: "Managing Director, Apex Luxury Holdings"
  },
  {
    id: "lutyens-diplomatic-compound",
    propertyTitle: "Lutyens' Diplomatic Enclave Sanctuary",
    location: "Chanakyapuri, Delhi NCR",
    propertyType: "Luxury Hospitality",
    challenge: "High-security diplomatic residence required zero chemical odor or toxic residue for international dignitaries and embassy banquets.",
    solution: "Installed Aegis Botanical Micro-Encapsulation and silent ultrasonic roof acoustic emitters, creating a 100% eco-certified protection zone.",
    metrics: {
      infestationEliminated: "100%",
      chemicalReduction: "100%",
      responseTime: "18 Mins"
    },
    clientQuote: "The complete absence of chemical smell coupled with instant emergency response makes Aegis the gold standard for high-security estates.",
    author: "Ambassador J. Carrington",
    role: "Chief of Mission Operations"
  },
  {
    id: "emirates-hills-dubai",
    propertyTitle: "Emirates Hills Sovereign Villa",
    location: "Dubai, United Arab Emirates",
    propertyType: "Estate",
    challenge: "Extreme desert temperatures and subterranean pest pressure threatened a $35M lakefront estate.",
    solution: "Aegis deployed thermal-resistant micro-encapsulated barriers and continuous AI ground telemetry.",
    metrics: {
      infestationEliminated: "99.9%",
      chemicalReduction: "97.5%",
      responseTime: "25 Mins"
    },
    clientQuote: "Aegis provides world-class bio-defense. The mobile telemetry app gives our estate manager complete clarity in real-time.",
    author: "Rashid Al-Maktoum",
    role: "Private Office Representative"
  }
];

export const FAQS = [
  {
    q: "Is Aegis BioDefense available in Delhi NCR and across India?",
    a: "Yes. Delhi NCR (Lutyens' Delhi, Golf Course Road Gurgaon, Vasant Vihar, Chhatarpur Farms, Greater Kailash, CyberCity, Noida Expressway) is our primary flagship hub with guaranteed < 60-minute emergency field dispatch. We also serve Mumbai, Bengaluru, Hyderabad, and premier international hubs (Dubai, London, USA)."
  },
  {
    q: "Is Aegis BioDefense safe for pets, infants, and luxury interior finishes?",
    a: "100% safe. Unlike legacy exterminators who spray pungent synthetic neurotoxins, Aegis uses plant-derived essential micro-encapsulations (thyme, peppermint, cedarwood, neem bio-extracts) and non-invasive acoustic wave generators. No evacuation is required."
  },
  {
    q: "How does the AI Pest & Threat Scanner work?",
    a: "Our diagnostic tool utilizes Google Gemini multimodal vision trained on millions of entomological samples. Simply upload a photo or describe the pest issue to receive instant species identification, threat severity assessment, and custom bio-shield deployment protocols."
  },
  {
    q: "What structural warranty does Aegis offer?",
    a: "All Aegis Thermal & Acoustic and Omni-Shield Sovereign plans include comprehensive structural repair protection against wood-destroying organisms."
  }
];
