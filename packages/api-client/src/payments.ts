// Payment API functions
import { apiClient } from "./client";
import { Payment, ApiResponse, CreatePaymentInput } from "./types";

/**
 * Create a payment for checkout
 * @param input - Payment creation data
 * @returns Payment details with redirect URL
 */
export async function createPayment(input: CreatePaymentInput): Promise<Payment> {
  const response = await apiClient.post<ApiResponse<Payment>>(
    "/payments",
    input
  );
  return response.data;
}

/**
 * Process PayDunya payment (prepared for future integration)
 * @param checkoutId - Checkout ID
 * @param amount - Payment amount
 * @param currency - Currency code
 * @returns Payment details
 */
export async function createPayDunyaPayment(
  checkoutId: string,
  amount: number,
  currency: string = "USD"
): Promise<Payment> {
  return createPayment({
    checkoutId,
    paymentMethod: "paydunya",
    amount,
    currency,
  });
}

/**
 * Process Stripe payment (prepared for future integration)
 * @param checkoutId - Checkout ID
 * @param amount - Payment amount
 * @param currency - Currency code
 * @returns Payment details
 */
export async function createStripePayment(
  checkoutId: string,
  amount: number,
  currency: string = "USD"
): Promise<Payment> {
  return createPayment({
    checkoutId,
    paymentMethod: "stripe",
    amount,
    currency,
  });
}
