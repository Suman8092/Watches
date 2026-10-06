"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, openCart, openSearch } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Journal", href: "/journal" },
    { label: "Atelier", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg"
            : "bg-gradient-to-b from-[#0B0B0B]/80 via-[#0B0B0B]/40 to-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Trigger & Search */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-1.5 text-[#F4F1EA] hover:text-[#C5A880] transition-colors"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
            <button
              onClick={openSearch}
              aria-label="Open search"
              className="p-1.5 text-[#F4F1EA] hover:text-[#C5A880] transition-colors"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Desktop Left: Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex flex-col items-center lg:items-start">
              <span className="font-serif-display text-2xl md:text-3xl tracking-[0.22em] text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors duration-300">
                NOIRÉ
              </span>
              <span className="text-[8px] uppercase tracking-[0.35em] text-[#8E877C] font-mono -mt-0.5">
                GENÈVE
              </span>
            </Link>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.2em] text-[#C6C0B5] hover:text-[#F4F1EA] transition-colors duration-200 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5 md:space-x-7">
            {/* Search (Desktop) */}
            <button
              onClick={openSearch}
              aria-label="Search timepieces (Press Cmd+K)"
              className="hidden lg:flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C6C0B5] hover:text-white transition-colors group"
            >
              <Search className="w-4 h-4 stroke-[1.5] group-hover:text-[#C5A880] transition-colors" />
              <span className="hidden xl:inline text-[11px] text-[#8E877C]">Search</span>
            </button>

            {/* Account */}
            <Link
              href="/account"
              aria-label="Customer account"
              className="text-[#C6C0B5] hover:text-white transition-colors"
            >
              <User className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5] hover:text-[#C5A880] transition-colors" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              aria-label={`Shopping bag containing ${cart.item_count} items`}
              className="relative p-1 text-[#C6C0B5] hover:text-white transition-colors flex items-center space-x-2 group"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5] group-hover:text-[#C5A880] transition-colors" />
              {cart.item_count > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#C5A880] text-[#0B0B0B] font-mono text-[10px] font-semibold flex items-center justify-center rounded-full">
                  {cart.item_count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
