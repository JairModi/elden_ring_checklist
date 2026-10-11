// Tarnished's Ledger – offline support.
// Bump VERSION whenever you change index.html so phones pick up the new version.
const VERSION = "ledger-v6";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./details.json",
  "./icon-index.json"
];
// Item icons: cached in the background after install so they work offline too.
const ICON_PACKS = ["./icons-0.json", "./icons-1.json", "./icons-10.json", "./icons-11.json", "./icons-12.json", "./icons-13.json", "./icons-14.json", "./icons-15.json", "./icons-16.json", "./icons-17.json", "./icons-18.json", "./icons-19.json", "./icons-2.json", "./icons-20.json", "./icons-21.json", "./icons-22.json", "./icons-23.json", "./icons-24.json", "./icons-25.json", "./icons-26.json", "./icons-27.json", "./icons-3.json", "./icons-4.json", "./icons-5.json", "./icons-6.json", "./icons-7.json", "./icons-8.json", "./icons-9.json"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
  caches.open(VERSION).then(cache => Promise.all(ICON_PACKS.map(u => cache.add(u).catch(() => {}))));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The page itself: try the network first so updates arrive, fall back to the saved copy offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Google Fonts and the app's own files: use the saved copy, fetch and save it the first time.
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (isFont || url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
