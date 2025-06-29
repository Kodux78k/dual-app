
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✔️ Service Worker registrado"))
    .catch(err => console.error("❌ Service Worker falhou:", err));
}
  


const emotionKeywords = {
  "cansado": "nebula",
  "feliz": "vibe",
  "triste": "tesseract",
  "confuso": "matrix",
  "empolgado": "turbo"
};

