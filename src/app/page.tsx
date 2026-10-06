import { getFeaturedProducts, getBestSellers, getProductBySlug } from "@/lib/woocommerce/products";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CollectionStory } from "@/components/home/CollectionStory";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { SignatureProduct } from "@/components/home/SignatureProduct";
import { BestSellers } from "@/components/home/BestSellers";
import { BrandStory } from "@/components/home/BrandStory";
import { JournalPreview } from "@/components/home/JournalPreview";
import { TrustSection } from "@/components/home/TrustSection";

export default async function HomePage() {
  // Fetch real WooCommerce Store API data (with automatic Mock Mode fallback)
  const [featuredProducts, bestSellers, primaryProduct] = await Promise.all([
    getFeaturedProducts(4),
    getBestSellers(6),
    getProductBySlug("the-grand-chronometre-noir"),
  ]);


  // Use primary product or dynamically fall back to the first available timepiece
  const signatureProduct = primaryProduct || featuredProducts[0] || bestSellers[0];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1 — HERO */}
      <Hero />

      {/* SECTION 2 — FEATURED TIMEPIECES (Warm Ivory) */}
      <FeaturedCollection products={featuredProducts} />

      {/* SECTION 3 — COLLECTION STORY (Dark & Asymmetric) */}
      <CollectionStory />

      {/* SECTION 4 — CRAFTSMANSHIP (Dark Editorial Anatomical Breakdown) */}
      <Craftsmanship />

      {/* SECTION 5 — SIGNATURE TIMEPIECE (Warm Ivory Luxury Ad Spread) */}
      {signatureProduct && <SignatureProduct product={signatureProduct} />}

      {/* SECTION 6 — BEST SELLERS (Obsidian Horizontal Product Rail) */}
      <BestSellers products={bestSellers} />

      {/* SECTION 7 — BRAND STORY (Ivory Atelier Chronicle) */}
      <BrandStory />

      {/* SECTION 8 — WATCH JOURNAL (Obsidian Magazine Layout) */}
      <JournalPreview />

      {/* SECTION 9 — TRUST (Refined Luxury Indicators) */}
      <TrustSection />
    </div>
  );
}
