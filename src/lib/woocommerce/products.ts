import { Product, ProductCategory, StoreApiProduct } from "@/types/woocommerce";
import { storeApiFetch, IS_MOCK_MODE, parseStorePrice } from "./client";
import { MOCK_PRODUCTS } from "./mock-data";
import { extractSpecsFromAttributes } from "./attributes";

export interface GetProductsParams {
  category?: string;
  search?: string;
  order_by?: "price" | "date" | "title" | "rating";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
  featured?: boolean;
}

const DEFAULT_WATCH_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85";

export const TIMEPIECE_FALLBACK_IMAGES: Record<string, string[]> = {
  "the-grand-chronometre-noir": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85",
  ],
  "sovereign-tourbillon-carbon": [
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85",
  ],
  "chronographe-astrale-1968": [
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
  ],
  "classique-eternelle-gold": [
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  ],
  "vanguard-skeleton-pure": [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85",
  ],
  "nautilus-abyss-300m-diver": [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
  ],
};

export function getTimepieceImages(slug: string, rawImages?: any[]): { id: number; src: string; alt: string; name?: string; thumbnail?: string }[] {
  if (rawImages && rawImages.length > 0 && rawImages[0]?.src) {
    return rawImages.map((img: any, i: number) => ({
      id: img.id || i,
      src: img.src,
      thumbnail: img.thumbnail || img.src,
      alt: img.alt || "NOIRÉ Timepiece",
      name: img.name,
    }));
  }
  const fallbackList = TIMEPIECE_FALLBACK_IMAGES[slug] || [DEFAULT_WATCH_IMAGE];
  return fallbackList.map((src, idx) => ({
    id: idx,
    src,
    thumbnail: src,
    alt: "NOIRÉ Timepiece",
  }));
}

/**
 * Normalizes a raw WooCommerce Store API product into the clean storefront Product model.
 * Dynamically parses attributes for watch specifications, formats prices, and ensures image integrity.
 */
export function normalizeStoreProduct(raw: StoreApiProduct | any): Product {
  const minorUnit = raw.prices?.currency_minor_unit ?? 2;
  const numericPrice = parseStorePrice(raw.prices?.price || raw.price, minorUnit);
  const numericRegularPrice = parseStorePrice(raw.prices?.regular_price || raw.regular_price, minorUnit);
  const numericSalePrice = raw.prices?.sale_price
    ? parseStorePrice(raw.prices.sale_price, minorUnit)
    : undefined;

  // Dynamically extract watch specifications from WooCommerce attributes
  const dynamicSpecs = extractSpecsFromAttributes(raw.attributes);
  const images = getTimepieceImages(raw.slug, raw.images);


  const categories: ProductCategory[] = (raw.categories || []).map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description || "",
    count: cat.count,
    link: cat.link,
  }));

  // Clean HTML from short description if needed
  const cleanShortDesc = raw.short_description
    ? raw.short_description.replace(/<[^>]*>?/gm, "").trim()
    : "";

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    type: raw.type || "simple",
    permalink: raw.permalink,
    sku: raw.sku || `NR-${raw.id}`,
    price: numericPrice.toString(),
    regular_price: numericRegularPrice.toString(),
    sale_price: numericSalePrice ? numericSalePrice.toString() : undefined,
    on_sale: Boolean(raw.on_sale),
    prices: raw.prices,
    description: raw.description ? raw.description.replace(/<[^>]*>?/gm, "").trim() : "",
    short_description: cleanShortDesc,
    images,
    categories,
    attributes: raw.attributes || [],
    variations: raw.variations || [],
    is_in_stock: raw.is_in_stock ?? true,
    stock_quantity: raw.low_stock_remaining ?? null,
    average_rating: raw.average_rating || "5.0",
    review_count: raw.review_count || 0,
    featured: Boolean(raw.featured),
    specs: dynamicSpecs,
    editionBadge: raw.on_sale ? "Special Edition" : undefined,
  };
}

/**
 * Fetch products from WooCommerce Store API (with Mock Mode fallback)
 */
export async function getProducts(params: GetProductsParams = {}): Promise<{
  products: Product[];
  total: number;
  totalPages: number;
}> {
  if (IS_MOCK_MODE) {
    let result = [...MOCK_PRODUCTS];

    if (params.category) {
      result = result.filter((p) =>
        p.categories.some(
          (c) => c.slug === params.category || c.id.toString() === params.category
        )
      );
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.specs.movement.toLowerCase().includes(q) ||
          p.specs.caseMaterial.toLowerCase().includes(q)
      );
    }

    if (params.featured) {
      result = result.filter((p) => p.featured);
    }

    if (params.order_by === "price") {
      result.sort((a, b) =>
        params.order === "asc"
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (params.order_by === "title") {
      result.sort((a, b) =>
        params.order === "desc"
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      );
    }

    return {
      products: result,
      total: result.length,
      totalPages: 1,
    };
  }

  // Real WooCommerce Store API Call
  const { data } = await storeApiFetch<StoreApiProduct[]>("products", {
    params: {
      category: params.category,
      search: params.search,
      orderby: params.order_by,
      order: params.order,
      per_page: params.per_page || 12,
      page: params.page || 1,
      featured: params.featured ? true : undefined,
    },
    next: { revalidate: 60 },
  });

  if (!data || !Array.isArray(data) || data.length === 0) {
    return { products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length, totalPages: 1 };
  }

  const normalized = data.map(normalizeStoreProduct);
  return {
    products: normalized,
    total: normalized.length,
    totalPages: 1,
  };
}

/**
 * Fetch a single product by slug from WooCommerce Store API
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (IS_MOCK_MODE) {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return product || null;
  }

  const { data } = await storeApiFetch<StoreApiProduct[]>("products", {
    params: { slug },
    next: { revalidate: 60 },
  });

  if (data && Array.isArray(data) && data.length > 0) {
    return normalizeStoreProduct(data[0]);
  }

  // Fallback to mock product if store returns nothing
  return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
}

/**
 * Fetch featured timepieces for the homepage
 */
export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  if (IS_MOCK_MODE) {
    return MOCK_PRODUCTS.filter((p) => p.featured).slice(0, limit);
  }

  const { data } = await storeApiFetch<StoreApiProduct[]>("products", {
    params: { featured: true, per_page: limit },
    next: { revalidate: 60 },
  });

  if (data && Array.isArray(data) && data.length > 0) {
    return data.map(normalizeStoreProduct);
  }

  return MOCK_PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

/**
 * Fetch best-selling timepieces for the rail
 */
export async function getBestSellers(limit: number = 6): Promise<Product[]> {
  if (IS_MOCK_MODE) {
    return MOCK_PRODUCTS.slice(0, limit);
  }

  const { data } = await storeApiFetch<StoreApiProduct[]>("products", {
    params: { per_page: limit, orderby: "popularity" },
    next: { revalidate: 60 },
  });

  if (data && Array.isArray(data) && data.length > 0) {
    return data.map(normalizeStoreProduct);
  }

  return MOCK_PRODUCTS.slice(0, limit);
}
