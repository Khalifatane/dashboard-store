// Shared configuration constants

import { PORTS } from "./ports";

export { PORTS };

export const APP_CONFIG = {
  storefront: {
    name: "Saleor Storefront",
    port: PORTS.STOREFRONT,
  },
  dashboard: {
    name: "Saleor Dashboard",
    port: PORTS.DASHBOARD,
  },
  api: {
    name: "BFF API",
    port: PORTS.API,
  },
} as const;

// Feature flags
export const FEATURES = {
  enableMocking: process.env.USE_MOCK === "true",
  enableAnalytics: process.env.ENABLE_ANALYTICS === "true",
} as const;

// API endpoints
export const ENDPOINTS = {
  products: "/products",
  categories: "/categories",
  checkout: "/checkout",
  payments: "/payments",
  orders: "/orders",
  users: "/users",
} as const;

// Pagination defaults
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;
