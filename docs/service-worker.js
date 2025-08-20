/* Service Worker — DualApp • Aggressive Cache-First
   Política agressiva: cache-first para quase tudo (GET).
   Exceções:
   - POSTs para provedores de IA (OpenRouter/OpenAI) SEM cache (pass-through).
   - Requisições Range (áudio/vídeo) → rede (para scrub).
   - Atualizações em background (revalidação) para manter cache quente.

   Dicas:
   - Atualize VERSION para “invalidar” todos os caches quando mudar estratégia.
   - Liste seus arquivos críticos em APP_SHELL/EXTRA_PAGES.
*/

const VERSION = 'v16-aggr';
const PREFIX  = 'dualapp';
const PRECACHE = `${PREFIX}-precache-${VERSION}`;
const RUNTIME  = `${PREFIX}-runtime-${VERSION}`;
const OPAQUE   = `${PREFIX}-opaque-${VERSION}`;
const AUDIO    = `${PREFIX}-audio-${VERSION}`;

const MAX_RUNTIME = 260; // páginas/estáticos mesma origem
const MAX_OPAQUE  = 120; // respostas opacas (CDN/externos)
const MAX_AUDIO   = 60;  // faixas de áudio sem range

// App shell essencial — ajuste conforme seu projeto
const APP_SHELL = [
  '/', '/index.html', '/splash.html', '/manifest.json',
  '/assets/icons/icon-192.png', '/assets/icons/icon-512.png',
  '/dual-ui-kit.css', '/dual-ui-orchestrator.simbio-first.js',
];

// Páginas navegáveis relevantes (ex.: CODE_MAP)
const EXTRA_PAGES = [
  '/menu.html','/render-response.html','/decodificador.html',
  '/menu-final-com-pulso.html','/menu-pulso-final.html',
];

// Itens de áudio que você quer disponíveis imediatamente offline
const PRECACHE_AUDIO = [
  // '/assets/sounds/acts/wounds/codigo-MT-OLX-0.wav',
];

const OFFLINE_URL = '/offline.html'; // gerei um arquivo minimal no pack

// Utilidades
const isNav = (r) => r.mode === 'navigate' || r.destination === 'document' ||
  r.headers?.get('accept')?.includes('text/html');
