"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Shield, Watch } from "lucide-react";

export function CollectionStory() {
  return (
    <section className="bg-[#0B0B0B] text-[#F4F1EA] py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28 md:space-y-36">
        {/* Section Lead-in */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            HOROLOGICAL PILLARS
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#F4F1EA]">
            THREE PHILOSOPHIES OF TIME
          </h2>
          <p className="text-xs md:text-sm text-[#8E877C] leading-relaxed font-sans-ui">
            Distinct mechanical personalities, unified by uncompromising metallurgical standards and architectural symmetry.
          </p>
        </div>

        {/* Story 1: THE CHRONOGRAPH (Asymmetric 7-5 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#161616] border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1547996160-71dfabb172e8?auto=format&fit=crop&w=1600&q=85"
              alt="NOIRÉ The Chronograph Collection"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#C6C0B5]">
              <span>COLUMN-WHEEL ESCAPEMENT</span>
              <span className="text-[#C5A880]">0.1s PRECISION</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>SERIES I</span>
            </div>
            <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#F4F1EA] tracking-wide">
              THE CHRONOGRAPH
            </h3>
            <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui leading-relaxed font-light">
              Engineered for the instantaneous measurement of human endeavor. Featuring recessed dual-register dials with radial snailing, responsive pump pushers with haptic detents, and a high-hardness ceramic tachymeter bezel.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/the-chronograph"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-[#F4F1EA] hover:text-[#C5A880] transition-colors group"
              >
                <span>Discover The Chronograph</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Story 2: THE AUTOMATIC (Reversed Asymmetric 5-7 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1 lg:pr-4">
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] font-mono">
              <Watch className="w-3.5 h-3.5" />
              <span>SERIES II</span>
            </div>
            <h3 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#F4F1EA] tracking-wide">
              THE AUTOMATIC
            </h3>
            <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui leading-relaxed font-light">
              The perpetual kinetic harmony between wearer and caliber. Featuring an exhibition sapphire caseback that reveals our proprietary tungsten rotor, delivering an uninterrupted 72-hour power reserve with chronometric poise.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/the-automatic"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-[#F4F1EA] hover:text-[#C5A880] transition-colors group"
              >
                <span>Discover The Automatic</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#161616] border border-white/10 group order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85"
              alt="NOIRÉ The Automatic Collection"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#C6C0B5]">
              <span>72-HR IN-HOUSE RESERVE</span>
              <span className="text-[#C5A880]">28,800 VIBRATIONS / HR</span>
            </div>
          </div>
        </div>

        {/* Story 3: THE CLASSIC (Full Editorial Banner with Offset Card) */}
        <div className="relative overflow-hidden bg-[#141414] border border-white/10 p-8 md:p-14 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] font-mono">
                <Shield className="w-3.5 h-3.5" />
                <span>SERIES III</span>
              </div>
              <h3 className="font-serif-display text-3xl sm:text-5xl md:text-6xl text-[#F4F1EA] leading-tight">
                THE CLASSIC
              </h3>
              <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui leading-relaxed font-light max-w-lg">
                Proportion in its purest expression. Vitreous enamel dials, heat-tempered blued steel hands, and full-grain French calfskin straps designed to slip gracefully beneath a bespoke shirt cuff.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/the-classic"
                  className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
                >
                  <span>Explore The Classic</span>
                  <ArrowRight className="w-4 h-4 text-[#0B0B0B]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-square max-w-md mx-auto w-full overflow-hidden border border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85"
                alt="NOIRÉ The Classic Timepiece"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
