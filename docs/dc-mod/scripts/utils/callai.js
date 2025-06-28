function callAI(prompt) {
  return fetch('/api/ai', { method:'POST', body: JSON.stringify({ prompt }) })
    .then(r => r.json()).then(r => r.text);
}
