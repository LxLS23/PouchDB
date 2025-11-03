const APP_SHELL_ASSETS = [
    '/index.html',
    '/main.js',
    '/sw.js',
    '/manifest.json',
    '/app.js'
]

const cacheAppShell = 'cache-app-shell-v3';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheAppShell)
            .then(cache => {
                return cache.addAll(APP_SHELL_ASSETS);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return caches.match(event.request);
                })
        )
    }
})