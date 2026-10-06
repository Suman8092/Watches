import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/lib/woocommerce/categories";
import { getProducts } from "@/lib/woocommerce/products";
import { ShopClient } from "@/app/shop/ShopClient";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Collection Not Found — NOIRÉ" };
  }

  return {
    title: `${category.name} — NOIRÉ Horological Collection`,
    description: category.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const { products } = await getProducts({ category: slug });

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F4F1EA] pt-28 pb-24 font-sans-ui">
      {/* Editorial Collection Hero */}
      <div className="relative h-[55vh] min-h-[400px] w-full bg-[#121212] overflow-hidden mb-16 flex items-end">
        {category.image && (
          <Image
            src={category.image.src}
            alt={category.name}
            fill
            priority
            className="object-cover object-center brightness-[0.45]"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12 w-full">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] mb-3">
            <Link href="/collections" className="hover:text-white transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span>{category.name}</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-[#F4F1EA] tracking-wide">
            {category.name}
          </h1>

          <p className="text-xs md:text-sm text-[#C6C0B5] max-w-2xl font-sans-ui font-light leading-relaxed mt-4">
            {category.description}
          </p>

          <div className="mt-4 text-xs font-mono text-[#8E877C] uppercase tracking-widest">
            {category.count !== undefined ? `${category.count} Pieces in Archive` : `${products.length} References`}
          </div>
        </div>
      </div>

      {/* Filtered Collection Products Catalog */}
      <ShopClient initialProducts={products} categories={categories} />
    </div>
  );
}
