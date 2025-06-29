// Navegação entre páginas
    document.querySelectorAll('[data-action="prev"]').forEach(btn =>
      btn.addEventListener("click", () => {
        uiSounds.back.currentTime = 0;
        uiSounds.back.play().catch(() => {});
      })
    );
    document.querySelectorAll('[data-action="next"]').forEach(btn =>
      btn.addEventListener("click", () => {
        uiSounds.confirm.currentTime = 0;
        uiSounds.confirm.play().catch(() => {});
      })
    );
  });