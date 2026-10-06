"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Product } from "@/types/woocommerce";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";

interface FeaturedCollectionProps {
  products: Product[];
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  const { openQuickView, addToCart, isUpdating } = useCart();
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  return (
    <section id="the-collection" className="py-28 md:py-36 bg-[#F4F1EA] text-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 pb-8 border-b border-[#0B0B0B]/10">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8E877C] font-mono">
                CURATED SELECTIONS
              </span>
              <div className="w-6 h-[1px] bg-[#8E877C]" />
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#0B0B0B] tracking-tight">
              THE COLLECTION
            </h2>
            <p className="text-sm md:text-base text-[#666666] font-sans-ui font-light leading-relaxed">
              Designed around precision, proportion and permanence. Each reference embodies the unyielding discipline of contemporary high horology.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#0B0B0B] hover:text-[#8E877C] transition-colors pb-1 border-b border-[#0B0B0B] group"
            >
              <span>Explore All Timepieces</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Editorial Product Cards (Asymmetric staggered 2x2 or 4-grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {products.slice(0, 4).map((product, idx) => {
            const hasSecondary = product.images.length > 1;
            const primaryImg = product.images[0].src;
            const secondaryImg = hasSecondary ? product.images[1].src : primaryImg;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group flex flex-col justify-between bg-white border border-[#0B0B0B]/10 p-5 hover:border-[#0B0B0B]/30 hover:shadow-xl transition-all duration-500"
              >
                <div>
                  {/* Top Metadata Badges */}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest pb-3 font-mono">
                    <span className="text-[#8E877C]">
                      {product.categories[0]?.name || "Atelier"}
                    </span>
                    {product.editionBadge && (
                      <span className="text-[#0B0B0B] font-medium px-2 py-0.5 bg-[#F4F1EA] border border-[#0B0B0B]/10">
                        {product.editionBadge}
                      </span>
                    )}
                  </div>

                  {/* Image Container with Subtle Hover Swap */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5] my-2">
                    <Link href={`/product/${product.slug}`} className="block w-full h-full">
                      {/* Primary Image */}
                      <Image
                        src={primaryImg}
                        alt={product.name}
                        fill
                        className={`object-cover object-center transition-all duration-700 ease-in-out ${
                          hoveredId === product.id && hasSecondary
                            ? "opacity-0 scale-105"
                            : "opacity-100 scale-100"
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />

                      {/* Secondary Image for smooth flip */}
                      {hasSecondary && (
                        <Image
                          src={secondaryImg}
                          alt={`${product.name} secondary angle`}
                          fill
                          className={`object-cover object-center transition-all duration-700 ease-in-out absolute inset-0 ${
                            hoveredId === product.id
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95"
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      )}
                    </Link>

                    {/* Quick View Button Hover Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => openQuickView(product)}
                        aria-label={`Quick overview of ${product.name}`}
                        className="w-full py-2.5 bg-[#0B0B0B]/90 backdrop-blur-sm text-[#F4F1EA] text-[11px] uppercase tracking-widest font-medium hover:bg-[#0B0B0B] transition-colors flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="pt-4 space-y-1.5">
                    <Link
                      href={`/product/${product.slug}`}
                      className="block font-serif-display text-xl text-[#0B0B0B] group-hover:text-[#8E877C] transition-colors leading-snug line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] text-[#8E877C] font-mono uppercase tracking-wider line-clamp-1">
                      {product.specs?.movement || "In-House Mechanical Caliber"}
                    </p>
                  </div>
                </div>

                {/* Bottom Price & Add to Bag */}
                <div className="pt-5 mt-4 border-t border-[#0B0B0B]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8E877C] uppercase tracking-wider block font-mono">
                      Acquisition
                    </span>
                    <span className="font-serif-display text-lg font-normal text-[#0B0B0B]">
                      {formatCurrency(parseFloat(product.price))}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    disabled={isUpdating}
                    aria-label={`Add ${product.name} to acquisition bag`}
                    className="p-2.5 border border-[#0B0B0B] text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F4F1EA] transition-all duration-300"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
