// Service Worker for Himalaya Krishi Website
// Optimized for mobile performance and offline functionality

const CACHE_NAME = 'himalaya-krishi-v1.2.0';
const STATIC_CACHE = 'himalaya-static-v1.2.0';
const DYNAMIC_CACHE = 'himalaya-dynamic-v1.2.0';
const IMAGE_CACHE = 'himalaya-images-v1.2.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/favicon.ico'
];

// Routes to cache for offline access
const OFFLINE_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/blog',
  '/NewsAboutUs'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical resources with error handling
      caches.open(STATIC_CACHE).then(async (cache) => {
        console.log('[SW] Caching critical resources');
        
        // Cache resources individually to handle failures gracefully
        const cachePromises = CRITICAL_RESOURCES.map(async (url) => {
          try {
            const request = new Request(url, { cache: 'reload' });
            const response = await fetch(request);
            if (response.ok) {
              await cache.put(request, response);
              console.log(`[SW] Cached: ${url}`);
            } else {
              console.warn(`[SW] Failed to cache ${url}: ${response.status}`);
            }
          } catch (error) {
            console.warn(`[SW] Error caching ${url}:`, error);
          }
        });
        
        await Promise.allSettled(cachePromises);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Main request handler with different strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Skip service worker for large video files to prevent fetch errors
    if (pathname.includes('.mp4') && pathname.includes('asar15-mudfest')) {
      console.log('[SW] Bypassing service worker for large video file:', pathname);
      return fetch(request);
    }
    
    // Strategy 1: Static assets (CSS, JS, fonts) - Cache First
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 2: Images - Cache First with fallback
    if (isImage(pathname)) {
      return await imageStrategy(request);
    }
    
    // Strategy 3: API calls - Network First
    if (isApiCall(pathname)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Strategy 4: HTML pages - Stale While Revalidate
    if (isHtmlPage(pathname)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Default: Network First
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('[SW] Request failed:', error);
    return await handleOffline(request);
  }
}

// Cache First strategy - for static assets
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn(`[SW] Cache first fetch failed for ${request.url}:`, error);
    // If we have a cached version, return it even if it's old
    if (cached) {
      return cached;
    }
    // Otherwise, throw the error to be handled by the main handler
    throw error;
  }
}

// Network First strategy - for dynamic content
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

// Stale While Revalidate strategy - for HTML pages
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Update cache in background
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {});
  
  // Return cached version immediately if available
  if (cached) {
    return cached;
  }
  
  // Otherwise wait for network
  return await fetchPromise;
}

// Image strategy - optimized for mobile
async function imageStrategy(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      // Only cache images smaller than 1MB for mobile
      const contentLength = response.headers.get('content-length');
      if (!contentLength || parseInt(contentLength) < 1024 * 1024) {
        cache.put(request, response.clone());
      }
    }
    
    return response;
  } catch (error) {
    console.warn(`[SW] Image fetch failed for ${request.url}:`, error);
    
    // For video files, try to return cached version or let it fail gracefully
    const url = new URL(request.url);
    if (url.pathname.includes('.mp4') || url.pathname.includes('video')) {
      // For video files, just throw the error to let the video player handle it
      throw error;
    }
    
    // Return placeholder image for failed image loads
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="#999">Image unavailable</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Try to serve cached version of any page
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  // Serve offline page for HTML requests
  if (request.headers.get('accept')?.includes('text/html')) {
    const offlinePage = await cache.match('/');
    if (offlinePage) {
      return offlinePage;
    }
  }
  
  // Return generic offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'You are currently offline. Please check your internet connection.'
    }),
    {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

// Helper functions
function isStaticAsset(pathname) {
  return /\.(css|js|woff|woff2|ttf|eot|ico|svg)$/i.test(pathname) ||
         pathname.startsWith('/assets/');
}

function isImage(pathname) {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(pathname);
}

function isApiCall(pathname) {
  return pathname.startsWith('/api/') || 
         pathname.startsWith('/blog-api/') ||
         pathname.includes('.json');
}

function isHtmlPage(pathname) {
  return !pathname.includes('.') || pathname.endsWith('.html');
}

// Background sync for failed requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });
}

async function doBackgroundSync() {
  console.log('[SW] Performing background sync...');
  // Implement background sync logic here
}

// Push notifications (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/favicon-192x192.png',
      badge: '/favicon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
          icon: '/favicon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/favicon-192x192.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[SW] Service Worker loaded successfully');