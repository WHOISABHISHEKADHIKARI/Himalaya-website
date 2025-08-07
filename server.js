import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  // Set proper MIME type for JavaScript modules
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  }
  if (req.url.endsWith('.mjs') || req.url.includes('assets/') && req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
  }

  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "frame-src 'self' https://*.google.com; " +
    "connect-src 'self' https://*.googleapis.com; " +
    "worker-src 'self' blob:;"
  );
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin"
  );
  res.setHeader(
    "X-Frame-Options",
    "SAMEORIGIN"
  );
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Router - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});