import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],server: {
    allowedHosts: ['x4ps5x-5173.csb.app'] // Allow all external hosts
  }
});
