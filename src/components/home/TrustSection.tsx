"use client";

import React from "react";
import { ShieldCheck, Truck, RotateCcw, Award, Lock } from "lucide-react";

export function TrustSection() {
  const pillars = [
    {
      icon: Truck,
      title: "Complimentary Insured Courier",
      description: "Direct white-glove delivery with signature confirmation across worldwide and domestic territories.",
    },
    {
      icon: Award,
      title: "5-Year Manufacture Warranty",
      description: "Full international mechanical warranty covering escapement, caliber assembly, and water resistance.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Bespoke Returns",
      description: "Complete peace of mind with insured return packaging and dedicated client concierge support.",
    },
    {
      icon: ShieldCheck,
      title: "Certified Geneva Authenticity",
      description: "Each timepiece is registered in our horological archive with an embossed provenance certificate.",
    },
    {
      icon: Lock,
      title: "Secure Encrypted Checkout",
      description: "Bank-grade 256-bit encryption with support for major global cards and private payment networks.",
    },
  ];

  return (
    <section className="py-20 bg-[#F4F1EA] text-[#0B0B0B] border-t border-[#0B0B0B]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#0B0B0B]/10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`pt-6 lg:pt-0 ${idx > 0 ? "lg:pl-8" : ""} space-y-2`}
              >
                <div className="flex items-center space-x-2 text-[#0B0B0B]">
                  <Icon className="w-4 h-4 stroke-[1.5] text-[#8E877C]" />
                  <h4 className="font-serif-display text-base font-normal text-[#0B0B0B]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-[#666666] font-sans-ui font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
