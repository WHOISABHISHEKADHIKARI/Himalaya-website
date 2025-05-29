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