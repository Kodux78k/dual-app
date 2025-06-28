function loadBinaural(src, volume) {
    fadeAudio(binauralAudio, 0);
    setTimeout(() => {
      binauralAudio.src = src;
      binauralAudio.loop = true;
      binauralAudio.volume = 0;
      binauralAudio.dataset.targetVolume = volume;
      binauralAudio.play();
      fadeAudio(binauralAudio, volume);
    }, 1000);
  }

  trackSelect.addEventListener("change", () => {
    if (trackSelect.value) {
      loadTrack(`assets/sounds/trilhas/${trackSelect.value}.mp3`, trackVolume.value);
      playPauseBtn.textContent = "⏸";
    } else {
      fadeAudio(trackAudio, 0);
      setTimeout(() => trackAudio.pause(), 1000);
    }
  });

  binauralSelect.addEventListener("change", () => {
    if (binauralSelect.value) {
      loadBinaural(`assets/sounds/binaural/${binauralSelect.value}.wav`, binauralVolume.value);
    } else {
      fadeAudio(binauralAudio, 0);
      setTimeout(() => binauralAudio.pause(), 1000);
    }
  });

  trackVolume.addEventListener("input", () => {
    trackAudio.dataset.targetVolume = trackVolume.value;
    trackAudio.volume = trackVolume.value;
  });

  binauralVolume.addEventListener("input", () => {
    binauralAudio.dataset.targetVolume = binauralVolume.value;
    binauralAudio.volume = binauralVolume.value;
  });

  savePresetBtn.addEventListener("click", () => {
    const presets = JSON.parse(localStorage.getItem("koblluxPresets") || "[]");
    const name = prompt("Nome do preset:");
    if (!name) return;
    presets.push({
      name,
      track: trackSelect.value,
      binaural: binauralSelect.value,
      trackVol: trackVolume.value,
      binauralVol: binauralVolume.value
    });
    localStorage.setItem("koblluxPresets", JSON.stringify(presets));
    loadPresets();
  });

  presetSelect.addEventListener("change", () => {
    const presets = JSON.parse(localStorage.getItem("koblluxPresets") || "[]");
    const preset = presets[presetSelect.selectedIndex - 1];
    if (!preset) return;
    trackSelect.value = preset.track;
    binauralSelect.value = preset.binaural;
    trackVolume.value = preset.trackVol;
    binauralVolume.value = preset.binauralVol;
    if (preset.track) loadTrack(`assets/sounds/trilhas/${preset.track}.mp3`, preset.trackVol);
    if (preset.binaural) loadBinaural(`assets/sounds/binaural/${preset.binaural}.wav`, preset.binauralVol);
  });

  