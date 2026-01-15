const CACHE_NAME = 'dualpay-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  // Активира новия Service Worker веднага
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch(err => console.error('Грешка при кеширане:', err))
  );
});

self.addEventListener('activate', (e) => {
  // Поема контрола над страницата веднага
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
      .catch(err => console.error('Грешка при fetch:', err))
  );
});
