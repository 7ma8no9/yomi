import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@stores": path.resolve(__dirname, 'src/stores'),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@router": path.resolve(__dirname, "src/index"),
      "@themes": path.resolve(__dirname, "src/themes"),
      "@wasm": path.resolve(__dirname, "src/wasm"),
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
}));
