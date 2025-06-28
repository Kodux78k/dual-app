// Web Speech API integração (ativar ao clicar no microfone)
const voiceBtn = document.getElementById("voiceBtn");
if (voiceBtn && window.SpeechRecognition || window.webkitSpeechRecognition) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRecognition();
  rec.lang = "pt-BR";
  voiceBtn.addEventListener("click", () => {
    rec.start();
    rec.onresult = e => {
      const texto = e.results[0][0].transcript;
      document.getElementById("userInput").value = texto;
      detectEmotionAndApplyTheme(texto);
    };
  });
}


