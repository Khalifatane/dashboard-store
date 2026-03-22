// Main exports for @repo/mock
export * from "./types";
export * from "./data";
export * from "./handlers";

// Conditional exports based on environment
export const isNode = typeof window === "undefined";
export const isBrowser = typeof window !== "undefined";
