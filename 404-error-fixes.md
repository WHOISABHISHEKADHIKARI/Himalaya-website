# 404 Error and Status Code Implementation Guide

## Overview
Based on the Google Search Console report, there are significant issues with 404 errors and soft 404s (pages returning 200 OK status but containing error content). This guide outlines how to properly implement status codes and fix these issues.

## Issues Identified

1. **Soft 404 Errors (7,035 pages)**: Pages returning 200 OK status but containing error content
2. **Not Found (404) Errors (23 pages)**: Pages that are linked but don't exist

## Implementation Solutions

### 1. Fix NotFound.jsx Component

The current NotFound component needs to be updated to ensure it returns a proper 404 status code:

```jsx
// src/pages/NotFound.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  useEffect(() => {
    // Set the status code to 404
    document.title = 'पृष्ठ फेला परेन | Page Not Found - Himalaya Krishi';
    
    // This only works on the server side, but we include it for SSR compatibility
    if (typeof window.__INITIAL_STATUS_CODE__ !== 'undefined') {
      window.__INITIAL_STATUS_CODE__ = 404;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>पृष्ठ फेला परेन | Page Not Found - Himalaya Krishi</title>
        <meta name="description" content="माफ गर्नुहोस्, यो पृष्ठ उपलब्ध छैन। हिमालय कृषिको मुख्य पृष्ठमा फर्कनुहोस् र जैविक खेती, कृषि सहयोग र दिगो कृषि समाधानहरू पत्ता लगाउनुहोस्। | Sorry, this page isn't available." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://krishihimalaya.com" />
      </Helmet>
      {/* Rest of the component */}
    </div>
  );
};

export default NotFound;
```

### 2. Server-Side Configuration for Vercel

Update the Vercel configuration to handle 404 errors properly:

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, s-maxage=1, stale-while-revalidate=59" }
      ]
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { 
      "src": "/(.*)", 
      "status": 404,
      "dest": "/404.html" 
    }
  ]
}
```

### 3. Generate a Static 404.html File

Create a static 404.html file during the build process that returns the proper status code:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>पृष्ठ फेला परेन | Page Not Found - Himalaya Krishi</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://krishihimalaya.com">
  <meta http-equiv="refresh" content="0;url=/">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      text-align: center;
      padding: 50px;
      background: #F4F9F1;
    }
    h1 {
      color: #1C4E37;
      font-size: 3rem;
    }
    p {
      color: #3A5944;
      margin-bottom: 20px;
    }
    a {
      color: #D8A51D;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>404</h1>
  <h2>पृष्ठ फेला परेन | Page Not Found</h2>
  <p>माफ गर्नुहोस्, यो पृष्ठ उपलब्ध छैन।</p>
  <p>Sorry, this page isn't available.</p>
  <p><a href="/">Return to Homepage</a></p>
</body>
</html>
```

### 4. Update Build Script

Modify the build script in package.json to generate the 404.html file:

```json
"scripts": {
  "build": "vite build && node scripts/generate-sitemap.js && cp dist/index.html dist/404.html"
}
```

### 5. Identify and Fix Broken Links

1. **Audit Internal Links**: Use a crawler tool to identify all broken internal links
2. **Update or Remove Broken Links**: Fix or remove any links pointing to non-existent pages
3. **Update Sitemap**: Remove any non-existent URLs from your sitemap files

### 6. Implement Redirects for Common 404s

For frequently accessed pages that no longer exist, implement redirects:

```json
// Add to vercel.json
"redirects": [
  { "source": "/old-page", "destination": "/new-page", "permanent": true },
  { "source": "/outdated-product", "destination": "/products", "permanent": true },
  { "source": "/blog/old-post", "destination": "/blog/new-post", "permanent": true }
]
```

## Testing Implementation

1. **Manual Testing**: Visit known 404 pages and check the network tab in browser dev tools to confirm 404 status code
2. **Validation Tools**: Use online HTTP status code checkers
3. **Google Search Console**: Submit fixed pages for reindexing and monitor the "Coverage" report

## Monitoring and Maintenance

1. Set up regular crawls to identify new 404 errors
2. Monitor server logs for 404 responses
3. Check Google Search Console weekly for new indexing issues
4. Implement proper error tracking in your analytics platform