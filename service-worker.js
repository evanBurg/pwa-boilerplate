const version = 1.0;
const cacheName = "MyCacheName" + version;
const filesToCache = [
  "/",
  "/index.html",
  "/offline",
  "/offline/index.html",
  "js/app.js",
  "css/app.css",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
  console.log("Service Worker installed...");
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (e) {
  console.log("Service Worker: Activate");
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName) {
            console.log("Service Worker: Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
