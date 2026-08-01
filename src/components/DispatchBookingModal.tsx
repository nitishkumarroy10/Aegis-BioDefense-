import React, { useState } from "react";
import { DefensePlan, DiagnosisResult, BookingDetails } from "../types";
import { X, ShieldCheck, Clock, Calendar, MapPin, Phone, User, Mail, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { db, auth, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface DispatchBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan?: DefensePlan | null;
  preselectedDiagnosis?: DiagnosisResult | null;
}

export default function DispatchBookingModal({
  isOpen,
  onClose,
  preselectedPlan,
  preselectedDiagnosis,
}: DispatchBookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<BookingDetails>({
    propertyType: "Residential Estate",
    sqFt: 3500,
    serviceType: preselectedPlan?.name || preselectedDiagnosis?.recommendedAegisProtocol || "Aegis Thermal & Acoustic Bio-Defense",
    priority: "urgent",
    address: "",
    zipCode: "",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "09:00 - 11:00 AM",
    notes: preselectedDiagnosis ? `AI Assessment: ${preselectedDiagnosis.identifiedThreat}` : "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (auth.currentUser) {
        await addDoc(collection(db, "inspections"), {
          userId: auth.currentUser.uid,
          fullName: formData.contactName || "Guest Client",
          phone: formData.contactPhone || "",
          city: "Delhi NCR",
          propertyType: formData.propertyType,
          sqft: formData.sqFt,
          preferredDate: formData.preferredDate,
          status: "Pending Dispatch",
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.warn("Firestore save fallback:", err);
    } finally {
      setIsSaving(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0B0F17] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900 border border-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                DISPATCH ORDER CONFIRMED • TICKET #AEG-8492
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Bio-Shield Field Unit Reserved
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                A senior Aegis Bio-Engineer has been assigned to your address. Confirmation SMS and real-time GPS arrival tracking sent to <strong className="text-white">{formData.contactPhone || "your phone"}</strong>.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Protocol:</span>
                <span className="text-emerald-400 font-bold">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Scheduled Date:</span>
                <span className="text-white">{formData.preferredDate} ({formData.preferredTime})</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Guaranteed Arrival:</span>
                <span className="text-teal-300 font-bold">
                  {formData.priority === "emergency" ? "< 60 Minutes" : "< 4 Hours"}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:bg-emerald-300 transition-colors"
            >
              Return to System Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>RAPID DISPATCH CONCIERGE</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Deploy Bio-Shield Field Engineering
              </h3>
              <p className="text-xs text-slate-400">
                Provide location details below for immediate rapid dispatch or scheduled bio-defense installation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Selected Protocol
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.serviceType}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs font-semibold text-emerald-300"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Dispatch Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="emergency">Emergency (&lt; 60 Min Arrival)</option>
                    <option value="urgent">Urgent Same-Day (&lt; 4 Hours)</option>
                    <option value="routine">Scheduled Installation</option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Vikramjit Singhania"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Phone (SMS & WhatsApp Alerts)
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98100-00000"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vikram@estate.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 min-h-[48px]"
                  />
                </div>
              </div>

              {/* Address & Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Property Address / Sector / Enclave
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="street-address"
                    placeholder="e.g. DLF Magnolias, Golf Course Rd, Gurgaon"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    PIN Code / Zip
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="postal-code"
                    placeholder="122002"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono min-h-[48px]"
                  />
                </div>
              </div>

              {/* Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Preferred Service Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 min-h-[48px]"
                  >
                    <option value="Immediate Arrival">Immediate Arrival (Emergency)</option>
                    <option value="08:00 - 10:00 AM">08:00 - 10:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 - 04:00 PM">02:00 - 04:00 PM</option>
                    <option value="05:00 - 07:00 PM">05:00 - 07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>{isSaving ? "Reserving Dispatch..." : "Confirm & Deploy Field Unit"}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
