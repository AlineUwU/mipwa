const CACHE_NAME = 'recetas-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css'
];

// Instala y guarda archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta peticiones y responde con caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});