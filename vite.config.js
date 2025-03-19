import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import securityConfig from './src/security/config'

export default defineConfig({
  root: './',
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    headers: {
      'Content-Security-Policy': Object.entries(securityConfig.contentSecurityPolicy.directives)
        .map(([key, value]) => `${key} ${value.join(' ')}`)
        .join('; ')
    }
  }
});

