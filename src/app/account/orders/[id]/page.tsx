"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  CreditCard,
  Building,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "@/lib/woocommerce/cart";
import { getTimepieceImages } from "@/lib/woocommerce/products";

interface OrderDetail {
  id: number | string;
  number: string;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  payment_method: string;
  payment_method_title: string;
  customer_note?: string;
  discount_total?: string;
  coupon_lines?: Array<{ code: string; discount: string }>;
  billing: {
    first_name: string;
    last_name: string;
    city: string;
    state: string;
    country: string;
    email: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    subtotal: string;
    total: string;
    sku: string;
    image?: string;
  }>;
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error("Unable to locate order dossier in archive");
        }
        const data = await res.json();
        setOrder(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error retrieving order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Navigation */}
        <Link
          href="/account/orders"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8E877C] hover:text-[#C5A880] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Order Archive</span>
        </Link>

        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-8 h-8 border border-white/20 border-t-[#C5A880] rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-[#8E877C] uppercase tracking-widest">
              Decryption &amp; Retrieval of Order Dossier...
            </p>
          </div>
        ) : error || !order ? (
          <div className="bg-[#121212] border border-rose-900/40 p-8 text-center max-w-md mx-auto space-y-4 text-xs">
            <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
            <h3 className="font-serif-display text-xl text-[#F4F1EA]">
              Record Not Found in Archive
            </h3>
            <p className="text-[#8E877C]">{error || "Invalid order reference ID."}</p>
            <Link
              href="/account/orders"
              className="inline-block px-6 py-2.5 bg-[#F4F1EA] text-[#0B0B0B] uppercase tracking-widest font-medium text-[11px]"
            >
              Back to Archive
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Header Status Banner */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
                    AUTHENTICATED ORDER DOSSIER
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA]">
                  REFERENCE #{order.number}
                </h1>
                <p className="text-xs text-[#8E877C] font-mono mt-1">
                  Registered on {new Date(order.date_created).toLocaleString()} · WooCommerce Master Archive
                </p>
              </div>

              <div className="bg-[#141414] border border-white/15 px-4 py-2 text-right">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block">
                  ALLOCATION STATUS
                </span>
                <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Grid Layout: Items & Financials */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Items & Details */}
              <div className="lg:col-span-7 space-y-8">
                {/* Timepieces */}
                <div className="bg-[#141414] border border-white/10 p-6 space-y-4">
                  <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-3 border-b border-white/10">
                    Allocated Timepieces
                  </h3>
                  <div className="divide-y divide-white/10">
                    {order.line_items.map((it) => {
                      const fallbackImgs = getTimepieceImages(it.name.toLowerCase().replace(/\s+/g, "-"));
                      const displayImg = it.image || fallbackImgs[0]?.src;

                      return (
                        <div key={it.id} className="py-4 flex space-x-4 items-center">
                          <div className="relative w-16 h-20 bg-[#1C1C1C] flex-shrink-0 overflow-hidden border border-white/10">
                            {displayImg && (
                              <Image
                                src={displayImg}
                                alt={it.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            )}
                          </div>
                          <div className="flex-1 text-xs space-y-1">
                            <h4 className="font-serif-display text-base text-[#F4F1EA]">
                              {it.name}
                            </h4>
                            <p className="text-[10px] font-mono text-[#8E877C]">
                              SKU: {it.sku || `NR-0${it.id}`} · Qty: {it.quantity}
                            </p>
                            <p className="font-mono text-[#C5A880] text-xs">
                              {formatCurrency(parseFloat(it.total), order.currency)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Logistics & Delivery */}
                <div className="bg-[#141414] border border-white/10 p-6 space-y-4 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-[#C5A880]">
                    <Truck className="w-4 h-4" />
                    <span className="uppercase tracking-widest text-[11px] font-medium">
                      Armored Courier Logistics
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#8E877C] pt-2">
                    <div>
                      <span className="text-[10px] text-white block uppercase tracking-wider mb-1">
                        RECIPIENT &amp; ADDRESS
                      </span>
                      <p className="text-[#C6C0B5]">
                        {order.shipping.first_name || order.billing.first_name} {order.shipping.last_name || order.billing.last_name}
                      </p>
                      <p>{order.shipping.address_1}</p>
                      <p>{order.shipping.city}, {order.shipping.state} {order.shipping.postcode}</p>
                      <p>{order.shipping.country}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-white block uppercase tracking-wider mb-1">
                        DISPATCH SPECIFICATION
                      </span>
                      <p className="text-[#C6C0B5]">Insured Priority Transit</p>
                      <p>Full Vault-to-Wrist Coverage</p>
                      <p>Signature Authentication Required</p>
                      <p className="text-[#C5A880] pt-1">Complimentary Service</p>
                    </div>
                  </div>

                  {order.customer_note && (
                    <div className="pt-3 border-t border-white/10 text-xs">
                      <span className="text-[10px] text-[#C5A880] uppercase tracking-wider block font-mono mb-1">
                        Bespoke Client Instructions
                      </span>
                      <p className="text-[#C6C0B5] italic font-sans-ui">{order.customer_note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Financial & Guarantee Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#141414] border border-white/10 p-6 space-y-4 text-xs font-mono">
                  <h3 className="font-serif-display text-2xl text-[#F4F1EA] pb-3 border-b border-white/10 font-sans-ui">
                    Settlement Overview
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[#8E877C]">
                      <span>Payment Method</span>
                      <span className="text-white text-right">
                        {order.payment_method_title || "Atelier Wire Transfer"}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#8E877C]">
                      <span>Courier Insurance</span>
                      <span className="text-[#C5A880]">Complimentary</span>
                    </div>

                    {order.discount_total && parseFloat(order.discount_total) > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>
                          Privilege Benefit {order.coupon_lines?.length ? `(${order.coupon_lines.map((c) => c.code).join(", ")})` : ""}
                        </span>
                        <span>-{formatCurrency(parseFloat(order.discount_total), order.currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#8E877C]">
                      <span>VAT &amp; Duties</span>
                      <span className="text-white">Included</span>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                      <span className="text-white font-serif-display text-lg font-sans-ui">Total Acquisition</span>
                      <span className="text-white font-serif-display text-2xl font-sans-ui">
                        {formatCurrency(parseFloat(order.total), order.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Manufacture Warranty Badge */}
                <div className="bg-[#121212] border border-white/10 p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[#C5A880] text-xs font-mono uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Geneva Atelier Certification</span>
                  </div>
                  <p className="text-xs text-[#8E877C] font-light leading-relaxed">
                    This timepiece allocation includes our 5-Year International Mechanical Warranty. Serial registry dossier is issued and permanently archived in our master register.
                  </p>
                </div>

                <div className="p-4 bg-[#141414] border border-white/10 text-center">
                  <Link
                    href="/contact"
                    className="text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
                  >
                    Contact Dedicated Atelier Concierge →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
