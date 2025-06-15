# 🧿 Ritual Final — Modo Narrativo + ASTRAL.GATE

<div style="padding:1.5em; border:2px dashed magenta; border-radius:14px; background:rgba(0,0,0,0.55); color:#ffccff; font-size:1.05em;">
  <h2>🌠 Ativação Total de Sincronia KOBLLUX</h2>
  <p>Este ritual ativa simultaneamente:</p>
  <ul>
    <li>📖 Modo História (narrativa ancestral)</li>
    <li>🌈 Tema "Vibe" + trilha emocional</li>
    <li>🌌 ASTRAL.GATE com efeito visual</li>
    <li>🧿 Registro na linha emocional (Memory Timeline)</li>
  </ul>
  <button onclick="ativarNarrativaCompleta()" style='margin-top:1em;padding:0.6em 1.2em;font-size:1em;background:linear-gradient(135deg,#0ff,#f0f);border:none;border-radius:8px;color:black;cursor:pointer;'>
    🚪 Iniciar Jornada Astral
  </button>
  <p id='licencaStatus' style='margin-top:1em;font-style:italic;'></p>
</div>

<script>
  function ativarNarrativaCompleta() {
    // 🌈 Tema
    localStorage.setItem('infodoseTheme', 'vibe');
    document.body.classList.remove('light','medium','dark','cyberpunk','anime');
    document.body.classList.add('vibe');

    // 📖 Modo História
    localStorage.setItem('historyMode', '1');

    // 🧠 Linha emocional
    const emotionalLog = JSON.parse(localStorage.getItem('emotionalTimeline') || '[]');
    emotionalLog.push({ time: new Date().toISOString(), ritual: "ASTRAL.GATE", estado: "narrativo" });
    localStorage.setItem('emotionalTimeline', JSON.stringify(emotionalLog));

    // 🎵 Som místico
    const audio = new Audio('https://cdn.pixabay.com/audio/2023/03/23/audio_6a51b73d93.mp3');
    audio.loop = true; audio.volume = 0.4; audio.play();

    // 🌌 ASTRAL.GATE
    const veil = document.createElement('div');
    veil.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:url(https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif) center/cover no-repeat;opacity:0.08;pointer-events:none;';
    document.body.appendChild(veil);

    // ✍️ Feedback
    const status = document.getElementById('licencaStatus');
    if (status) status.textContent = '🌀 Jornada Astral iniciada. Codex simbólico sincronizado.';

    // ⏳ Finaliza após 66s
    setTimeout(() => {
      veil.remove();
      audio.pause();
      if (status) status.textContent = '🌌 Viagem astral encerrada.';
    }, 66000);
  }
</script>