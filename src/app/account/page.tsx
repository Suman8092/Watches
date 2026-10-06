"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, Shield, ArrowRight, ExternalLink } from "lucide-react";

export default function AccountPage() {
  const [email, setEmail] = useState("collector@sntoriginals.com");
  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedOrders = JSON.parse(
          localStorage.getItem("noire_collector_orders") || "[]"
        );
        setOrderCount(storedOrders.length);

        const storedProfile = localStorage.getItem("noire_collector_profile");
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile);
          if (parsed.email) setEmail(parsed.email);
        }
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-32 pb-24 font-sans-ui">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-white/10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              COLLECTOR ARCHIVE
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] mt-1">
              WELCOME, {email.split("@")[0].toUpperCase()}
            </h1>
            <p className="text-xs text-[#8E877C] font-mono mt-1">
              Verified Atelier Dossier · Authenticated Access
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
          >
            Browse New Timepieces →
          </Link>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Orders */}
          <Link
            href="/account/orders"
            className="bg-[#141414] border border-white/10 p-6 space-y-3 hover:border-[#C5A880]/50 transition-all duration-300 group block"
          >
            <div className="flex items-center justify-between text-[#C5A880] text-xs font-mono uppercase">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Allocations &amp; Orders</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="font-serif-display text-2xl text-[#F4F1EA]">
              {orderCount} {orderCount === 1 ? "Timepiece" : "Timepieces"}
            </p>
            <p className="text-[11px] text-[#8E877C]">
              {orderCount > 0
                ? "View insured tracking and registration"
                : "No allocations registered yet"}
            </p>
          </Link>

          {/* Profile */}
          <Link
            href="/account/profile"
            className="bg-[#141414] border border-white/10 p-6 space-y-3 hover:border-[#C5A880]/50 transition-all duration-300 group block"
          >
            <div className="flex items-center justify-between text-[#C5A880] text-xs font-mono uppercase">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Collector Profile</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="font-serif-display text-2xl text-[#F4F1EA]">Geneva Circle</p>
            <p className="text-[11px] text-[#8E877C]">Manage delivery address and credentials</p>
          </Link>

          {/* Warranty */}
          <Link
            href="/warranty"
            className="bg-[#141414] border border-white/10 p-6 space-y-3 hover:border-[#C5A880]/50 transition-all duration-300 group block"
          >
            <div className="flex items-center justify-between text-[#C5A880] text-xs font-mono uppercase">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Manufacture Warranty</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="font-serif-display text-2xl text-[#F4F1EA]">Active · 5 Years</p>
            <p className="text-[11px] text-[#8E877C]">Full international mechanical coverage</p>
          </Link>
        </div>

        {/* Quick Links & Concierge Services */}
        <div className="p-8 bg-[#121212] border border-white/10 space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-[#8E877C] block">
            Atelier Portals &amp; Direct Services
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <Link
              href="/account/orders"
              className="p-3 bg-[#181818] border border-white/10 hover:border-white/30 text-[#F4F1EA] hover:text-[#C5A880] flex items-center justify-between transition-colors"
            >
              <span>View Order Archive</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href="/contact"
              className="p-3 bg-[#181818] border border-white/10 hover:border-white/30 text-[#F4F1EA] hover:text-[#C5A880] flex items-center justify-between transition-colors"
            >
              <span>Contact Concierge</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <Link
              href="/journal"
              className="p-3 bg-[#181818] border border-white/10 hover:border-white/30 text-[#F4F1EA] hover:text-[#C5A880] flex items-center justify-between transition-colors"
            >
              <span>Horological Journal</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
