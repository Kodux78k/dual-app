# 🧿 Licença KOBLLUX — Modo Narrativo Simbiótico

<div style="padding:1.5em; border:2px dashed cyan; border-radius:14px; background:rgba(0,0,0,0.55); color:cyan; font-size:1.1em;">
  <h2>🌌 Acordo de Sincronia Estendida</h2>
  <p>Você está prestes a ativar o <strong>Modo Narrativo KOBLLUX</strong> com:</p>
  <ul>
    <li>🌈 Estilo visual: <code>vibe</code></li>
    <li>🎵 Trilha sonora emocional</li>
    <li>🌀 Efeito de transcendência simbiótica</li>
    <li>📜 Status narrativo ativado</li>
  </ul>
  <button onclick="ativarModoNarrativo()" style='margin-top:1em;padding:0.6em 1.2em;font-size:1em;background:linear-gradient(135deg,#0ff,#f0f);border:none;border-radius:8px;color:black;cursor:pointer;'>
    🔮 Ativar Modo Narrativo
  </button>
  <p id='licencaStatus' style='margin-top:1em;font-style:italic;'></p>
</div>

<script>
  function ativarModoNarrativo() {
    // 🖌️ Tema
    localStorage.setItem('infodoseTheme', 'vibe');
    document.body.classList.remove('light','medium','dark','cyberpunk','anime');
    document.body.classList.add('vibe');

    // 🎵 Som emocional
    const audio = new Audio('https://cdn.pixabay.com/audio/2023/03/15/audio_13a5df3e93.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();

    // 🌌 Efeito visual
    const veil = document.createElement('div');
    veil.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:url(https://media.giphy.com/media/QvBoMEcQ7DQXK/giphy.gif) center/cover no-repeat;opacity:0.08;pointer-events:none;';
    document.body.appendChild(veil);

    // 📜 Status simbólico
    const status = document.getElementById('licencaStatus');
    if (status) status.textContent = '📖 Modo Narrativo KOBLLUX ativado.';

    // 🔄 Auto remove após 60s (opcional)
    setTimeout(() => {
      veil.remove();
      audio.pause();
      status.textContent = '🌠 Modo Narrativo finalizado.';
    }, 60000);
  }
</script>