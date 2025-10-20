import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx", // your main React entry
      refresh: true,                 // enables Blade + React hot reload
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": "/resources/js",          // optional alias
    },
  },
});
