import { Router, Request, Response, NextFunction } from "express";
import { ApiResponse, Checkout, Order } from "../types";
import {
  createMockCheckout,
  getCheckoutById,
  updateCheckoutShippingAddress,
  updateCheckoutBillingAddress,
  setShippingMethod,
  completeCheckout,
} from "@repo/mock";

const router = Router();

// POST /checkout - Create checkout
router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, lines } = req.body;

      if (!email || !lines || !Array.isArray(lines) || lines.length === 0) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Invalid checkout data. Email and lines are required.",
        };
        res.status(400).json(response);
        return;
      }

      const checkout = createMockCheckout(email, lines);

      const response: ApiResponse<Checkout> = {
        data: checkout,
        success: true,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET /checkout/:id - Get checkout by ID
router.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const checkout = getCheckoutById(id);

      if (!checkout) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Checkout not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Checkout> = {
        data: checkout,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /checkout/:id/shipping-address - Update shipping address
router.patch(
  "/:id/shipping-address",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const addressData = req.body;

      const checkout = updateCheckoutShippingAddress(id, addressData);

      if (!checkout) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Checkout not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Checkout> = {
        data: checkout,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /checkout/:id/billing-address - Update billing address
router.patch(
  "/:id/billing-address",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const addressData = req.body;

      const checkout = updateCheckoutBillingAddress(id, addressData);

      if (!checkout) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Checkout not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Checkout> = {
        data: checkout,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// POST /checkout/:id/shipping-method - Set shipping method
router.post(
  "/:id/shipping-method",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { shippingMethodId } = req.body;

      const checkout = setShippingMethod(id, shippingMethodId);

      if (!checkout) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Checkout or shipping method not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Checkout> = {
        data: checkout,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// POST /checkout/:id/complete - Complete checkout
router.post(
  "/:id/complete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { paymentMethod } = req.body;

      const order = completeCheckout(id, paymentMethod);

      if (!order) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Checkout not found or could not be completed",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Order> = {
        data: order,
        success: true,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
