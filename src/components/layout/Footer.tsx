"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0B0B0B] text-[#F4F1EA] border-t border-white/10 pt-20 pb-12 font-sans-ui">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif-display text-3xl md:text-4xl tracking-[0.2em] text-[#F4F1EA]">
              NOIRÉ
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono">
              MANUFACTURE DE HAUTE HORLOGERIE
            </p>
            <p className="text-xs text-[#8E877C] leading-relaxed max-w-sm font-sans-ui">
              Engineered around radical proportion, kinetic permanence, and quiet restraint. Crafted in limited annual editions for the discerning collector.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="max-w-md ml-auto w-full space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#F4F1EA] block">
                The Horological Gazette
              </span>
              <p className="text-xs text-[#8E877C]">
                Receive private invitations to confidential caliber reveals, horological essays, and limited production allocations.
              </p>
              <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent text-xs text-[#F4F1EA] placeholder-[#8E877C] focus:outline-none flex-1 tracking-wider"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Gazette"
                  className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors flex items-center space-x-1 pl-3"
                >
                  {subscribed ? (
                    <span className="flex items-center text-emerald-400">
                      <Check className="w-3.5 h-3.5 mr-1" /> Subscribed
                    </span>
                  ) : (
                    <>
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 border-b border-white/10 text-xs">
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-[0.18em] text-[#F4F1EA] font-semibold text-[11px]">
              Horological Catalog
            </h4>
            <ul className="space-y-2.5 text-[#8E877C]">
              <li>
                <Link href="/shop" className="hover:text-[#F4F1EA] transition-colors">
                  All Timepieces
                </Link>
              </li>
              <li>
                <Link href="/collections/the-chronograph" className="hover:text-[#F4F1EA] transition-colors">
                  The Chronograph
                </Link>
              </li>
              <li>
                <Link href="/collections/the-automatic" className="hover:text-[#F4F1EA] transition-colors">
                  The Automatic
                </Link>
              </li>
              <li>
                <Link href="/collections/the-classic" className="hover:text-[#F4F1EA] transition-colors">
                  The Classic
                </Link>
              </li>
              <li>
                <Link href="/collections/the-heritage" className="hover:text-[#F4F1EA] transition-colors">
                  Haute Horlogerie
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-[0.18em] text-[#F4F1EA] font-semibold text-[11px]">
              Concierge Care
            </h4>
            <ul className="space-y-2.5 text-[#8E877C]">
              <li>
                <Link href="/contact" className="hover:text-[#F4F1EA] transition-colors">
                  Book Atelier Appointment
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#F4F1EA] transition-colors">
                  Complimentary Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#F4F1EA] transition-colors">
                  30-Day Bespoke Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-[#F4F1EA] transition-colors">
                  5-Year Manufacture Warranty
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F4F1EA] transition-colors">
                  Collector FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Maison */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-[0.18em] text-[#F4F1EA] font-semibold text-[11px]">
              Maison
            </h4>
            <ul className="space-y-2.5 text-[#8E877C]">
              <li>
                <Link href="/about" className="hover:text-[#F4F1EA] transition-colors">
                  The Geneva Atelier
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#F4F1EA] transition-colors">
                  The Watch Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F4F1EA] transition-colors">
                  Kinematic Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F4F1EA] transition-colors">
                  Press Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Authenticity & Certification */}
          <div className="space-y-4">
            <h4 className="uppercase tracking-[0.18em] text-[#F4F1EA] font-semibold text-[11px]">
              Certification
            </h4>
            <ul className="space-y-2.5 text-[#8E877C]">
              <li>
                <span className="text-[#C5A880]">Swiss Caliber Testing</span>
              </li>
              <li>
                <span>Chronometric Regulation</span>
              </li>
              <li>
                <span>Anti-Magnetism ISO 764</span>
              </li>
              <li>
                <span>Water Integrity ISO 22810</span>
              </li>
            </ul>
          </div>

          {/* Salons & Hours */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <h4 className="uppercase tracking-[0.18em] text-[#F4F1EA] font-semibold text-[11px]">
              Private Salons
            </h4>
            <p className="text-xs text-[#8E877C] leading-relaxed">
              Rue du Rhône 42, 1204 Genève
              <br />
              Fifth Avenue 740, New York
              <br />
              Ginza 6-Chome, Tokyo
            </p>
            <p className="text-[11px] font-mono text-[#C5A880]">
              Mon–Sat · By Appointment
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#666666] space-y-4 md:space-y-0">
          <div>
            © 2026 NOIRÉ HORLOGERIE S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6 text-[#8E877C]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Acquisition
            </Link>
            <Link href="/warranty" className="hover:text-white transition-colors">
              Manufacture Warranty
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
