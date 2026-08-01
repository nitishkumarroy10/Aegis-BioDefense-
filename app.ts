import express from "express";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json({ limit: "10mb" }));

// Startup validation for GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
  console.warn(
    "⚠️ WARNING: GEMINI_API_KEY is missing or unconfigured in environment.\n" +
    "   Please set GEMINI_API_KEY in your .env file or Vercel environment variables."
  );
} else {
  console.log("✅ GEMINI_API_KEY environment variable detected.");
}

// Initialize Gemini AI client safely
const getAi = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.trim() === "" || key === "MY_GEMINI_API_KEY") {
    throw new Error(
      "GEMINI_API_KEY environment variable is required but missing or unconfigured."
    );
  }
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Helper to check if an error is an authentication/API key issue
const isAuthError = (err: any) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") return true;
  if (err?.status === 403 || err?.status === 401) return true;
  const msg = String(err?.message || "").toLowerCase();
  return (
    msg.includes("permission_denied") ||
    msg.includes("unregistered callers") ||
    msg.includes("api key") ||
    msg.includes("invalid") ||
    msg.includes("expired")
  );
};

// API Route: Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Aegis BioDefense System" });
});

// API Route: AI Pest & Threat Diagnosis
app.post("/api/diagnose-pest", async (req, res) => {
  try {
    const { description, propertyType, locationZip, imageBase64 } = req.body;

    if (!description && !imageBase64) {
      return res.status(400).json({ error: "Provide a description or image of the pest observation." });
    }

    const ai = getAi();
    const promptText = `You are the chief bio-defense entomologist and property risk strategist at Aegis BioDefense.
Analyze the following client report and return a comprehensive, structured JSON assessment.

PRICING DIRECTIVE: You MUST align estimated prices strictly with standard market rates in India:
- General Pest Control / Cockroach Gel Matrix: ₹1,299 (Single Service) to ₹2,999 (1-Year AMC - 3 Services)
- Termite Control Gold Seal (Drill-Fill-Seal): ₹3,999 - ₹5,499 (1-Year Warranty), ₹7,499 - ₹10,999 (5-Year Warranty)
- Bed Bug Thermal & Spray Treatment: ₹2,499 - ₹3,499 (2 Sessions)
- Rodent Control Management: ₹1,999 - ₹3,999
- Woodborer Syringe & Chemical Spray: ₹2,199 - ₹4,499
- Mosquito Eco-Misting: ₹1,999 - ₹4,999

Client Property Type: ${propertyType || "Residential Estate"}
Location/Zip Code: ${locationZip || "General Metro Zone"}
Observed Signs & Description: "${description || "Uploaded photo inspection"}"

Provide output strict JSON matching this structure:
{
  "identifiedThreat": "Specific pest or bio-hazard name",
  "scientificName": "Latin species name",
  "threatLevel": 1 to 5 (integer, 5 being critical structural emergency),
  "riskSeverityCategory": "CRITICAL" | "HIGH" | "MODERATE" | "LOW",
  "structuralImpactSummary": "2 concise sentences on potential damage.",
  "recommendedAegisProtocol": "Name of Aegis Defense Protocol matching standard service tier",
  "immediateActionSteps": [
    "Step 1 recommendation",
    "Step 2 recommendation",
    "Step 3 recommendation"
  ],
  "estimatedAegisDefenseCost": {
    "recommendedPlan": "Core Shield (GPC)" | "Aegis Thermal & Acoustic (1-Yr Termite Gold Seal)" | "Omni-Shield Sovereign (5-Yr Termite Gold Seal)",
    "estimatedPriceRange": "₹1,299 - ₹2,999" | "₹3,999 - ₹5,499" | "₹7,499 - ₹10,999",
    "timeToDeploy": "Under 60 Minutes" | "Within 24 Hours" | "Scheduled Bio-Scan"
  },
  "ecoSafetyGuarantee": "Statement on pet, child, and botanical safety."
}`;

    let contents: any;

    if (imageBase64) {
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data,
            },
          },
          { text: promptText },
        ],
      };
    } else {
      contents = promptText;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identifiedThreat: { type: Type.STRING },
            scientificName: { type: Type.STRING },
            threatLevel: { type: Type.INTEGER },
            riskSeverityCategory: { type: Type.STRING },
            structuralImpactSummary: { type: Type.STRING },
            recommendedAegisProtocol: { type: Type.STRING },
            immediateActionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            estimatedAegisDefenseCost: {
              type: Type.OBJECT,
              properties: {
                recommendedPlan: { type: Type.STRING },
                estimatedPriceRange: { type: Type.STRING },
                timeToDeploy: { type: Type.STRING },
              },
            },
            ecoSafetyGuarantee: { type: Type.STRING },
          },
        },
      },
    });

    const jsonText = response.text || "{}";
    const resultData = JSON.parse(jsonText);
    res.json({ success: true, diagnosis: resultData });
  } catch (err: any) {
    console.error("Gemini API Error (/api/diagnose-pest):", err?.message || err);
    const authFailed = isAuthError(err);
    if (authFailed) {
      console.warn("⚠️ Gemini API Auth Alert: Check that GEMINI_API_KEY is configured in your environment.");
    }
    res.status(authFailed ? 403 : 500).json({
      success: false,
      error: authFailed
        ? "Gemini API Authentication Error: GEMINI_API_KEY is missing, invalid, or expired."
        : "Bio-Diagnostic system unavailable. Fallback protocol active.",
      fallbackDiagnosis: {
        identifiedThreat: "Potential Structural Bio-Invasion",
        scientificName: "Incident Evaluation Pending Field Scan",
        threatLevel: 3,
        riskSeverityCategory: "MODERATE",
        structuralImpactSummary: "Early detection prevents costly subterranean or timber damage.",
        recommendedAegisProtocol: "Aegis Molecular Perimeter & Thermal Scan",
        immediateActionSteps: [
          "Keep the affected zone dry and isolate food sources",
          "Avoid disturbing the infestation nest to prevent colony dispersal",
          "Schedule an immediate Aegis rapid-response field engineer"
        ],
        estimatedAegisDefenseCost: {
          recommendedPlan: "Aegis Thermal & Acoustic (1-Yr Gold Seal)",
          estimatedPriceRange: "₹3,999 - ₹5,499",
          timeToDeploy: "Within 2 Hours"
        },
        ecoSafetyGuarantee: "100% Non-Toxic Botanical Molecular Defense Safe for Pets & Children"
      }
    });
  }
});

