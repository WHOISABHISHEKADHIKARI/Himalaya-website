import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import securityConfig from './src/security/config'

export default defineConfig({
  root: './',
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
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

