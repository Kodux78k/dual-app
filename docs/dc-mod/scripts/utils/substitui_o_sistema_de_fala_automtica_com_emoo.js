// Substitui o sistema de fala automática com emoção
window.autoSpeakPage = function(text) {
  if (!text || typeof text !== "string") return;
  try {
    speakRealEmotion(text);
  } catch (err) {
    console.error("Erro ao sintetizar fala emocional:", err);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePlayer");
  const controls = document.getElementById("playerControls");
  const playPauseBtn = document.getElementById("playPause");
  const trackSelect = document.getElementById("trackSelect");
  const binauralSelect = document.getElementById("binauralSelect");
  const trackVolume = document.getElementById("trackVolume");
  const binauralVolume = document.getElementById("binauralVolume");

  const trackAudio = new Audio();
  const binauralAudio = new Audio();

  toggleBtn.addEventListener("click", () => {
    controls.style.display = controls.style.display === "flex" ? "none" : "flex";
  });

playPauseBtn.addEventListener("click", () => {
  if (!trackAudio.src) {
    alert("Selecione uma trilha primeiro.");
    return;
  }

  if (trackAudio.paused) {
    trackAudio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    trackAudio.pause();
    playPauseBtn.textContent = "►";
  }
});

  trackSelect.addEventListener("change", () => {
    trackAudio.src = `assets/sounds/trilhas/${trackSelect.value}.mp3`;
    trackAudio.play();
    playPauseBtn.textContent = "⏸";
  });

  binauralSelect.addEventListener("change", () => {
    if (binauralSelect.value) {
      binauralAudio.src = `assets/sounds/binaural/${binauralSelect.value}.mp3`;
      binauralAudio.loop = true;
      binauralAudio.play();
    } else {
      binauralAudio.pause();
    }
  });

  trackVolume.addEventListener("input", () => {
    trackAudio.volume = trackVolume.value;
  });

  binauralVolume.addEventListener("input", () => {
    binauralAudio.volume = binauralVolume.value;
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const trackAudio = new Audio();
  const binauralAudio = new Audio();

  const toggleBtn = document.getElementById("togglePlayer");
  const controls = document.getElementById("playerControls");
  const playPauseBtn = document.getElementById("playPause");
  const trackSelect = document.getElementById("trackSelect");
  const binauralSelect = document.getElementById("binauralSelect");
  const trackVolume = document.getElementById("trackVolume");
  const binauralVolume = document.getElementById("binauralVolume");

  const presetSelect = document.createElement("select");
  presetSelect.id = "presetSelect";
  const savePresetBtn = document.createElement("button");
  savePresetBtn.textContent = "💾 Salvar Preset";
  controls.appendChild(presetSelect);
  controls.appendChild(savePresetBtn);

  