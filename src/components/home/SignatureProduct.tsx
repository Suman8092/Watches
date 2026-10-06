"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Eye, ShieldCheck } from "lucide-react";
import { Product } from "@/types/woocommerce";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";

interface SignatureProductProps {
  product: Product;
}

export function SignatureProduct({ product }: SignatureProductProps) {
  const { openQuickView, addToCart, isUpdating } = useCart();

  return (
    <section className="py-28 md:py-36 bg-[#F4F1EA] text-[#0B0B0B] border-t border-[#0B0B0B]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Advertisement Layout: 6-6 Split with Technical Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Editorial Watch Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full bg-white border border-[#0B0B0B]/10 overflow-hidden shadow-2xl group">
              <Image
                src={product.images[0].src}
                alt={product.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-[#0B0B0B] text-[#F4F1EA] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em]">
                {product.editionBadge || "Flagship Horology"}
              </div>

              {/* Quick View Button */}
              <button
                onClick={() => openQuickView(product)}
                aria-label="Examine timepiece specs"
                className="absolute bottom-6 right-6 p-3 bg-white/90 backdrop-blur-sm text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-[#F4F1EA] border border-[#0B0B0B]/15 transition-all duration-300 shadow-md"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle horological perimeter annotation */}
            <div className="hidden sm:flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-[#8E877C] mt-4 px-2">
              <span>REF: {product.sku}</span>
              <span>CALIBER N-01 · 72H RESERVE</span>
            </div>
          </div>

          {/* Right: Horological Dossier & Acquisition */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E877C] font-mono">
                  THE SIGNATURE TIMEPIECE
                </span>
                <div className="w-8 h-[1px] bg-[#8E877C]" />
              </div>

              <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#0B0B0B] tracking-tight leading-[1.05]">
                {product.name}
              </h2>

              <p className="font-serif-display text-2xl text-[#8E877C]">
                {formatCurrency(parseFloat(product.price))}
              </p>

              <p className="text-xs md:text-sm text-[#555555] font-sans-ui font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="border-t border-b border-[#0B0B0B]/15 py-6 space-y-3 text-xs">
              <div className="grid grid-cols-2 py-1.5 border-b border-[#0B0B0B]/5">
                <span className="text-[#8E877C] uppercase tracking-wider font-mono text-[10px]">
                  Movement &amp; Caliber
                </span>
                <span className="text-[#0B0B0B] font-medium text-right">
                  {product.specs?.movement || "In-House Mechanical Caliber"}
                </span>
              </div>

              <div className="grid grid-cols-2 py-1.5 border-b border-[#0B0B0B]/5">
                <span className="text-[#8E877C] uppercase tracking-wider font-mono text-[10px]">
                  Case Dimensions
                </span>
                <span className="text-[#0B0B0B] font-medium text-right">
                  {product.specs?.caseDiameter || "40 mm"} × {product.specs?.caseThickness || "10.4 mm"}
                </span>
              </div>

              <div className="grid grid-cols-2 py-1.5 border-b border-[#0B0B0B]/5">
                <span className="text-[#8E877C] uppercase tracking-wider font-mono text-[10px]">
                  Crystal Optics
                </span>
                <span className="text-[#0B0B0B] font-medium text-right">
                  {product.specs?.crystal || "Double-Domed Box Sapphire"}
                </span>
              </div>

              <div className="grid grid-cols-2 py-1.5 border-b border-[#0B0B0B]/5">
                <span className="text-[#8E877C] uppercase tracking-wider font-mono text-[10px]">
                  Water Resistance
                </span>
                <span className="text-[#0B0B0B] font-medium text-right">
                  {product.specs?.waterResistance || "10 ATM / 100M"}
                </span>
              </div>

              <div className="grid grid-cols-2 py-1.5">
                <span className="text-[#8E877C] uppercase tracking-wider font-mono text-[10px]">
                  Strap &amp; Clasp
                </span>
                <span className="text-[#0B0B0B] font-medium text-right">
                  {product.specs?.strapMaterial || "Full-Grain Tuscan Calfskin"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={isUpdating}
                  className="flex-1 py-4 px-8 bg-[#0B0B0B] text-[#F4F1EA] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#222222] transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Acquire Timepiece</span>
                </button>

                <Link
                  href={`/product/${product.slug}`}
                  className="py-4 px-8 border border-[#0B0B0B] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#0B0B0B] hover:text-[#F4F1EA] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Discover the Timepiece</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-[#8E877C]">
                <ShieldCheck className="w-4 h-4 text-[#0B0B0B]" />
                <span>Individually numbered caseback · 5-year manufacture warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
