const CACHE_NAME = 'recetas-cache-v1';

const urlsToCache = [
  '/mipwa/',
  '/mipwa/index.html',
  '/mipwa/styles.css',
  '/mipwa/manifest.json',
  '/mipwa/icon-192.png',
  '/mipwa/icon-512.png'
];

// Instalar y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activa inmediatamente sin esperar
});

// Activar y limpiar caches antiguos
self.addEventListener('activate', event => {
  const whitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (!whitelist.includes(key