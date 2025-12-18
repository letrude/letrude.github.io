import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("three") ||
              id.includes("drei") ||
              id.includes("postprocessing") ||
              id.includes("camera-controls") ||
              id.includes("three-stdlib")
            ) {
              return "vendor-three";
            }
            return "vendor-core";
          }
        },
      },
    },
  },
});
