import { Router } from "express";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import checkoutRouter from "./checkout";
import paymentsRouter from "./payments";
import ordersRouter from "./orders";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "saleor-bff-api",
  });
});

// API routes
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/checkout", checkoutRouter);
router.use("/payments", paymentsRouter);
router.use("/orders", ordersRouter);

export default router;
