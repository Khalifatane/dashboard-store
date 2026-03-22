// Checkout API functions
import { apiClient } from "./client";
import {
  Checkout,
  Order,
  ApiResponse,
  CreateCheckoutInput,
  UpdateAddressInput,
  SetShippingMethodInput,
  CompleteCheckoutInput,
} from "./types";

/**
 * Create a new checkout
 * @param input - Checkout creation data
 * @returns Created checkout
 */
export async function createCheckout(input: CreateCheckoutInput): Promise<Checkout> {
  const response = await apiClient.post<ApiResponse<Checkout>>(
    "/checkout",
    input
  );
  return response.data;
}

/**
 * Get checkout by ID
 * @param checkoutId - Checkout ID
 * @returns Checkout details
 */
export async function getCheckout(checkoutId: string): Promise<Checkout> {
  const response = await apiClient.get<ApiResponse<Checkout>>(
    `/checkout/${checkoutId}`
  );
  return response.data;
}

/**
 * Update checkout shipping address
 * @param checkoutId - Checkout ID
 * @param address - Shipping address
 * @returns Updated checkout
 */
export async function updateShippingAddress(
  checkoutId: string,
  address: UpdateAddressInput
): Promise<Checkout> {
  const response = await apiClient.patch<ApiResponse<Checkout>>(
    `/checkout/${checkoutId}/shipping-address`,
    address
  );
  return response.data;
}

/**
 * Update checkout billing address
 * @param checkoutId - Checkout ID
 * @param address - Billing address
 * @returns Updated checkout
 */
export async function updateBillingAddress(
  checkoutId: string,
  address: UpdateAddressInput
): Promise<Checkout> {
  const response = await apiClient.patch<ApiResponse<Checkout>>(
    `/checkout/${checkoutId}/billing-address`,
    address
  );
  return response.data;
}

/**
 * Set shipping method for checkout
 * @param checkoutId - Checkout ID
 * @param input - Shipping method selection
 * @returns Updated checkout
 */
export async function setShippingMethod(
  checkoutId: string,
  input: SetShippingMethodInput
): Promise<Checkout> {
  const response = await apiClient.post<ApiResponse<Checkout>>(
    `/checkout/${checkoutId}/shipping-method`,
    input
  );
  return response.data;
}

/**
 * Complete checkout and create order
 * @param checkoutId - Checkout ID
 * @param input - Completion data including payment method
 * @returns Created order
 */
export async function completeCheckout(
  checkoutId: string,
  input: CompleteCheckoutInput
): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>(
    `/checkout/${checkoutId}/complete`,
    input
  );
  return response.data;
}

/**
 * Get order by ID
 * @param orderId - Order ID
 * @returns Order details
 */
export async function getOrder(orderId: string): Promise<Order> {
  const response = await apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
  return response.data;
}
