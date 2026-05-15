import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite"; // Добавляем импорт

export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
});
