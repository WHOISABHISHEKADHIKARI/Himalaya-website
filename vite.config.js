import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { compression } from 'vite-plugin-compression'  // Comment out
import securityConfig from './src/security/config'

export default defineConfig({
  css: {
    postcss: './postcss.config.cjs',
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async']
  },
  root: './',
  base: '/',
  plugins: [
    react()
    // Remove compression plugins temporarily
    // compression({
    //   algorithm: 'gzip',
    //   ext: '.gz'
    // }),
    // compression({
    //   algorithm: 'brotliCompress',
    //   ext: '.br'
    // })
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    open: false,
    cors: true,
    historyApiFallback: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
      ...securityConfig.headers
    }
  },
  preview: {
    port: 4173,
    host: true,
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
      ...securityConfig.headers
    }
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
})