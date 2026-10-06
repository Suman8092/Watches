"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/woocommerce/mock-data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const mainNav = [
    { label: "Shop All Timepieces", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Horological Journal", href: "/journal" },
    { label: "Atelier & Craft", href: "/about" },
    { label: "Concierge & Client Care", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden"
          />

          {/* Drawer */}
          <motion.nav
            aria-label="Mobile Navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-[#0B0B0B] text-[#F4F1EA] border-r border-white/10 flex flex-col justify-between p-6 lg:hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="font-serif-display text-2xl tracking-widest text-[#F4F1EA]">NOIRÉ</span>
                  <p className="text-[9px] uppercase tracking-widest text-[#8E877C]">HORLOGERIE D&apos;AUTEUR</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#C6C0B5] hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Links */}
              <div className="py-6 space-y-4">
                {mainNav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block font-serif-display text-2xl text-[#F4F1EA] hover:text-[#C5A880] transition-colors py-1"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Collections Quick Links */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-[#8E877C] mb-3">
                  Signature Collections
                </p>
                <div className="space-y-2.5">
                  {MOCK_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/collections/${cat.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between text-xs text-[#C6C0B5] hover:text-white group transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8E877C] group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Concierge Info */}
            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-[#8E877C]">
              <div className="flex items-center space-x-2 text-[11px] text-[#C5A880]">
                <ShieldCheck className="w-4 h-4" />
                <span>5-Year International Manufacture Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5" />
                <span>concierge@noire-timepieces.com</span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#666666]">
                © 2026 NOIRÉ ATELIER. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
