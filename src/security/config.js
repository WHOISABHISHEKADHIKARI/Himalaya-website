const securityConfig = {
  contentSecurityPolicy: {
    directives: {
      "upgrade-insecure-requests": [],
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://*.googleapis.com",
        "https://*.gstatic.com",
        "https://maps.googleapis.com",
        "https://reactjs.org",
        "https://krishihimalaya.com",
        "http://localhost:*"
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://krishihimalaya.com",
        "http://localhost:*"
      ],
      "img-src": [
        "'self'",
        "data:",
        "blob:",
        "http://localhost:*",
        "https://*.googleapis.com",
        "https://*.gstatic.com",
        "https://maps.gstatic.com",
        "https://krishihimalaya.com"
      ],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:", "http://localhost:*"],
      "frame-src": [
        "'self'", 
        "https://*.google.com",
        "https://www.google.com/maps/",
        "https://maps.google.com",
        "https://krishihimalaya.com"
      ],
      "connect-src": [
        "'self'", 
        "https://*.googleapis.com", 
        "http://localhost:*",
        "wss://localhost:*",
        "https://krishihimalaya.com",
        "https://maps.googleapis.com",
        "https://vitals.vercel-insights.com",
        "https://*.vercel-insights.com"
      ],
      "worker-src": ["'self'", "blob:", "http://localhost:*"],
      "object-src": ["'none'"],
      "manifest-src": ["'self'", "https://krishihimalaya.com", "http://localhost:*"],
      "media-src": ["'self'", "https://krishihimalaya.com", "blob:", "http://localhost:*"]
    }
  }
};

export default securityConfig;