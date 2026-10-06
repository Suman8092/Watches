import React from "react";

export const metadata = {
  title: "Privacy Policy — NOIRÉ",
  description: "Client data confidentiality and protection commitments.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-8 text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
        <div className="space-y-4 pb-8 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            LEGAL PROTOCOL
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] font-light">
            PRIVACY &amp; CONFIDENTIALITY
          </h1>
          <p className="text-[#8E877C]">Last revised: October 2026 · Geneva, Switzerland</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[#F4F1EA]">1. Commitment to Client Confidentiality</h2>
          <p>
            NOIRÉ treats client identity and acquisition records with supreme discretion. We never sell, monetize, or disclose collector registries to third-party marketing entities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[#F4F1EA]">2. Data Collected &amp; Purpose</h2>
          <p>
            Personal contact, delivery coordinates, and serial number ownership are stored securely solely to facilitate insured armored transit, warranty validation, and provenance records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl text-[#F4F1EA]">3. Encrypted Transactions</h2>
          <p>
            Payment information is processed via PCI-DSS Level 1 compliant vault architectures. NOIRÉ servers never store full credit card numbers or private security codes.
          </p>
        </section>
      </div>
    </div>
  );
}