const isStatic = (r) => ['style','script','image','font','worker'].includes(r.destination);
const isAudioURL = (u) => /\.(mp3|wav|ogg|m4a)(\?|#|$)/i.test(u);
const isIAHost = (u) => /(^|\.)openrouter\.ai$/.test(u.hostname) || /(^|\.)api\.openai\.com$/.test(u.hostname);

async function trim(cacheName, max){
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if(keys.length > max){
    await Promise.all(keys.slice(0, keys.length - max).map(req => cache.delete(req)));
  }
}

function htmlOffline(){
  const html = `<!doctype html><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline</title>
<style>
:root{color-scheme:dark light}
body{margin:0;min-height:100svh;display:grid;place-items:center;background:#0b0b12;color:#cfcfe8;font:16px/1.5 system-ui,Segoe UI,Roboto}
.card{max-width:28rem;margin:2rem;padding:1.1rem 1.25rem;background:rgba(255,255,255,.06);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.05)}
h1{font-size:1.1rem;margin:0 0 .5rem}
p{opacity:.85;margin:.25rem 0}
a{color:#9aa4ff}
</style>
<div class="card">
  <h1>Você está offline</h1>
  <p>Sem conexão no momento. Quando a rede voltar, esta página recarregará normalmente.</p>
</div>`;
  return new Response(html, {headers:{'Content-Type':'text/html; charset=utf-8'}});
}

// INSTALL
self.addEventListener('install', (e)=>{
  e.waitUntil((async()=>{
    const cache = await caches.open(PRECACHE);
    await cache.addAll(
      [...APP_SHELL, ...EXTRA_PAGES, ...PRECACHE_AUDIO, OFFLINE_URL]
        .map(p => new Request(p, {cache:'reload'}))
    );
  })());
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (e)=>{
  e.waitUntil((async()=>{
    if('navigationPreload' in self.registration){
      try{ await self.registration.navigationPreload.enable(); }catch(_){}
    }
    const names = await caches.keys();
    await Promise.all(names.map(n=>{
      if(!n.startsWith(PREFIX)) return;
      if(n!==PRECACHE && n!==RUNTIME && n!==OPAQUE && n!==AUDIO) return caches.delete(n);
    }));
    await self.clients.claim();
  })());
});

// Mensagens (promover SW)
self.addEventListener('message', (e)=>{
  if(e?.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

// FETCH — Cache-first agressivo
self.addEventListener('fetch', (e)=>{
  const req = e.request;
  const url = new URL(req.url);

  // Não-GET → passa direto (com exceção explícita dos POSTs de IA)
  if(req.method !== 'GET'){
    // Se for POST para provedores IA, não cachear nem mexer
    if(req.method === 'POST' && isIAHost(url)){
      e.respondWith(fetch(req));
      return;
    }
    return; // outros métodos seguem o fluxo normal do navegador
  }

  // Range (áudio/vídeo) → rede
  if(req.headers.has('range')){
    e.respondWith(fetch(req));
    return;
  }

  // Navegação (HTML) → cache-first + revalidação silenciosa; fallback offline
  if(isNav(req)){
    e.respondWith((async()=>{
      const rt = await caches.open(RUNTIME);
      const cached = await rt.match(req);
      // revalidação em background (mantém “agressivo”, mas atualiza)
      (async()=>{
        try{
          const net = await fetch(req, {cache:'no-store'});
          if(net && net.ok) { rt.put(req, net.clone()); await trim(RUNTIME, MAX_RUNTIME); }
        }catch(_){}
      })();
      if(cached) return cached;

      // Se nada no cache, tenta rede e depois offline
      try{
        const net = await fetch(req, {cache:'no-store'});
        if(net && net.ok){ rt.put(req, net.clone()); await trim(RUNTIME, MAX_RUNTIME); }
        return net;
      }catch{
        return (await caches.match(OFFLINE_URL)) || htmlOffline();
      }
    })());
    return;
  }

  // Estáticos mesma-origem → cache-first + update bg
  if(isStatic(req) && url.origin === self.location.origin){
    e.respondWith((async()=>{
      const rt = await caches.open(RUNTIME);
      const cached = await rt.match(req);
      (async()=>{
        try{
          const net = await fetch(req);
          if(net && net.status===200 && net.type==='basic'){
            rt.put(req, net.clone());
            await trim(RUNTIME, MAX_RUNTIME);
          }
        }catch(_){}
      })();
      if(cached) return cached;
      try{
        const net = await fetch(req);
        if(net && net.status===200 && net.type==='basic'){
          rt.put(req, net.clone()); await trim(RUNTIME, MAX_RUNTIME);
        }
        return net;
      }catch{
        if(req.destination==='image'){
          // placeholder simples
          return new Response('', {status:204});
        }
        return new Response('', {status:204});
      }
    })());
    return;
  }

  // Áudio (sem range) → cache-first em cache dedicado
  if(isAudioURL(url.pathname)){
    e.respondWith((async()=>{
      const ac = await caches.open(AUDIO);
      const cached = await ac.match(req);
      if(cached) return cached;
      try{
        const net = await fetch(req);
        if(net && net.ok){ ac.put(req, net.clone()); await trim(AUDIO, MAX_AUDIO); }
        return net;
      }catch{
        return new Response('', {status:204});
      }
    })());
    return;
  }

  // Demais GET (inclui cross-origin) → cache-first com cache OPAQUE quando aplicável
  e.respondWith((async()=>{
    const cacheToUse = (url.origin === self.location.origin) ? RUNTIME : OPAQUE;
    const c = await caches.open(cacheToUse);
    const cached = await c.match(req);
    // update em background
    (async()=>{
      try{
        const net = await fetch(req, {mode: req.mode});
        if(net){
          // ok (mesma origem) ou opaque (cross-origin com CORS bloqueado)
          if(net.ok || net.type === 'opaque'){
            c.put(req, net.clone());
            await trim(cacheToUse, cacheToUse===OPAQUE ? MAX_OPAQUE : MAX_RUNTIME);
          }
        }
      }catch(_){}
    })();
    if(cached) return cached;

    try{
      const net = await fetch(req);
      if(net && (net.ok || net.type === 'opaque')){
        c.put(req, net.clone());
        await trim(cacheToUse, cacheToUse===OPAQUE ? MAX_OPAQUE : MAX_RUNTIME);
      }
      return net;
    }catch{
      return new Response('', {status:204});
    }
  })());
});
