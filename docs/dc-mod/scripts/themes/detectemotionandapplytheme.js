function detectEmotionAndApplyTheme(text) {
  const lower = text.toLowerCase();
  for (const [keyword, theme] of Object.entries(emotionKeywords)) {
    if (lower.includes(keyword)) {
      console.log("🎭 Emoção detectada:", keyword, "→ Tema:", theme);
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("infodoseTheme", theme);
      return;
    }
  }
}