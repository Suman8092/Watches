"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/woocommerce/products";
import { formatCurrency } from "@/lib/woocommerce/cart";
import { Product } from "@/types/woocommerce";

export function SearchDrawer() {
  const { isSearchOpen, closeSearch, openQuickView } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Cmd/Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else {
          inputRef.current?.focus();
        }
      }
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Dynamic WooCommerce search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const { products } = await getProducts({ search: query, per_page: 8 });
        setResults(products);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const quickPicks = ["Chronograph", "Tourbillon", "Grand Date", "38mm Ultra-Thin", "Automatic"];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSearch}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0B] text-[#F4F1EA] border-b border-white/10 shadow-2xl max-h-[85vh] flex flex-col font-sans-ui"
          >
            {/* Top Bar with Search Input */}
            <div className="max-w-6xl mx-auto w-full px-6 py-8">
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <div className="flex items-center space-x-4 flex-1">
                  {isSearching ? (
                    <Loader2 className="w-6 h-6 text-[#C5A880] animate-spin" />
                  ) : (
                    <Search className="w-6 h-6 text-[#C5A880]" />
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search timepieces, calibers, or materials..."
                    className="w-full bg-transparent font-serif-display text-2xl md:text-3xl text-[#F4F1EA] placeholder-[#8E877C]/60 focus:outline-none tracking-wide"
                  />
                </div>
                <div className="flex items-center space-x-4 pl-4">
                  <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-[#8E877C] px-2 py-1 border border-white/10 font-mono">
                    ESC to close
                  </span>
                  <button
                    onClick={closeSearch}
                    aria-label="Close search overlay"
                    className="p-2 text-[#C6C0B5] hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              {!query && (
                <div className="pt-6">
                  <p className="text-[11px] uppercase tracking-widest text-[#8E877C] mb-3">
                    Curated Inquiries
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickPicks.map((pick) => (
                      <button
                        key={pick}
                        onClick={() => setQuery(pick)}
                        className="px-3.5 py-1.5 text-xs text-[#C6C0B5] bg-[#161616] hover:bg-[#222222] hover:text-white border border-white/5 transition-colors"
                      >
                        {pick}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query && (
                <div className="pt-6 overflow-y-auto max-h-[50vh] space-y-4">
                  <div className="flex justify-between items-center text-xs text-[#8E877C] uppercase tracking-wider pb-2 border-b border-white/5">
                    <span>
                      {results.length} {results.length === 1 ? "Reference" : "References"} Found
                    </span>
                    <span>WooCommerce Horological Archive</span>
                  </div>

                  {results.length === 0 && !isSearching ? (
                    <div className="py-12 text-center text-[#8E877C] space-y-2">
                      <p className="font-serif-display text-xl text-[#F4F1EA]">No Timepieces Found</p>
                      <p className="text-xs">
                        No archive records match &ldquo;{query}&rdquo;. Try searching for &ldquo;Chronograph&rdquo;, &ldquo;Automatic&rdquo;, or &ldquo;Tourbillon&rdquo;.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                      {results.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-4 p-3 bg-[#141414] border border-white/5 hover:border-white/20 transition-all group"
                        >
                          <div className="relative w-16 h-20 bg-[#1C1C1C] flex-shrink-0 overflow-hidden">
                            <Image
                              src={product.images[0]?.src || product.images[0]?.thumbnail || ""}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="64px"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] truncate block">
                              {product.specs?.movement?.split(" ")[0] || "Caliber"}
                            </span>
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={closeSearch}
                              className="block font-serif-display text-base text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors truncate"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs font-mono text-[#8E877C] mt-0.5">
                              {formatCurrency(parseFloat(product.price))}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              closeSearch();
                              openQuickView(product);
                            }}
                            className="p-2 text-[#8E877C] group-hover:text-white transition-colors"
                            title="Quick View"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
