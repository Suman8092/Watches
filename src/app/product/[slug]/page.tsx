import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/woocommerce/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Timepiece Not Found — NOIRÉ",
    };
  }

  return {
    title: `${product.name} — NOIRÉ Haute Horlogerie`,
    description: product.short_description || product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: [{ url: product.images[0]?.src || "" }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products from the same collection or store
  const { products: allProducts } = await getProducts({ per_page: 5 });
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
