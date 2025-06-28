// Substituir autoSpeakPage para usar speakReal
window.autoSpeakPage = function(text) {
  if (!text || typeof text !== "string") return;
  try {
    speakReal(text);
  } catch (err) {
    console.error("Erro ao sintetizar fala:", err);
  }
}