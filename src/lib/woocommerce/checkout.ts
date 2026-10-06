import { Address, ShippingRate } from "@/types/woocommerce";
import { storeApiFetch, IS_MOCK_MODE, parseStorePrice } from "./client";

export interface CheckoutPayload {
  billing_address: Address;
  shipping_address: Address;
  customer_note?: string;
  payment_method: string;
  payment_data?: Array<{ key: string; value: string }>;
}

export interface CheckoutResult {
  order_id: number | string;
  status: string;
  order_key?: string;
  customer_id?: number;
  payment_result?: {
    payment_status: "success" | "pending" | "failure";
    payment_details?: Array<{ key: string; value: string }>;
    redirect_url?: string;
  };
  error?: string | null;
}

/**
 * Submit checkout through WooCommerce Store API
 * Endpoint: /wp-json/wc/store/v1/checkout
 * Payment gateway specific secrets remain server-side.
 */
export async function submitCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
  if (IS_MOCK_MODE) {
    // Simulate realistic store checkout
    const mockOrderId = `NR-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      order_id: mockOrderId,
      status: "processing",
      order_key: `wc_order_${Date.now()}`,
      payment_result: {
        payment_status: "success",
      },
      error: null,
    };
  }

  const { data, error } = await storeApiFetch<any>("checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (error || !data) {
    return {
      order_id: 0,
      status: "failed",
      error: error || "Unable to complete checkout with WooCommerce Store API",
    };
  }

  return {
    order_id: data.order_id || data.id,
    status: data.status || "processing",
    order_key: data.order_key,
    customer_id: data.customer_id,
    payment_result: data.payment_result || { payment_status: "success" },
    error: null,
  };
}

/**
 * Fetch available shipping rates for current cart destination
 */
export async function getShippingRates(): Promise<ShippingRate[]> {
  if (IS_MOCK_MODE) {
    return [
      {
        rate_id: "free_armored_shipping",
        name: "Complimentary Armored Courier",
        description: "Direct white-glove transport with signature receipt",
        cost: 0,
        cost_formatted: "Complimentary",
        currency_code: "USD",
        selected: true,
      },
      {
        rate_id: "express_air_courier",
        name: "Expedited Priority Flight Transport",
        description: "Next business day priority courier dispatch",
        cost: 150,
        cost_formatted: "$150.00",
        currency_code: "USD",
        selected: false,
      },
    ];
  }

  const { data } = await storeApiFetch<any>("cart");
  if (!data || !data.shipping_rates || data.shipping_rates.length === 0) {
    return [];
  }

  const rates: ShippingRate[] = [];
  data.shipping_rates.forEach((pkg: any) => {
    (pkg.shipping_rates || []).forEach((r: any) => {
      const minorUnit = r.currency_minor_unit ?? 2;
      const cost = parseStorePrice(r.price, minorUnit);
      rates.push({
        rate_id: r.rate_id,
        name: r.name,
        description: r.description || "",
        cost,
        cost_formatted: cost === 0 ? "Complimentary" : `$${cost.toFixed(2)}`,
        currency_code: r.currency_code || "USD",
        selected: Boolean(r.selected),
      });
    });
  });

  return rates;
}

/**
 * Select a specific shipping method in the Store API cart
 */
export async function selectShippingRate(rateId: string): Promise<boolean> {
  if (IS_MOCK_MODE) {
    return true;
  }

  const { data, error } = await storeApiFetch<any>("cart/select-shipping-rate", {
    method: "POST",
    body: JSON.stringify({ rate_id: rateId }),
  });

  return !error && Boolean(data);
}
