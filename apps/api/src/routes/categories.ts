import { Router, Request, Response, NextFunction } from "express";
import { ApiResponse, Category } from "../types";
import { mockCategories } from "@repo/mock";

const router = Router();

// GET /categories - List all categories
router.get(
  "/",
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response: ApiResponse<Category[]> = {
        data: mockCategories,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET /categories/:slug - Get category by slug
router.get(
  "/:slug",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const category = mockCategories.find((c) => c.slug === slug);

      if (!category) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Category not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Category> = {
        data: category,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
