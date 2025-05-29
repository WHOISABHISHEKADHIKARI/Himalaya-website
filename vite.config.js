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
<<<<<<< HEAD
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons', 'framer-motion'],
=======
          vendor: ['react', 'react-dom'],
          ui: ['react-icons', 'framer-motion'],
          routing: ['react-router-dom'],
>>>>>>> 3dc3a38f61b98bbe1af4ae2e3f9475f3b3fea703
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
<<<<<<< HEAD
    strictPort: true
=======
    strictPort: true,
    https: {
      key: process.env.SSL_KEY_FILE,
      cert: process.env.SSL_CERT_FILE
    }
>>>>>>> 3dc3a38f61b98bbe1af4ae2e3f9475f3b3fea703
  }
})

