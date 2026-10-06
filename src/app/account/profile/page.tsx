"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, User, ShieldCheck, Mail, Phone, MapPin, Check } from "lucide-react";

export default function AccountProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Collector",
    lastName: "Archive",
    email: "collector@sntoriginals.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    country: "India",
    address: "Atelier Private Residence",
    tier: "Geneva Circle Member",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("noire_collector_profile");
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch {}
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("noire_collector_profile", JSON.stringify(profile));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Navigation */}
        <Link
          href="/account"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8E877C] hover:text-[#C5A880] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Collector Archive</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-white/10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              CLIENT DOSSIER
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] mt-1">
              COLLECTOR PROFILE
            </h1>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            {profile.tier}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-8">
          <div className="bg-[#141414] border border-white/10 p-6 md:p-8 space-y-6">
            <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-3 border-b border-white/10">
              Identity &amp; Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  Primary Email (Order &amp; Serial Archive)
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  Telephone (Armored Delivery Confirmation)
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 p-6 md:p-8 space-y-6">
            <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-3 border-b border-white/10">
              Default Delivery Vault
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block mb-2">
                  Country / Jurisdiction
                </label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full bg-[#1C1C1C] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
            >
              Update Client Dossier
            </button>

            {saved && (
              <span className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono">
                <Check className="w-4 h-4" />
                <span>Dossier successfully updated</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
