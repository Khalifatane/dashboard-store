import { Router, Request, Response, NextFunction } from "express";
import { ApiResponse, Payment } from "../types";

const router = Router();

// POST /payments - Create payment
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { checkoutId, paymentMethod, amount, currency } = req.body;

      if (!checkoutId || !paymentMethod || !amount || !currency) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Missing required fields: checkoutId, paymentMethod, amount, currency",
        };
        res.status(400).json(response);
        return;
      }

      // Mock payment processing
      // In production, this would integrate with PayDunya, Stripe, etc.
      const payment: Payment = {
        id: `payment-${Date.now()}`,
        status: "PENDING",
        amount,
        currency,
        paymentMethod,
        redirectUrl: generatePaymentRedirectUrl(paymentMethod, checkoutId),
        createdAt: new Date().toISOString(),
      };

      const response: ApiResponse<Payment> = {
        data: payment,
        success: true,
        message: "Payment initiated successfully",
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET /payments/:id/status - Check payment status
router.get(
  "/:id/status",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Mock payment status check
      // In production, this would query the payment provider
      const payment: Payment = {
        id,
        status: "SUCCESS",
        amount: 100,
        currency: "USD",
        paymentMethod: "paydunya",
        createdAt: new Date().toISOString(),
      };

      const response: ApiResponse<Payment> = {
        data: payment,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// POST /payments/:id/confirm - Confirm payment (webhook handler)
router.post(
  "/:id/confirm",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status, transactionId } = req.body;

      // Mock payment confirmation
      // In production, this would verify with the payment provider
      console.log(`[Payment] Confirming payment ${id} with status ${status}`);

      const response: ApiResponse<{ paymentId: string; status: string }> = {
        data: {
          paymentId: id,
          status: status || "SUCCESS",
        },
        success: true,
        message: "Payment confirmed",
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// Helper function to generate payment redirect URLs
function generatePaymentRedirectUrl(paymentMethod: string, checkoutId: string): string {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  
  switch (paymentMethod.toLowerCase()) {
    case "paydunya":
      // PayDunya integration URL
      return `${baseUrl}/checkout/payment/paydunya?checkout=${checkoutId}`;
    case "stripe":
      // Stripe integration URL
      return `${baseUrl}/checkout/payment/stripe?checkout=${checkoutId}`;
    default:
      return `${baseUrl}/checkout/payment?method=${paymentMethod}&checkout=${checkoutId}`;
  }
}

export default router;
