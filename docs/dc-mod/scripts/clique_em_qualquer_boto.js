// Clique em qualquer botão
    document.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        uiSounds.click.currentTime = 0;
        uiSounds.click.play().catch(() => {});
      });
      btn.addEventListener("mouseover", () => {
        uiSounds.hover.currentTime = 0;
        uiSounds.hover.play().catch(() => {});
      });
    });