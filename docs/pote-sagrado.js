
// 🔮 POTE SAGRADO — Dual.infodose Integration (KOBLLUX)

const pulsos = document.getElementById("pulsos");

function logMistico(msg) {
  const el = document.createElement("div");
  el.className = "debug-mistico";
  el.innerText = "◉ " + msg;
  pulsos.appendChild(el);
  if (!pulsos.classList.contains("expanded")) {
    pulsos.scrollTop = pulsos.scrollHeight;
  }
}

function showLoading(msg){
  const wrap = document.querySelector('.pages-wrapper');
  wrap.innerHTML = '';
  const p = document.createElement('div');
  p.className = 'page active';
  const foot = document.createElement('p');
  foot.className = 'footer-text loading';
  msg.split('').forEach((ch,i)=>{
    const sp = document.createElement('span');
    sp.textContent = ch;
    sp.style.animationDelay = (i*0.02) + 's';
    sp.classList.add('loading');
    foot.appendChild(sp);
  });
  p.appendChild(foot);
  wrap.appendChild(p);
  const utter = new SpeechSynthesisUtterance(msg);
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ✨ Função sagrada para enviar conteúdo com pulso à IA
function potePerfeito(dado) {
  showLoading('🔄 Enviando pulso ao núcleo...');
  conversation.push({ role: 'user', content: dado });
  callAI();
}

// ✉️ Atalho simbólico para envio automático de cliques simbólicos, emojis, textos
function registrarPulsoEEnviar(texto) {
  document.getElementById('userInput').value = texto;
  potePerfeito(texto);
  logMistico('📩 Pulso manual enviado: ' + texto);
}
