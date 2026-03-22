import { Checkout, Order } from "../types";

// Mock checkout storage (in-memory)
const checkouts: Map<string, Checkout> = new Map();
const orders: Map<string, Order> = new Map();

export function createMockCheckout(
  email: string,
  lines: { variantId: string; quantity: number }[]
): Checkout {
  const id = `checkout-${Date.now()}`;
  const checkout: Checkout = {
    id,
    email,
    lines: lines.map((line, index) => ({
      id: `line-${index}`,
      variant: {
        id: line.variantId,
        name: "Variant",
        sku: `SKU-${line.variantId}`,
      },
      quantity: line.quantity,
      unitPrice: {
        amount: 29.99,
        currency: "USD",
      },
      totalPrice: {
        amount: 29.99 * line.quantity,
        currency: "USD",
      },
    })),
    shippingAddress: null,
    billingAddress: null,
    shippingMethod: null,
    subtotalPrice: {
      amount: 59.98,
      currency: "USD",
    },
    shippingPrice: {
      amount: 5.0,
      currency: "USD",
    },
    totalPrice: {
      amount: 64.98,
      currency: "USD",
    },
    isShippingRequired: true,
    availableShippingMethods: [
      {
        id: "shipping-001",
        name: "Standard Shipping",
        price: {
          amount: 5.0,
          currency: "USD",
        },
      },
      {
        id: "shipping-002",
        name: "Express Shipping",
        price: {
          amount: 15.0,
          currency: "USD",
        },
      },
    ],
  };

  checkouts.set(id, checkout);
  return checkout;
}

export function getCheckoutById(id: string): Checkout | undefined {
  return checkouts.get(id);
}

export function updateCheckoutShippingAddress(
  checkoutId: string,
  address: Checkout["shippingAddress"]
): Checkout | undefined {
  const checkout = checkouts.get(checkoutId);
  if (!checkout) return undefined;

  checkout.shippingAddress = address;
  checkouts.set(checkoutId, checkout);
  return checkout;
}

export function updateCheckoutBillingAddress(
  checkoutId: string,
  address: Checkout["billingAddress"]
): Checkout | undefined {
  const checkout = checkouts.get(checkoutId);
  if (!checkout) return undefined;

  checkout.billingAddress = address;
  checkouts.set(checkoutId, checkout);
  return checkout;
}

export function setShippingMethod(
  checkoutId: string,
  shippingMethodId: string
): Checkout | undefined {
  const checkout = checkouts.get(checkoutId);
  if (!checkout) return undefined;

  const method = checkout.availableShippingMethods.find(
    (m) => m.id === shippingMethodId
  );
  if (!method) return undefined;

  checkout.shippingMethod = method;
  checkout.shippingPrice = method.price;
  checkout.totalPrice.amount =
    checkout.subtotalPrice.amount + method.price.amount;
  checkouts.set(checkoutId, checkout);
  return checkout;
}

export function completeCheckout(
  checkoutId: string,
  paymentMethod: string
): Order | undefined {
  const checkout = checkouts.get(checkoutId);
  if (!checkout) return undefined;

  const orderId = `order-${Date.now()}`;
  const order: Order = {
    id: orderId,
    number: `ORD-${Math.floor(Math.random() * 100000)}`,
    status: "UNFULFILLED",
    createdAt: new Date().toISOString(),
    userEmail: checkout.email,
    shippingAddress: checkout.shippingAddress,
    billingAddress: checkout.billingAddress,
    lines: checkout.lines,
    subtotal: checkout.subtotalPrice,
    shippingPrice: checkout.shippingPrice,
    total: checkout.totalPrice,
    paymentStatus: "FULLY_CHARGED",
    paymentMethod,
  };

  orders.set(orderId, order);
  checkouts.delete(checkoutId);
  return order;
}

export function getOrderById(id: string): Order | undefined {
  return orders.get(id);
}

export function getOrdersByEmail(email: string): Order[] {
  return Array.from(orders.values()).filter((o) => o.userEmail === email);
}
