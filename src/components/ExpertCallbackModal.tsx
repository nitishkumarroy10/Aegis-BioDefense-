import React, { useState } from "react";
import { DefensePlan, CurrencyCode } from "../types";
import { X, PhoneCall, Calendar, Clock, Sparkles, User, MapPin, CheckCircle2, Shield, Bot, Send, ArrowRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExpertCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: DefensePlan | null;
  currency: CurrencyCode;
}

export default function ExpertCallbackModal({
  isOpen,
  onClose,
  plan,
  currency,
}: ExpertCallbackModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Delhi NCR (Dwarka Sector 8)");
  const [preferredDate, setPreferredDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("02:00 PM - 03:00 PM (Optimal)");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    "10:00 AM - 11:00 AM (Morning)",
    "02:00 PM - 03:00 PM (Optimal)",
    "05:00 PM - 06:00 PM (Evening)",
    "08:00 PM - 09:00 PM (Urgent Night Slot)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName("");
    setPhone("");
    setNotes("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/20 text-white z-10 my-8 overflow-hidden"
        >
          {/* Top Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2 pr-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  <Bot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>AI Expert Dispatch Scheduler</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Request Expert Consultation
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Schedule a direct 1-on-1 bio-defense consultation with a senior engineer from CEO Vikash Kumar Roy's executive dispatch team.
                </p>
              </div>

              {/* Selected Plan Badge */}
              {plan && (
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-2.5">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Selected Tier</span>
                      <span className="text-white font-bold">{plan.name}</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    {currency === "INR" ? `₹${plan.monthlyPriceINR.toLocaleString("en-IN")}/mo` : `$${plan.monthlyPriceUSD}/mo`}
                  </span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                    Full Name / Estate Manager
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Nitish Kumar Roy"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-emerald-400 transition-colors min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                    Contact Phone Number
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91 93547 31879"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-400 transition-colors min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Location / Property Sector */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                    Property Location / Sector
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      autoComplete="street-address"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-emerald-400 transition-colors min-h-[48px]"
                    />
                  </div>
                </div>

                {/* Preferred Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-400 transition-colors min-h-[48px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 bg-slate-950 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-400 transition-colors appearance-none cursor-pointer min-h-[48px]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-slate-950 text-white">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* AI Time Availability Banner */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start space-x-2.5 text-[11px] text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>AI Smart Dispatch:</strong> Slot selected is open. Senior Bio-Engineer reserved for {preferredTimeSlot.split(" ")[0]} callback on {preferredDate}.
                  </span>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                    Specific Concerns / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Acoustic subterranean termite check for 3-story estate woodwork..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Bot className="w-4 h-4 animate-spin" />
                      <span>Locking AI Callback Slot...</span>
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4 text-slate-950" />
                      <span>Confirm Callback Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Confirmation View */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Callback Locked & Confirmed
                </span>
                <h3 className="text-2xl font-bold text-white">Expert Consultation Scheduled!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{fullName || "Client"}</strong>. Our chief bio-defense advisor will call you at <strong className="text-emerald-400 font-mono">{phone || "+91 93547 31879"}</strong> on:
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 font-mono text-xs text-left space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-white font-bold">{preferredDate}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Slot:</span>
                  <span className="text-emerald-400 font-bold">{preferredTimeSlot}</span>
                </div>
                {plan && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Plan Focus:</span>
                    <span className="text-amber-300 font-bold">{plan.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Engineer:</span>
                  <span className="text-white font-bold">Vikash Kumar Roy (CEO Unit)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-300 flex items-center justify-between max-w-sm mx-auto">
                <span className="text-slate-400 font-mono text-[11px]">Need immediate assistance?</span>
                <a
                  href="https://wa.me/919354731879?text=Hello%20Aegis%20BioDefense,%20I%20just%20scheduled%20a%20callback%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-[11px] font-mono font-bold flex items-center space-x-1 hover:bg-emerald-400"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Now</span>
                </a>
              </div>

              <button
                onClick={resetForm}
                className="w-full max-w-sm min-h-[44px] py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer border border-white/10"
              >
                Close & Return
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
