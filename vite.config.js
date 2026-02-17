import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    viteCompression(),
    {
      name: "copy-404-plugin",
      closeBundle() {
        try {
          const distDir = path.resolve(process.cwd(), "dist");
          const indexHtml = path.join(distDir, "index.html");
          const fourOhFourHtml = path.join(distDir, "404.html");

          if (fs.existsSync(indexHtml)) {
            fs.copyFileSync(indexHtml, fourOhFourHtml);
            console.log("✅ 404.html généré avec succès pour GitHub Pages");
          }
        } catch (e) {
          console.error("❌ Erreur lors de la génération de 404.html:", e);
          throw e;
        }
      },
    },
  ],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "zustand"],
          "three-core": ["three"],
        },
      },
    },
  },
});
