const securityConfig = {
  contentSecurityPolicy: {
    directives: {
      // Remove unsafe-inline where possible
      "script-src": [
        "'self'",
        // Only keep necessary external sources
        "https://*.googleapis.com",
        "https://*.gstatic.com"
      ],
      // Add more restrictive policies
      "img-src": ["'self'", "https:", "data:"],
      "connect-src": ["'self'", "https://api.yourservice.com"],
      "frame-ancestors": ["'none'"]
    }
  }
};

export default securityConfig;