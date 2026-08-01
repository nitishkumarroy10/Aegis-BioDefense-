import React, { useState, useRef, useEffect } from "react";
import { DefensePlan } from "../types";
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  PhoneCall,
  CheckCircle2,
  FileText,
  Calculator,
  Shield,
  Zap,
  ArrowRight,
  Brain,
  Search,
  MapPin,
  ExternalLink
} from "lucide-react";

interface AiChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  initialMessage?: string;
  initialMode?: "chat" | "whatsapp" | "voice" | "quote";
  preselectedPlan?: DefensePlan | null;
}

export default function AiChatWidget({
  isOpen,
  onClose,
  onOpenBooking,
  initialMessage,
  initialMode = "chat",
  preselectedPlan
}: AiChatWidgetProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "whatsapp" | "voice" | "quote">(initialMode);
  const [chatMode, setChatMode] = useState<"general" | "thinking" | "search" | "maps" | "fast">("general");
  const [messages, setMessages] = useState<Array<{
    sender: "user" | "ai";
    text: string;
    timestamp: string;
    modelUsed?: string;
    groundingSources?: Array<{ title: string; uri?: string; type: "web" | "maps" }>;
  }>>([
    {
      sender: "ai",
      text: "Welcome to Aegis Bio-Defense AI Command. I am your 24/7 Bio-Intelligence Officer powered by Gemini. Select High Thinking, Search, or Maps Grounding below to test our real-time capabilities.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: "gemini-3.6-flash"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  // Voice AI States
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // AI Quote State
  const [quoteProperty, setQuoteProperty] = useState("Residential Estate / Penthouse");
  const [quoteCity, setQuoteCity] = useState("Gurugram (Golf Course Rd)");
  const [quoteAreaSqft, setQuoteAreaSqft] = useState(3500);
  const [quoteServices, setQuoteServices] = useState<string[]>(["termite", "mosquito"]);
  const [generatedQuote, setGeneratedQuote] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMode) {
      setActiveTab(initialMode);
    }
  }, [initialMode]);

  useEffect(() => {
    if (preselectedPlan) {
      setActiveTab("quote");
      setGeneratedQuote({
        estimatedCostInr: preselectedPlan.monthlyPriceINR,
        estimatedCostUsd: preselectedPlan.monthlyPriceUSD,
        amcAnnualPrice: Math.round(preselectedPlan.monthlyPriceINR * 10),
        timeToDispatch: "18 Minutes",
        recommendedPlan: preselectedPlan.name,
        warrantyYears: preselectedPlan.id === "sovereign" ? 10 : preselectedPlan.id === "thermal-acoustic" ? 5 : 3,
        includes: preselectedPlan.features
      });
    }
  }, [preselectedPlan]);

  useEffect(() => {
    if (initialMessage && initialMessage !== "") {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: "user" as const,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages,
          mode: chatMode,
          city: quoteCity,
          propertyType: quoteProperty
        })
      });
      const data = await res.json();
      const reply = data.response || "Our Aegis dispatch center is standing by.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai" as const,
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: data.modelUsed,
          groundingSources: data.groundingSources
        }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai" as const,
          text: "I have registered your inquiry in our Delhi NCR dispatch log. A senior bio-engineer can contact you immediately or generate an official AMC quotation.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: "gemini-3.6-flash"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSimulate = () => {
    if (!isListening) {
      setIsListening(true);
      setVoiceTranscript("Listening for acoustic bio-hazard report...");
      setTimeout(() => {
        setVoiceTranscript("Detected: 'Need termite inspection for 4,000 sqft villa in Vasant Vihar Delhi'");
        setIsListening(false);
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
          handleSendMessage("Need termite inspection for 4,000 sqft villa in Vasant Vihar Delhi");
          setActiveTab("chat");
        }, 2000);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const calculateAiQuote = () => {
    const baseRate = quoteProperty.includes("Estate") ? 8 : quoteProperty.includes("Commercial") ? 12 : 10;
    const estimatedCost = Math.round((quoteAreaSqft * baseRate * (quoteServices.length * 0.75)));
    
    setGeneratedQuote({
      estimatedCostInr: estimatedCost,
      estimatedCostUsd: Math.round(estimatedCost / 86),
      amcAnnualPrice: Math.round(estimatedCost * 2.2),
      timeToDispatch: "18 Minutes",
      recommendedPlan: quoteServices.length > 2 ? "Omni-Shield Sovereign AMC" : "Aegis Acoustic & Thermal Shield",
      warrantyYears: 5,
      includes: [
        "Acoustic Radar Sub-Slab Subterranean Scan",
        "Non-Toxic Micro-Encapsulated Botanical Barrier",
        "Zero-Drill Floor Integrity Preservation",
        "Quarterly Inspection & IoT Sensor Monitoring"
      ]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-2 sm:right-8 z-50 w-[calc(100vw-1rem)] sm:w-[440px] max-w-[440px] h-[82vh] max-h-[620px] bg-[#090D16] border border-emerald-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header Bar */}
      <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="relative w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-sm text-white font-mono">AEGIS AI ASSISTANT</h3>
              <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-mono font-bold">
                24/7 ONLINE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Delhi NCR Bio-Defense Intelligence</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Navigation Bar */}
      <div className="flex items-center border-b border-white/10 bg-slate-950 text-xs font-mono shrink-0">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1 border-b-2 transition-colors ${
            activeTab === "chat" ? "border-emerald-400 text-emerald-400 font-bold bg-white/5" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>AI Chat</span>
        </button>

        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1 border-b-2 transition-colors ${
            activeTab === "whatsapp" ? "border-emerald-400 text-emerald-400 font-bold bg-white/5" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Send className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => setActiveTab("voice")}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1 border-b-2 transition-colors ${
            activeTab === "voice" ? "border-amber-400 text-amber-400 font-bold bg-white/5" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-amber-400" />
          <span>Voice AI</span>
        </button>

        <button
          onClick={() => setActiveTab("quote")}
          className={`flex-1 py-2.5 flex items-center justify-center space-x-1 border-b-2 transition-colors ${
            activeTab === "quote" ? "border-indigo-400 text-indigo-400 font-bold bg-white/5" : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Quote</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        {/* TAB 1: AI Chat */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full justify-between space-y-3">
            {/* Mode selector toolbar */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-[10px] font-mono shrink-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setChatMode("general")}
                className={`px-2 py-1 rounded-lg border transition-all flex items-center space-x-1 shrink-0 ${
                  chatMode === "general"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                    : "bg-slate-900 text-slate-400 border-white/5 hover:text-slate-200"
                }`}
              >
                <Bot className="w-3 h-3 text-emerald-400" />
                <span>General AI</span>
              </button>

              <button
                type="button"
                onClick={() => setChatMode("thinking")}
                className={`px-2 py-1 rounded-lg border transition-all flex items-center space-x-1 shrink-0 ${
                  chatMode === "thinking"
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold"
                    : "bg-slate-900 text-slate-400 border-white/5 hover:text-slate-200"
                }`}
                title="Gemini 3.1 Pro Preview with HIGH Thinking Level"
              >
                <Brain className="w-3 h-3 text-purple-400" />
                <span>🧠 High Thinking</span>
              </button>

              <button
                type="button"
                onClick={() => setChatMode("search")}
                className={`px-2 py-1 rounded-lg border transition-all flex items-center space-x-1 shrink-0 ${
                  chatMode === "search"
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/50 font-bold"
                    : "bg-slate-900 text-slate-400 border-white/5 hover:text-slate-200"
                }`}
                title="Google Search Grounding"
              >
                <Search className="w-3 h-3 text-blue-400" />
                <span>🔍 Search Data</span>
              </button>

              <button
                type="button"
                onClick={() => setChatMode("maps")}
                className={`px-2 py-1 rounded-lg border transition-all flex items-center space-x-1 shrink-0 ${
                  chatMode === "maps"
                    ? "bg-teal-500/20 text-teal-300 border-teal-500/50 font-bold"
                    : "bg-slate-900 text-slate-400 border-white/5 hover:text-slate-200"
                }`}
                title="Google Maps Grounding"
              >
                <MapPin className="w-3 h-3 text-teal-400" />
                <span>📍 Maps Data</span>
              </button>

              <button
                type="button"
                onClick={() => setChatMode("fast")}
                className={`px-2 py-1 rounded-lg border transition-all flex items-center space-x-1 shrink-0 ${
                  chatMode === "fast"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold"
                    : "bg-slate-900 text-slate-400 border-white/5 hover:text-slate-200"
                }`}
                title="Gemini 3.1 Flash-Lite for fast responses"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>⚡ Fast AI</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3 space-y-1.5 ${
                      m.sender === "user"
                        ? "bg-emerald-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-emerald-500/10"
                        : "bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-70 font-mono">
                      <span>{m.sender === "user" ? "You" : "Aegis AI"}</span>
                      <div className="flex items-center space-x-1">
                        {m.modelUsed && m.sender === "ai" && (
                          <span className="text-[9px] px-1 rounded bg-white/10 text-emerald-300">
                            {m.modelUsed.replace("gemini-", "").replace("-preview", "")}
                          </span>
                        )}
                        <span>{m.timestamp}</span>
                      </div>
                    </div>
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                    {/* Grounding Sources / Links */}
                    {m.groundingSources && m.groundingSources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">
                          Verified References ({m.groundingSources[0].type === "maps" ? "Google Maps" : "Google Search"}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {m.groundingSources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.uri || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-teal-300 border border-teal-500/30 transition-colors"
                            >
                              {src.type === "maps" ? (
                                <MapPin className="w-2.5 h-2.5 text-teal-400" />
                              ) : (
                                <Search className="w-2.5 h-2.5 text-blue-400" />
                              )}
                              <span className="truncate max-w-[150px]">{src.title}</span>
                              <ExternalLink className="w-2 h-2 text-slate-400" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-white/10 rounded-2xl p-3 text-slate-400 font-mono text-[11px] flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span>
                      {chatMode === "thinking"
                        ? "Executing High-Thinking Bio-Reasoning Protocol..."
                        : chatMode === "search"
                        ? "Retrieving Google Search Grounding Data..."
                        : chatMode === "maps"
                        ? "Retrieving Google Maps Geo-Spatial Data..."
                        : "Analyzing bio-hazard acoustic telemetry..."}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2 bg-slate-950 border border-white/10 rounded-2xl p-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  chatMode === "thinking"
                    ? "Deep query (e.g. 'Compare subterranean acoustic vs thermal radar for 10k sqft factory')"
                    : chatMode === "search"
                    ? "Search web (e.g. 'WHO guidelines on non-toxic termite treatment 2026')"
                    : chatMode === "maps"
                    ? "Find on map (e.g. 'Aegis pest control centers in Dwarka Sector 8')"
                    : "Ask Aegis AI (e.g. 'Termite quote for 5,000 sqft in Gurgaon')..."
                }
                className="flex-1 bg-transparent text-white focus:outline-none px-2 text-xs font-sans placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="p-2 rounded-xl bg-emerald-400 text-slate-950 hover:bg-emerald-300 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: WhatsApp Integration */}
        {activeTab === "whatsapp" && (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <Send className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white font-mono">Aegis Official AI WhatsApp Channel</h4>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Receive instant PDF inspection reports, live technician GPS tracking links, and 24/7 emergency dispatch support via WhatsApp.
              </p>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-left font-mono space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-400">
                <span>Official WhatsApp Hotline:</span>
                <span className="font-bold">+91 93547 31879</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Office: <strong className="text-white">230, D-block, Dwarka Sector 8, Delhi - 110077</strong>
              </p>
            </div>

            <a
              href="https://wa.me/919354731879?text=Hi%20Aegis%20BioDefense,%20I%20need%20an%20urgent%20inspection%20and%20quote%20for%20my%20property%20in%20Delhi%20NCR."
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Open WhatsApp AI Concierge</span>
            </a>
          </div>
        )}

        {/* TAB 3: Voice AI Assistant */}
        {activeTab === "voice" && (
          <div className="space-y-6 text-center py-4">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              {isListening && (
                <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-75" />
              )}
              {isSpeaking && (
                <div className="absolute -inset-2 rounded-full border-2 border-emerald-400 animate-pulse opacity-80" />
              )}
              <button
                onClick={handleVoiceSimulate}
                className={`w-20 h-20 rounded-full border flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  isListening
                    ? "bg-amber-500/20 border-amber-400 text-amber-400 scale-110"
                    : isSpeaking
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 scale-105"
                    : "bg-slate-900 border-white/20 text-slate-300 hover:border-amber-400 hover:text-amber-400"
                }`}
              >
                {isListening ? (
                  <Mic className="w-8 h-8 text-amber-400 animate-pulse" />
                ) : (
                  <Volume2 className="w-8 h-8 text-emerald-400" />
                )}
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-base font-bold text-white font-mono">
                {isListening ? "Listening..." : isSpeaking ? "Voice Transducer Responding..." : "Tap Mic for Voice AI"}
              </h4>
              <p className="text-xs text-slate-400 font-mono px-4">
                {voiceTranscript || "Speak in English or Hindi to request an immediate inspection or voice quote."}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-left font-mono text-[11px] text-slate-400">
              <span className="text-amber-400 font-bold block mb-1">Voice AI Capabilities:</span>
              <ul className="space-y-1">
                <li>• Instant speech-to-quote conversion</li>
                <li>• Emergency voice dispatch signal processing</li>
                <li>• Multilingual: English, Hindi, Punjabi, Arabic</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: Instant AI Quote Engine */}
        {activeTab === "quote" && (
          <div className="space-y-4">
            {preselectedPlan && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-emerald-400 font-bold block uppercase">PRE-SELECTED DEFENSE TIER</span>
                    <span className="font-extrabold text-white text-xs">{preselectedPlan.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-400">
                    ₹{preselectedPlan.monthlyPriceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ mo base</span>
                </div>
              </div>
            )}

            <div className="space-y-3 bg-slate-900 border border-white/10 p-3 rounded-2xl font-mono text-xs">
              <div>
                <label className="text-slate-400 text-[10px] uppercase font-bold block">Property Type</label>
                <select
                  value={quoteProperty}
                  onChange={(e) => setQuoteProperty(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-2 text-xs font-mono mt-1"
                >
                  <option value="Residential Estate / Penthouse">Residential Estate / Penthouse</option>
                  <option value="Commercial HQ / Corporate Park">Commercial HQ / Corporate Park</option>
                  <option value="Hospitality / 5-Star Hotel">Hospitality / 5-Star Hotel</option>
                  <option value="Industrial Warehouse / Factory">Industrial Warehouse / Factory</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase font-bold block">NCR Location Zone</label>
                <select
                  value={quoteCity}
                  onChange={(e) => setQuoteCity(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-2 text-xs font-mono mt-1"
                >
                  <option value="Gurugram (Golf Course Rd / CyberCity)">Gurugram (Golf Course Rd / CyberCity)</option>
                  <option value="South Delhi (Vasant Vihar / GK)">South Delhi (Vasant Vihar / GK)</option>
                  <option value="Noida (Expressway / Sector 150)">Noida (Expressway / Sector 150)</option>
                  <option value="Greater Noida & Knowledge Park">Greater Noida & Knowledge Park</option>
                  <option value="Ghaziabad (Indirapuram / Vaishali)">Ghaziabad (Indirapuram / Vaishali)</option>
                  <option value="Faridabad & Surajkund">Faridabad & Surajkund</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[10px] uppercase font-bold">
                  <span>Covered Built-Up Area</span>
                  <span className="text-indigo-400">{quoteAreaSqft.toLocaleString()} SQFT</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={quoteAreaSqft}
                  onChange={(e) => setQuoteAreaSqft(Number(e.target.value))}
                  className="w-full accent-indigo-400 mt-2 cursor-pointer"
                />
              </div>

              <button
                onClick={calculateAiQuote}
                className="w-full py-2.5 rounded-xl bg-indigo-500 text-white font-mono font-bold uppercase hover:bg-indigo-400"
              >
                Calculate Instant AI Estimate
              </button>
            </div>

            {generatedQuote && (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 font-mono space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-indigo-300 uppercase font-bold">AI Recommended Plan:</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                    {generatedQuote.recommendedPlan}
                  </span>
                </div>

                <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400 text-xs">Estimated Treatment:</span>
                  <span className="text-lg font-bold text-emerald-400">
                    ₹{generatedQuote.estimatedCostInr.toLocaleString()} <span className="text-xs text-slate-400 font-normal">(${(generatedQuote.estimatedCostUsd).toLocaleString()})</span>
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-slate-400 text-xs">Annual AMC Contract:</span>
                  <span className="text-sm font-bold text-amber-400">
                    ₹{generatedQuote.amcAnnualPrice.toLocaleString()} / year
                  </span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold uppercase text-xs hover:bg-emerald-300"
                >
                  Book Priority Dispatch
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
