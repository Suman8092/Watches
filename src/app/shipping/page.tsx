import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, Globe } from "lucide-react";

export const metadata = {
  title: "Complimentary Insured Courier Delivery — NOIRÉ",
  description: "Global armored transport with signature receipt for all NOIRÉ timepieces.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        <div className="space-y-4 pb-8 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            LOGISTICS &amp; TRANSPORT
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] font-light">
            COMPLIMENTARY INSURED COURIER
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-light leading-relaxed">
            Every NOIRÉ timepiece travels under continuous armored transport with full declared-value insurance until personal delivery confirmation.
          </p>
        </div>

        <div className="space-y-8 text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
          <div className="p-6 bg-[#141414] border border-white/10 space-y-3">
            <h3 className="font-serif-display text-xl text-[#F4F1EA]">White-Glove Delivery Standards</h3>
            <p>
              We partner exclusively with specialized high-value carriers (including Malca-Amit and Ferrari Group) to guarantee discrete, secure delivery. Every package requires adult signature verification and government-issued identification upon receipt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#141414] border border-white/10 space-y-2">
              <span className="text-[#C5A880] font-mono uppercase text-xs">Domestic &amp; Europe</span>
              <p className="font-serif-display text-xl text-white">2–3 Business Days</p>
              <p className="text-xs text-[#8E877C]">Dispatched directly from Geneva atelier.</p>
            </div>
            <div className="p-6 bg-[#141414] border border-white/10 space-y-2">
              <span className="text-[#C5A880] font-mono uppercase text-xs">International &amp; Worldwide</span>
              <p className="font-serif-display text-xl text-white">3–5 Business Days</p>
              <p className="text-xs text-[#8E877C]">Customs clearance expedited with prepaid duties.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif-display text-2xl text-[#F4F1EA]">Customs Duties &amp; Taxes</h3>
            <p>
              For orders to the United States, European Union, United Kingdom, Switzerland, UAE, Singapore, Japan, and India, all import tariffs and local taxes are calculated and absorbed by NOIRÉ. The price you see at acquisition is completely inclusive.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <Link href="/contact" className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-white">
            Have a special delivery request? Speak with our Concierge →
          </Link>
        </div>
      </div>
    </div>
  );
}
