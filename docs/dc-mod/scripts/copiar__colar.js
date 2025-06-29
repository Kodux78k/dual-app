// Copiar / colar
  document.querySelectorAll('.copy-button, .paste-button').forEach(btn =>
    btn.addEventListener("click", () => {
      uiBL.cancel.currentTime = 0;
      uiBL.cancel.play().catch(()=>{});
    })
  );
});


const themePresets = {
  "Nebulosa Mística": {
    bg: "#1b003b",
    text: "#cfcaff",
    glow: 0.4
  },
  "Céu da Manhã": {
    bg: "#dbe9ff",
    text: "#001f3f",
    glow: 0.15
  },
  "Modo Hacker": {
    bg: "#000000",
    text: "#00ff00",
    glow: 0.3
  },
  "Código Cósmico": {
    bg: "#0a0a23",
    text: "#ff99ff",
    glow: 0.5
  }
};

const presetSelector = document.createElement("select");
presetSelector.style.cssText = "margin-top:10px; padding:6px; background:#111; color:#0ff; border-radius:8px;";
presetSelector.innerHTML = "<option disabled selected>🎨 Aplicar Preset</option>" +
  Object.keys(themePresets).map(name => `<option value='\${name}'>\${name}</option>`).join("");
document.getElementById("themeEditor")?.appendChild(presetSelector);

presetSelector.addEventListener("change", (e) => {
  const p = themePresets[e.target.value];
  if (!p) return;
  document.body.style.background = p.bg;
  document.body.style.color = p.text;
  document.querySelectorAll(".response-block").forEach(el => {
    el.style.boxShadow = `0 0 \${p.glow * 40}px rgba(0,255,255,\${p.glow})`;
  });
});


(