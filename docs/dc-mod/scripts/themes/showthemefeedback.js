function showThemeFeedback(theme) {
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.inset = 0;
  flash.style.background = 'black';
  flash.style.opacity = 0.6;
  flash.style.zIndex = 9999;
  flash.style.pointerEvents = 'none';
  flash.style.transition = 'opacity 0.6s ease-out';
  document.body.appendChild(flash);
  setTimeout(() => { flash.style.opacity = 0; }, 50);
  setTimeout(() => { document.body.removeChild(flash); }, 700);

  const audio = new Audio('assets/sounds/notify.mp3');
  audio.volume = 0.3;
  audio.play().catch(()=>{});
}
const originalSetAttribute = document.body.setAttribute;
document.body.setAttribute = function(attr, val) {
  if (attr === 'data-theme') {
    showThemeFeedback(val);
  }
  originalSetAttribute.call(this, attr, val);
};


let silentMode = false;
const toggleSilent = document.createElement('button');
toggleSilent.innerText = '🧘 Modo Silencioso';
toggleSilent.style.cssText = 'position:fixed;bottom:12px;left:12px;padding:8px 12px;z-index:9999;background:#111;color:#0ff;border:1px solid #0ff;border-radius:8px;cursor:pointer';
document.body.appendChild(toggleSilent);
toggleSilent.addEventListener('click', () => {
  silentMode = !silentMode;
  toggleSilent.innerText = silentMode ? '🔈 Ativar Som' : '🧘 Modo Silencioso';
  speechSynthesis.cancel();
});
const originalSpeak = speechSynthesis.speak;
speechSynthesis.speak = function(utter) {
  if (!silentMode) originalSpeak.call(speechSynthesis, utter);
};


const themeEditor = document.createElement('div');
themeEditor.id = 'themeEditor'; themeEditor.classList.add('hidden'); themeEditor.style.cssText = 'position:fixed;top:120px;right:12px;z-index:9999;background:#111;color:#0ff;padding:12px;border-radius:8px;display:flex;flex-direction:column;gap:8px';
themeEditor.innerHTML = `
<label>🎨 Cor de fundo: <input type="color" id="bgColor"></label>
<label>🖍️ Cor do texto: <input type="color" id="textColor"></label>
<label>✨ Intensidade do brilho: <input type="range" id="glowAmount" min="0" max="1" step="0.05" value="0.2"></label>
`;
document.body.appendChild(themeEditor);

document.getElementById('bgColor').addEventListener('input', e => {
  document.body.style.background = e.target.value;
});
document.getElementById('textColor').addEventListener('input', e => {
  document.body.style.color = e.target.value;
});
document.getElementById('glowAmount').addEventListener('input', e => {
  const amount = e.target.value;
  document.querySelectorAll('.response-block').forEach(el => {
    el.style.boxShadow = `0 0 ${amount * 40}px rgba(0,255,255,${amount})`;
  });
});


