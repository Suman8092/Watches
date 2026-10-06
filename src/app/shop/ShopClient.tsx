"use client";

import React, { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Eye,
  ShoppingBag,
  X,
  Search,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Product, ProductCategory } from "@/types/woocommerce";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";

interface ShopClientProps {
  initialProducts: Product[];
  categories: ProductCategory[];
}

export function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMovement, setSelectedMovement] = useState<string>("all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const { openQuickView, addToCart, isUpdating } = useCart();

  // Extract unique movement & material attributes from products
  const movementOptions = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      const mov = p.specs?.movement || "";
      if (mov.toLowerCase().includes("automatic")) set.add("Automatic");
      if (mov.toLowerCase().includes("chronograph") || mov.toLowerCase().includes("column")) set.add("Chronograph");
      if (mov.toLowerCase().includes("manual") || mov.toLowerCase().includes("slim")) set.add("Manual-Wind");
      if (mov.toLowerCase().includes("tourbillon")) set.add("Tourbillon");
    });
    return Array.from(set);
  }, [initialProducts]);

  const materialOptions = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      const mat = p.specs?.caseMaterial || "";
      if (mat.toLowerCase().includes("steel")) set.add("316L Stainless Steel");
      if (mat.toLowerCase().includes("titanium")) set.add("Grade 5 Titanium");
      if (mat.toLowerCase().includes("bronze")) set.add("CuSn8 Bronze");
    });
    return Array.from(set);
  }, [initialProducts]);

  // Filtering & Sorting Pipeline
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) =>
        p.categories.some((c) => c.slug === selectedCategory || c.id.toString() === selectedCategory)
      );
    }

    // Movement attribute filter
    if (selectedMovement !== "all") {
      list = list.filter((p) =>
        p.specs?.movement?.toLowerCase().includes(selectedMovement.toLowerCase())
      );
    }

    // Material attribute filter
    if (selectedMaterial !== "all") {
      list = list.filter((p) =>
        p.specs?.caseMaterial?.toLowerCase().includes(selectedMaterial.toLowerCase().replace("316l ", "").replace("grade 5 ", "").replace("cusn8 ", ""))
      );
    }

    // Price range filter
    if (priceRange === "under-tier1") {
      list = list.filter((p) => {
        const val = parseFloat(p.price);
        return val > 10000 ? val < 400000 : val < 4000;
      });
    } else if (priceRange === "tier1-tier2") {
      list = list.filter((p) => {
        const val = parseFloat(p.price);
        return val > 10000 ? (val >= 400000 && val <= 700000) : (val >= 4000 && val <= 7000);
      });
    } else if (priceRange === "above-tier2") {
      list = list.filter((p) => {
        const val = parseFloat(p.price);
        return val > 10000 ? val > 700000 : val > 7000;
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.specs?.movement?.toLowerCase().includes(q) ||
          p.specs?.caseMaterial?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [initialProducts, selectedCategory, selectedMovement, selectedMaterial, priceRange, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedMovement("all");
    setSelectedMaterial("all");
    setPriceRange("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedMovement !== "all" ||
    selectedMaterial !== "all" ||
    priceRange !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans-ui">
      {/* Mobile Filter Trigger Button */}
      <div className="flex sm:hidden items-center justify-between pb-6 mb-6 border-b border-white/10">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-white/20 text-xs uppercase tracking-widest text-[#F4F1EA]"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Filters &amp; Options</span>
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          )}
        </button>

        <span className="text-xs font-mono text-[#8E877C]">
          {filteredProducts.length} Pieces
        </span>
      </div>

      {/* Desktop Filter Bar: Clean Editorial Layout */}
      <div className="hidden sm:block pb-8 mb-10 border-b border-white/10 space-y-6">
        {/* Row 1: Categories & Live Search */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 border transition-all uppercase tracking-widest text-[11px] ${
                selectedCategory === "all"
                  ? "bg-[#F4F1EA] text-[#0B0B0B] border-[#F4F1EA] font-medium"
                  : "border-white/10 text-[#C6C0B5] hover:border-white/30"
              }`}
            >
              All References ({initialProducts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 border transition-all uppercase tracking-widest text-[11px] ${
                  selectedCategory === cat.slug
                    ? "bg-[#F4F1EA] text-[#0B0B0B] border-[#F4F1EA] font-medium"
                    : "border-white/10 text-[#C6C0B5] hover:border-white/30"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#8E877C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-[#141414] border border-white/15 pl-9 pr-3 py-2 text-xs text-[#F4F1EA] placeholder-[#8E877C] focus:outline-none focus:border-[#C5A880]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E877C] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Attributes (Movement, Metallurgy, Price Range, Sort) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Movement Filter */}
            {movementOptions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C]">
                  Movement:
                </span>
                <select
                  value={selectedMovement}
                  onChange={(e) => setSelectedMovement(e.target.value)}
                  className="bg-[#141414] border border-white/15 text-xs text-[#F4F1EA] px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="all">Any Escapement</option>
                  {movementOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Metallurgy Filter */}
            {materialOptions.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C]">
                  Case Metallurgy:
                </span>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="bg-[#141414] border border-white/15 text-xs text-[#F4F1EA] px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="all">Any Metallurgy</option>
                  {materialOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Price Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C]">
                Acquisition Value:
              </span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-[#141414] border border-white/15 text-xs text-[#F4F1EA] px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">All Values</option>
                <option value="under-tier1">Under ₹4,00,000</option>
                <option value="tier1-tier2">₹4,00,000 – ₹7,00,000</option>
                <option value="above-tier2">Above ₹7,00,000</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#C5A880] hover:text-white flex items-center space-x-1 pl-2 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-3">
            <span className="text-[#8E877C] uppercase tracking-wider text-[11px] font-mono">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141414] border border-white/15 text-xs text-[#F4F1EA] px-3 py-1.5 focus:outline-none tracking-wider"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Reference Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Bottom-Sheet Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm sm:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0B] border-t border-white/15 p-6 max-h-[80vh] overflow-y-auto sm:hidden space-y-6 text-xs text-[#F4F1EA]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-serif-display text-xl text-[#F4F1EA]">Curate Selection</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#8E877C] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block">
                  Collections
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1.5 border text-xs ${
                      selectedCategory === "all"
                        ? "bg-[#F4F1EA] text-[#0B0B0B] border-[#F4F1EA]"
                        : "border-white/15 text-[#C6C0B5]"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`px-3 py-1.5 border text-xs ${
                        selectedCategory === c.slug
                          ? "bg-[#F4F1EA] text-[#0B0B0B] border-[#F4F1EA]"
                          : "border-white/15 text-[#C6C0B5]"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E877C] block">
                  Price Tier
                </span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 p-2.5 text-xs text-[#F4F1EA]"
                >
                  <option value="all">All Values</option>
                  <option value="under-tier1">Under ₹4,00,000</option>
                  <option value="tier1-tier2">₹4,00,000 – ₹7,00,000</option>
                  <option value="above-tier2">Above ₹7,00,000</option>
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={resetAllFilters}
                  className="w-1/2 py-3 border border-white/20 text-[#8E877C] text-xs uppercase tracking-widest"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-1/2 py-3 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-widest font-medium"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto text-[#8E877C]">
            <Search className="w-6 h-6 stroke-[1.2]" />
          </div>
          <p className="font-serif-display text-2xl text-[#F4F1EA]">No References Match Criteria</p>
          <p className="text-xs text-[#8E877C]">
            No horological archives match your active filters. Try resetting the criteria or searching for another term.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-2 px-6 py-2.5 text-xs uppercase tracking-widest border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0B0B0B] transition-colors"
          >
            Clear All Criteria
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const hasSecondary = product.images.length > 1;
            const primaryImg = product.images[0]?.src || product.images[0]?.thumbnail || "";
            const secondaryImg = hasSecondary
              ? product.images[1]?.src || product.images[1]?.thumbnail || primaryImg
              : primaryImg;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group flex flex-col justify-between bg-[#121212] border border-white/10 p-5 hover:border-white/30 transition-all duration-300"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest pb-3 text-[#8E877C]">
                    <span>{product.categories[0]?.name || "Horology"}</span>
                    {product.editionBadge && (
                      <span className="text-[#C5A880] px-2 py-0.5 border border-[#C5A880]/30">
                        {product.editionBadge}
                      </span>
                    )}
                  </div>

                  {/* Image with Flip */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181818] my-2">
                    <Link href={`/product/${product.slug}`} className="block w-full h-full">
                      <Image
                        src={primaryImg}
                        alt={product.name}
                        fill
                        className={`object-cover object-center transition-all duration-700 ease-in-out ${
                          hoveredId === product.id && hasSecondary
                            ? "opacity-0 scale-105"
                            : "opacity-100 scale-100"
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {hasSecondary && (
                        <Image
                          src={secondaryImg}
                          alt={`${product.name} alternate view`}
                          fill
                          className={`object-cover object-center transition-all duration-700 ease-in-out absolute inset-0 ${
                            hoveredId === product.id
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95"
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </Link>

                    {/* Quick View Button */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => openQuickView(product)}
                        className="w-full py-2.5 bg-[#0B0B0B]/90 backdrop-blur-sm text-[#F4F1EA] text-[11px] uppercase tracking-widest font-medium hover:bg-[#0B0B0B] transition-colors flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-4 space-y-1">
                    <Link
                      href={`/product/${product.slug}`}
                      className="block font-serif-display text-xl text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] text-[#8E877C] font-mono uppercase tracking-wider line-clamp-1">
                      {product.specs?.movement || "Mechanical Caliber"}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Price & Add to Bag */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif-display text-lg text-[#F4F1EA]">
                      {formatCurrency(parseFloat(product.price))}
                    </span>
                    {product.on_sale && product.regular_price && (
                      <span className="text-xs text-[#8E877C] line-through font-serif-display">
                        {formatCurrency(parseFloat(product.regular_price))}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    disabled={isUpdating || !product.is_in_stock}
                    aria-label={`Add ${product.name} to acquisition bag`}
                    className="p-2.5 border border-white/15 text-[#C6C0B5] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors disabled:opacity-40"
                    title={product.is_in_stock ? "Add to Bag" : "Out of Stock"}
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
