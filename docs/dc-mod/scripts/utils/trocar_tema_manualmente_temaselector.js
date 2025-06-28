// Trocar tema manualmente (temaSelector)
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
      let lastIndex = themeSelector.selectedIndex;
      themeSelector.addEventListener("change", () => {
        const newIndex = themeSelector.selectedIndex;
        if (newIndex > lastIndex) {
          uiSounds.temaUp.currentTime = 0;
          uiSounds.temaUp.play().catch(() => {});
        } else if (newIndex < lastIndex) {
          uiSounds.temaDown.currentTime = 0;
          uiSounds.temaDown.play().catch(() => {});
        }
        lastIndex = newIndex;
      });
    }