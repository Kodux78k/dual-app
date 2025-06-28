function changeTheme(val) {
  const body = document.body;
  const allThemes = ['light','dark','medium','vibe','cyberpunk','matrix','turbo','emotion-detector','emotion-ai','tesseract','anime','nebula'];
  allThemes.forEach(t => body.classList.remove(t));
  body.setAttribute("data-theme", val);
  body.classList.add(val);
  localStorage.setItem("infodoseTheme", val);
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
    if (trackAudio.src) trackAudio.paused ? trackAudio.play() : trackAudio.pause();
    if (binauralAudio.src) binauralAudio.paused ? binauralAudio.play() : binauralAudio.pause();
    playPauseBtn.textContent = (trackAudio.paused && binauralAudio.paused) ? "►" : "⏸";
  });

  trackSelect.addEventListener("change", () => {
    if (trackSelect.value) {
      trackAudio.src = `assets/sounds/trilhas/${trackSelect.value}.mp3`;
      trackAudio.loop = true;
      trackAudio.volume = trackVolume.value;
      trackAudio.play();
      playPauseBtn.textContent = "⏸";
    } else {
      trackAudio.pause();
      trackAudio.src = "";
    }
  });

  binauralSelect.addEventListener("change", () => {
    if (binauralSelect.value) {
      binauralAudio.src = `assets/sounds/binaural/${binauralSelect.value}.wav`;
      binauralAudio.loop = true;
      binauralAudio.volume = binauralVolume.value;
      binauralAudio.play();
    } else {
      binauralAudio.pause();
      binauralAudio.src = "";
    }
  });

  trackVolume.addEventListener("input", () => {
    trackAudio.volume = trackVolume.value;
  });

  binauralVolume.addEventListener("input", () => {
    binauralAudio.volume = binauralVolume.value;
  });
});


    