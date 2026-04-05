import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['react-slick', 'slick-carousel'],
    force: true,
  },
  server: {
    host: true,
    hmr: {
      overlay: true,
    },
  },
});
