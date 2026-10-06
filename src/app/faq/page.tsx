import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Collector FAQ — NOIRÉ",
  description: "Frequently asked questions regarding NOIRÉ timepieces, calibers, and acquisitions.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Where are NOIRÉ timepieces manufactured?",
      a: "Every NOIRÉ timepiece is designed, machined, hand-finished, and regulated in our atelier in Geneva, Switzerland, adhering strictly to Swiss Made horological standards.",
    },
    {
      q: "What is the typical power reserve of your calibers?",
      a: "Our flagship Caliber N-01 automatic features a 72-hour (3-day) power reserve achieved via an optimized mainspring barrel and high-inertia tungsten rotor. Our manual-wind flying tourbillon calibers feature a 96-hour dual-barrel reserve.",
    },
    {
      q: "How does the 30-day trial and return policy work?",
      a: "You may examine and wear your timepiece in personal comfort for up to 30 days. If you decide it is not the ideal companion for your wrist, our concierge will arrange complimentary armored courier collection for a 100% refund.",
    },
    {
      q: "Are customs duties included in the acquisition price?",
      a: "Yes. All listed prices include VAT, import tariffs, and customs duties for the US, EU, UK, Switzerland, UAE, Singapore, Japan, and India. There are never surprise fees upon delivery.",
    },
    {
      q: "How often should my mechanical watch be serviced?",
      a: "We recommend a comprehensive atelier overhaul once every 5 to 7 years. We provide complimentary biennial pressure testing and gasket inspections to ensure lifelong water integrity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        <div className="space-y-4 pb-8 border-b border-white/10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            INQUIRIES &amp; CLARIFICATIONS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] font-light">
            COLLECTOR FAQ
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-light leading-relaxed">
            Essential questions regarding manufacture provenance, calibers, delivery, and ongoing horological care.
          </p>
        </div>

        <div className="divide-y divide-white/10 space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pt-6 space-y-2">
              <h3 className="font-serif-display text-2xl text-[#F4F1EA]">{faq.q}</h3>
              <p className="text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs">
          <span className="text-[#8E877C]">Have an unlisted question?</span>
          <Link href="/contact" className="text-[#C5A880] hover:text-white uppercase tracking-widest font-mono">
            Contact Concierge →
          </Link>
        </div>
      </div>
    </div>
  );
}
