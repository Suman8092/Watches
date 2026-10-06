/**
 * WooCommerce Store API & REST API Client
 *
 * Rules:
 * - Public Store API endpoints: /wp-json/wc/store/v1/... (Products, Categories, Cart, Checkout)
 * - Administrative REST API endpoints: /wp-json/wc/v3/... (Server-Side ONLY)
 * - Private API secrets (WC_CONSUMER_KEY, WC_CONSUMER_SECRET) must NEVER be exposed in client code.
 * - When NEXT_PUBLIC_WC_STORE_URL is unset, automatically operates in high-fidelity mock mode.
 */

export const STORE_URL = (
  process.env.NEXT_PUBLIC_WC_STORE_URL ||
  process.env.WC_STORE_URL ||
  "https://backend.sntoriginals.com"
).replace(/\/$/, "");
export const IS_MOCK_MODE = false;

const CART_TOKEN_KEY = "noire_wc_cart_token";
const NONCE_KEY = "noire_wc_nonce";

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  cartToken?: string;
  nonce?: string;
}

export class WooCommerceApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "WooCommerceApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Parses WooCommerce Store API price values safely.
 * Store API often returns prices in minor units (e.g. 420000 for $4,200.00 with minor_unit = 2).
 */
export function parseStorePrice(
  rawPrice: string | number | undefined,
  minorUnit: number = 2
): number {
  if (rawPrice === undefined || rawPrice === null || rawPrice === "") {
    return 0;
  }
  const numeric = typeof rawPrice === "number" ? rawPrice : parseFloat(rawPrice);
  if (isNaN(numeric)) return 0;

  // If the numeric value is very large and looks like minor units (e.g. > 10000 with no decimal point in string),
  // check if string was integer
  const str = String(rawPrice);
  if (!str.includes(".") && numeric > 100 && minorUnit > 0) {
    return numeric / Math.pow(10, minorUnit);
  }
  return numeric;
}

export function getClientCartToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem(CART_TOKEN_KEY) || undefined;
}

export function setClientCartToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_TOKEN_KEY, token);
}

export function getClientNonce(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem(NONCE_KEY) || undefined;
}

export function setClientNonce(nonce: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(NONCE_KEY, nonce);
}

export function buildStoreApiUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
  forcePlainRoute?: boolean
): URL {
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const useRestRoute = forcePlainRoute ?? (process.env.NEXT_PUBLIC_WC_USE_REST_ROUTE !== "false");

  let url: URL;
  if (useRestRoute) {
    url = new URL(`${STORE_URL}/`);
    url.searchParams.set("rest_route", `/wc/store/v1/${cleanEndpoint}`);
  } else {
    url = new URL(`${STORE_URL}/wp-json/wc/store/v1/${cleanEndpoint}`);
  }

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    });
  }

  return url;
}

export function buildServerRestApiUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
  forcePlainRoute?: boolean
): URL {
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const useRestRoute = forcePlainRoute ?? (process.env.NEXT_PUBLIC_WC_USE_REST_ROUTE !== "false");

  let url: URL;
  if (useRestRoute) {
    url = new URL(`${STORE_URL}/`);
    url.searchParams.set("rest_route", `/wc/v3/${cleanEndpoint}`);
  } else {
    url = new URL(`${STORE_URL}/wp-json/wc/v3/${cleanEndpoint}`);
  }

  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    });
  }

  return url;
}

/**
 * Public client for WooCommerce Store API
 * Used for public product catalog, cart session management, and customer checkout.
 */
export async function storeApiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<{
  data: T | null;
  error: string | null;
  cartToken?: string;
  nonce?: string;
}> {
  if (IS_MOCK_MODE) {
    return { data: null, error: "Mock mode active" };
  }

  const { params, cartToken, nonce, headers, ...restOptions } = options;
  const isClient = typeof window !== "undefined";

  let requestUrl: string;
  if (isClient) {
    const cleanEndpoint = endpoint.replace(/^\//, "");
    let localUrl = `/api/wc/store/${cleanEndpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
      const q = searchParams.toString();
      if (q) localUrl += `?${q}`;
    }
    requestUrl = localUrl;
  } else {
    requestUrl = buildStoreApiUrl(endpoint, params).toString();
  }

  const tokenToUse = cartToken || getClientCartToken();
  const nonceToUse = nonce || getClientNonce();

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(headers as Record<string, string>),
  };

  // WooCommerce Store API uses Cart-Token and Nonce header for headless session persistence
  if (tokenToUse) {
    requestHeaders["Cart-Token"] = tokenToUse;
  }
  if (nonceToUse) {
    requestHeaders["Nonce"] = nonceToUse;
  }

  try {
    let response = await fetch(requestUrl, {
      headers: requestHeaders,
      ...restOptions,
    });

    // If initial server-side attempt returns 404 with HTML (e.g. server lacks wp-json rewrite rules), fallback to ?rest_route=
    if (!isClient && response.status === 404 && !requestUrl.includes("rest_route")) {
      const fallbackUrl = buildStoreApiUrl(endpoint, params, true);
      response = await fetch(fallbackUrl.toString(), {
        headers: requestHeaders,
        ...restOptions,
      });
    }

    const responseCartToken = response.headers.get("Cart-Token") || undefined;
    const responseNonce = response.headers.get("Nonce") || undefined;

    if (responseCartToken) {
      setClientCartToken(responseCartToken);
    }
    if (responseNonce) {
      setClientNonce(responseNonce);
    }

    if (!response.ok) {
      const errorJson = await response.json().catch(() => null);
      const message = errorJson?.message || `WooCommerce API error: ${response.statusText}`;
      return {
        data: null,
        error: message,
        cartToken: responseCartToken,
        nonce: responseNonce,
      };
    }

    const json = (await response.json()) as T;
    return {
      data: json,
      error: null,
      cartToken: responseCartToken,
      nonce: responseNonce,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Network error contacting WooCommerce Store API";
    return {
      data: null,
      error: errorMsg,
    };
  }
}

/**
 * Protected server-side client for WooCommerce REST API (v3)
 * Intended for secure administrative tasks (order status updates, server-side webhooks)
 * NEVER called from client components.
 */
export async function serverRestApiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null }> {
  // Ensure this is only invoked server-side
  if (typeof window !== "undefined") {
    throw new Error("serverRestApiFetch can only be invoked within server-side execution contexts.");
  }

  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  if (!key || !secret || !STORE_URL) {
    return { data: null, error: "WooCommerce server credentials not configured" };
  }

  const { params, headers, ...restOptions } = options;
  const url = buildServerRestApiUrl(endpoint, params);
  const basicAuth = Buffer.from(`${key}:${secret}`).toString("base64");

  try {
    let response = await fetch(url.toString(), {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(headers as Record<string, string>),
      },
      ...restOptions,
    });

    // If initial attempt returns 404 with HTML (e.g. server lacks wp-json rewrite rules), fallback to ?rest_route=
    if (response.status === 404 && !url.searchParams.has("rest_route")) {
      const fallbackUrl = buildServerRestApiUrl(endpoint, params, true);
      response = await fetch(fallbackUrl.toString(), {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(headers as Record<string, string>),
        },
        ...restOptions,
      });
    }

    if (!response.ok) {
      const errorJson = await response.json().catch(() => null);
      return {
        data: null,
        error: errorJson?.message || `WooCommerce REST API error: ${response.statusText}`,
      };
    }

    const json = (await response.json()) as T;
    return { data: json, error: null };
  } catch (err: unknown) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Network error contacting WooCommerce REST API",
    };
  }
}
