(function(){
  function initKoblluxPlayer() {
    if (document.getElementById('koblluxPlayer')) return;
    const container = document.createElement('div');
    container.id = 'koblluxPlayer';
    container.style.position='fixed';
    container.style.top='42px';
    container.style.left='20px';
    container.style.zIndex='7';
    container.style.background='rgba(0,0,0,0.8)';
    container.style.backdropFilter='blur(9px)';
    container.style.padding='5px';
    container.style.borderRadius='10px';
    container.style.display='flex';
    container.style.flexDirection='column';
    container.style.gap='6px';
    container.style.transition='all 0.6s ease';
    container.style.maxWidth='199px';
    container.style.color='var(--text)';
    container.style.fontFamily='monospace';
    container.innerHTML = `
      <button id="togglePlayer" style="font-size:20px;background:none;border:none;color:inherit;cursor:pointer;">≈</button>
      <div class="hidden" id="playerWrapper"></div>
      <div id="playerControls" style="display:none;flex-direction:column;gap:8px;">
        <button id="playPause" style="font-size:22px;background:none;">►</button>
        <select id="trackSelect">
          <option value="">🎵 Escolha uma trilha</option>
          <option value="Sono_Profundo">🌙 Sono Profundo</option>
          <option value="Manifestação">✨ Manifestação</option>
          <option value="Ativação_Pineal">🧠 Ativação Pineal</option>
          <option value="Alívio_da_Ansiedade">🌿 Alívio da Ansiedade</option>
          <option value="Meditação_Theta">◉ Meditação Theta</option>
          <option value="Viagem_Astral">🌌 Viagem Astral</option>
          <option value="Foco_Profundo">🎯 Foco Profundo</option>
          <option value="Flow_State">🌊 Flow State</option>
          <option value="Relaxamento_Rápido">💤 Relaxamento Rápido</option>
          <option value="Concentração_Sustentada">📚 Concentração Sustentada</option>
          <option value="Cura_Emocional">💖 Cura Emocional</option>
          <option value="Recuperação_Física">🏋️ Recuperação Física</option>
          <option value="matrix">🧪 Matrix</option>
          <option value="tesseract">🧿 Tesseract</option>
        </select>
        <select id="binauralSelect">
          <option value="">🎶 Binaural Desativado</option>
          <option value="Sono_Profundo">🌙 Sono Profundo</option>
          <option value="Manifestação">✨ Manifestação</option>
          <option value="Ativação_Pineal">🧠 Ativação Pineal</option>
          <option value="Alívio_da_Ansiedade">🌿 Alívio da Ansiedade</option>
          <option value="Meditação_Theta">◉ Meditação Theta</option>
          <option value="Viagem_Astral">🌌 Viagem Astral</option>
          <option value="Foco_Profundo">🎯 Foco Profundo</option>
          <option value="Flow_State">🌊 Flow State</option>
          <option value="Relaxamento_Rápido">💤 Relaxamento Rápido</option>
          <option value="Concentração_Sustentada">📚 Concentração Sustentada</option>
          <option value="Cura_Emocional">💖 Cura Emocional</option>
          <option value="Recuperação_Física">🏋️ Recuperação Física</option>
          <option value="matrix">🧪 Matrix</option>
          <option value="tesseract">🧿 Tesseract</option>
        </select>
        <label>🎵 Volume Trilha
          <input id="trackVolume" type="range" min="0" max="1" step="0.01" value="1">
        </label>
        <label>🧘 Volume Binaural
          <input id="binauralVolume" type="range" min="0" max="1" step="0.01" value="1">
        </label>
      </div>
    `;
    document.body.appendChild(container);
    // Set up event listeners
    const toggleBtn = container.querySelector('#togglePlayer');
    const controls = container.querySelector('#playerControls');
    const playPauseBtn = container.querySelector('#playPause');
    const trackSelect = container.querySelector('#trackSelect');
    const binauralSelect = container.querySelector('#binauralSelect');
    const trackVolume = container.querySelector('#trackVolume');
    const binauralVolume = container.querySelector('#binauralVolume');
    const trackAudio = new Audio();
    const binauralAudio = new Audio();
    toggleBtn.addEventListener('click', () => {
      controls.style.display = controls.style.display === 'flex' ? 'none' : 'flex';
    });
    playPauseBtn.addEventListener('click', () => {
      if (trackAudio.src) trackAudio.paused ? trackAudio.play() : trackAudio.pause();
      if (binauralAudio.src) binauralAudio.paused ? binauralAudio.play() : binauralAudio.pause();
      playPauseBtn.textContent = (trackAudio.paused && binauralAudio.paused) ? '►' : '⏸';
    });
    trackSelect.addEventListener('change', () => {
      if (trackSelect.value) {
        trackAudio.src = `assets/sounds/trilhas/${trackSelect.value}.mp3`;
        trackAudio.loop = true;
        trackAudio.volume = trackVolume.value;
        trackAudio.play();
        playPauseBtn.textContent = '⏸';
      } else {
        trackAudio.pause();
        trackAudio.src = '';
      }
    });
    binauralSelect.addEventListener('change', () => {
      if (binauralSelect.value) {
        binauralAudio.src = `assets/sounds/binaural/${binauralSelect.value}.wav`;
        binauralAudio.loop = true;
        binauralAudio.volume = binauralVolume.value;
        binauralAudio.play();
      } else {
        binauralAudio.pause();
        binauralAudio.src = '';
      }
    });
    trackVolume.addEventListener('input', () => {
      trackAudio.volume = trackVolume.value;
    });
    binauralVolume.addEventListener('input', () => {
      binauralAudio.volume = binauralVolume.value;
    });
  }
  window.initKoblluxPlayer = initKoblluxPlayer;
})();
