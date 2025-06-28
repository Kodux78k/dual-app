// Substitui a função de fala padrão
  window.autoSpeakPage = function (text) {
    if (typeof text === "string" && text.trim()) {
      speakTextEnhanced(text);
    }
  };