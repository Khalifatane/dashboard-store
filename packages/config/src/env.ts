// Environment variables configuration
// These are loaded from .env files at runtime

// API URL for BFF - used by both storefront and dashboard
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  process.env.API_URL ||
  "http://localhost:4000";

// Saleor API URL (used only by BFF, not frontend)
export const SALEOR_API_URL =
  process.env.SALEOR_API_URL || "https://demo.saleor.io/graphql/";

// Saleor API token (used only by BFF)
export const SALEOR_API_TOKEN = process.env.SALEOR_API_TOKEN || "";

// App environment
export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_PRODUCTION = NODE_ENV === "production";

// Mock configuration
export const USE_MOCK = process.env.USE_MOCK === "true";

// Auth configuration
export const AUTH_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  tokenExpiry: process.env.TOKEN_EXPIRY || "24h",
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
} as const;

// Payment providers configuration
export const PAYMENT_CONFIG = {
  paydunya: {
    enabled: process.env.PAYDUNYA_ENABLED === "true",
    masterKey: process.env.PAYDUNYA_MASTER_KEY || "",
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY || "",
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY || "",
    mode: process.env.PAYDUNYA_MODE || "test",
  },
  stripe: {
    enabled: process.env.STRIPE_ENABLED === "true",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    secretKey: process.env.STRIPE_SECRET_KEY || "",
  },
} as const;
