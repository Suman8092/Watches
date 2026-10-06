import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/woocommerce/categories";

export const metadata = {
  title: "Horological Collections — NOIRÉ",
  description: "Explore the core series: The Chronograph, The Automatic, and The Classic.",
};

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-white/10 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            HOROLOGICAL PILLARS
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl text-[#F4F1EA] font-light">
            THE COLLECTIONS
          </h1>
          <p className="text-xs md:text-sm text-[#8E877C] font-sans-ui font-light leading-relaxed">
            Every collection is created around a discrete mechanical purpose — from instantaneous split-second timing to perpetual kinetic winding and pure proportional reduction.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#121212] border border-white/10 p-6 md:p-10 group hover:border-white/30 transition-all duration-500"
            >
              <div
                className={`lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#181818] ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {cat.image && (
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt || cat.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                  {cat.count ?? 0} References Archived
                </div>
              </div>

              <div
                className={`lg:col-span-5 space-y-6 ${
                  idx % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C5A880] font-mono">
                  <span>PILLAR 0{idx + 1}</span>
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F4F1EA]">
                  {cat.name}
                </h2>
                <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui leading-relaxed font-light">
                  {cat.description}
                </p>
                <div>
                  <Link
                    href={`/collections/${cat.slug}`}
                    className="inline-flex items-center space-x-3 px-6 py-3 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
