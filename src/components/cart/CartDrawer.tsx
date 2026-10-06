"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, ShoppingBag, Tag, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    isUpdating,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsSubmittingCoupon(true);
    setCouponError(null);
    setCouponSuccess(null);

    const result = await applyCoupon(couponCode.trim());
    if (result.success) {
      setCouponSuccess(`Privilege code "${couponCode.toUpperCase()}" applied.`);
      setCouponCode("");
      setTimeout(() => setCouponSuccess(null), 4000);
    } else {
      setCouponError(result.error || "Invalid privilege code");
      setTimeout(() => setCouponError(null), 4000);
    }
    setIsSubmittingCoupon(false);
  };

  const handleRemoveCoupon = async (code: string) => {
    await removeCoupon(code);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0B0B0B] text-[#F4F1EA] shadow-2xl flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <span className="font-serif-display text-xl tracking-wider text-[#F4F1EA]">YOUR ACQUISITIONS</span>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] px-2 py-0.5 border border-[#C5A880]/30 rounded-full font-sans-ui">
                  {cart.item_count} {cart.item_count === 1 ? "Piece" : "Pieces"}
                </span>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close acquisitions drawer"
                className="p-2 text-[#C6C0B5] hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complimentary Insured Shipping banner */}
            <div className="px-6 py-3 bg-[#181818] border-b border-white/5 flex items-center justify-between text-xs tracking-wider text-[#C6C0B5]">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Complimentary Insured Courier Delivery</span>
              </div>
              <span className="text-[#C5A880] uppercase text-[10px] tracking-widest font-mono">GLOBAL</span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10">
              {cart.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#C6C0B5]">
                    <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif-display text-xl text-[#F4F1EA]">Your Bag is Empty</p>
                    <p className="text-xs text-[#8E877C] max-w-xs font-sans-ui">
                      Explore our curated horological collections and select your personal timepiece.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0B0B0B] transition-all duration-300"
                  >
                    Explore Timepieces
                  </button>
                </div>
              ) : (
                cart.items.map((item) => (
                  <div key={item.key} className="py-5 flex space-x-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 bg-[#141414] border border-white/5 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image.src}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-serif-display text-base text-[#F4F1EA] hover:text-[#C5A880] transition-colors leading-snug line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            disabled={isUpdating}
                            aria-label={`Remove ${item.name} from bag`}
                            className="text-[#8E877C] hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#8E877C] uppercase tracking-wider mt-0.5 font-sans-ui">
                          {item.product.specs?.caliber || item.product.specs?.movement || "Mechanical Caliber"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/10 bg-[#141414]">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            disabled={isUpdating}
                            aria-label="Decrease quantity"
                            className="p-1.5 text-[#C6C0B5] hover:text-white disabled:opacity-40 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono text-[#F4F1EA] min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            disabled={isUpdating}
                            aria-label="Increase quantity"
                            className="p-1.5 text-[#C6C0B5] hover:text-white disabled:opacity-40 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-serif-display text-base text-[#F4F1EA]">
                            {item.line_total_formatted}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#121212] space-y-4">
                {/* Applied Coupons List */}
                {cart.coupons.length > 0 && (
                  <div className="space-y-1.5 pb-2 border-b border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-[#8E877C] font-mono block">
                      Active Collector Privileges
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cart.coupons.map((code) => (
                        <div
                          key={code}
                          className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1815] border border-[#C5A880]/40 text-[#C5A880] text-xs font-mono rounded"
                        >
                          <Tag className="w-3 h-3" />
                          <span>{code}</span>
                          <button
                            onClick={() => handleRemoveCoupon(code)}
                            disabled={isUpdating}
                            aria-label={`Remove coupon ${code}`}
                            className="p-0.5 hover:text-white transition-colors ml-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collapsible Coupon Input */}
                <div className="pb-1">
                  {!showCouponInput && cart.coupons.length === 0 ? (
                    <button
                      onClick={() => setShowCouponInput(true)}
                      className="text-[11px] uppercase tracking-wider text-[#C5A880] hover:text-white transition-colors flex items-center space-x-1 font-mono"
                    >
                      <Tag className="w-3 h-3" />
                      <span>Have a Privileged Collector Code?</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#8E877C] font-mono">
                          Privilege / Promo Code
                        </span>
                        {cart.coupons.length === 0 && (
                          <button
                            onClick={() => {
                              setShowCouponInput(false);
                              setCouponError(null);
                            }}
                            className="text-[10px] text-[#8E877C] hover:text-white"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                      <form onSubmit={handleApplyCoupon} className="flex border border-white/15 bg-[#0B0B0B]">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="e.g. NOIRE10"
                          disabled={isSubmittingCoupon || isUpdating}
                          className="flex-1 bg-transparent px-3 py-2 text-xs text-[#F4F1EA] placeholder-[#666666] focus:outline-none uppercase font-mono tracking-wider"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingCoupon || isUpdating || !couponCode.trim()}
                          className="px-3 text-[11px] uppercase tracking-widest text-[#C5A880] hover:text-white disabled:opacity-40 transition-colors"
                        >
                          {isSubmittingCoupon ? "..." : "Apply"}
                        </button>
                      </form>
                      {couponError && (
                        <p className="text-[11px] text-rose-400 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{couponError}</span>
                        </p>
                      )}
                      {couponSuccess && (
                        <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
                          <Check className="w-3 h-3 flex-shrink-0" />
                          <span>{couponSuccess}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2 text-xs pt-1 border-t border-white/10">
                  <div className="flex justify-between text-[#8E877C]">
                    <span>Subtotal</span>
                    <span className="text-[#F4F1EA] font-mono">{cart.totals.subtotal_formatted}</span>
                  </div>
                  {cart.totals.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Privilege Benefit</span>
                      <span className="font-mono">{cart.totals.discount_formatted}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#8E877C]">
                    <span>Shipping & Insurance</span>
                    <span className="text-[#C5A880] uppercase tracking-wider text-[11px]">Complimentary</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                    <span className="font-serif-display text-lg text-[#F4F1EA]">Total</span>
                    <span className="font-serif-display text-xl text-[#F4F1EA]">
                      {cart.totals.total_formatted}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-widest font-medium hover:bg-[#C5A880] transition-colors duration-300"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="w-full block text-center py-2.5 text-[11px] uppercase tracking-widest text-[#8E877C] hover:text-white transition-colors"
                  >
                    View Detailed Bag
                  </Link>
                </div>

                <div className="pt-2 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-widest text-[#8E877C]">
                  <span>5-Year International Warranty Included</span>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
