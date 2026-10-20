import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// base: './' makes the build work from any sub-path (GitHub Pages, Netlify, Render, local file server).
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    // Installable PWA: web app manifest + a Workbox service worker that precaches the app shell and every
    // bundled chunk (all language courses, the ISTQB module, conversation demo scripts), so they work offline.
    VitePWA({
      // A new version waits until the learner chooses "Update" (see src/pwa/UpdateBanner.tsx).
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'app-icon.png'],
      manifest: {
        id: './',
        name: 'Học ngoại ngữ – Language Companion',
        short_name: 'Học ngoại ngữ',
        description: 'Học tiếng Trung, tiếng Anh, tiếng Hàn và kiến thức ISTQB – hoạt động cả khi ngoại tuyến.',
        lang: 'vi',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'any',
        theme_color: '#fbf8f2',
        background_color: '#fbf8f2',
        categories: ['education'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json,webmanifest,woff2}'],
        // The ISTQB chunk (~1.8 MB) and the main chunk (~1.2 MB) must be precached too.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // HashRouter: every route is index.html#/…, so the shell answers all navigations offline.
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        // No runtimeCaching: API calls (conversation backend) and other cross-origin requests always go to the network.
      },
      devOptions: { enabled: false },
    }),
  ],
});
