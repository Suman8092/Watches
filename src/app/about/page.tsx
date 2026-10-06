import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Compass, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "The Atelier & Maison — NOIRÉ Haute Horlogerie",
  description: "The story of NOIRÉ: Independent horological manufacture founded in Geneva.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            MAISON &amp; HERITAGE
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-[#F4F1EA] font-light">
            THE GENEVA ATELIER
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-sans-ui font-light leading-relaxed">
            Independent Swiss watchmaking guided by radical restraint, surgical metallurgy, and mechanical permanence.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-[21/9] w-full bg-[#181818] overflow-hidden border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=85"
            alt="NOIRÉ Watchmaking workbench"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            RUE DU RHÔNE 42, GENÈVE
          </div>
        </div>

        {/* 2-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F4F1EA]">
              Born in Geneva. Sculpted for the Modern Connoisseur.
            </h2>
            <p className="text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
              Founded on the belief that horology should not be beholden to conglomerate marketing cycles, NOIRÉ operates as an independent horological atelier. We restrict annual production to ensure every caliber receives unhurried chronometric regulation.
            </p>
            <p className="text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
              From our proprietary Caliber N-01 with its 72-hour power reserve to the hand-beveled chamfers of our forged 316L cases, each timepiece is a testament to human patience and engineering discipline.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 bg-[#141414] border border-white/10 p-8">
            <h3 className="font-serif-display text-2xl text-[#C5A880]">The 4 Pillars of NOIRÉ</h3>
            <div className="space-y-4 text-xs divide-y divide-white/5">
              <div className="pt-2">
                <span className="font-mono text-[#F4F1EA] uppercase block mb-1">01 / Mechanical Autonomy</span>
                <p className="text-[#8E877C]">100% mechanical calibers engineered without programmed electronic obsolescence.</p>
              </div>
              <div className="pt-3">
                <span className="font-mono text-[#F4F1EA] uppercase block mb-1">02 / Surgical Metallurgy</span>
                <p className="text-[#8E877C]">Monobloc cases forged from medical-grade 316L steel, grade 5 titanium, and CuSn8 bronze.</p>
              </div>
              <div className="pt-3">
                <span className="font-mono text-[#F4F1EA] uppercase block mb-1">03 / Ergonomic Draping</span>
                <p className="text-[#8E877C]">Down-swept faceted lugs sculpted to contour naturally across carpal anatomy.</p>
              </div>
              <div className="pt-3">
                <span className="font-mono text-[#F4F1EA] uppercase block mb-1">04 / Limited Allocation</span>
                <p className="text-[#8E877C]">Individually numbered timepieces produced in limited annual batches.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Private Salon Appointments CTA */}
        <div className="p-8 md:p-14 bg-[#141414] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
              BESPOKE CONSULTATION
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F4F1EA]">
              Schedule a Private Salon Appointment
            </h3>
            <p className="text-xs text-[#8E877C] max-w-lg">
              Experience the full NOIRÉ collection in person at our private salons in Geneva, New York, or Tokyo.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors whitespace-nowrap"
          >
            Reserve Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
