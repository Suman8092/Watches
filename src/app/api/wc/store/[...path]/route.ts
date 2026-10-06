import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STORE_URL = (
  process.env.NEXT_PUBLIC_WC_STORE_URL ||
  process.env.WC_STORE_URL ||
  "https://backend.sntoriginals.com"
).replace(/\/$/, "");

/**
 * Universal Server-Side Proxy for WooCommerce Store API
 * Solves all browser CORS restrictions across localhost, Vercel preview domains,
 * and production storefront domains.
 */
async function proxyRequest(request: NextRequest, pathParams: { path: string[] }) {
  try {
    const subPath = (pathParams.path || []).join("/");
    const searchParams = request.nextUrl.searchParams.toString();

    // Construct the backend URL using query routing (?rest_route=) for LiteSpeed compatibility
    let backendUrl = `${STORE_URL}/?rest_route=/wc/store/v1/${subPath}`;
    if (searchParams) {
      backendUrl += `&${searchParams}`;
    }

    const headers: Record<string, string> = {
      "Content-Type": request.headers.get("content-type") || "application/json",
      Accept: "application/json",
    };

    const cartToken = request.headers.get("cart-token");
    const nonce = request.headers.get("nonce");

    if (cartToken) headers["Cart-Token"] = cartToken;
    if (nonce) headers["Nonce"] = nonce;

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
      cache: "no-store",
    };

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      const bodyText = await request.text();
      if (bodyText) {
        fetchOptions.body = bodyText;
      }
    }

    const response = await fetch(backendUrl, fetchOptions);
    const responseData = await response.text();

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", response.headers.get("content-type") || "application/json");

    const returnCartToken = response.headers.get("cart-token");
    const returnNonce = response.headers.get("nonce");

    if (returnCartToken) responseHeaders.set("Cart-Token", returnCartToken);
    if (returnNonce) responseHeaders.set("Nonce", returnNonce);

    // Expose headers for client reading
    responseHeaders.set(
      "Access-Control-Expose-Headers",
      "Cart-Token, Nonce, Content-Type"
    );

    return new NextResponse(responseData, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Proxy communication failure";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const p = await params;
  return proxyRequest(request, p);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const p = await params;
  return proxyRequest(request, p);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const p = await params;
  return proxyRequest(request, p);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const p = await params;
  return proxyRequest(request, p);
}
