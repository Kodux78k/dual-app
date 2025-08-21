/* Service Worker — DualChat+ (melhorado)
   Estratégias:
   - HTML: network-first (fallback offline)
   - Estáticos (js/css/img/svg/fonts): stale-while-revalidate
   - Precaching de arquivos críticos
   - Navigation preload + skipWaiting via postMessage
*/

const VERSION = 'v13'; // ↑ bump a cada mudança estrutural
const PREFIX  = 'dualchat';
const RUNTIME_CACHE = `${PREFIX}-runtime-${VERSION}`;
const PRECACHE_CACHE = `${PREFIX}-precache-${VERSION}`;
const MAX_RUNTIME_ENTRIES = 120; // ajuste conforme seu app

// Ajuste conforme sua estrutura:
const PRECACHE_URLS = [
  '/',              // garante navegação raiz
  '/index.html',
  '/splash.html',
  '/manifest.json',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  // Adicione aqui CSS/JS críticos (melhor para first paint)
  // ex: '/assets/app.css', '/assets/app.js'
];

// Página offline opcional (se não existir, geramos um SVG inline)
const OFFLINE_URL = '/offline.html';

// Util: identifica requisições de navegação (HTML)
const isNavigation = (req) =>
  req.mode === 'navigate' ||
  (req.destination === 'document') ||
  (req.headers && req.headers.get('accept')?.includes('text/html'));

// Util: tipo de asset estático
const isStaticAsset = (req) => {
  const d = req.destination;
  return ['style','script','image','font','worker'].includes(d);
};

// Trim básico de cache (LRU light: remove os mais antigos sem metadados)
async function trimCache(cacheName, maxEntries){
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if(keys.length <= maxEntries) return;
  const excess = keys.length - maxEntries;
  // remove do início (mais antigo na prática)
  await Promise.all(keys.slice(0, excess).map((req) => cache.delete(req)));
}

// Fallback HTML inline (se OFFLINE_URL não existir)
function offlineHTMLResponse(){
  const html = `<!doctype html>
<html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline</title>
<style>
  :root{color-scheme:dark light}
  body{margin:0;min-height:100svh;display:grid;place-items:center;background:#0a0a0f;color:#cfcfe8;font:16px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
  .card{max-width:28rem;margin:2rem;padding:1.25rem 1.5rem;background:rgba(255,255,255,.06);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.1);border-radius:16px}
  h1{font-size:1.1rem;margin:0 0 .5rem}
  p{opacity:.85;margin:.25rem 0}
  code{background:rgba(255,255,255,.08);padding:.2rem .4rem;border-radius:.35rem}
  .tips{font-size:.9rem;opacity:.8;margin-top:.75rem}
</style>
<div class="card">
  <h1>Você está offline</h1>
  <p>Sem conexão no momento. Assim que a rede voltar, tente novamente.</p>
  <p class="tips">Dica: adicione o app à tela inicial para uma experiência PWA completa.</p>
</div>
</html>`;
  return new Response(html, {headers:{'Content-Type':'text/html; charset=utf-8'}});
}

// Placeholder de imagem inline (SVG) quando offline
function offlineImageResponse(){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#13131a"/><stop offset="1" stop-color="#0b0b12"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g fill="none" stroke="#6a6af3" stroke-opacity=".45">
      <circle cx="240" cy="160" r="120"/><circle cx="240" cy="160" r="80"/><circle cx="240" cy="160" r="40"/>
    </g>
    <text x="50%" y="54%" fill="#cfcfe8" font-size="20" font-family="system-ui,Segoe UI,Roboto" text-anchor="middle">offline</text>
    <text x="50%" y="68%" fill="#9a9abf" font-size="12" font-family="system-ui,Segoe UI,Roboto" text-anchor="middle">imagem indisponível</text>
  </svg>`;
  return new Response(svg, {headers:{'Content-Type':'image/svg+xml'}});
}

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE_CACHE);
    await cache.addAll(PRECACHE_URLS);
  })());
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Ativa Navigation Preload quando disponível
    if ('navigationPreload' in self.registration) {
      try { await self.registration.navigationPreload.enable(); } catch(_) {}
    }
    // Limpa caches antigos
    const names = await caches.keys();
    await Promise.all(
      names.map((name) => {
        if (!name.startsWith(PREFIX)) return;
        if (name !== PRECACHE_CACHE && name !== RUNTIME_CACHE) {
          return caches.delete(name);
        }
      })
    );
    // Garante controle imediato das clients
    await self.clients.claim();
  })());
});

// Mensagens do cliente (ex.: forçar skipWaiting)
self.addEventListener('message', (event) => {
  const {type} = event.data || {};
  if (type === 'SKIP_WAITING') self.skipWaiting();
});

// FETCH
self.addEventListener('fetch', (event) => {
  const {request} = event;

  // Ignore métodos não-GET e chrome-extension etc.
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Respostas de Range (vídeo/áudio): delega para rede
  if (request.headers.has('range')) {
    event.respondWith(fetch(request));
    return;
  }

  // Navegações (HTML): network-first + fallback offline
  if (isNavigation(request)) {
    event.respondWith((async () => {
      try {
        // Usa preload se disponível (mais rápido)
        const preload = 'navigationPreload' in self.registration
          ? await event.preloadResponse
          : null;
        if (preload) return preload;

        const net = await fetch(request, {cache: 'no-store'});
        // Opcional: salva/atualiza no runtime (app shell) se quiser
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, net.clone());
        await trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
        return net;
      } catch {
        // Tenta cache (app shell)…
        const cached = await caches.match(request) || await caches.match('/index.html') || await caches.match('/splash.html');
        if (cached) return cached;
        // …ou OFFLINE_URL…
        const offlinePage = await caches.match(OFFLINE_URL);
        if (offlinePage) return offlinePage;
        // …ou HTML inline
        return offlineHTMLResponse();
      }
    })());
    return;
  }

  // Estáticos: stale-while-revalidate
  if (isStaticAsset(request)) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then((response) => {
        // Evita armazenar respostas ruins/opaques sem necessidade
        if (response && response.status === 200 && response.type === 'basic') {
          cache.put(request, response.clone());
          trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
        }
        return response;
      }).catch(() => null);

      // Retorna rápido o cache; atualiza em background
      return cached || (await fetchPromise) || (request.destination === 'image' ? offlineImageResponse() : new Response('', {status: 204}));
    })());
    return;
  }

  // Demais GET mesmo-origem: cache-first com revalidação
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    if (cached) {
      // atualiza em background
      fetch(request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          cache.put(request, res.clone());
          trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
        }
      }).catch(()=>{});
      return cached;
    }
    try {
      const net = await fetch(request);
      if (net && net.status === 200 && net.type === 'basic') {
        cache.put(request, net.clone());
        trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
      }
      return net;
    } catch {
      // fallback suave p/ imagens
      return request.destination === 'image' ? offlineImageResponse() : new Response('', {status: 204});
    }
  })());
});