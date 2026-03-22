import { Router, Request, Response, NextFunction } from "express";
import { ApiResponse, Order } from "../types";
import { getOrderById } from "@repo/mock";

const router = Router();

// GET /orders/:id - Get order by ID
router.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = getOrderById(id);

      if (!order) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Order not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Order> = {
        data: order,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET /orders - List orders (would require authentication in production)
router.get(
  "/",
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      // In production, this would fetch orders for the authenticated user
      const response: ApiResponse<Order[]> = {
        data: [],
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
