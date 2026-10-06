import { ProductCategory } from "@/types/woocommerce";
import { storeApiFetch, IS_MOCK_MODE } from "./client";
import { MOCK_CATEGORIES } from "./mock-data";

/**
 * Fetch all product categories / collections
 */
export async function getCategories(): Promise<ProductCategory[]> {
  if (IS_MOCK_MODE) {
    return MOCK_CATEGORIES;
  }

  const { data } = await storeApiFetch<ProductCategory[]>("products/categories", {
    params: {
      per_page: 50,
      hide_empty: false,
    },
    next: { revalidate: 120 },
  });

  if (!data || data.length === 0) {
    return MOCK_CATEGORIES;
  }

  // Ensure each category has valid imagery and descriptions from live backend or editorial fallback
  return data.map((cat) => {
    const mockMatch = MOCK_CATEGORIES.find((m) => m.slug === cat.slug);
    const resolvedImage = cat.image?.src
      ? cat.image
      : mockMatch?.image || {
          id: cat.id,
          src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
          alt: cat.name,
        };

    return {
      ...cat,
      image: resolvedImage,
      description: cat.description || mockMatch?.description || "Curated horological timepieces.",
    };
  });
}

/**
 * Fetch a single product category by its slug
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  const categories = await getCategories();
  const match = categories.find((c) => c.slug === slug);
  return match || null;
}
