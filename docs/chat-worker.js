// chat-worker.js
// Minimal worker com fila + timeout + backoff + abort

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Configuráveis
const DEFAULT_TIMEOUT_MS = 20000;   // 20s
const MAX_RETRIES = 2;              // tentativas extras
const BASE_BACKOFF_MS = 1200;       // backoff exponencial

let shuttingDown = false;

self.onmessage = async (e) => {
  const msg = e.data || {};
  if (msg.type === 'shutdown') { shuttingDown = true; return; }
  if (msg.type !== 'chat') return;

  const { id, payload } = msg;
  // payload: { model, messages, temperature, headers (opcional), stream (bool) }

  try {
    const result = await withRetries(() => doChat(payload), MAX_RETRIES);
    self.postMessage({ type: 'chat:done', id, ok: true, result });
  } catch (err) {
    self.postMessage({ type: 'chat:done', id, ok: false, error: err.message || String(err) });
  }
};

async function withRetries(fn, retries) {
  let last;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (i < retries) {
        const wait = BASE_BACKOFF_MS * Math.pow(2, i);
        await sleep(wait);
      }
    }
  }
  throw last;
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function doChat({ model, messages, temperature = 0.2, headers = {}, stream = false }) {
  if (shuttingDown) throw new Error('Worker is shutting down');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const body = {
      model,
      messages,
      temperature
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Dica: injete Authorization no fetch-wrapper global do seu app, ou passe aqui via headers.Authorization
        ...headers
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    if (!res.ok) {
      let payload;
      try { payload = await res.json(); } catch(_) {}
      throw new Error(payload?.error?.message || `HTTP ${res.status}`);
    }

    // Modo simples (não-stream) — retorna um único texto
    const json = await res.json();
    const text = json?.choices?.[0]?.message?.content?.trim?.() || '';
    return { text, raw: json };
  } finally {
    clearTimeout(timeout);
  }
}