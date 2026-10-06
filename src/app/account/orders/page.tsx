"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Clock, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/woocommerce/cart";

interface OrderSummary {
  id: number | string;
  number: string;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  payment_method_title: string;
  line_items: Array<{
    id: number;
    name: string;
    quantity: number;
    total: string;
  }>;
}

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (typeof window === "undefined") return;

      try {
        const storedIds: string[] = JSON.parse(
          localStorage.getItem("noire_collector_orders") || "[]"
        );

        if (storedIds.length === 0) {
          setLoading(false);
          return;
        }

        const fetched: OrderSummary[] = [];
        for (const id of storedIds) {
          try {
            const res = await fetch(`/api/orders/${id}`);
            if (res.ok) {
              const data = await res.json();
              fetched.push(data);
            }
          } catch {
            // Silently continue for unresolvable order
          }
        }

        setOrders(fetched);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8E877C] hover:text-[#C5A880] transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Collector Archive Overview</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
                ACQUISITION ARCHIVE
              </span>
              <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] mt-1">
                ORDER HISTORY &amp; ALLOCATIONS
              </h1>
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E877C]">
              {orders.length} {orders.length === 1 ? "RECORD ARCHIVED" : "RECORDS ARCHIVED"}
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-8 h-8 border border-white/20 border-t-[#C5A880] rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-[#8E877C] uppercase tracking-widest">
              Retrieving Authenticated Order Records...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#121212] border border-white/10 p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto text-[#8E877C]">
              <Package className="w-5 h-5 stroke-[1.2]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-display text-2xl text-[#F4F1EA]">
                No Acquired Timepieces On Record
              </h3>
              <p className="text-xs text-[#8E877C] font-light leading-relaxed">
                When you acquire a timepiece through the NOIRÉ atelier, your registration certificate and allocation tracking will be archived here.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors"
            >
              Explore Timepiece Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#141414] border border-white/10 p-6 md:p-8 hover:border-white/30 transition-all duration-300 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#8E877C] uppercase tracking-wider block">
                      ARCHIVE IDENTIFIER
                    </span>
                    <span className="text-base text-white font-serif-display">
                      Reference #{ord.number}
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-xs">
                    <div>
                      <span className="text-[10px] text-[#8E877C] uppercase tracking-wider block">
                        DATE ALLOCATED
                      </span>
                      <span className="text-[#C6C0B5]">
                        {ord.date_created ? new Date(ord.date_created).toLocaleDateString() : "Recent"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8E877C] uppercase tracking-wider block">
                        STATUS
                      </span>
                      <span className="text-emerald-400 uppercase tracking-widest text-[11px] font-medium">
                        {ord.status.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#8E877C] uppercase tracking-wider block">
                        TOTAL VALUE
                      </span>
                      <span className="text-[#C5A880]">
                        {formatCurrency(parseFloat(ord.total), ord.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block">
                    ALLOCATED TIMEPIECES
                  </span>
                  <div className="divide-y divide-white/5">
                    {ord.line_items.map((it) => (
                      <div key={it.id} className="py-2 flex justify-between items-center text-xs">
                        <span className="text-[#F4F1EA]">
                          {it.name} <span className="text-[#8E877C]">× {it.quantity}</span>
                        </span>
                        <span className="text-[#8E877C] font-mono">
                          {formatCurrency(parseFloat(it.total), ord.currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-[11px] text-[#8E877C]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Includes 5-Year International Atelier Warranty</span>
                  </div>

                  <Link
                    href={`/account/orders/${ord.id}`}
                    className="inline-flex items-center space-x-2 text-[#C5A880] hover:text-white font-mono uppercase tracking-widest text-[11px] transition-colors"
                  >
                    <span>View Full Allocation Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
