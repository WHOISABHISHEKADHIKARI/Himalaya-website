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
          // Split larger dependencies into separate chunks
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    // Enable compression
    brotliSize: true,
    // Optimize chunk size
    minChunks: 1
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

