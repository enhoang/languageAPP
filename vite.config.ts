import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' makes the build work from any sub-path (GitHub Pages, Netlify, local file server).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
