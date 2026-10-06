/**
 * WooCommerce Store API & REST API Type Definitions
 * Designed for Headless Next.js e-commerce storefronts.
 */

export interface ProductImage {
  id: number;
  src: string;
  thumbnail?: string;
  srcset?: string;
  sizes?: string;
  name?: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent?: number;
  count?: number;
  image?: ProductImage | null;
  link?: string;
}

export interface ProductAttributeTerm {
  id: number;
  name: string;
  slug: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  taxonomy?: string;
  has_variations?: boolean;
  terms: ProductAttributeTerm[];
  // REST API compatibility (when options are plain strings)
  options?: string[];
}

export interface ProductVariation {
  id: number;
  attributes: { name: string; value: string }[];
  price: string;
  regular_price?: string;
  sale_price?: string;
  on_sale?: boolean;
  is_in_stock: boolean;
  image?: ProductImage;
}

export interface ProductPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range?: { min_amount: string; max_amount: string } | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit?: number;
  currency_decimal_separator?: string;
  currency_thousand_separator?: string;
  currency_prefix?: string;
  currency_suffix?: string;
  raw_prices?: {
    precision: number;
    price: number;
    regular_price: number;
    sale_price: number;
  };
}

/**
 * Normalized Horological Specifications
 * Extracted dynamically from WooCommerce product attributes.
 */
export interface HorologicalSpecs {
  movement: string;
  caliber: string;
  powerReserve: string;
  caseDiameter: string;
  caseThickness: string;
  caseMaterial: string;
  dialColor: string;
  crystal: string;
  waterResistance: string;
  strapMaterial: string;
  strapColor?: string;
  clasp?: string;
  lugWidth: string;
  warranty: string;
  // Dynamic additional attributes
  [key: string]: string | undefined;
}

/**
 * Core Headless Product Model
 */
export interface Product {
  id: number | string;
  name: string;
  slug: string;
  type?: "simple" | "variable" | "grouped" | "external";
  permalink?: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale?: boolean;
  prices?: ProductPrices;
  price: string;
  regular_price: string;
  sale_price?: string;
  price_html?: string;
  average_rating: string;
  review_count: number;
  images: ProductImage[];
  categories: ProductCategory[];
  tags?: { id: number; name: string; slug: string }[];
  attributes?: ProductAttribute[];
  variations?: ProductVariation[];
  has_options?: boolean;
  is_purchasable?: boolean;
  is_in_stock: boolean;
  is_on_backorder?: boolean;
  low_stock_remaining?: number | null;
  stock_quantity?: number | null;
  sold_individually?: boolean;
  featured?: boolean;
  specs: HorologicalSpecs;
  editionBadge?: string;
}

/**
 * WooCommerce Store API Raw Product response interface
 */
export interface StoreApiProduct {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: ProductPrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: ProductImage[];
  categories: ProductCategory[];
  tags: { id: number; name: string; slug: string; link?: string }[];
  attributes: ProductAttribute[];
  variations: { id: number; attributes: { name: string; value: string }[] }[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: number | null;
  sold_individually: boolean;
  add_to_cart: {
    text: string;
    description: string;
    url: string;
    minimum: number;
    maximum: number;
    multiple_of: number;
  };
}

export interface CartItem {
  key: string;
  id: number | string;
  quantity: number;
  name: string;
  slug: string;
  short_description?: string;
  sku?: string;
  image: ProductImage;
  price: number;
  price_formatted: string;
  line_total: number;
  line_total_formatted: string;
  variation?: { attribute: string; value: string }[];
  product: Product;
}

export interface CartTotals {
  subtotal: number;
  subtotal_formatted: string;
  shipping: number;
  shipping_formatted: string;
  discount: number;
  discount_formatted: string;
  total: number;
  total_formatted: string;
  currency_code: string;
  currency_symbol: string;
}

export interface Cart {
  items: CartItem[];
  item_count: number;
  totals: CartTotals;
  coupons: string[];
}

export interface Address {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

export interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  billing_address?: Address;
  shipping_address?: Address;
}

export interface ShippingRateOption {
  rate_id: string;
  name: string;
  description: string;
  delivery_time?: string;
  price: string;
  taxes?: string;
  instance_id?: number;
  method_id?: string;
  selected: boolean;
  currency_code?: string;
  currency_symbol?: string;
}

export interface ShippingPackage {
  package_id: number;
  name: string;
  destination: object;
  shipping_rates: ShippingRateOption[];
}

export interface ShippingRate {
  rate_id: string;
  name: string;
  description: string;
  cost: number;
  cost_formatted: string;
  currency_code: string;
  selected: boolean;
}

export interface OrderItem {
  id: number;
  product_id: number | string;
  name: string;
  quantity: number;
  total: string;
  image?: ProductImage;
}

export interface Order {
  id: number;
  status: string;
  currency: string;
  total: string;
  date_created: string;
  line_items: OrderItem[];
  billing: Address;
  shipping: Address;
  payment_method_title: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  coverImage: string;
  content: string[];
}
