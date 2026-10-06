import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Check } from "lucide-react";

export const metadata = {
  title: "30-Day Bespoke Returns — NOIRÉ",
  description: "Complimentary return transport with insured collection for your peace of mind.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        <div className="space-y-4 pb-8 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            CLIENT ASSURANCE
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] font-light">
            30-DAY BESPOKE RETURNS
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-light leading-relaxed">
            Acquiring a high-horology timepiece requires complete aesthetic confidence. Enjoy a 30-day trial period from the date of physical receipt.
          </p>
        </div>

        <div className="space-y-8 text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
          <div className="space-y-4">
            <h3 className="font-serif-display text-2xl text-[#F4F1EA]">Return Criteria</h3>
            <p>
              To qualify for a full refund or exchange:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C5A880]" />
                <span>The timepiece must remain unworn, free of microscopic scratches, and in pristine condition.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C5A880]" />
                <span>All presentation materials, lacquered boxes, warranty passports, and certificates must be intact.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C5A880]" />
                <span>The security seals on the caseback and deployment buckle must not be tampered with.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-[#141414] border border-white/10 space-y-3">
            <h3 className="font-serif-display text-xl text-[#F4F1EA]">Insured Return Process</h3>
            <p>
              Contact our concierge at <span className="text-[#C5A880] font-mono">concierge@noire-timepieces.com</span>. We will arrange for an armored courier to collect the timepiece from your residence or office at zero cost to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
