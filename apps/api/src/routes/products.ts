import { Router, Request, Response, NextFunction } from "express";
import { ApiResponse, PaginatedResponse, Product } from "../types";
import {
  mockProducts,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
} from "@repo/mock";

const router = Router();

// GET /products - List all products
router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;

      let products = [...mockProducts];

      if (category) {
        products = getProductsByCategory(category);
      }

      if (search) {
        products = searchProducts(search);
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedProducts = products.slice(start, end);

      const response: ApiResponse<PaginatedResponse<Product>> = {
        data: {
          data: paginatedProducts,
          totalCount: products.length,
          pageInfo: {
            hasNextPage: end < products.length,
            hasPreviousPage: page > 1,
          },
        },
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// GET /products/:slug - Get product by slug
router.get(
  "/:slug",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const product = getProductBySlug(slug);

      if (!product) {
        const response: ApiResponse<null> = {
          data: null as unknown as null,
          success: false,
          message: "Product not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Product> = {
        data: product,
        success: true,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
