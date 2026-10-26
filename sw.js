const VERSION='lens-biyori-v2-20261026-apple';
const FILES=['./','./index.html','./app.js','./date-core.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES))));
self.addEventListener('message',e=>{if(e.data==='ACTIVATE')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('lens-biyori-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url),scope=new URL(self.registration.scope);if(e.request.method!=='GET'||u.origin!==scope.origin||!u.pathname.startsWith(scope.pathname))return;e.respondWith(caches.open(VERSION).then(async c=>(await c.match(e.request,{ignoreSearch:true}))||fetch(e.request)))});
