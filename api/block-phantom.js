export default function handler(req, res) {
  // Log the blocked phantom URL attempt
  console.log(`Blocked phantom URL attempt: ${req.url}`);
  
  // Set security headers
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Return 404 Not Found
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist.',
    timestamp: new Date().toISOString()
  });
}