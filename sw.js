const CACHE_NAME = 'todo-app-v1';
const BASE_URL = 'https://dimenicetry.github.io/TODO-List-JS';
const urlsToCache = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/style.css`,
  `${BASE_URL}/src/app.js`,
  `${BASE_URL}/src/storage.js`,
  `${BASE_URL}/src/ui.js`,
  `${BASE_URL}/src/theme.js`,
  `${BASE_URL}/src/analytics.js`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/icons/icon-192x192.svg`,
  `${BASE_URL}/icons/icon-512x512.svg`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 