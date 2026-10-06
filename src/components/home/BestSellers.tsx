"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/types/woocommerce";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";

interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openQuickView, addToCart, isUpdating } = useCart();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-28 md:py-36 bg-[#0B0B0B] text-[#F4F1EA] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
                ICONIC EDITIONS
              </span>
              <div className="w-8 h-[1px] bg-[#C5A880]" />
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#F4F1EA]">
              BEST SELLERS
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll best sellers left"
              className="p-3 border border-white/15 text-[#C6C0B5] hover:text-white hover:border-[#C5A880] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll best sellers right"
              className="p-3 border border-white/15 text-[#C6C0B5] hover:text-white hover:border-[#C5A880] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Rail Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory -mx-6 px-6 pb-6"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[78vw] sm:w-[45vw] lg:w-[280px] xl:w-[300px] snap-start bg-[#141414] border border-white/10 flex flex-col justify-between p-4 group hover:border-[#C5A880]/50 transition-all duration-300"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[4/5] w-full bg-[#181818] overflow-hidden mb-4">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.images[0].src}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 80vw, 300px"
                    />
                  </Link>

                  {/* Quick View trigger */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openQuickView(product)}
                      className="w-full py-2 bg-[#0B0B0B]/90 backdrop-blur-sm text-[#F4F1EA] text-[10px] uppercase tracking-widest font-medium hover:bg-[#0B0B0B] transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3 h-3 text-[#C5A880]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#8E877C]">
                    <span>{product.categories[0]?.name || "Timepiece"}</span>
                    <span>{product.specs?.caseDiameter || "40 mm"}</span>
                  </div>

                  <Link
                    href={`/product/${product.slug}`}
                    className="block font-serif-display text-lg text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>

                  <p className="text-[11px] text-[#8E877C] font-mono truncate">
                    {product.specs?.caliber || product.specs?.movement || "Mechanical Caliber"}
                  </p>
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-serif-display text-base text-[#F4F1EA]">
                  {formatCurrency(parseFloat(product.price))}
                </span>

                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={isUpdating}
                  aria-label={`Add ${product.name} to acquisition bag`}
                  className="p-2 border border-white/15 text-[#C6C0B5] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
