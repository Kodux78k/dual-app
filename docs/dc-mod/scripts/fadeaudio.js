function fadeAudio(audio, targetVolume, duration = 1000) {
    const start = audio.volume;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;
    const step = () => {
      currentStep++;
      audio.volume = start + (targetVolume - start) * (currentStep / steps);
      if (currentStep < steps) setTimeout(step, stepTime);
    };
    step();
  }

  toggleBtn.addEventListener("click", () => {
    controls.style.display = controls.style.display === "flex" ? "none" : "flex";
    loadPresets();
  });

  playPauseBtn.addEventListener("click", () => {
    [trackAudio, binauralAudio].forEach(audio => {
      if (audio.src) {
        if (audio.paused) {
          fadeAudio(audio, parseFloat(audio.dataset.targetVolume || 1));
          audio.play();
        } else {
          fadeAudio(audio, 0);
          setTimeout(() => audio.pause(), 1000);
        }
      }
    });
    setTimeout(() => {
      playPauseBtn.textContent = (trackAudio.paused && binauralAudio.paused) ? "►" : "⏸";
    }, 1000);
  });

  