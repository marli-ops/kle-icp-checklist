import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    allowedHosts: ["kle-icp-checklist-production.up.railway.app"],
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
