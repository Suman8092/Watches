"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Shield, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, isUpdating } = useCart();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = async () => {
    await addToCart(quickViewProduct, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const activeImage = quickViewProduct.images[selectedImgIndex] || quickViewProduct.images[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 font-sans-ui">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B0B0B] text-[#F4F1EA] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            aria-label="Close timepiece overview"
            className="absolute top-4 right-4 z-20 p-2 text-[#C6C0B5] hover:text-white bg-black/40 backdrop-blur-sm border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-[#111111] border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-square w-full bg-[#181818] overflow-hidden border border-white/5">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-cover object-center transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex space-x-3 mt-4 pt-4 border-t border-white/5 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-16 h-16 bg-[#161616] border transition-all flex-shrink-0 ${
                      selectedImgIndex === idx
                        ? "border-[#C5A880] ring-1 ring-[#C5A880]/30"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover object-center"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Horological Details & Order */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] px-2 py-0.5 border border-[#C5A880]/30">
                  {quickViewProduct.editionBadge || "Haute Horlogerie"}
                </span>
                <span className="text-xs text-[#8E877C] font-mono uppercase tracking-wider">
                  SKU: {quickViewProduct.sku}
                </span>
              </div>

              <div>
                <h2 className="font-serif-display text-2xl md:text-3xl text-[#F4F1EA] tracking-wide">
                  {quickViewProduct.name}
                </h2>
                <p className="mt-2 text-xl font-serif-display text-[#C5A880]">
                  {formatCurrency(parseFloat(quickViewProduct.price))}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-[#C6C0B5] font-sans-ui line-clamp-3">
                {quickViewProduct.short_description || quickViewProduct.description}
              </p>

              {/* Technical Specifications Table */}
              <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                <div className="grid grid-cols-2 py-1 border-b border-white/5">
                  <span className="text-[#8E877C]">Movement</span>
                  <span className="text-[#F4F1EA] font-mono text-[11px] text-right truncate">
                    {quickViewProduct.specs?.movement || "Mechanical Caliber"}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-1 border-b border-white/5">
                  <span className="text-[#8E877C]">Case Dimensions</span>
                  <span className="text-[#F4F1EA] font-mono text-[11px] text-right">
                    {quickViewProduct.specs?.caseDiameter || "40 mm"} × {quickViewProduct.specs?.caseThickness || "10.4 mm"}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-1 border-b border-white/5">
                  <span className="text-[#8E877C]">Crystal &amp; Optics</span>
                  <span className="text-[#F4F1EA] font-mono text-[11px] text-right truncate">
                    {quickViewProduct.specs?.crystal || "Sapphire Crystal AR"}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-1 border-b border-white/5">
                  <span className="text-[#8E877C]">Water Resistance</span>
                  <span className="text-[#F4F1EA] font-mono text-[11px] text-right">
                    {quickViewProduct.specs?.waterResistance || "10 ATM"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAdd}
                disabled={isUpdating || !quickViewProduct.is_in_stock}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-widest font-medium hover:bg-[#C5A880] transition-colors duration-300 disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>
                    {quickViewProduct.is_in_stock
                      ? `Add to Bag — ${formatCurrency(parseFloat(quickViewProduct.price))}`
                      : "Out of Stock"}
                  </span>
                )}
              </button>

              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="w-full flex items-center justify-center space-x-1.5 py-2.5 text-xs uppercase tracking-widest text-[#C6C0B5] hover:text-white transition-colors"
              >
                <span>View Complete Horological Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#8E877C] uppercase tracking-widest pt-2">
                <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>5-Year Global Manufacture Warranty · Insured Delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
