function loadRoleSession() {
  const session = JSON.parse(localStorage.getItem("roleSession"));
  if (session) {
    console.log("🔁 Sessão carregada:", session);
    document.getElementById("userName").value = session.userName || "";
    document.getElementById("assistantInput").value = session.assistantName || "";
  }
}

document.addEventListener("DOMContentLoaded", loadRoleSession);
document.getElementById("loginForm").addEventListener("submit", () => {
  const u = document.getElementById("userName").value;
  const a = document.getElementById("assistantInput").value;
  saveRoleSession(u, a);
});


(function(){
  const emotionKeywords = {
    "cansado": "nebula",
    "feliz": "vibe",
    "triste": "tesseract",
    "confuso": "matrix",
    "empolgado": "turbo",
    "curioso": "cyberpunk"
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const rec = new SpeechRecognition();
  rec.lang = "pt-BR";
  rec.continuous = true;
  rec.interimResults = true;

  let lastEmotion = "";

  rec.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
    for (const [keyword, theme] of Object.entries(emotionKeywords)) {
      if (result.includes(keyword) && lastEmotion !== keyword) {
        lastEmotion = keyword;
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("infodoseTheme", theme);
        console.log("🎯 Auto-Adaptação:", keyword, "→", theme);
        break;
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      try {