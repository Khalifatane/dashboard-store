import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-oxc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/api-client": path.resolve(__dirname, "../../packages/api-client/src"),
      "@repo/config": path.resolve(__dirname, "../../packages/config/src"),
    },
  },
  server: {
    port: 9000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
