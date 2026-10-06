import { NextRequest, NextResponse } from "next/server";
import { serverRestApiFetch } from "@/lib/woocommerce/client";

export const dynamic = "force-dynamic";

/**
 * Secure Server Route Handler for fetching individual order details.
 * NEVER exposes WooCommerce Consumer Key or Secret to the client.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, "");

    if (!cleanId) {
      return NextResponse.json({ error: "Invalid order reference" }, { status: 400 });
    }

    const { data: order, error } = await serverRestApiFetch<any>(`orders/${cleanId}`);

    if (error || !order) {
      return NextResponse.json(
        { error: error || "Order archive record not found" },
        { status: 404 }
      );
    }

    // Return sanitized customer-facing order representation
    const sanitizedOrder = {
      id: order.id,
      number: order.number || String(order.id),
      status: order.status,
      date_created: order.date_created,
      total: order.total,
      currency: order.currency,
      payment_method: order.payment_method,
      payment_method_title: order.payment_method_title,
      customer_note: order.customer_note || "",
      discount_total: order.discount_total || "0.00",
      coupon_lines: (order.coupon_lines || []).map((cl: any) => ({
        code: cl.code,
        discount: cl.discount,
      })),
      billing: {
        first_name: order.billing?.first_name || "",
        last_name: order.billing?.last_name || "",
        city: order.billing?.city || "",
        state: order.billing?.state || "",
        country: order.billing?.country || "",
        email: order.billing?.email || "",
      },
      shipping: {
        first_name: order.shipping?.first_name || "",
        last_name: order.shipping?.last_name || "",
        address_1: order.shipping?.address_1 || "",
        city: order.shipping?.city || "",
        state: order.shipping?.state || "",
        postcode: order.shipping?.postcode || "",
        country: order.shipping?.country || "",
      },
      line_items: (order.line_items || []).map((li: any) => ({
        id: li.id,
        name: li.name,
        product_id: li.product_id,
        quantity: li.quantity,
        subtotal: li.subtotal,
        total: li.total,
        sku: li.sku || "",
        image: li.image?.src || null,
      })),
    };

    return NextResponse.json(sanitizedOrder);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal order lookup failure";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
