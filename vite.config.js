import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import securityConfig from './src/security/config'

export default defineConfig({
  root: './',
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons', 'framer-motion'],
          meta: ['react-helmet-async']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true
  }
})

