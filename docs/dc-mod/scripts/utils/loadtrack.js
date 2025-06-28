function loadTrack(src, volume) {
    fadeAudio(trackAudio, 0);
    setTimeout(() => {
      trackAudio.src = src;
      trackAudio.loop = true;
      trackAudio.volume = 0;
      trackAudio.dataset.targetVolume = volume;
      trackAudio.play();
      fadeAudio(trackAudio, volume);
    }, 1000);
  }

  