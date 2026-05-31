// Service Worker for PWA - Full Version

const CACHE_NAME = 'wahed-burger-v1';
const STATIC_CACHE = 'wahed-burger-static-v1';
const DYNAMIC_CACHE = 'wahed-burger-dynamic-v1';

// Files to cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/menu.html',
  '/reservation.html',
  '/order-tracking.html',
  '/admin.html',
  '/styles.css',
  '/menu.js',
  '/reservation.js',
  '/order-tracking.js',
  '/admin.js',
  '/loyalty.js',
  '/customization.js',
  'notifications.js',
  '/reviews.js',
  '/reviews.css',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('[Service Worker] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        }));
      })
      .then(() => {
        console.log('[Service Worker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone response before caching
          const responseToCache = response.clone();
          
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(event.request.url, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // Return cached version if available
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Handle static files
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }
        
        // Network request
        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response
            const responseToCache = response.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request.url, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Return offline page for HTML requests
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  } else if (event.tag === 'sync-reviews') {
    event.waitUntil(syncReviews());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received');
  
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: data.icon || 'https://menuoprohub.top/alex1/logo/1758024242433_793.webp',
    badge: 'https://menuoprohub.top/alex1/logo/1758024242433_793.webp',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'view',
        title: 'عرض',
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/sprites/fa-solid.svg'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/sprites/fa-solid.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Sync orders
function syncOrders() {
  return caches.open(DYNAMIC_CACHE)
    .then((cache) => {
      return cache.match('/api/orders/pending');
    })
    .then((response) => {
      if (response) {
        return response.json();
      }
      return [];
    })
    .then((pendingOrders) => {
      // Send pending orders to server
      return Promise.all(
        pendingOrders.map((order) => {
          return fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
          });
        })
      );
    })
    .then(() => {
      // Clear pending orders
      return caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.delete('/api/orders/pending');
        });
    })
    .catch((error) => {
      console.error('[Service Worker] Sync orders failed:', error);
    });
}

// Sync reviews
function syncReviews() {
  return caches.open(DYNAMIC_CACHE)
    .then((cache) => {
      return cache.match('/api/reviews/pending');
    })
    .then((response) => {
      if (response) {
        return response.json();
      }
      return [];
    })
    .then((pendingReviews) => {
      // Send pending reviews to server
      return Promise.all(
        pendingReviews.map((review) => {
          return fetch('/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
          });
        })
      );
    })
    .then(() => {
      // Clear pending reviews
      return caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.delete('/api/reviews/pending');
        });
    })
    .catch((error) => {
      console.error('[Service Worker] Sync reviews failed:', error);
    });
}

// Cache cleanup
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'cleanCache') {
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
              return caches.delete(key);
            }
          })
        );
      })
    );
  }
});
