"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Award } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-28 md:py-36 bg-[#F4F1EA] text-[#0B0B0B] border-t border-[#0B0B0B]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Editorial Eyebrow */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E877C] font-mono">
            THE ATELIER MANIFESTO
          </span>
          <div className="w-8 h-[1px] bg-[#8E877C]" />
        </div>

        {/* Large Typography Statement */}
        <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0B0B0B] font-light leading-[0.98] tracking-tight mb-16 md:mb-24 max-w-5xl">
          BUILT FOR THE <br />
          <span className="italic font-normal">YEARS AHEAD.</span>
        </h2>

        {/* Asymmetric Split Layout: Image Composition + Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Composition: Staggered Watchmaking Atelier Photos */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 relative aspect-[4/5] bg-white border border-[#0B0B0B]/10 overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85"
                alt="NOIRÉ Master Watchmaker assembling mechanical escapement"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 70vw, 40vw"
              />
            </div>

            <div className="col-span-4 space-y-4">
              <div className="relative aspect-square bg-white border border-[#0B0B0B]/10 overflow-hidden shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=85"
                  alt="NOIRÉ Hand-polished bevels and chamfering"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 30vw, 20vw"
                />
              </div>

              <div className="p-4 bg-white border border-[#0B0B0B]/10 text-[#0B0B0B]">
                <span className="font-serif-display text-2xl md:text-3xl block">1,000h</span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C]">
                  CHRONOMETRIC TESTING
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif-display text-2xl md:text-3xl text-[#0B0B0B] leading-snug">
                Where Kinetic Art Meets Modern Metallurgy.
              </h3>
              <p className="text-xs md:text-sm text-[#555555] font-sans-ui font-light leading-relaxed">
                Founded on the premise that true luxury is quiet, deliberate, and permanent. In our Geneva atelier, we eschew fleeting seasonal novelties in favor of mechanical integrity and architectural proportion.
              </p>
              <p className="text-xs md:text-sm text-[#555555] font-sans-ui font-light leading-relaxed">
                Every component — from our forged 316L cases to hand-blued screws and synthetic ruby bearings — is engineered to be serviced, treasured, and passed down across generations.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#0B0B0B]/10 text-xs">
              <div className="space-y-1">
                <span className="text-[#0B0B0B] font-medium block">Mechanical Permanence</span>
                <p className="text-[#8E877C] text-[11px] leading-normal">
                  Zero programmed obsolescence. 100% serviceable mechanical gear trains.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[#0B0B0B] font-medium block">Archival Proportions</span>
                <p className="text-[#8E877C] text-[11px] leading-normal">
                  Curved case geometries engineered for ergonomic carpal draping.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] font-medium text-[#0B0B0B] hover:text-[#8E877C] transition-colors pb-1 border-b border-[#0B0B0B]"
              >
                <span>Read The Full Maison Chronicle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
