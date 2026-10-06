"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle, Tag, X, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { submitCheckout } from "@/lib/woocommerce/checkout";
import { formatCurrency } from "@/lib/woocommerce/cart";

export default function CheckoutPage() {
  const { cart, clearCart, applyCoupon, removeCoupon, isUpdating } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState(cart.items);
  const [completedTotal, setCompletedTotal] = useState(cart.totals.total_formatted);
  const [completedCoupons, setCompletedCoupons] = useState<string[]>([]);
  const [completedDiscount, setCompletedDiscount] = useState<string>("₹0");
  const [completedCustomerNote, setCompletedCustomerNote] = useState<string>("");

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "IN",
    orderNotes: "",
    paymentMethod: "bacs",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCheckoutError(null);

    try {
      const result = await submitCheckout({
        billing_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address1,
          address_2: formData.address2,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
        },
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address1,
          address_2: formData.address2,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
        },
        payment_method: formData.paymentMethod,
        customer_note: formData.orderNotes.trim() || undefined,
      });

      if (result.error) {
        setCheckoutError(result.error);
        setIsSubmitting(false);
        return;
      }

      const assignedId = String(result.order_id);
      setOrderId(assignedId);
      setCompletedItems([...cart.items]);
      setCompletedTotal(cart.totals.total_formatted);
      setCompletedCoupons([...cart.coupons]);
      setCompletedDiscount(cart.totals.discount_formatted);
      setCompletedCustomerNote(formData.orderNotes.trim());

      // Persist order in local archive for Collector Account
      if (typeof window !== "undefined") {
        try {
          const stored = JSON.parse(localStorage.getItem("noire_collector_orders") || "[]");
          if (!stored.includes(assignedId)) {
            stored.unshift(assignedId);
            localStorage.setItem("noire_collector_orders", JSON.stringify(stored));
          }
        } catch {}
      }

      clearCart();
      setOrderComplete(true);
    } catch (err: unknown) {
      setCheckoutError(err instanceof Error ? err.message : "Failed to process checkout transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-36 pb-24 flex items-center justify-center font-sans-ui">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono block">
            ORDER CONFIRMED · REFERENCE #{orderId}
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA]">
            THANK YOU FOR YOUR ACQUISITION.
          </h1>

          <p className="text-xs sm:text-sm text-[#C6C0B5] font-light leading-relaxed">
            Your timepiece allocation has been registered in the master WooCommerce archive on our backend. An encrypted confirmation dossier with your serial registration and insured dispatch itinerary has been dispatched to <span className="text-white font-medium">{formData.email}</span>.
          </p>

          <div className="p-6 bg-[#141414] border border-white/10 text-left space-y-4 text-xs font-mono">
            <div className="flex justify-between text-[#8E877C] pb-2 border-b border-white/10">
              <span>ORDER REFERENCE</span>
              <span className="text-white font-bold">#{orderId}</span>
            </div>

            {completedItems.length > 0 && (
              <div className="space-y-3 py-2 border-b border-white/10">
                <span className="text-[10px] text-[#8E877C] uppercase tracking-wider block">PURCHASED TIMEPIECES</span>
                {completedItems.map((it) => (
                  <div key={it.key} className="flex justify-between items-center text-xs">
                    <span className="text-white truncate max-w-[280px]">
                      {it.name} <span className="text-[#8E877C]">× {it.quantity}</span>
                    </span>
                    <span className="text-[#C5A880]">{it.line_total_formatted}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between text-[#8E877C]">
              <span>RECIPIENT &amp; DESTINATION</span>
              <span className="text-right">{formData.firstName} {formData.lastName}, {formData.city}</span>
            </div>
            <div className="flex justify-between text-[#8E877C]">
              <span>DISPATCH METHOD</span>
              <span className="text-[#C5A880]">ARMORED INSURED COURIER</span>
            </div>
            {completedCoupons.length > 0 && (
              <div className="flex justify-between text-[#8E877C]">
                <span>PRIVILEGE BENEFIT</span>
                <span className="text-emerald-400 font-bold">{completedCoupons.join(", ")} ({completedDiscount})</span>
              </div>
            )}
            {completedCustomerNote && (
              <div className="flex justify-between text-[#8E877C]">
                <span>BESPOKE INSTRUCTIONS</span>
                <span className="text-white text-right max-w-[260px] truncate">{completedCustomerNote}</span>
              </div>
            )}
            <div className="flex justify-between text-[#8E877C]">
              <span>ORDER STATUS</span>
              <span className="text-emerald-400 uppercase tracking-widest text-[10px]">ALLOCATED · ON HOLD</span>
            </div>
            <div className="flex justify-between text-[#8E877C] pt-2 border-t border-white/10 text-sm">
              <span className="text-white font-serif-display">TOTAL VALUE</span>
              <span className="text-white font-mono font-medium">{completedTotal}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/account/orders/${orderId}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
            >
              View Order in Collector Archive
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/20 text-[#F4F1EA] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
            >
              Continue Browsing Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              SECURE TRANSACTION
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] mt-1">
              CHECKOUT
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8E877C]">
            <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>256-BIT ENCRYPTED</span>
          </div>
        </div>

        {checkoutError && (
          <div className="mb-8 p-4 bg-rose-950/40 border border-rose-800/50 flex items-center space-x-3 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{checkoutError}</span>
          </div>
        )}

        {cart.items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <p className="font-serif-display text-2xl text-[#F4F1EA]">
              No Timepieces Selected for Acquisition
            </p>
            <p className="text-xs text-[#8E877C]">
              Your acquisition bag is empty. Please select a timepiece before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
              {/* Client Details */}
              <div className="space-y-4">
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-2 border-b border-white/10">
                  1. Client Identification
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      Email Address (For Dossier &amp; Tracking) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      Telephone (For Armored Courier Delivery) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-2 border-b border-white/10">
                  2. Secure Delivery Destination
                </h3>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address1"
                    required
                    value={formData.address1}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                    Apartment, Suite, Unit (Optional)
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      required
                      value={formData.postcode}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                    Country / Jurisdiction *
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="IN">India (Domestic Atelier Allocation)</option>
                    <option value="CH">Switzerland (Geneva Manufacture)</option>
                    <option value="US">United States (Direct Courier)</option>
                    <option value="GB">United Kingdom (Direct Courier)</option>
                    <option value="AE">United Arab Emirates (Dubai Concierge)</option>
                    <option value="SG">Singapore (Asia Hub)</option>
                    <option value="DE">Germany (European Union)</option>
                    <option value="FR">France (European Union)</option>
                    <option value="JP">Japan (Tokyo Hub)</option>
                    <option value="AU">Australia (Sydney Hub)</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions & Bespoke Notes */}
              <div className="space-y-4">
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-2 border-b border-white/10">
                  3. Concierge &amp; Bespoke Notes
                </h3>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-mono text-[#8E877C] block mb-1.5">
                    Special Delivery Instructions or Horological Requests (Optional)
                  </label>
                  <textarea
                    name="orderNotes"
                    rows={3}
                    value={formData.orderNotes}
                    onChange={handleChange}
                    placeholder="e.g. Concierge delivery instructions, caseback engraving notes, or security gate clearance details."
                    className="w-full bg-[#141414] border border-white/15 px-3.5 py-2.5 text-xs text-[#F4F1EA] placeholder-[#666666] focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-2 border-b border-white/10">
                  4. Encrypted Settlement
                </h3>
                <div className="p-4 bg-[#141414] border border-white/15 space-y-4">
                  <label
                    htmlFor="bacs"
                    className={`flex items-start space-x-3 p-3 border transition-colors cursor-pointer ${
                      formData.paymentMethod === "bacs"
                        ? "border-[#C5A880] bg-[#1a1815]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      id="bacs"
                      name="paymentMethod"
                      value="bacs"
                      checked={formData.paymentMethod === "bacs"}
                      onChange={handleChange}
                      className="accent-[#C5A880] mt-0.5"
                    />
                    <div className="space-y-1">
                      <span className="text-xs text-[#F4F1EA] font-medium block">
                        Private Bank Wire Transfer (Atelier Concierge Assisted)
                      </span>
                      <p className="text-[11px] text-[#8E877C] font-light leading-relaxed">
                        Direct encrypted wire settlement coordinated with the NOIRÉ Geneva Atelier concierge. Your timepiece is reserved immediately upon placement.
                      </p>
                    </div>
                  </label>

                  <label
                    htmlFor="razorpay"
                    className={`flex items-start space-x-3 p-3 border transition-colors cursor-pointer ${
                      formData.paymentMethod === "razorpay"
                        ? "border-[#C5A880] bg-[#1a1815]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      id="razorpay"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === "razorpay"}
                      onChange={handleChange}
                      className="accent-[#C5A880] mt-0.5"
                    />
                    <div className="space-y-1">
                      <span className="text-xs text-[#F4F1EA] font-medium block">
                        Razorpay Secure Settlement (Cards, UPI, NetBanking)
                      </span>
                      <p className="text-[11px] text-[#8E877C] font-light leading-relaxed">
                        Instant encrypted settlement supporting Indian and global payment networks.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Encrypting &amp; Submitting Order...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Acquisition Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#141414] border border-white/10 p-6 sm:p-8 space-y-6 sticky top-28">
                <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-4 border-b border-white/10">
                  Order Overview
                </h3>

                <div className="divide-y divide-white/10 max-h-64 overflow-y-auto">
                  {cart.items.map((it) => (
                    <div key={it.key} className="py-3 flex space-x-4">
                      <div className="relative w-14 h-18 bg-[#1C1C1C] flex-shrink-0 overflow-hidden">
                        <Image
                          src={it.image.src}
                          alt={it.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 text-xs">
                        <p className="font-serif-display text-sm text-[#F4F1EA] line-clamp-1">{it.name}</p>
                        <p className="text-[10px] text-[#8E877C] font-mono">Qty: {it.quantity}</p>
                        <p className="font-mono text-[#C5A880] mt-1">{it.line_total_formatted}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Coupons in Checkout */}
                {cart.coupons.length > 0 && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#8E877C] block font-mono">
                      Applied Privileges
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
                            type="button"
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

                {/* Coupon Input in Checkout */}
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E877C] block mb-2 font-mono">
                    Collector Privilege / Coupon Code
                  </span>
                  <div className="flex border border-white/15 bg-[#0B0B0B]">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. NOIRE10"
                      disabled={isSubmittingCoupon || isUpdating}
                      className="flex-1 bg-transparent px-3 py-2 text-xs text-[#F4F1EA] placeholder-[#666666] focus:outline-none uppercase font-mono tracking-wider"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={isSubmittingCoupon || isUpdating || !couponCode.trim()}
                      className="px-4 text-[11px] uppercase tracking-widest text-[#C5A880] hover:text-white disabled:opacity-40 transition-colors"
                    >
                      {isSubmittingCoupon ? "..." : "Apply"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mr-1" />
                      <span>{couponError}</span>
                    </p>
                  )}
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1" /> {couponSuccess}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
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
                    <span>Insured Armored Transport</span>
                    <span className="text-[#C5A880] uppercase tracking-wider text-[11px]">
                      Complimentary
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                    <span className="font-serif-display text-lg text-[#F4F1EA]">Total</span>
                    <span className="font-serif-display text-2xl text-[#F4F1EA]">
                      {cart.totals.total_formatted}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#8E877C]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>5-Year International Manufacture Warranty Included</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
