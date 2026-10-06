import React from "react";

export const metadata = {
  title: "Terms of Acquisition — NOIRÉ",
  description: "Terms and conditions governing timepiece allocations and sales.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8 text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
        <div className="space-y-4 pb-8 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            LEGAL FRAMEWORK
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] font-light">
            TERMS OF ACQUISITION
          </h1>
          <p className="text-[#8E877C]">Governed by the laws of the Canton of Geneva, Switzerland.</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[#F4F1EA]">1. Order Placement &amp; Serial Allocation</h2>
          <p>
            An acquisition request constitutes an offer to purchase a serialized timepiece from NOIRÉ Horlogerie S.A. Allocation is confirmed upon payment settlement and issuance of an official order reference.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[#F4F1EA]">2. Limited Annual Production</h2>
          <p>
            Due to the hand-finished nature of our calibers, production is limited. In the event an edition is oversubscribed, NOIRÉ reserves the right to allocate pieces by chronological receipt or issue a complete refund.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[#F4F1EA]">3. Title &amp; Risk of Loss</h2>
          <p>
            Risk of loss transfers to the collector only upon signature confirmation by the recipient during armored courier handoff.
          </p>
        </section>
      </div>
    </div>
  );
}
