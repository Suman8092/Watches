"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, isUpdating } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
      setTimeout(() => setCouponApplied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              CURATED SELECTIONS
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] mt-1">
              YOUR ACQUISITION BAG
            </h1>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8E877C] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Exploring</span>
          </Link>
        </div>

        {cart.items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <p className="font-serif-display text-2xl text-[#F4F1EA]">
              Your Acquisition Bag is Empty
            </p>
            <p className="text-xs text-[#8E877C] font-sans-ui">
              You have not added any timepieces to your bag. Browse our horological collections to discover your next mechanical heirloom.
            </p>
            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-block px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
              >
                Browse All Timepieces
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Cart Items Table */}
            <div className="lg:col-span-8 divide-y divide-white/10">
              {cart.items.map((item) => (
                <div key={item.key} className="py-8 flex flex-col sm:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/5] w-28 sm:w-32 bg-[#141414] border border-white/10 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                      sizes="128px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-serif-display text-2xl text-[#F4F1EA] hover:text-[#C5A880] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          disabled={isUpdating}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#8E877C] hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-mono uppercase tracking-wider text-[#8E877C] mt-1">
                        {item.product.specs?.movement || item.product.specs?.caliber || "Mechanical Caliber"}
                      </p>
                      <p className="text-xs text-[#8E877C] mt-0.5">
                        Ref: {item.sku || "NR-EDITION"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/15 bg-[#141414]">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          disabled={isUpdating}
                          className="p-2 text-[#C6C0B5] hover:text-white disabled:opacity-40 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 font-mono text-xs text-[#F4F1EA]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          disabled={isUpdating}
                          className="p-2 text-[#C6C0B5] hover:text-white disabled:opacity-40 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-right">
                        <span className="font-serif-display text-2xl text-[#F4F1EA]">
                          {item.line_total_formatted}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Dossier */}
            <div className="lg:col-span-4">
              <div className="bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6 sticky top-28">
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-4 border-b border-white/10">
                  Acquisition Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#8E877C]">
                    <span>Subtotal</span>
                    <span className="text-[#F4F1EA] font-mono">{cart.totals.subtotal_formatted}</span>
                  </div>
                  <div className="flex justify-between text-[#8E877C]">
                    <span>Armored Courier &amp; Insurance</span>
                    <span className="text-[#C5A880] uppercase tracking-wider text-[11px]">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between text-[#8E877C]">
                    <span>Customs Duties &amp; Taxes</span>
                    <span className="text-[#F4F1EA] uppercase tracking-wider text-[11px]">
                      Included
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                    <span className="font-serif-display text-xl text-[#F4F1EA]">Total</span>
                    <span className="font-serif-display text-2xl text-[#C5A880]">
                      {cart.totals.total_formatted}
                    </span>
                  </div>
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E877C] block mb-2 font-mono">
                    Collector Privilege / Coupon Code
                  </span>
                  <div className="flex border border-white/15 bg-[#0B0B0B]">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 bg-transparent px-3 py-2 text-xs text-[#F4F1EA] placeholder-[#666666] focus:outline-none uppercase font-mono tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-4 text-[11px] uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-400 mt-1 flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1" /> Collector privilege validated.
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <div className="space-y-3 pt-2">
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center space-x-2 py-4 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center space-x-2 text-[10px] uppercase tracking-widest text-[#8E877C] pt-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                    <span>5-Year Global Manufacture Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
