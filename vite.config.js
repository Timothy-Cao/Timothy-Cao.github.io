import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  server: {
    port: 3000,
  },
  base: '/',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gallery: ['./src/components/Gallery'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});