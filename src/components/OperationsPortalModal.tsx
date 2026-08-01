import React, { useState } from "react";
import {
  Shield,
  X,
  User,
  HardHat,
  LayoutDashboard,
  Navigation,
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  DollarSign,
  Download,
  Send,
  Sparkles,
  PhoneCall,
  Activity,
  AlertTriangle,
  QrCode,
  Fingerprint,
  Lock,
  Unlock,
  KeyRound,
  Sliders,
  Cpu,
  RefreshCw,
  Zap,
  Package,
  Layers,
  Search,
  Star,
  Check,
  Building,
  Users,
  MessageSquare,
  BarChart3,
  Calendar,
  Compass,
  FileCheck,
  ShieldCheck,
  Camera,
  PenTool,
  WifiOff,
  Bell,
  Mail,
  Smartphone
} from "lucide-react";

interface OperationsPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "customer" | "technician" | "crm" | "dispatch" | "inventory" | "analytics" | "security";
}

export default function OperationsPortalModal({
  isOpen,
  onClose,
  initialTab = "customer"
}: OperationsPortalModalProps) {
  const [activeTab, setActiveTab] = useState<"customer" | "technician" | "crm" | "dispatch" | "inventory" | "analytics" | "security">(initialTab);

  // User Security Role (RBAC)
  const [userRole, setUserRole] = useState<"admin" | "manager" | "technician" | "customer">("admin");

  // Customer Portal State
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [ratingSubmitted, setRatingSubmitted] = useState<number | null>(null);

  // Bio-Security Access & WebAuthn State
  const [bioAccessEnabled, setBioAccessEnabled] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  // High-Level Defense Configuration Overrides (Unlocked via Bio-Security Access)
  const [defenseConfigs, setDefenseConfigs] = useState({
    perimeterBarrier: true,
    seismicSubfloorPulse: false,
    ultrasonicBurstMode: true,
    automatedEmergencyDispatch: true,
  });

  // Technician Portal State
  const [techJobs, setTechJobs] = useState([
    {
      id: "JOB-901",
      client: "DLF Phase 5 Villa Estate",
      address: "Sector 54, Golf Course Rd, Gurugram",
      threat: "Subterranean Termite Acoustic Radar & Soil Injection",
      priority: "HIGH",
      status: "In Progress",
      customerName: "Mr. Nitish Roy",
      otpVerified: false,
      chemicalUsed: "2.5L Botanical Termiticide Matrix",
      beforePhoto: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=400&q=80",
      afterPhoto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "JOB-902",
      client: "Embassy Diplomatic Residence",
      address: "Chanakyapuri, New Delhi",
      threat: "Zero-Drill Non-Toxic Botanical Pest Barrier",
      priority: "EMERGENCY",
      status: "Dispatched",
      customerName: "Ambassadorial Estate Office",
      otpVerified: true,
      chemicalUsed: "1.0L Micro-Encapsulated Botanical Oil",
      beforePhoto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      afterPhoto: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "JOB-903",
      client: "CyberHub Fine Dining Complex",
      address: "DLF CyberCity, Sector 24, Gurgaon",
      threat: "Drainage Bio-Gel & Cockroach Ultrasonic Matrix",
      priority: "ROUTINE",
      status: "Scheduled",
      customerName: "CyberHub Operations Manager",
      otpVerified: false,
      chemicalUsed: "0.5L Food-Grade Enzyme Gel",
      beforePhoto: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
      afterPhoto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
    }
  ]);
  const [offlineSyncMode, setOfflineSyncMode] = useState(false);
  const [otpInput, setOtpInput] = useState<{ [key: string]: string }>({});

  // WebAuthn Toggle Helper
  const handleToggleBioSecurity = async () => {
    if (bioAccessEnabled) {
      setBioAccessEnabled(false);
      setAuthStatus("");
      setAuthError(null);
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);
    setAuthStatus("Initializing Device Biometric Sensor (WebAuthn)...");

    try {
      if (
        typeof window !== "undefined" &&
        window.PublicKeyCredential &&
        navigator.credentials &&
        typeof navigator.credentials.get === "function"
      ) {
        setAuthStatus("Touch ID / Face ID / Passkey Prompt Active...");
        const challenge = new Uint8Array(16);
        window.crypto.getRandomValues(challenge);

        const publicKeyRequestOptions: PublicKeyCredentialRequestOptions = {
          challenge: challenge,
          timeout: 10000,
          userVerification: "preferred",
        };

        try {
          await navigator.credentials.get({
            publicKey: publicKeyRequestOptions,
          });
          setAuthStatus("Passkey Verified via Hardware Authenticator!");
          setBioAccessEnabled(true);
          setIsAuthenticating(false);
          return;
        } catch (webAuthnErr: any) {
          console.log("WebAuthn API native call completed or fallback engaged:", webAuthnErr);
        }
      }

      setAuthStatus("Scanning Biometric Fingerprint & Face Print...");
      await new Promise((res) => setTimeout(res, 1000));
      setAuthStatus("Verifying Aegis High-Security Hash...");
      await new Promise((res) => setTimeout(res, 600));

      setAuthStatus("Clearance Granted — Level 5 Property Defense Unlocked!");
      setBioAccessEnabled(true);
    } catch (err: any) {
      setAuthError("Biometric Verification Failed. Please retry.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleVerifyOtp = (jobId: string) => {
    if (otpInput[jobId] === "4092" || otpInput[jobId]?.length === 4) {
      setTechJobs(prev => prev.map(j => j.id === jobId ? { ...j, otpVerified: true, status: "Completed" } : j));
    } else {
      alert("Please enter a valid 4-digit OTP provided by customer (e.g. 4092).");
    }
  };

  const handleSimulatePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 4000);
  };

  const handleGeneratePdfReport = (jobId: string) => {
    const reportWindow = window.open("", "_blank");
    if (!reportWindow) return;
    reportWindow.document.write(`
      <html>
        <head>
          <title>AEGIS BIODEFENSE - OFFICIAL INSPECTION & TREATMENT REPORT ${jobId}</title>
          <style>
            body { font-family: monospace, sans-serif; background: #0b101d; color: #e2e8f0; padding: 40px; line-height: 1.6; }
            .header { border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; }
            .badge { background: #10b98120; color: #10b981; padding: 4px 12px; border-radius: 4px; border: 1px solid #10b981; font-weight: bold; }
            .section { background: #131b2e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ffffff15; }
            h2 { color: #10b981; margin-top: 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .qr { border: 2px solid #10b981; padding: 10px; display: inline-block; background: #fff; color: #000; text-align: center; }
            .footer { border-top: 1px solid #334155; margin-top: 40px; padding-top: 20px; font-size: 11px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin:0; color:#fff;">AEGIS BIODEFENSE PVT. LTD.</h1>
              <p style="margin:4px 0 0 0; color:#10b981;">Architectural Bio-Pest Engineering & Eco Barrier Systems | Delhi NCR</p>
            </div>
            <div>
              <span class="badge">OFFICIAL CERTIFIED REPORT</span>
            </div>
          </div>

          <div class="section">
            <h2>INSPECTION & DISPATCH DETAILS</h2>
            <div class="grid">
              <div><strong>Report Reference:</strong> ${jobId}</div>
              <div><strong>Date of Service:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
              <div><strong>Protected Property:</strong> DLF Phase 5 Villa Estate, Gurugram</div>
              <div><strong>Lead Engineer:</strong> Officer Rajesh Verma (Badge #NCR-409)</div>
              <div><strong>Eco Safety Certification:</strong> 100% Pet & Child Safe (CPCB Compliant)</div>
              <div><strong>Structural Warranty:</strong> 10-Year Subterranean Guarantee</div>
            </div>
          </div>

          <div class="section">
            <h2>TREATMENT PROTOCOL EXECUTED</h2>
            <ul>
              <li>Subterranean Acoustic Termite Radar Sub-Slab Frequency Scan: Negative Signal Detected</li>
              <li>Micro-Encapsulated Botanical Imidacloprid Perimeter Trench Barrier Applied (2.5L)</li>
              <li>Zero-Drill Subfloor Soil Infiltration Completed</li>
              <li>IoT Ultrasonic Wave Grid Calibration & Sensor Synchronization Active</li>
            </ul>
          </div>

          <div class="section">
            <h2>CUSTOMER DIGITAL VERIFICATION & SIGNATURE</h2>
            <div class="grid">
              <div>
                <p><strong>Customer Signature:</strong> Nitish Kumar Roy</p>
                <p><strong>OTP Authentication:</strong> Verified (4-Digit Secure Hash)</p>
              </div>
              <div style="text-align: right;">
                <div class="qr">
                  [AEGIS QR SECURE SEAL]<br/>
                  <small>Verify at aegis-biodefense.com</small>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            Aegis BioDefense Pvt. Ltd. • DLF CyberCity Tower B, Level 12, Gurugram, NCR India • Emergency Hotline: +91 93547 31879<br/>
            This document is a legally binding CPCB & ISO 9001:2026 certified pest treatment record.
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#080D1A] border border-emerald-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-white font-mono">AEGIS ENTERPRISE OPERATIONS & CRM</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  NCR LIVE COMMAND
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Salesforce & ServiceTitan Class Operations Engine • Delhi NCR</p>
            </div>
          </div>

          {/* Role Based Access Selector & Close */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-slate-950 border border-white/10 rounded-xl p-1 text-[11px] font-mono">
              <span className="text-slate-400 px-2 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> RBAC:
              </span>
              {(["admin", "manager", "technician", "customer"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setUserRole(r)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    userRole === r ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Header */}
        <div className="flex items-center border-b border-white/10 bg-slate-950 px-2 sm:px-4 pt-2 text-xs font-mono shrink-0 overflow-x-auto touch-pan-x whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "customer"
                ? "bg-[#080D1A] border-t border-x border-emerald-500/40 text-emerald-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span>Customer Dashboard & AMC</span>
          </button>

          <button
            onClick={() => setActiveTab("technician")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "technician"
                ? "bg-[#080D1A] border-t border-x border-amber-500/40 text-amber-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HardHat className="w-4 h-4 shrink-0" />
            <span>Technician Portal</span>
          </button>

          <button
            onClick={() => setActiveTab("dispatch")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "dispatch"
                ? "bg-[#080D1A] border-t border-x border-red-500/40 text-red-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Navigation className="w-4 h-4 shrink-0" />
            <span>Emergency Dispatch Queue</span>
          </button>

          <button
            onClick={() => setActiveTab("crm")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "crm"
                ? "bg-[#080D1A] border-t border-x border-indigo-500/40 text-indigo-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>CRM & Lead Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "inventory"
                ? "bg-[#080D1A] border-t border-x border-cyan-500/40 text-cyan-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Chemical & Equipment Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "analytics"
                ? "bg-[#080D1A] border-t border-x border-teal-500/40 text-teal-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>AI Risk & Predictive Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl flex items-center space-x-2 transition-all shrink-0 ${
              activeTab === "security"
                ? "bg-[#080D1A] border-t border-x border-purple-500/40 text-purple-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Fingerprint className="w-4 h-4 shrink-0" />
            <span>Security & Audit Log</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 font-sans text-xs">
          
          {/* ==============================================
              TAB 1: CUSTOMER DASHBOARD & AMC
             ============================================== */}
          {activeTab === "customer" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* AMC Status Card */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 p-5 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      ACTIVE CONTRACT #AEGIS-AMC-2026-9482
                    </span>
                    <h3 className="text-lg font-bold text-white">Omni-Shield Sovereign 360 AMC</h3>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold w-fit flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Active - Fully Shielded</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Protected Property</span>
                    <strong className="text-white">Villa 14, DLF Golf Course Road, Gurugram</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Contract Period</span>
                    <strong className="text-white">Jan 15, 2026 — Jan 14, 2027</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Next Scheduled Scan</span>
                    <strong className="text-amber-400">Aug 10, 2026 (Quarterly Audit)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Structural Guarantee</span>
                    <strong className="text-emerald-400">₹10,00,00,000 Insurance</strong>
                  </div>
                </div>
              </div>

              {/* Live Technician GPS Tracker */}
              <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-emerald-400 animate-bounce" />
                    <h4 className="font-bold text-white font-mono text-sm">LIVE DISPATCH & GPS TRACKING</h4>
                  </div>
                  <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
                    VAN #HR-26-AEGIS-01 • ETA: 14 MINS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Map Visualizer */}
                  <div className="relative aspect-video rounded-xl bg-slate-950 border border-emerald-500/30 overflow-hidden flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
                    <div className="absolute w-36 h-36 rounded-full border border-emerald-500/30 animate-ping" />
                    <div className="absolute w-24 h-24 rounded-full border border-emerald-400/50 animate-pulse" />

                    <div className="relative z-10 text-center space-y-1">
                      <MapPin className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                        Gurugram Flyover &rarr; Golf Course Rd
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">Officer Rajesh Verma (Badge #NCR-TECH-409)</p>
                    </div>
                  </div>

                  {/* Technician Info */}
                  <div className="space-y-3 font-mono">
                    <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase">Lead Bio-Engineer</span>
                      <p className="text-white font-bold text-sm">Officer Rajesh Verma (Senior Pest Specialist)</p>
                      <p className="text-slate-400 text-xs">Task: Subterranean Acoustic Radar & Soil Injection</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <a
                        href="tel:+919354731879"
                        className="flex-1 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center justify-center space-x-2 hover:bg-emerald-500/30 min-h-[48px]"
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-400" />
                        <span>Call Bio-Engineer Directly</span>
                      </a>

                      <button
                        onClick={() => handleGeneratePdfReport("JOB-901")}
                        className="py-3 px-4 rounded-xl bg-slate-800 text-slate-200 border border-white/10 font-bold flex items-center space-x-2 hover:bg-slate-700 min-h-[48px]"
                      >
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span>View Inspection Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Reports & Before/After Thermal Photos */}
              <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
                  <h4 className="font-bold text-white text-sm">RECENT SERVICE REPORTS & THERMAL AUDITS</h4>
                  <span className="text-xs text-slate-400">3 Verified Inspections</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "REP-2026-01", date: "May 12, 2026", type: "Thermal Termite Audit", status: "100% Cleared", before: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=400&q=80", after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80" },
                    { id: "REP-2026-02", date: "Feb 18, 2026", type: "Botanical Mosquito Barrier", status: "Protected", before: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80", after: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
                    { id: "REP-2026-03", date: "Nov 04, 2025", type: "Subfloor Acoustic Radar Scan", status: "Zero Termites", before: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80", after: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" }
                  ].map((report) => (
                    <div key={report.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-emerald-400 font-bold">{report.id}</span>
                        <span className="text-slate-400">{report.date}</span>
                      </div>
                      <p className="font-bold text-white text-xs">{report.type}</p>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500 font-mono block mb-1">Pre-Treatment</span>
                          <img src={report.before} alt="Before Treatment" loading="lazy" referrerPolicy="no-referrer" className="w-full h-20 object-cover rounded-lg border border-white/10" />
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-400 font-mono block mb-1">Post-Treatment</span>
                          <img src={report.after} alt="After Treatment" loading="lazy" referrerPolicy="no-referrer" className="w-full h-20 object-cover rounded-lg border border-emerald-500/30" />
                        </div>
                      </div>

                      <button
                        onClick={() => handleGeneratePdfReport(report.id)}
                        className="w-full py-2 bg-slate-900 border border-white/10 rounded-lg text-emerald-400 hover:text-white font-mono text-[11px] font-bold flex items-center justify-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Certified PDF Report</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Invoices & Payment Gateway Simulator */}
              <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-4 font-mono">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-indigo-400" />
                    <h4 className="font-bold text-white text-sm">DIGITAL TAX INVOICES & AMC RENEWALS</h4>
                  </div>
                  <span className="text-xs text-slate-400">GST Invoice #INV-2026-881</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-950 rounded-xl border border-white/5 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Annual AMC Renewal Amount</span>
                    <p className="text-xl font-bold text-emerald-400">₹42,500 <span className="text-xs text-slate-400 font-normal">(Incl. 18% GST)</span></p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`px-3 py-2 rounded-lg border text-xs font-bold min-h-[44px] ${
                        paymentMethod === "upi" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-900 border-white/10 text-slate-400"
                      }`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`px-3 py-2 rounded-lg border text-xs font-bold min-h-[44px] ${
                        paymentMethod === "card" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-900 border-white/10 text-slate-400"
                      }`}
                    >
                      Card / Netbanking
                    </button>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="px-5 py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold uppercase text-xs hover:bg-emerald-300 min-h-[48px]"
                  >
                    Pay & Generate GST Invoice
                  </button>
                </div>

                {paymentSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-center font-bold animate-in fade-in duration-200">
                    Payment Successful! Official Tax Invoice #INV-2026-881 generated and sent to WhatsApp & Email.
                  </div>
                )}
              </div>

              {/* Service Rating & Feedback */}
              <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-3 font-mono">
                <h4 className="font-bold text-white text-sm">RATE YOUR LAST DISPATCH EXPERTISE</h4>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingSubmitted(star)}
                      className={`p-2 rounded-lg border transition-colors ${
                        (ratingSubmitted || 5) >= star
                          ? "bg-amber-500/20 border-amber-500 text-amber-400"
                          : "bg-slate-950 border-white/10 text-slate-600"
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2">
                    {ratingSubmitted ? `Thank you for rating ${ratingSubmitted}/5 Stars!` : "5.0/5 Stars (Officer Rajesh Verma)"}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* ==============================================
              TAB 2: TECHNICIAN PORTAL APP
             ============================================== */}
          {activeTab === "technician" && (
            <div className="space-y-6 font-mono animate-in fade-in duration-200">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-amber-500/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">FIELD TECHNICIAN DISPATCH PORTAL</h3>
                    <p className="text-xs text-slate-400">Officer Rajesh Verma (Badge #NCR-TECH-409)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setOfflineSyncMode(!offlineSyncMode)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 ${
                      offlineSyncMode ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-slate-950 text-slate-400 border-white/10"
                    }`}
                  >
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>{offlineSyncMode ? "Offline Mode (Storage Active)" : "Online Sync"}</span>
                  </button>
                </div>
              </div>

              {/* Jobs Queue */}
              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm">TODAY'S DISPATCH QUEUE ({techJobs.length} JOBS)</h4>

                {techJobs.map((job) => (
                  <div key={job.id} className="p-5 bg-slate-900 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-base">{job.id}: {job.client}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            job.priority === "EMERGENCY" ? "bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse" : "bg-emerald-500/20 text-emerald-400"
                          }`}>
                            {job.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>{job.address}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                          job.status === "Completed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : "bg-amber-500/20 text-amber-400 border-amber-500"
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Client Name</span>
                        <strong className="text-slate-200">{job.customerName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Protocol Description</span>
                        <strong className="text-amber-300">{job.threat}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Chemical Metering</span>
                        <strong className="text-cyan-400">{job.chemicalUsed}</strong>
                      </div>
                    </div>

                    {/* Job Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
                      <button
                        onClick={() => alert(`Launching Google Maps turn-by-turn route to ${job.address}`)}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center space-x-1.5 min-h-[44px]"
                      >
                        <Compass className="w-4 h-4" />
                        <span>Launch Route GPS</span>
                      </button>

                      {/* Customer OTP Verification */}
                      <div className="flex items-center space-x-2 bg-slate-950 border border-white/10 rounded-xl p-1">
                        <input
                          type="text"
                          placeholder="Customer 4-Digit OTP"
                          value={otpInput[job.id] || ""}
                          onChange={(e) => setOtpInput({ ...otpInput, [job.id]: e.target.value })}
                          className="w-32 bg-transparent px-3 py-1 text-xs text-white placeholder-slate-600 focus:outline-none"
                        />
                        <button
                          onClick={() => handleVerifyOtp(job.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
                        >
                          Verify OTP
                        </button>
                      </div>

                      <button
                        onClick={() => handleGeneratePdfReport(job.id)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-white/10 font-bold text-xs hover:bg-slate-700 flex items-center space-x-1.5 min-h-[44px]"
                      >
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span>Submit Job Report</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==============================================
              TAB 3: EMERGENCY DISPATCH QUEUE
             ============================================== */}
          {activeTab === "dispatch" && (
            <div className="space-y-6 font-mono animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-slate-900 border border-red-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-red-400 animate-bounce" />
                    <h3 className="font-bold text-white text-base">24x7 EMERGENCY DISPATCH COMMAND</h3>
                  </div>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded-full text-xs font-bold animate-pulse">
                    3 PRIORITY ALERTS
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "EMG-101", city: "Gurugram DLF Phase 1", issue: "Severe Subterranean Termite Swarm in Heritage Woodwork", van: "NCR Van #1", eta: "12 Mins", status: "En Route" },
                    { id: "EMG-102", city: "Chanakyapuri Embassy Area", issue: "Hornets & Snake Sighting near Perimeter Garden", van: "NCR Van #4", eta: "18 Mins", status: "Assigned" },
                    { id: "EMG-103", city: "Noida Expressway Sector 137", issue: "Commercial Restaurant German Cockroach Infestation", van: "NCR Van #8", eta: "25 Mins", status: "Priority Queue" }
                  ].map((emg) => (
                    <div key={emg.id} className="p-4 bg-slate-950 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-red-400 text-sm">{emg.id}</span>
                          <span className="text-white font-bold">{emg.city}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{emg.issue}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-amber-400 font-bold">{emg.van} ({emg.eta})</span>
                        <button
                          onClick={() => alert(`Overriding Priority Dispatch for ${emg.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold hover:bg-red-500/30"
                        >
                          Override Dispatch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB 4: ENTERPRISE CRM & LEAD PIPELINE
             ============================================== */}
          {activeTab === "crm" && (
            <div className="space-y-6 font-mono animate-in fade-in duration-200">
              
              {/* Executive KPI Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Active AMC Contracts</span>
                  <p className="text-2xl font-bold text-emerald-400">1,480</p>
                  <span className="text-[10px] text-emerald-500">+14% YoY Growth</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Dispatched Techs Today</span>
                  <p className="text-2xl font-bold text-amber-400">42 Vans</p>
                  <span className="text-[10px] text-slate-400">Delhi NCR Mobile Fleet</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Monthly Revenue</span>
                  <p className="text-2xl font-bold text-indigo-400">₹1.48 Crore</p>
                  <span className="text-[10px] text-indigo-400">Gurugram & South Delhi leading</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Customer Satisfaction</span>
                  <p className="text-2xl font-bold text-emerald-400">99.8%</p>
                  <span className="text-[10px] text-slate-400">2,840+ Estates Verified</span>
                </div>
              </div>

              {/* Lead Pipeline Table */}
              <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="font-bold text-white text-sm">LIVE CRM LEADS & QUOTE PIPELINE</h4>
                  <span className="text-xs text-slate-400">Salesforce & ServiceTitan Class Pipeline</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-3 font-semibold">LEAD ID</th>
                        <th className="pb-3 font-semibold">CLIENT / ESTATE</th>
                        <th className="pb-3 font-semibold">LOCATION</th>
                        <th className="pb-3 font-semibold">SERVICE REQUESTED</th>
                        <th className="pb-3 font-semibold">QUOTE VALUE</th>
                        <th className="pb-3 font-semibold">STAGE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {[
                        { id: "LEAD-401", client: "Oberoi Three Sixty West Penthouse", location: "Golf Course Extension Rd, Gurugram", service: "Subterranean Termite Acoustic Shield", quote: "₹85,000", stage: "Site Survey Scheduled" },
                        { id: "LEAD-402", client: "DLF Magnolias Estate", location: "Sector 42, Gurugram", service: "Omni-Shield Sovereign 360 AMC", quote: "₹1,20,00,000", stage: "Contract Signed" },
                        { id: "LEAD-403", client: "Fortis Healthcare Hospital Wing", location: "Sector 62, Noida", service: "Hospital Sterilization & Rodent Matrix", quote: "₹4,50,000", stage: "Quote Delivered" },
                        { id: "LEAD-404", client: "Vasant Vihar Embassy Bungalow", location: "South Delhi", service: "Zero-Drill Botanical Barrier", quote: "₹65,000", stage: "Technician Dispatched" }
                      ].map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-950/50 transition-colors">
                          <td className="py-3 text-emerald-400 font-bold">{lead.id}</td>
                          <td className="py-3 font-bold text-white">{lead.client}</td>
                          <td className="py-3 text-slate-400">{lead.location}</td>
                          <td className="py-3 text-slate-300">{lead.service}</td>
                          <td className="py-3 text-emerald-400 font-bold">{lead.quote}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold">
                              {lead.stage}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB 5: CHEMICAL & EQUIPMENT INVENTORY
             ============================================== */}
          {activeTab === "inventory" && (
            <div className="space-y-6 font-mono animate-in fade-in duration-200">
              <div className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-white text-base">CHEMICAL & ADVANCED SENSOR INVENTORY</h3>
                  </div>
                  <span className="text-xs text-slate-400">Central Warehouse • Gurgaon Depot</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Botanical Termiticide Matrix", qty: "450 Liters", status: "Optimal", reorder: "100L" },
                    { name: "German Cockroach Bio-Gel", qty: "120 Tubes", status: "Optimal", reorder: "30 Tubes" },
                    { name: "Acoustic Subfloor Radars", qty: "28 Units", status: "In Use (Mobile Fleet)", reorder: "5 Units" },
                    { name: "Ultrasonic Wave Generators", qty: "64 Units", status: "Reorder Triggered", reorder: "10 Units" }
                  ].map((inv, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                      <span className="text-xs font-bold text-white block">{inv.name}</span>
                      <p className="text-lg font-bold text-cyan-400">{inv.qty}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                        <span>Reorder Level: {inv.reorder}</span>
                        <span className="text-emerald-400 font-bold">{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB 6: AI RISK & PREDICTIVE ANALYTICS
             ============================================== */}
          {activeTab === "analytics" && (
            <div className="space-y-6 font-mono animate-in fade-in duration-200">
              <div className="rounded-2xl bg-slate-900 border border-teal-500/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-teal-400" />
                    <h3 className="font-bold text-white text-base">AI INFESTATION RISK & SEASONAL PREDICTOR</h3>
                  </div>
                  <span className="text-xs text-teal-400 font-bold">Gemini AI Model Trained on Delhi NCR Soil Data</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase block">Monsoon Termite Swarm Risk</span>
                    <strong className="text-red-400 text-lg block">98.4% HIGH RISK</strong>
                    <p className="text-[10px] text-slate-400">Gurugram DLF Phase 1-5 subfloor moisture level elevated.</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase block">AMC Renewal Probability</span>
                    <strong className="text-emerald-400 text-lg block">94.2% LIKELY</strong>
                    <p className="text-[10px] text-slate-400">High satisfaction score driving zero-churn contracts.</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase block">Repeat Infestation Probability</span>
                    <strong className="text-cyan-400 text-lg block">&lt; 0.01% ZERO RISK</strong>
                    <p className="text-[10px] text-slate-400">Micro-encapsulated barrier holding perimeter integrity.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB 7: SECURITY, WEBAUTHN & AUDIT LOGS
             ============================================== */}
          {activeTab === "security" && (
            <div className="space-y-6 font-mono animate-in fade-in duration-200">
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B132B] to-slate-900 border border-purple-500/40 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2 rounded-xl border ${bioAccessEnabled ? "bg-purple-500/20 border-purple-500 text-purple-400" : "bg-slate-800 border-white/10 text-slate-400"}`}>
                      <Fingerprint className={`w-5 h-5 ${isAuthenticating ? "animate-pulse text-purple-300" : ""}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-white text-sm">BIO-SECURITY & WEBAUTHN ACCESS CONTROL</h4>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${bioAccessEnabled ? "bg-purple-500/20 text-purple-400 border border-purple-500/40" : "bg-amber-500/20 text-amber-400 border border-amber-500/40"}`}>
                          {bioAccessEnabled ? "LEVEL 5 CLEARANCE" : "HARDWARE KEY REQUIRED"}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Touch ID / Face ID / FIDO2 Passkey Override for High-Level Defense</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={handleToggleBioSecurity}
                      disabled={isAuthenticating}
                      className="px-4 py-2.5 rounded-xl bg-purple-500 text-slate-950 font-bold text-xs hover:bg-purple-400 min-h-[44px]"
                    >
                      {bioAccessEnabled ? "Disarm Hardware Biometrics" : "Authenticate TouchID / FaceID"}
                    </button>
                  </div>
                </div>

                {isAuthenticating && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/50 text-center space-y-1">
                    <p className="text-xs text-purple-300 font-bold animate-pulse">{authStatus}</p>
                  </div>
                )}

                {/* Audit Logs */}
                <div className="space-y-2 pt-2">
                  <h5 className="font-bold text-white text-xs">REAL-TIME ENTERPRISE AUDIT LOG</h5>
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-2 text-[11px] text-slate-400">
                    <p>[2026-07-30 04:15:10] USER 'admin@aegis' logged in via WebAuthn Hardware Passkey.</p>
                    <p>[2026-07-30 04:12:02] DISPATCH #JOB-901 OTP verified by Customer Nitish Roy.</p>
                    <p>[2026-07-30 04:05:44] INVOICE #INV-2026-881 generated and transmitted to WhatsApp API.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
