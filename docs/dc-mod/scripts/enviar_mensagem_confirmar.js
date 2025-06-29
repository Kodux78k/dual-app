// Enviar mensagem (confirmar)
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        uiSounds.confirm.currentTime = 0;
        uiSounds.confirm.play().catch(() => {});
      });
    }