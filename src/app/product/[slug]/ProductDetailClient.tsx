"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Star,
  Maximize2,
  X,
  Compass,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/types/woocommerce";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/woocommerce/cart";
import { getAllAttributePairs } from "@/lib/woocommerce/attributes";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, isUpdating } = useCart();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });

  const activeImage = product.images[selectedImgIndex] || product.images[0];
  const allAttributes = getAllAttributePairs(product.attributes);

  const handleAddToCart = async () => {
    if (!product.is_in_stock) return;
    await addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleBuyNow = async () => {
    if (!product.is_in_stock) return;
    await addToCart(product, quantity);
    router.push("/checkout");
  };

  // Interactive zoom lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, show: false }));
  };

  const reviews: Array<{
    author: string;
    location?: string;
    rating: number;
    date: string;
    title: string;
    comment: string;
  }> = (product as any).reviews || [];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-28 pb-24 font-sans-ui">
      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen gallery"
              className="absolute top-6 right-6 p-3 text-[#C6C0B5] hover:text-white bg-white/10 rounded-full transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImgIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-6 p-3 text-[#C6C0B5] hover:text-white bg-white/10 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImgIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-6 p-3 text-[#C6C0B5] hover:text-white bg-white/10 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Path */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 mb-6 border-b border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#8E877C] flex items-center space-x-2">
        <Link href="/" className="hover:text-white transition-colors">
          Atelier
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          Catalog
        </Link>
        <span>/</span>
        {product.categories[0] && (
          <>
            <Link
              href={`/collections/${product.categories[0].slug}`}
              className="hover:text-white transition-colors"
            >
              {product.categories[0].name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[#C5A880] truncate">{product.name}</span>
      </div>

      {/* 2-Column Product Spread */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT: Large Product Gallery with Zoom & Thumbnails */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative aspect-[4/5] w-full bg-[#141414] border border-white/10 overflow-hidden group cursor-crosshair select-none"
          >
            {/* Base Image */}
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              className={`object-cover object-center transition-all duration-300 ${
                zoomPos.show ? "scale-125" : "scale-100"
              }`}
              style={
                zoomPos.show
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Edition Badge */}
            {product.editionBadge && (
              <div className="absolute top-6 left-6 bg-[#0B0B0B]/90 backdrop-blur-sm border border-white/10 text-[#F4F1EA] px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.25em]">
                {product.editionBadge}
              </div>
            )}

            {/* Fullscreen Trigger */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              aria-label="Expand to fullscreen view"
              className="absolute bottom-6 right-6 p-3 bg-[#0B0B0B]/80 backdrop-blur-sm border border-white/15 text-[#C6C0B5] hover:text-white transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative w-24 h-24 bg-[#141414] border transition-all duration-200 flex-shrink-0 ${
                    selectedImgIndex === idx
                      ? "border-[#C5A880] ring-1 ring-[#C5A880]/50"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Sticky Purchase Information Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8E877C]">
              <span>REF: {product.sku}</span>
              {product.is_in_stock ? (
                <span className="text-emerald-400 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Immediate Allocation Available</span>
                </span>
              ) : (
                <span className="text-rose-400 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Allocation Waitlist Only</span>
                </span>
              )}
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl text-[#F4F1EA] tracking-wide leading-tight">
              {product.name}
            </h1>

            {/* Price & Sale Display */}
            <div className="flex items-baseline space-x-4">
              <span className="font-serif-display text-3xl text-[#C5A880]">
                {formatCurrency(parseFloat(product.price))}
              </span>
              {product.on_sale && product.regular_price && (
                <span className="text-sm text-[#8E877C] line-through font-serif-display">
                  {formatCurrency(parseFloat(product.regular_price))}
                </span>
              )}
              <span className="text-xs text-[#8E877C] font-mono uppercase tracking-wider">
                VAT &amp; Duties Included
              </span>
            </div>

            {/* Rating / Provenance status */}
            {product.review_count > 0 ? (
              <div className="flex items-center space-x-2 text-xs">
                <div className="flex text-[#C5A880]">
                  {[...Array(Math.min(5, Math.round(parseFloat(product.average_rating) || 5)))].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>
                <span className="text-xs text-[#C6C0B5] font-mono">{product.average_rating}</span>
                <span className="text-[#8E877C]">· ({product.review_count} Verified {product.review_count === 1 ? "Review" : "Reviews"})</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880]">
                  Direct Atelier Edition
                </span>
                <span className="text-[#8E877C]">· Certified Mechanical Inspection</span>
              </div>
            )}

            <p className="text-xs md:text-sm text-[#C6C0B5] font-sans-ui font-light leading-relaxed">
              {product.short_description || product.description}
            </p>
          </div>

          {/* Caliber Highlights Table */}
          <div className="p-4 bg-[#141414] border border-white/10 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#8E877C] text-[10px] uppercase block">CALIBER</span>
              <span className="text-[#F4F1EA] text-[11px] truncate block">{product.specs.caliber}</span>
            </div>
            <div>
              <span className="text-[#8E877C] text-[10px] uppercase block">POWER RESERVE</span>
              <span className="text-[#F4F1EA] text-[11px]">{product.specs.powerReserve}</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-white/15 bg-[#141414]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.is_in_stock}
                  className="p-3 text-[#C6C0B5] hover:text-white transition-colors disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono text-sm text-[#F4F1EA]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.is_in_stock}
                  className="p-3 text-[#C6C0B5] hover:text-white transition-colors disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isUpdating || !product.is_in_stock}
                className="flex-1 py-4 px-8 bg-[#F4F1EA] text-[#0B0B0B] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-colors flex items-center justify-center space-x-2 disabled:opacity-40"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#0B0B0B]" />
                    <span>{product.is_in_stock ? "Add to Bag" : "Out of Stock"}</span>
                  </>
                )}
              </button>
            </div>

            {product.is_in_stock && (
              <button
                onClick={handleBuyNow}
                className="w-full py-4 border border-white/20 text-[#F4F1EA] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
              >
                Instant Acquisition (Buy Now)
              </button>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="space-y-2.5 pt-6 border-t border-white/10 text-xs text-[#8E877C]">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-[#C5A880]" />
              <span>Complimentary armored courier with signature receipt</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>5-year international mechanical manufacture warranty</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-4 h-4 text-[#C5A880]" />
              <span>30-day trial period with prepaid insured returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28 pt-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              THE CHRONICLE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-[#F4F1EA] font-light leading-tight">
              SCULPTED FOR GENERATIONAL PERMANENCE.
            </h2>
            <div className="space-y-4 text-xs md:text-sm text-[#C6C0B5] font-light leading-relaxed">
              <p>
                {product.description ||
                  `Every millimeter of ${product.name} has been engineered to balance raw metallurgical resilience with quiet aesthetic poise. Machined in Geneva, the case flanks feature contrasting satin brushing and hand-chamfered mirror polish.`}
              </p>
              <p>
                The mechanical heart oscillates with micro-metric poise, sustained by an optimized mainspring architecture engineered to withstand the rigors of modern daily life without requiring delicate handling.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] bg-[#141414] border border-white/10 overflow-hidden">
            <Image
              src={product.images[1]?.src || product.images[0].src}
              alt={`${product.name} detail`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* DYNAMIC SPECIFICATIONS MATRIX (RENDERED FROM WOOCOMMERCE ATTRIBUTES) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28 pt-20 border-t border-white/10">
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            HOROLOGICAL DOSSIER
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F4F1EA] mt-2">
            TECHNICAL SPECIFICATIONS
          </h2>
          <p className="text-xs text-[#8E877C] mt-2">
            Certified tolerances recorded during final chronometric inspection.
          </p>
        </div>

        {/* Dynamic Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 text-xs divide-y md:divide-y-0 divide-white/5">
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Movement</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.movement}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Caliber Architecture</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.caliber}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Power Reserve</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.powerReserve}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Case Diameter</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.caseDiameter}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Case Thickness</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.caseThickness}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Case Metallurgy</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.caseMaterial}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Dial &amp; Indices</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.dialColor}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Crystal &amp; Optics</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.crystal}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Water Resistance</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.waterResistance}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Strap &amp; Clasp</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.strapMaterial}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">Lug Width</span>
            <span className="text-[#F4F1EA] text-right font-medium">{product.specs.lugWidth}</span>
          </div>
          <div className="py-3 border-b border-white/10 flex justify-between">
            <span className="text-[#8E877C] uppercase font-mono text-[10px]">International Warranty</span>
            <span className="text-[#C5A880] text-right font-medium">{product.specs.warranty}</span>
          </div>

          {/* Any other dynamic WooCommerce attributes */}
          {allAttributes
            .filter(
              (attr) =>
                !["movement", "caliber", "case diameter", "case thickness", "case material", "crystal", "water resistance", "strap material", "warranty"].includes(
                  attr.name.toLowerCase()
                )
            )
            .map((attr, idx) => (
              <div key={idx} className="py-3 border-b border-white/10 flex justify-between">
                <span className="text-[#8E877C] uppercase font-mono text-[10px]">{attr.name}</span>
                <span className="text-[#F4F1EA] text-right font-medium">{attr.value}</span>
              </div>
            ))}
        </div>
      </section>

      {/* COLLECTOR REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28 pt-20 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
              PROVENANCE &amp; ACCLAIM
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F4F1EA] mt-1">
              COLLECTOR APPRAISALS
            </h2>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E877C]">
            Verified Ownership Authenticated
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-[#121212] border border-white/10 p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C5A880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#8E877C]">{rev.date}</span>
                </div>

                <h3 className="font-serif-display text-xl text-[#F4F1EA]">&ldquo;{rev.title}&rdquo;</h3>

                <p className="text-xs text-[#C6C0B5] font-light leading-relaxed">
                  {rev.comment}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8E877C]">
                  <span className="text-white font-medium">{rev.author}</span>
                  {rev.location && <span>{rev.location}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#121212] border border-white/10 p-8 md:p-12 text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono block">
              HONEST VERIFIED PROVENANCE
            </span>
            <h3 className="font-serif-display text-2xl text-[#F4F1EA]">
              Certified Atelier Archive
            </h3>
            <p className="text-xs text-[#C6C0B5] font-light leading-relaxed">
              Every NOIRÉ timepiece is individually inspected and accompanied by an official Certificate of Authenticity. Client appraisals are registered exclusively following confirmed delivery and atelier verification.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-6 py-2.5 border border-white/20 text-[#F4F1EA] text-[11px] uppercase tracking-widest hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
              >
                Inquire with Atelier Concierge
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* RELATED WATCHES */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28 pt-20 border-t border-white/10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-mono">
                COMPLEMENTARY HOROLOGY
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#F4F1EA] mt-1">
                RELATED REFERENCES
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-[#8E877C] hover:text-white transition-colors"
            >
              Browse Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-[#121212] border border-white/10 p-5 group hover:border-[#C5A880]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full bg-[#181818] overflow-hidden mb-4">
                    <Link href={`/product/${rel.slug}`} className="block w-full h-full">
                      <Image
                        src={rel.images[0]?.src || rel.images[0]?.thumbnail || ""}
                        alt={rel.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </Link>
                  </div>
                  <Link
                    href={`/product/${rel.slug}`}
                    className="block font-serif-display text-xl text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors"
                  >
                    {rel.name}
                  </Link>
                  <p className="text-[11px] text-[#8E877C] font-mono mt-1">
                    {rel.specs.caliber}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-serif-display text-base text-[#F4F1EA]">
                    {formatCurrency(parseFloat(rel.price))}
                  </span>
                  <Link
                    href={`/product/${rel.slug}`}
                    className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
                  >
                    Examine
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
