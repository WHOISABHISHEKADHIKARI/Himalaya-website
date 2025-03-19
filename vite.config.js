import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
          // Route-based code splitting
          if (id.includes('/pages/')) {
            return 'pages';
          }
          // Component chunks
          if (id.includes('/components/')) {
            return 'components';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  assetsInclude: ['**/*.webp', '**/*.avif'], // Add support for WebP and AVIF
  resolve: {
    alias: {
      '@assets': '/src/assets'
    }
  }
})

