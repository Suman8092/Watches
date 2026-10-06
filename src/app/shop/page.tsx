import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce/products";
import { getCategories } from "@/lib/woocommerce/categories";
import { ShopClient } from "./ShopClient";

export const metadata = {
  title: "Horological Catalog — NOIRÉ Timepieces",
  description: "Browse the complete NOIRÉ collection of precision mechanical timepieces.",
};

export default async function ShopPage() {
  const [{ products, total }, categories] = await Promise.all([
    getProducts({ per_page: 24 }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#8E877C] mb-4">
          <Link href="/" className="hover:text-white transition-colors">Atelier</Link>
          <span>/</span>
          <span className="text-[#C5A880]">All Timepieces</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-6">
          <div className="space-y-3">
            <h1 className="font-serif-display text-4xl sm:text-6xl text-[#F4F1EA] font-light">
              THE COMPLETE CATALOG
            </h1>
            <p className="text-xs md:text-sm text-[#8E877C] max-w-xl font-sans-ui font-light leading-relaxed">
              Every NOIRÉ reference represents years of development in chronometric regulation, micro-machining, and enduring proportion.
            </p>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
            {total} REFERENCES ARCHIVED
          </div>
        </div>
      </div>

      {/* Interactive Shop Client with Filters & Dynamic Sorting */}
      <ShopClient initialProducts={products} categories={categories} />
    </div>
  );
}
