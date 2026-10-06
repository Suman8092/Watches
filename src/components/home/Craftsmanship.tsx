"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Sliders, Shield } from "lucide-react";
import { MOCK_CRAFTSMANSHIP_POINTS } from "@/lib/woocommerce/mock-data";

export function Craftsmanship() {
  const [activeTabId, setActiveTabId] = useState(MOCK_CRAFTSMANSHIP_POINTS[0].id);
  const activePoint = MOCK_CRAFTSMANSHIP_POINTS.find((p) => p.id === activeTabId) || MOCK_CRAFTSMANSHIP_POINTS[0];

  return (
    <section id="craftsmanship" className="py-28 md:py-36 bg-[#0B0B0B] text-[#F4F1EA] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              ANATOMY OF HOROLOGICAL DISCIPLINE
            </span>
            <div className="w-8 h-[1px] bg-[#C5A880]" />
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-[#F4F1EA] tracking-tight leading-[1.05]">
            MADE TO MARK <br />
            <span className="italic text-[#FAF8F5]">THE MOMENT.</span>
          </h2>
          <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui font-light leading-relaxed max-w-xl">
            A NOIRÉ timepiece is not assembled; it is sculpted through hundreds of hours of precision micro-machining, hand-beveling, and chronometric regulation in our Geneva workshop.
          </p>
        </div>

        {/* Tab Selector / Anatomical Index */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 pb-2 mb-12 gap-6 md:gap-12">
          {MOCK_CRAFTSMANSHIP_POINTS.map((pt, idx) => {
            const isActive = pt.id === activeTabId;
            return (
              <button
                key={pt.id}
                onClick={() => setActiveTabId(pt.id)}
                className={`flex items-center space-x-3 pb-3 text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 relative ${
                  isActive ? "text-[#F4F1EA] font-medium" : "text-[#8E877C] hover:text-[#C6C0B5]"
                }`}
              >
                <span className="font-mono text-[10px] text-[#C5A880]">0{idx + 1}</span>
                <span>{pt.title.replace("The ", "")}</span>
                {isActive && (
                  <motion.div
                    layoutId="craftsmanship-active-line"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Display (Split 6-6) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: High-Resolution Macro Image */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoint.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="relative aspect-[16/11] bg-[#141414] overflow-hidden border border-white/10"
              >
                <Image
                  src={activePoint.image}
                  alt={activePoint.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#C6C0B5]">
                  <span>{activePoint.title}</span>
                  <span className="text-[#C5A880]">{activePoint.tagline}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Technical Explanation & Metallurgy Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoint.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono block mb-2">
                    {activePoint.tagline}
                  </span>
                  <h3 className="font-serif-display text-3xl sm:text-4xl text-[#F4F1EA]">
                    {activePoint.title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui leading-relaxed font-light">
                  {activePoint.description}
                </p>

                {/* Key Specifications Bulleted with Luxury Checkmarks */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E877C] font-mono block">
                    Horological Criteria
                  </span>
                  {activePoint.specs.map((spec, i) => (
                    <div key={i} className="flex items-center space-x-3 text-xs text-[#F4F1EA]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span className="font-sans-ui tracking-wide">{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center space-x-3 text-[11px] text-[#8E877C] font-mono uppercase">
                  <Shield className="w-4 h-4 text-[#C5A880]" />
                  <span>Subjected to 1,000 Hours of Chronometric Testing</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
