"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salon: "Geneva (Rue du Rhône)",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 pb-8 border-b border-white/10 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            CLIENT CONCIERGE &amp; ATELIER
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl text-[#F4F1EA] font-light">
            PRIVATE INQUIRIES
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-light leading-relaxed">
            Our horological concierges are available to assist with bespoke commissions, international allocations, and salon viewings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 bg-[#141414] border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-full border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl text-[#F4F1EA]">
                  Inquiry Received with Distinction
                </h3>
                <p className="text-xs text-[#8E877C] leading-relaxed">
                  Thank you for your inquiry, {formData.name}. A senior horological curator will contact you at {formData.email} within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-[#121212] border border-white/10 p-8">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                    Preferred Salon Location
                  </label>
                  <select
                    value={formData.salon}
                    onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Geneva (Rue du Rhône)">Geneva (Rue du Rhône 42)</option>
                    <option value="New York (Fifth Avenue)">New York (Fifth Avenue 740)</option>
                    <option value="Tokyo (Ginza)">Tokyo (Ginza 6-Chome)</option>
                    <option value="Virtual Consultation">Private Virtual Video Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                    Your Horological Inquiry *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the reference or commission you wish to discuss..."
                    className="w-full bg-[#1A1A1A] border border-white/15 px-4 py-3 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
                >
                  Transmit Inquiry to Concierge
                </button>
              </form>
            )}
          </div>

          {/* Salons List */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#141414] border border-white/10 p-8 space-y-6 text-xs">
              <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-3 border-b border-white/10">
                Maison Salons
              </h3>

              <div className="space-y-4 text-[#8E877C]">
                <div>
                  <span className="font-mono text-[#F4F1EA] uppercase block mb-1">Geneva Flagship</span>
                  <p>Rue du Rhône 42, 1204 Genève, Switzerland</p>
                  <p className="text-[11px] text-[#C5A880] mt-0.5">+41 22 819 00 00</p>
                </div>

                <div>
                  <span className="font-mono text-[#F4F1EA] uppercase block mb-1">New York Salon</span>
                  <p>740 Fifth Avenue, Floor 18, New York, NY 10019</p>
                  <p className="text-[11px] text-[#C5A880] mt-0.5">+1 (212) 555-0198</p>
                </div>

                <div>
                  <span className="font-mono text-[#F4F1EA] uppercase block mb-1">Tokyo Atelier</span>
                  <p>Ginza 6-Chome 10-1, Chuo-ku, Tokyo 104-0061</p>
                  <p className="text-[11px] text-[#C5A880] mt-0.5">+81 3 5555 0142</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-[#8E877C]">
                Direct Concierge Email:
                <br />
                <span className="text-[#F4F1EA] font-mono">concierge@noire-timepieces.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
