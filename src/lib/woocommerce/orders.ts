import { Order } from "@/types/woocommerce";
import { serverRestApiFetch, IS_MOCK_MODE } from "./client";

/**
 * Fetch a single order by ID using the secure server-side WooCommerce REST API.
 * NEVER exposed or invoked directly from browser/client components.
 */
export async function getOrderById(orderId: number | string): Promise<Order | null> {
  if (IS_MOCK_MODE) {
    return {
      id: Number(orderId) || 1001,
      status: "processing",
      currency: "USD",
      total: "4200.00",
      date_created: new Date().toISOString(),
      line_items: [
        {
          id: 1,
          product_id: "noire-s01-monolith",
          name: "NOIRÉ S-01 Monolith",
          quantity: 1,
          total: "4200.00",
        },
      ],
      billing: {
        first_name: "Marcus",
        last_name: "Vance",
        address_1: "Rue du Rhône 42",
        city: "Geneva",
        state: "GE",
        postcode: "1204",
        country: "CH",
        email: "m.vance@example.com",
      },
      shipping: {
        first_name: "Marcus",
        last_name: "Vance",
        address_1: "Rue du Rhône 42",
        city: "Geneva",
        state: "GE",
        postcode: "1204",
        country: "CH",
      },
      payment_method_title: "Direct Bank Wire / Card Settlement",
    };
  }

  const { data, error } = await serverRestApiFetch<any>(`orders/${orderId}`);
  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    status: data.status,
    currency: data.currency,
    total: data.total,
    date_created: data.date_created,
    line_items: (data.line_items || []).map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      name: item.name,
      quantity: item.quantity,
      total: item.total,
      image: item.image ? { id: item.image.id, src: item.image.src, alt: item.name } : undefined,
    })),
    billing: data.billing,
    shipping: data.shipping,
    payment_method_title: data.payment_method_title || "Encrypted Card Settlement",
  };
}

/**
 * Fetch orders for a registered customer using secure server-side credentials
 */
export async function getCustomerOrders(customerId: number): Promise<Order[]> {
  if (IS_MOCK_MODE) {
    const single = await getOrderById(1001);
    return single ? [single] : [];
  }

  const { data, error } = await serverRestApiFetch<any[]>("orders", {
    params: { customer: customerId, per_page: 20 },
  });

  if (error || !data || !Array.isArray(data)) {
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    status: d.status,
    currency: d.currency,
    total: d.total,
    date_created: d.date_created,
    line_items: (d.line_items || []).map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      name: item.name,
      quantity: item.quantity,
      total: item.total,
    })),
    billing: d.billing,
    shipping: d.shipping,
    payment_method_title: d.payment_method_title || "Card Settlement",
  }));
}
