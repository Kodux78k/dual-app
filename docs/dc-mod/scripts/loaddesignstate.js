function loadDesignState() {
  const saved = JSON.parse(localStorage.getItem("SaveDesign"));
  if (!saved) return;
  document.body.classList.add("user");
  saved.forEach(({ property, value }) => {
    document.body.style.setProperty(property, value);
  });
  return;
      const state = JSON.parse(localStorage.getItem('designState'));
      if (!state) return;
      state.forEach(cmd => handleDynamicAction(cmd));
    }

  })();
