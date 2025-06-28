function loadPresets() {
    presetSelect.innerHTML = '<option>🎛️ Presets salvos...</option>';
    const presets = JSON.parse(localStorage.getItem("koblluxPresets") || "[]");
    presets.forEach(p => {
      const opt = document.createElement("option");
      opt.textContent = p.name;
      presetSelect.appendChild(opt);
    });
  }

  loadPresets();
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('togglePlayer').addEventListener('click', () => {
    document.getElementById('playerWrapper').classList.toggle('hidden');
  });
});


  document.getElementById('userThemeBtn')?.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem("SaveDesign"));
    if (!saved) return alert("Nenhum tema de usuário salvo.");
    document.body.classList.add("user");
    saved.forEach(({ property, value }) => {
      document.body.style.setProperty(property, value);
    });
  });


document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("themeSelector");
  const adv = document.getElementById("advancedThemes");
  const savedGroup = document.getElementById("savedThemes");