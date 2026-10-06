"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Compass, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#0B0B0B] text-[#F4F1EA] flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Watch Imagery with Slow Motion Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=90"
            alt="NOIRÉ Horological Flagship Timepiece"
            fill
            priority
            className="object-cover object-center brightness-[0.42] contrast-[1.12]"
            sizes="100vw"
          />
        </motion.div>
        {/* Subtle Gradient Overlays for Architectural Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/30 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,11,11,0.6)_100%)]" />
      </div>

      {/* Subtle Horological Perimeter Coordinate Metadata */}
      <div className="absolute top-28 left-6 md:left-12 z-10 hidden sm:flex items-center space-x-3 text-[10px] tracking-[0.25em] text-[#8E877C] font-mono uppercase">
        <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>46°12&apos;09&quot;N 06°08&apos;42&quot;E · GENÈVE</span>
      </div>

      <div className="absolute top-28 right-6 md:right-12 z-10 hidden sm:flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C5A880] font-mono uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
        <span>N-01 AUTOMATIQUE</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center space-x-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-[#C5A880]" />
          <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            HAUTE HORLOGERIE D&apos;AUTEUR
          </span>
          <div className="w-8 h-[1px] bg-[#C5A880]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.06em] text-[#F4F1EA] leading-[0.95] max-w-4xl"
        >
          TIME, <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#FAF8F5]">REFINED.</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-6 md:mt-8 text-sm md:text-base text-[#C6C0B5] max-w-lg font-sans-ui font-light leading-relaxed tracking-wide"
        >
          Precision-crafted timepieces designed for modern living. Engineered with hand-finished mechanical calibers, forged 316L metallurgy, and enduring aesthetic poise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-9 py-4 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#C5A880] hover:text-[#0B0B0B] transition-all duration-300 shadow-xl"
          >
            Explore Collection
          </Link>

          <a
            href="#craftsmanship"
            className="w-full sm:w-auto px-9 py-4 border border-white/20 text-[#F4F1EA] text-xs uppercase tracking-[0.22em] font-medium hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300"
          >
            Discover the Craft
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator & Manufacture Stamp */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-6 md:px-12 flex items-center justify-between text-[#8E877C] text-[10px] tracking-[0.2em] font-mono uppercase">
        <div className="hidden md:flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>72-HOUR IN-HOUSE POWER RESERVE</span>
        </div>

        <a
          href="#the-collection"
          className="mx-auto md:mx-0 flex items-center space-x-2 text-[#C6C0B5] hover:text-[#C5A880] transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>

        <div className="hidden md:block">
          <span>LIMITED ANNUAL ALLOCATION</span>
        </div>
      </div>
    </section>
  );
}