// API Route: AI Chat & Concierge Assistant
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, conversationHistory, propertyType, city, mode = "general" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message parameter is required." });
    }

    const ai = getAi();
    const systemInstruction = `You are "Aegis AI", the chief bio-defense intelligence officer for Aegis BioDefense.
Official Company Details:
- Company Name: Aegis BioDefense
- CEO & Founder: Vikash Kumar Roy
- Office Address: 230, D-block, Dwarka Sector 8, Delhi - 110077
- Phone: +91 93547 31879
- Email: aegisbiodefence@gmail.com
- WhatsApp: +91 93547 31879

You assist homeowners, embassy diplomats, hotel directors, and facility engineers in Delhi NCR and across India with:
- Instant AI Inspection Quotes and AMC pricing strictly aligned with standard market rates:
  * General Pest Control (GPC): ₹1,299 Single Service | ₹2,999 1-Year AMC (3 services for 2BHK)
  * Termite Gold Seal (Drill-Fill-Seal): ₹3,999 - ₹5,499 (1-Year Warranty) | ₹7,499 - ₹10,999 (5-Year Warranty)
  * Bed Bug Treatment: ₹2,499 (1BHK) to ₹3,499 (2BHK)
  * Rodent Management: ₹1,999 - ₹3,999
  * Woodborer Treatment: ₹2,199 - ₹4,499
  * Mosquito Misting: ₹1,999 - ₹4,999
- Subterranean termite acoustic radar, mosquito eco-barriers, snake wildlife rescue, rodent exclusion, and WHO-sterile hospital fogging.
- Delhi NCR coverage details (Dwarka, Gurgaon DLF/CyberCity, South Delhi Vasant Vihar, Noida Expressways, Ghaziabad, Faridabad, Bahadurgarh).
- Eco-safety guarantees (100% pet-safe, child-safe, non-toxic micro-encapsulation, zero toxic spray).

Keep your response helpful, concise, highly professional, precise, and polite. Always offer to book an emergency inspection or generate an instant official AMC quote.`;

    let modelName = "gemini-3.6-flash";
    const configObj: any = {
      systemInstruction,
    };

    if (mode === "thinking") {
      modelName = "gemini-3.1-pro-preview";
      configObj.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
    } else if (mode === "fast") {
      modelName = "gemini-3.1-flash-lite";
    } else if (mode === "search") {
      modelName = "gemini-3.6-flash";
      configObj.tools = [{ googleSearch: {} }];
    } else if (mode === "maps") {
      modelName = "gemini-3.6-flash";
      configObj.tools = [{ googleMaps: {} }];
    }

    const formattedHistory: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory) {
        if (item.text) {
          formattedHistory.push({
            role: item.sender === "user" ? "user" : "model",
            parts: [{ text: item.text }]
          });
        }
      }
    }

    const contents = [
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: `[Context: Location: ${city || "Delhi NCR"}, Property: ${propertyType || "Residential"}]\n${message}` }]
      }
    ];

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: configObj,
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingSources: Array<{ title: string; uri?: string; type: "web" | "maps" }> = [];

    if (groundingChunks && Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if ((chunk as any).web) {
          groundingSources.push({
            title: (chunk as any).web.title || "Web Reference",
            uri: (chunk as any).web.uri,
            type: "web",
          });
        } else if ((chunk as any).maps || (chunk as any).placeAnswer) {
          const place = (chunk as any).maps || (chunk as any).placeAnswer;
          groundingSources.push({
            title: place.title || place.name || "Location Map Data",
            uri: place.uri || place.googleMapsUri || place.placeUri,
            type: "maps",
          });
        }
      }
    }

    res.json({
      success: true,
      response: response.text || "I am standing by to dispatch our Aegis rapid-response team.",
      modelUsed: modelName,
      groundingSources: groundingSources.length > 0 ? groundingSources : undefined,
    });
  } catch (err: any) {
    console.error("Gemini API Error (/api/ai-chat):", err?.message || err);
    const authFailed = isAuthError(err);
    if (authFailed) {
      console.warn("⚠️ Gemini API Auth Alert: Check that GEMINI_API_KEY is configured in your environment.");
    }
    res.json({
      success: true,
      response: authFailed
        ? "⚠️ [Gemini API Key Required]: Please ensure GEMINI_API_KEY is set in your environment file. Standing by with default protocol responses."
        : "Our Aegis Bio-Defense AI Dispatch center is operational. I have calculated a preliminary quote for your estate in Delhi NCR. Would you like me to book a 15-minute rapid acoustic inspection team to your property?",
      modelUsed: "gemini-3.6-flash",
      isAuthError: authFailed
    });
  }
});

export default app;
