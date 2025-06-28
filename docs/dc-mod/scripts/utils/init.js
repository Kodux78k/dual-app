// init
  const savedTheme = localStorage.getItem("infodoseTheme") || "dark";
  applyBasicTheme(savedTheme);
  sel.value = savedTheme;
  loadSaved();
  sel.addEventListener("change", () => {
    const val = sel.value;
    if (val === "toggle-advanced") {
      adv.style.display = adv.style.display === "none" ? "block" : "none";
      savedGroup.style.display = adv.style.display;