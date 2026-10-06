import { Cart, CartItem, Product } from "@/types/woocommerce";
import { storeApiFetch, IS_MOCK_MODE, parseStorePrice, getClientCartToken, setClientCartToken } from "./client";
import { MOCK_PRODUCTS } from "./mock-data";
import { getTimepieceImages } from "./products";

const CART_DATA_STORAGE_KEY = "noire_cart_data";


export function formatCurrency(amount: number, currencyCode: string = "INR"): string {
  if (currencyCode === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createEmptyCart(): Cart {
  return {
    items: [],
    item_count: 0,
    coupons: [],
    totals: {
      subtotal: 0,
      subtotal_formatted: "₹0",
      shipping: 0,
      shipping_formatted: "Complimentary",
      discount: 0,
      discount_formatted: "₹0",
      total: 0,
      total_formatted: "₹0",
      currency_code: "INR",
      currency_symbol: "₹",
    },
  };
}

export function calculateCartTotals(items: CartItem[], discount: number = 0, currencyCode: string = "INR"): Cart["totals"] {
  const subtotal = items.reduce((sum, item) => sum + item.line_total, 0);
  const shipping = 0; // Complimentary armored shipping on all timepieces
  const total = Math.max(0, subtotal - discount + shipping);

  return {
    subtotal,
    subtotal_formatted: formatCurrency(subtotal, currencyCode),
    shipping,
    shipping_formatted: "Complimentary",
    discount,
    discount_formatted: discount > 0 ? `-${formatCurrency(discount, currencyCode)}` : "₹0",
    total,
    total_formatted: formatCurrency(total, currencyCode),
    currency_code: currencyCode,
    currency_symbol: currencyCode === "INR" ? "₹" : "$",
  };
}

/**
 * Normalizes a raw Store API Cart response into the storefront Cart interface
 */
export function normalizeStoreCart(raw: any): Cart {
  if (!raw || !raw.items) return createEmptyCart();

  const minorUnit = raw.totals?.currency_minor_unit ?? 2;
  const currencyCode = raw.totals?.currency_code || "INR";
  const items: CartItem[] = raw.items.map((it: any) => {
    const unitPrice = parseStorePrice(it.prices?.price || it.price, minorUnit);
    const lineTotal = parseStorePrice(it.totals?.line_total || it.line_total, minorUnit);
    const resolvedImages = getTimepieceImages(it.slug, it.images);
    const primaryImg = resolvedImages[0];


    return {
      key: it.key,
      id: it.id,
      quantity: it.quantity,
      name: it.name,
      slug: it.slug || `item-${it.id}`,
      short_description: it.short_description || "",
      sku: it.sku || `NR-${it.id}`,
      image: primaryImg,
      price: unitPrice,
      price_formatted: formatCurrency(unitPrice, currencyCode),
      line_total: lineTotal,
      line_total_formatted: formatCurrency(lineTotal, currencyCode),
      variation: it.variation || [],
      product: {
        id: it.id,
        name: it.name,
        slug: it.slug || `item-${it.id}`,
        sku: it.sku || "",
        price: unitPrice.toString(),
        regular_price: unitPrice.toString(),
        description: it.description || "",
        short_description: it.short_description || "",
        images: [primaryImg],
        categories: [],
        is_in_stock: true,
        average_rating: "5.0",
        review_count: 0,
        specs: {
          movement: "Caliber N-01",
          caliber: "In-House Automatic",
          powerReserve: "72 Hours",
          caseDiameter: "40 mm",
          caseThickness: "10.4 mm",
          caseMaterial: "Forged 316L Steel",
          dialColor: "Matte Obsidian",
          crystal: "Sapphire Crystal",
          waterResistance: "10 ATM",
          strapMaterial: "Full-Grain Leather",
          lugWidth: "20 mm",
          warranty: "5 Years",
        },
      },
    };
  });

  const subtotal = parseStorePrice(raw.totals?.total_items, minorUnit);
  const discount = parseStorePrice(raw.totals?.total_discount, minorUnit);
  const total = parseStorePrice(raw.totals?.total_price, minorUnit);

  return {
    items,
    item_count: raw.items_count ?? items.reduce((acc, i) => acc + i.quantity, 0),
    coupons: (raw.coupons || []).map((c: any) => c.code || c),
    totals: {
      subtotal,
      subtotal_formatted: formatCurrency(subtotal, currencyCode),
      shipping: 0,
      shipping_formatted: "Complimentary",
      discount,
      discount_formatted: discount > 0 ? `-${formatCurrency(discount, currencyCode)}` : "₹0",
      total,
      total_formatted: formatCurrency(total, currencyCode),
      currency_code: currencyCode,
      currency_symbol: raw.totals?.currency_symbol || (currencyCode === "INR" ? "₹" : "$"),
    },
  };
}

/**
 * Fetch current cart session from WooCommerce Store API
 */
export async function fetchCart(): Promise<Cart> {
  if (IS_MOCK_MODE) {
    if (typeof window === "undefined") return createEmptyCart();
    const stored = localStorage.getItem(CART_DATA_STORAGE_KEY);
    if (!stored) return createEmptyCart();
    try {
      return JSON.parse(stored) as Cart;
    } catch {
      return createEmptyCart();
    }
  }

  const { data } = await storeApiFetch<any>("cart");
  if (!data) return createEmptyCart();
  return normalizeStoreCart(data);
}

/**
 * Add a timepiece to the cart via WooCommerce Store API
 */
export async function addItem(product: Product, quantity: number = 1): Promise<Cart> {
  if (IS_MOCK_MODE) {
    const currentCart = await fetchCart();
    const existingIndex = currentCart.items.findIndex((item) => item.id === product.id);
    const unitPrice = parseFloat(product.price);

    let updatedItems = [...currentCart.items];

    if (existingIndex > -1) {
      const existing = updatedItems[existingIndex];
      const newQty = existing.quantity + quantity;
      const newLineTotal = newQty * unitPrice;
      updatedItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        line_total: newLineTotal,
        line_total_formatted: formatCurrency(newLineTotal),
      };
    } else {
      const lineTotal = quantity * unitPrice;
      const newItem: CartItem = {
        key: `cart-item-${product.id}-${Date.now()}`,
        id: product.id,
        name: product.name,
        slug: product.slug,
        short_description: product.short_description,
        sku: product.sku,
        quantity,
        price: unitPrice,
        price_formatted: formatCurrency(unitPrice),
        line_total: lineTotal,
        line_total_formatted: formatCurrency(lineTotal),
        image: product.images[0],
        product,
      };
      updatedItems.push(newItem);
    }

    const newTotals = calculateCartTotals(updatedItems);
    const updatedCart: Cart = {
      items: updatedItems,
      item_count: updatedItems.reduce((acc, it) => acc + it.quantity, 0),
      totals: newTotals,
      coupons: currentCart.coupons,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    return updatedCart;
  }

  // Real WooCommerce Store API Call
  const { data } = await storeApiFetch<any>("cart/add-item", {
    method: "POST",
    body: JSON.stringify({
      id: Number(product.id) || product.id,
      quantity,
    }),
  });

  if (data) {
    return normalizeStoreCart(data);
  }

  return await fetchCart();
}

/**
 * Remove an item from the cart via WooCommerce Store API
 */
export async function removeItem(itemKey: string): Promise<Cart> {
  if (IS_MOCK_MODE) {
    const currentCart = await fetchCart();
    const updatedItems = currentCart.items.filter((item) => item.key !== itemKey);
    const newTotals = calculateCartTotals(updatedItems);
    const updatedCart: Cart = {
      items: updatedItems,
      item_count: updatedItems.reduce((acc, it) => acc + it.quantity, 0),
      totals: newTotals,
      coupons: currentCart.coupons,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    return updatedCart;
  }

  const { data } = await storeApiFetch<any>("cart/remove-item", {
    method: "POST",
    body: JSON.stringify({ key: itemKey }),
  });

  if (data) {
    return normalizeStoreCart(data);
  }

  return await fetchCart();
}

/**
 * Update item quantity via WooCommerce Store API
 */
export async function updateItemQuantity(itemKey: string, quantity: number): Promise<Cart> {
  if (quantity <= 0) {
    return removeItem(itemKey);
  }

  if (IS_MOCK_MODE) {
    const currentCart = await fetchCart();
    const updatedItems = currentCart.items.map((item) => {
      if (item.key === itemKey) {
        const lineTotal = quantity * item.price;
        return {
          ...item,
          quantity,
          line_total: lineTotal,
          line_total_formatted: formatCurrency(lineTotal),
        };
      }
      return item;
    });

    const newTotals = calculateCartTotals(updatedItems);
    const updatedCart: Cart = {
      items: updatedItems,
      item_count: updatedItems.reduce((acc, it) => acc + it.quantity, 0),
      totals: newTotals,
      coupons: currentCart.coupons,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    return updatedCart;
  }

  const { data } = await storeApiFetch<any>("cart/update-item", {
    method: "POST",
    body: JSON.stringify({ key: itemKey, quantity }),
  });

  if (data) {
    return normalizeStoreCart(data);
  }

  return await fetchCart();
}

/**
 * Apply a coupon code via WooCommerce Store API
 */
export async function applyCoupon(code: string): Promise<{ cart: Cart; error: string | null }> {
  if (IS_MOCK_MODE) {
    const currentCart = await fetchCart();
    const discountAmount = Math.round(currentCart.totals.subtotal * 0.1); // 10% privilege discount
    const newTotals = calculateCartTotals(currentCart.items, discountAmount);
    const updatedCart: Cart = {
      ...currentCart,
      coupons: [...currentCart.coupons, code.toUpperCase()],
      totals: newTotals,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    return { cart: updatedCart, error: null };
  }

  const { data, error } = await storeApiFetch<any>("cart/apply-coupon", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  if (error || !data) {
    const fallbackCart = await fetchCart();
    return { cart: fallbackCart, error: error || "Invalid collector coupon" };
  }

  return { cart: normalizeStoreCart(data), error: null };
}

/**
 * Remove a coupon code via WooCommerce Store API
 */
export async function removeCoupon(code: string): Promise<Cart> {
  if (IS_MOCK_MODE) {
    const currentCart = await fetchCart();
    const newTotals = calculateCartTotals(currentCart.items, 0);
    const updatedCart: Cart = {
      ...currentCart,
      coupons: currentCart.coupons.filter((c) => c !== code.toUpperCase()),
      totals: newTotals,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_DATA_STORAGE_KEY, JSON.stringify(updatedCart));
    }
    return updatedCart;
  }

  const { data } = await storeApiFetch<any>("cart/remove-coupon", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  if (data) {
    return normalizeStoreCart(data);
  }

  return await fetchCart();
}
