const CACHE_NAME = 'recetas-cache-v1';

const urlsToCache = [
  '/mipwa/',
  '/mipwa/index.html',
  '/mipwa/styles.css',
  '/mipwa/manifest.json',
  '/mipwa/icon-192.png',
  '/mipwa/icon-512.png'
];

// Instalar y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('❌ Falló cacheado en install', err))
  );
  self.skipWaiting();
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Interceptar las peticiones
self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);

  // Si es la raíz, devuelve index.html
  if (requestURL.pathname === '/mipwa/') {
    event.respondWith(
      caches.match('/mipwa/index.html')
    );
    return;
  }

  // Para el resto de recursos
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(response => response || fetch(event.request))
      .catch(err => {
        console.error('❌ Error en fetch',