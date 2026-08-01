export type CurrencyCode = "INR" | "USD" | "AED" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rateToUSD: number; // For dynamic conversion
}

export interface DefensePlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPriceUSD: number;
  initialSetupPriceUSD: number;
  monthlyPriceINR: number;
  initialSetupPriceINR: number;
  setupIncludes?: string[];
  featured?: boolean;
  colorGlow: string;
  badge?: string;
  description: string;
  features: string[];
  specs: {
    responseTime: string;
    warranty: string;
    inspectionFreq: string;
    ecoRating: string;
  };
}

export interface BioShieldLayer {
  id: string;
  name: string;
  category: string;
  status: "active" | "standby" | "optimizing";
  efficiency: number;
  description: string;
  techDetails: string;
  iconName: string;
  coordinates: { x: number; y: number };
}

export interface DiagnosisResult {
  identifiedThreat: string;
  scientificName: string;
  threatLevel: number;
  riskSeverityCategory: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  structuralImpactSummary: string;
  recommendedAegisProtocol: string;
  immediateActionSteps: string[];
  estimatedAegisDefenseCost: {
    recommendedPlan: string;
    estimatedPriceRange: string;
    timeToDeploy: string;
  };
  ecoSafetyGuarantee: string;
}

export interface ComparisonItem {
  feature: string;
  traditional: string;
  aegis: string;
  aegisAdvantage: boolean;
  category: "Safety" | "Technology" | "Efficacy" | "Guarantee";
}

export interface CaseStudy {
  id: string;
  propertyTitle: string;
  location: string;
  propertyType: "Estate" | "Commercial HQ" | "Luxury Hospitality" | "Penthouse";
  challenge: string;
  solution: string;
  metrics: {
    infestationEliminated: string;
    chemicalReduction: string;
    responseTime: string;
  };
  clientQuote: string;
  author: string;
  role: string;
}

export interface BookingDetails {
  propertyType: string;
  sqFt: number;
  serviceType: string;
  priority: "emergency" | "urgent" | "routine";
  address: string;
  zipCode: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}
