function applyBasicTheme(theme) {
    document.body.classList.remove("light","medium","vibe");
    if (theme !== "dark") document.body.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("infodoseTheme", theme);
  }