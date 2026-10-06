import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Wrench, Check } from "lucide-react";

export const metadata = {
  title: "5-Year Manufacture Warranty — NOIRÉ",
  description: "Comprehensive 5-year mechanical guarantee for every NOIRÉ caliber.",
};

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        <div className="space-y-4 pb-8 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            HOROLOGICAL GUARANTEE
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] font-light">
            5-YEAR MANUFACTURE WARRANTY
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-light leading-relaxed">
            Every NOIRÉ timepiece is engineered for generational permanence. We stand behind every gear, balance spring, and gasket.
          </p>
        </div>

        <div className="space-y-8 text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#141414] border border-white/10 space-y-2">
              <span className="text-[#C5A880] font-mono uppercase text-xs">Escapement &amp; Caliber</span>
              <p className="font-serif-display text-lg text-white">Full Mechanical Coverage</p>
              <p className="text-xs text-[#8E877C]">Covers chronometric deviation beyond manufacture specs.</p>
            </div>
            <div className="p-6 bg-[#141414] border border-white/10 space-y-2">
              <span className="text-[#C5A880] font-mono uppercase text-xs">Gaskets &amp; Seals</span>
              <p className="font-serif-display text-lg text-white">Water Resistance</p>
              <p className="text-xs text-[#8E877C]">Free biennial water resistance testing and gasket replacement.</p>
            </div>
            <div className="p-6 bg-[#141414] border border-white/10 space-y-2">
              <span className="text-[#C5A880] font-mono uppercase text-xs">Atelier Service</span>
              <p className="font-serif-display text-lg text-white">Complimentary Regulation</p>
              <p className="text-xs text-[#8E877C]">Fine timing adjustments by master horologists.</p>
            </div>
          </div>

          <div className="p-6 bg-[#141414] border border-white/10 space-y-3">
            <h3 className="font-serif-display text-xl text-[#F4F1EA]">Warranty Registration</h3>
            <p>
              Your timepiece is digitally registered in our Geneva Horological Archive at the moment of dispatch. The serialized physical warranty passport accompanying your piece contains your NFC authenticity chip and registered owner credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
