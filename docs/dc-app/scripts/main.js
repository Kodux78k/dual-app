
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✔️ Service Worker registrado"))
    .catch(err => console.error("❌ Service Worker falhou:", err));
}
  

const emotionKeywords = {
  "cansado": "nebula",
  "feliz": "vibe",
  "triste": "tesseract",
  "confuso": "matrix",
  "empolgado": "turbo"
};

function detectEmotionAndApplyTheme(text) {
  const lower = text.toLowerCase();
  for (const [keyword, theme] of Object.entries(emotionKeywords)) {
    if (lower.includes(keyword)) {
      console.log("🎭 Emoção detectada:", keyword, "→ Tema:", theme);
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("infodoseTheme", theme);
      return;
    }
  }
}

// Web Speech API integração (ativar ao clicar no microfone)
const voiceBtn = document.getElementById("voiceBtn");
if (voiceBtn && window.SpeechRecognition || window.webkitSpeechRecognition) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SpeechRecognition();
  rec.lang = "pt-BR";
  voiceBtn.addEventListener("click", () => {
    rec.start();
    rec.onresult = e => {
      const texto = e.results[0][0].transcript;
      document.getElementById("userInput").value = texto;
      detectEmotionAndApplyTheme(texto);
    };
  });
}

function saveRoleSession(userName, assistantName) {
  localStorage.setItem("roleSession", JSON.stringify({ userName, assistantName, date: Date.now() }));
}

function loadRoleSession() {
  const session = JSON.parse(localStorage.getItem("roleSession"));
  if (session) {
    console.log("🔁 Sessão carregada:", session);
    document.getElementById("userName").value = session.userName || "";
    document.getElementById("assistantInput").value = session.assistantName || "";
  }
}

document.addEventListener("DOMContentLoaded", loadRoleSession);
document.getElementById("loginForm").addEventListener("submit", () => {
  const u = document.getElementById("userName").value;
  const a = document.getElementById("assistantInput").value;
  saveRoleSession(u, a);
});

(function(){
  const emotionKeywords = {
    "cansado": "nebula",
    "feliz": "vibe",
    "triste": "tesseract",
    "confuso": "matrix",
    "empolgado": "turbo",
    "curioso": "cyberpunk"
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  const rec = new SpeechRecognition();
  rec.lang = "pt-BR";
  rec.continuous = true;
  rec.interimResults = true;

  let lastEmotion = "";

  rec.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
    for (const [keyword, theme] of Object.entries(emotionKeywords)) {
      if (result.includes(keyword) && lastEmotion !== keyword) {
        lastEmotion = keyword;
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("infodoseTheme", theme);
        console.log("🎯 Auto-Adaptação:", keyword, "→", theme);
        break;
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      try {
        //rec.start();//
        console.log("🎤 Modo auto-adaptativo contínuo ativado.");
      } catch(e) {
        console.warn("❌ Não foi possível iniciar reconhecimento contínuo:", e);
      }
    }, 3000);
  });
})();

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
      trackAudio.src = `../../assets/sounds/trilhas/${trackSelect.value}.mp3`;
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
      binauralAudio.src = `../../assets/sounds/binaural/${binauralSelect.value}.wav`;
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

    function applyThemeSelector(val){
      const body = document.body;
      body.classList.remove('light','medium','vibe','dark','cyberpunk','anime');
      if(val !== 'dark') body.classList.add(val);
      localStorage.setItem('infodoseTheme', val);
    }
    
  (function(){
    const STORAGE_KEY   = 'infodoseEnabled',
          THEME_KEY     = 'infodoseTheme',
          HISTORY_KEY   = 'historyMode',
          CONFIG = {
            TRAINING_MAIN:    '../../data/manifesto_infinity_metalux.txt',
            TRAINING_HISTORY: '../../data/codex/Protocolo_de_Equalização_KOBLLUX_A_Verdade_do_Uno.txt',
            API_URL:          'https://openrouter.ai/api/v1/chat/completions',
            MODEL:            'deepseek/deepseek-chat-v3-0324:free',
            TEMP:             0.2,
            CHUNK_SIZE:       12000,
            AUTH_TOKEN:       window.env?.API_KEYS || 'Bearer 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'
          };

    let training='', chunks=[], chunkIndex=0;
    let trainingHistory='', conversation=[];
    let isEnabled=false, isStudying=false, isHistory=false;
    let userName='', assistantBase='';
    let pages=[], currentPage=0, autoAdvance=true;
    const titles = ['🎁 Recompensa Inicial','👁️ Exploração e Curiosidade','⚡️ Antecipação Vibracional'];

    const $ = s => document.querySelector(s),
          create = (t,c,h) => { const e=document.createElement(t); if(c)e.className=c; if(h)e.innerHTML=h; return e; };

    document.addEventListener('DOMContentLoaded', async ()=>{

    
    // —— SuperMaster: handle AI commands DSL ——
    function handleAICommand(cmd) {
      switch(cmd.action) {
        case 'updateTheme':
          applyDynamicCSS(cmd.payload.cssVariable, cmd.payload.value);
          conversation.push({ role:'system', content:'Theme updated via AI command.' });
          break;
        case 'createButton':
          createPersistentButton(
            cmd.payload.id,
            cmd.payload.label,
            () => fetch(cmd.payload.onClickFetch.url, { method: cmd.payload.onClickFetch.method||'GET' })
                     .then(res => res.json())
                     .then(data => console.log(data))
          );
          conversation.push({ role:'system', content:'Button "'+cmd.payload.label+'" created via AI command.' });
          break;
        default:
          console.warn('Unknown AI action:', cmd.action);
      }
    }
    window.handleAICommand = handleAICommand;
      particlesJS('particles-js',{
        particles:{ number:{value:40}, color:{value:['#0ff','#f0f']},
          shape:{type:'circle'}, opacity:{value:0.4}, size:{value:2.4},
          move:{enable:true,speed:1.5}
        }, retina_detect:true
      });
      try {
        training = await fetch(CONFIG.TRAINING_MAIN).then(r=>r.text());
        for(let i=0;i<training.length;i+=CONFIG.CHUNK_SIZE) chunks.push(training.slice(i,i+CONFIG.CHUNK_SIZE));
      } catch(e){ console.error('Erro no treino:',e); }
      try { trainingHistory = await fetch(CONFIG.TRAINING_HISTORY).then(r=>r.text()); }
      catch(e){ console.error(e); }
      init();
    });

    function applyTheme(t){ document.body.classList.remove('light','medium','vibe'); if(t!=='dark') document.body.classList.add(t); }
    function toggleTheme(){ const o=['dark','light','medium','vibe'], c=localStorage.getItem(THEME_KEY)||'dark', n=o[(o.indexOf(c)+1)%o.length]; applyTheme(n); localStorage.setItem(THEME_KEY,n); }

    function init(){
      applyTheme(localStorage.getItem(THEME_KEY)||'dark');
      $('#themeToggle').addEventListener('click',toggleTheme);
      bindUI();
      loadConfig();
      if(!conversation.length) startConversation();
    }

    function loadConfig(){
      if(localStorage.getItem(STORAGE_KEY)==='1'){
        isEnabled=true;
        userName=localStorage.getItem('userName')||'';
        assistantBase=localStorage.getItem('assistantBase')||'';
        conversation=[{
          role:'system',
          content:(chunks[0]||training)
            + `\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.`
        }];
        chunkIndex=1;
        updateUI();
      }
      if(localStorage.getItem(HISTORY_KEY)==='1'){ isHistory=true; updateUI(); }
    }

    function startConversation(){
      const base = isHistory ? trainingHistory : (chunks[0]||training)+ `\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.`;
      const persona = isHistory ? 'CODEX dual.infodose.' : 'CODEX KOBLLUX Dual.infodose.';
      conversation=[{role:'system',content: base + '\n\nVocê é o ' + persona}];
      updateUI();
    }

    function updateUI(){
      $('#toggleBtn').classList.toggle('active',isEnabled);
      $('#kittyBtn').classList.toggle('active',isStudying);
      $('#historyBtn').classList.toggle('active',isHistory);
      $('#assistantName').textContent = isHistory
        ? 'CODEX: dual.infodose'
        : (isStudying ? 'Estudos dual.infodose' : (isEnabled ? assistantBase+' dual.infodose':''));  
      const cont=$('#logoContainer'), logo=$('#logoObj');
      cont.classList.add('fading');
      setTimeout(()=>{
        if(isHistory)       logo.data='../../assets/icons/pill_fusion-kblx-trinity3.png';
        else if(isStudying) logo.data='../../assets/icons/DualKittyKard-icon-3.png';
        else                 logo.data='../../assets/icons/pill_fusion-kblx-1.png';
        cont.classList.remove('fading');
      },999);
    }

    function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function showLoading(msg){
      const wrap=$('.pages-wrapper');
      wrap.innerHTML='';
      const p=create('div','page active'), foot=create('p','footer-text loading','');
      msg.split('').forEach((ch,i)=>{
        const sp=create('span'); sp.textContent=ch;
        sp.style.animationDelay=(i*0.02)+'s'; sp.classList.add('loading');
        foot.appendChild(sp);
      });
      p.appendChild(foot); wrap.appendChild(p);
      $('#pageIndicator').textContent = '1 / 1';
      speechSynthesis.cancel();
      speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
    }

   /**
 * Divide o texto em parágrafos simples.
 */
function splitText(t) {
  let ps = t.split(/\n\s*\n/).filter(p => p.trim());
  if (ps.length < 2) {
    ps = (t.match(/[^\.!\?]+[\.!\?]+/g) || []).map(s => s.trim());
  }
  return ps;
}

/**
 * Renderiza todas as páginas de resposta,
 * distribuindo os parágrafos de forma equilibrada.
 */
function renderResponse(txt) {
  const wrap = document.querySelector('.pages-wrapper');
  wrap.innerHTML = '';
  pages = []; currentPage = 0; autoAdvance = true;

  txt = txt
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

  const paras = splitText(txt),
        total = paras.length;
  if (total === 0) return;

  const maxPerPage = 3,
        numPages = Math.ceil(total / maxPerPage),
        baseSize = Math.floor(total / numPages),
        extra = total % numPages;

  let cursor = 0;
  for (let i = 0; i < numPages; i++) {
    const thisSize = baseSize + (i < extra ? 1 : 0),
          pg = document.createElement('div');
    pg.className = 'page' + (i === 0 ? ' active' : '');

    for (let j = 0; j < thisSize; j++) {
      const para = paras[cursor++].trim(),
            posClass = j === 0 ? 'intro' : (j === thisSize - 1 ? 'ending' : 'middle'),
            block = document.createElement('div');

      block.className = `response-block ${posClass}`;
      block.innerHTML = `<p>${para}</p>`;

      processDynamicCommands(block.querySelector('p'));
      attachBlockListeners(block, para);
      pg.appendChild(block);
    }

    wrap.appendChild(pg);
    pages.push(pg);
  }

  document.getElementById('pageIndicator').textContent = `1 / ${pages.length}`;
  autoSpeakPage(0);
}

/**
 * Lógica de click e síntese de fala extraída para limpeza e expansão.
 */
function attachBlockListeners(block, para) {
  block.addEventListener('click', () => {
    autoAdvance = false;

    const cleanPara = para
      .replace(/["“”‘’]/g, '')
      .replace(/[\u1F300-\u1F6FF\u1F900-\u1F9FF\u2600-\u26FF\u2700-\u27BF]/gu, '');

    // Fala com texto limpo
    const utter = new SpeechSynthesisUtterance(cleanPara);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);

    if (!block.dataset.spoken) {
      // Primeira vez: só fala e marca visual
      block.dataset.spoken = '1';
      block.classList.add('clicked');
    } else {
      // Segunda vez: expande e envia para a IA
      block.classList.add('expanded');

      if (!isEnabled) {
        isEnabled = true;
        localStorage.setItem(STORAGE_KEY, '1');
        updateUI();
      }

      showLoading(' Pulso em Expansão...');

      conversation.push({
        role: 'user',
        content: para,        // conteúdo original visível
        clean: cleanPara      // conteúdo limpo para IA, se necessário
      });

      callAI();
    }
  });
}
    function autoSpeakPage(i){
      const txts = Array.from(pages[i].querySelectorAll('p'))
        .map(p=>p.textContent).join(' ');
      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(txts);
      utter.onend = () => {
        if (autoAdvance && i < pages.length - 1) {
          changePage(1);
        } else if (i === pages.length - 1) {
          speechSynthesis.speak(
            new SpeechSynthesisUtterance('Do seu jeito. Sempre único. Sempre seu.')
          );
        }
      };
      speechSynthesis.speak(utter);
    }

    function changePage(d){
      const np = currentPage + d;
      if(np<0||np>=pages.length) return;
      pages[currentPage].classList.remove('active');
      pages[np].classList.add('active');
      currentPage=np;
      $('#pageIndicator').textContent = `${np+1} / ${pages.length}`;
      if(autoAdvance) autoSpeakPage(np);
    }

    async function callAI(){
      try {
        const res = await fetch(CONFIG.API_URL, {
          method:'POST',
          headers:{
            'Authorization': CONFIG.AUTH_TOKEN,
            'Content-Type':'application/json'
          },
          body: JSON.stringify({ model:CONFIG.MODEL, messages:conversation, temperature:CONFIG.TEMP })
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error?.message || res.statusText);
        const ans = data.choices[0].message.content.trim();
        conversation.push({ role:'assistant', content:ans });
        renderResponse(ans);
      } catch(e){
        console.error(e);
        conversation.push({role:'assistant',content:'Desculpe, não consegui obter resposta. Tente novamente.'});
        renderResponse('Desculpe, não consegui obter resposta. Tente novamente.');
      }
    }

    function bindUI(){
      $('#historyBtn').addEventListener('click',()=>{
        isHistory = !isHistory;
        localStorage.setItem(HISTORY_KEY, isHistory?'1':'0');
        startConversation();
      });
      $('#kittyBtn').addEventListener('click',()=>{
        isStudying = !isStudying;
        if(isStudying){
          conversation = [{ role:'system', content: (CONFIG?.SYSTEM_PROMPT || '') + training + '\n\nVocê é Assistente de Estudos dual.infodose.' }];
        } else {
          loadConfig();
        }
        updateUI();
      });
      $('#toggleBtn').addEventListener('click',()=>{
        if(!isEnabled) $('#loginBox').classList.add('active');
        else {
          isEnabled = false;
          localStorage.removeItem(STORAGE_KEY);
          conversation = [];
          updateUI();
        }
      });
      document.querySelector('.copy-button').addEventListener('click', ()=>{
        const allBlocks = document.querySelectorAll('.response-block');
        const textToCopy = Array.from(allBlocks).map(b => b.innerText).join('\n\n');
        navigator.clipboard.writeText(textToCopy);
      });
      document.querySelector('.paste-button').addEventListener('click',()=>{
        navigator.clipboard.readText().then(txt=>$('#userInput').value = txt);
      });
      $('#sendBtn').addEventListener('click', onSend);
      $('#userInput').addEventListener('keypress', e=>{ if(e.key==='Enter') onSend(); });
      $('#voiceBtn').addEventListener('click', ()=>{
        const rec = new (window.SpeechRecognition||window.webkitSpeechRecognition)();
        rec.lang='pt-BR'; rec.start();
        rec.onresult = evt=>{
          $('#userInput').value = evt.results[0][0].transcript;
          onSend();
        };
      });
      document.querySelector('.pagination').addEventListener('click', e=>{
        if(e.target.dataset.action==='prev') changePage(-1);
        if(e.target.dataset.action==='next') changePage(1);
        autoAdvance = false;
      });
      $('#loginForm').addEventListener('submit', e=>{
        e.preventDefault();
        const u = $('#userName').value.trim(), a = $('#assistantInput').value.trim();
        if(!u||!a) return alert('Preencha os dados');
        isEnabled = true; userName = u; assistantBase = a;
        localStorage.setItem(STORAGE_KEY,'1');
        localStorage.setItem('userName', u);
        localStorage.setItem('assistantBase', a);
        loadConfig();
        $('#loginBox').classList.remove('active');
      });
      document.body.addEventListener('click', e=>{
        if(e.target.closest('.footer-text')){
          document.querySelector('.pages-wrapper').classList.toggle('collapsed');
          e.target.closest('.footer-text').classList.toggle('active');
        }
      });
    }

    function onSend(){
      const raw = $('#userInput').value.trim();
if(!raw) return;
$('#userInput').value = '';
autoAdvance = false;

// 🔍 Mapeamento simbólico local
const lower = raw.toLowerCase();
if(lower.includes("cansado") || lower.includes("esgotado")){
  renderResponse("Respire... [[button:{\"label\":\"🧘 Meditar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#101F33\"}]}]]");
  return;
}
if(lower.includes("perdido") || lower.includes("confuso") || lower.includes("disperso")){
  renderResponse("Vamos centrar o foco: [[button:{\"label\":\"💎 Harmonizar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#2f2f4f\"}]}]]");
  return;
}
if(lower.includes("sem energia") || lower.includes("fraco") || lower.includes("desanimado")){
  renderResponse("Pulso em reativação... [[button:{\"label\":\"⚡ Reativar Pulso\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"linear-gradient(135deg,#0ff,#f0f)\"}]}]]");
  return;
}
if(lower.includes("travou") || lower.includes("reiniciar")){
  renderResponse("Vamos renovar o campo: [[button:{\"label\":\"🔄 Reiniciar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#000\"}]}]]");
  return;
}

// caso não ative símbolos, envia para IA
showLoading('Pulso enviado... Recebendo intenção…');
conversation.push({ role:'user', content: raw });
callAI();
    }

  
    // === Funções para comandos dinâmicos inline ===
    
    // === preserva HTML e injeta só [[…]] ===
    function processDynamicCommands(containerElem) {
      const CMD_REGEX = /\[\[([a-zA-Z0-9_]+):([\s\S]+?)\]\]/g;
      containerElem.innerHTML = containerElem.innerHTML.replace(
        CMD_REGEX,
        (full, type, payloadStr) => {
          let payload;
          try { payload = JSON.parse(payloadStr); }
          catch { return full; }
          switch (type) {
            case 'button':
              return `<button onclick='handleDynamicAction(${JSON.stringify(payload)})'>
                        ${payload.label || 'Botão'}
                      </button>`;
            case 'style':
              document.querySelectorAll(payload.element)
                      .forEach(el => el.style[payload.property] = payload.value);
              return '';
            case 'game':
              return `<canvas width="${payload.width||200}"
                               height="${payload.height||100}"
                               data-game='${payloadStr}'></canvas>`;
            default:
              return full;
          }
        }
      );
    }

    function handleDynamicAction(payload) {
      switch (payload.action) {
        case 'copy':
          navigator.clipboard.writeText(payload.data);
          break;
        case 'alert':
          alert(payload.message);
          break;
        case 'saveDesign':
          localStorage.setItem('designState', JSON.stringify(payload.state));
          break;
      }
    }

    function loadDesignState() {
  const saved = JSON.parse(localStorage.getItem("SaveDesign"));
  if (!saved) return;
  document.body.classList.add("user");
  saved.forEach(({ property, value }) => {
    document.body.style.setProperty(property, value);
  });
  return;
      const state = JSON.parse(localStorage.getItem('designState'));
      if (!state) return;
      state.forEach(cmd => handleDynamicAction(cmd));
    }

  })();
function detectarPulsoSimbolico(inputTexto) {
  const simbolos = ['Δ', '⚡', '🧠', '👁️'];
  const encontrados = simbolos.filter(s => inputTexto.includes(s));
  if (encontrados.length) {
    console.log('Pulso simbólico detectado:', encontrados.join(', '));
  }
}

function splitText(text, maxLen=1000) {
  const chunks = [];
  while (text.length > 0) chunks.push(text.slice(0, maxLen)), text = text.slice(maxLen);
  return chunks;
}
function callAI(prompt) {
  return fetch('/api/ai', { method:'POST', body: JSON.stringify({ prompt }) })
    .then(r => r.json()).then(r => r.text);
}
function renderResponse(txt){
  const wrap = document.querySelector('.pages-wrapper');
  wrap.innerHTML = '';
  pages = []; currentPage = 0; autoAdvance = true;

  txt = txt
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>');

  const paras = splitText(txt),
        total = paras.length;
  if (total === 0) return;

  const maxPerPage = 3,
        numPages   = Math.ceil(total / maxPerPage),
        baseSize   = Math.floor(total / numPages),
        extra      = total % numPages;

  let cursor = 0;
  for(let i = 0; i < numPages; i++){
    const thisSize = baseSize + (i < extra ? 1 : 0),
          pg        = document.createElement('div');
    pg.className = 'page' + (i === 0 ? ' active' : '');

    for(let j = 0; j < thisSize; j++){
      const para = paras[cursor++].trim(),
            posClass = j === 0 ? 'intro' : (j === thisSize - 1 ? 'ending' : 'middle'),
            block = document.createElement('div');
      block.className = `response-block ${posClass}`;
      block.innerHTML = `<p>${para}</p>`;
      processDynamicCommands(block.querySelector('p'));
      attachBlockListeners(block, para);
      pg.appendChild(block);
    }

    wrap.appendChild(pg);
    pages.push(pg);
  }

  document.getElementById('pageIndicator').textContent = `1 / ${pages.length}`;
  autoSpeakPage(0);
}
function attachBlockListeners(block, para){
  block.addEventListener('click', () => {
    autoAdvance = false;
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const clean = para.replace(/["“”‘’]/g,'').replace(/[\u1F300-\u1F6FF\u1F900-\u1F9FF\u2600-\u26FF\u2700-\u27BF]/g,'');
    const utter = new SpeechSynthesisUtterance(clean);
    speechSynthesis.speak(utter);
  });
}
function autoSpeakPage(i=0){
  if (!pages[i]) return;
  const blocks = pages[i].querySelectorAll('.response-block');
  let idx = 0;
  const speakNext = () => {
    if (idx >= blocks.length) return;
    const u = new SpeechSynthesisUtterance(blocks[idx].textContent);
    u.onend = speakNext;
    speechSynthesis.speak(u);
    idx++;
  };
  speakNext();
}
function renderASCIIResponse(container, ascii) {
  container.innerHTML = `<pre class="ascii-art">${ascii}</pre>`;
}
function createAsciiButton(text, callback) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.onclick = callback;
  return btn;
}
function processDynamicCommands(root) {
  root.innerHTML = root.innerHTML.replace(
    /\[\[button:([^\|\]]+)\|([^\]]+)\]\]/g,
    (_, lbl, cmd) => {
      const id = `btn-${Date.now()}-${Math.random()}`;
      setTimeout(() => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => handleCommand(cmd));
      }, 0);
      return `<button id="${id}">${lbl}</button>`;
    }
  );
}
function handleCommand(cmd) {
  if (cmd.startsWith('ascii:')) {
    const art = cmd.split(':')[1];
    const cont = document.querySelector('#chat-container');
    renderASCIIResponse(cont, atob(art));
  } else {
    callAI(cmd).then(resp => {
      renderResponse(resp);
    });
  }
}
document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('input-box').value;
  renderResponse('...');
  callAI(input).then(resp => renderResponse(resp));
});

// TRANSCENDENCE.OS ✨ Mutação simbiótica profunda

let emotionalLog = [];
let transcending = false;

function logEmotion(state) {
  const now = new Date().toISOString();
  emotionalLog.push({ time: now, ...state });
  localStorage.setItem('emotionalTimeline', JSON.stringify(emotionalLog));
}

function enterTranscendence() {
  if (transcending) return;
  transcending = true;

  document.body.style.transition = 'all 3s ease-in-out';
  document.body.style.background = 'linear-gradient(135deg, #3f007f, #000)';
  document.body.style.color = '#ccffcc';
  document.body.classList.add('transcendence');

  const veil = document.createElement('div');
  veil.id = 'veil';
  veil.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;background:url(https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif) center/cover no-repeat;opacity:0.05;';
  document.body.appendChild(veil);

  const chant = new Audio('https://cdn.pixabay.com/audio/2022/03/25/audio_348c0b5364.mp3');
  chant.loop = true;
  chant.volume = 0.4;
  chant.play();

  document.getElementById("status")?.textContent = "🌀 TRANSCENDENCE MODE ON";

  // auto exit after 60s
  setTimeout(() => {
    document.body.classList.remove('transcendence');
    document.body.style.background = '';
    document.body.style.color = '';
    if (document.getElementById('veil')) document.getElementById('veil').remove();
    chant.pause();
    transcending = false;
    document.getElementById("status")?.textContent = "🌌 Voltou do modo TRANSCENDÊNCIA";
  }, 60000);
}

function analyzeToneAndTrigger(inputText) {
  const lower = inputText.toLowerCase();
  const tone = {
    joy: lower.includes("feliz") || lower.includes("grato"),
    despair: lower.includes("cansado") || lower.includes("triste") || lower.includes("vazio"),
    wonder: lower.includes("maravilha") || lower.includes("cosmos") || lower.includes("amor")
  };

  if (tone.wonder) enterTranscendence();
  logEmotion({ input: inputText, tone });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  if (input) {
    input.addEventListener("change", () => analyzeToneAndTrigger(input.value));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("bootText");
  const txt = el?.dataset?.text || "";
  if (!el) return;
  el.textContent = "";
  let i = 0;
  function typeWriter() {
    if (i < txt.length) {
      el.textContent += txt.charAt(i);
      i++;
      setTimeout(typeWriter, 42);
    } else {
      el.classList.add("pulse");
    }
  }
  typeWriter();
});

async function speakReal(text) {
  const apiKey = CONFIG.AUTH_TOKEN || '';
  const voice = 'alloy'; // outros: echo, fable, onyx, nova
  const model = 'tts-1';

  const response = await fetch("https://openrouter.ai/api/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      voice,
      input: text
    })
  });

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}

// Substituir autoSpeakPage para usar speakReal
window.autoSpeakPage = function(text) {
  if (!text || typeof text !== "string") return;
  try {
    speakReal(text);
  } catch (err) {
    console.error("Erro ao sintetizar fala:", err);
  }
}

// Lista de vozes possíveis por emoção
const voiceMap = {
  neutral: "alloy",
  excited: "nova",
  calm: "fable",
  mysterious: "onyx",
  deep: "echo"
};

function detectEmotion(text) {
  text = text.toLowerCase();
  if (text.includes("mistério") || text.includes("interdimensional")) return "mysterious";
  if (text.includes("urgente") || text.includes("agora") || text.includes("!!!")) return "excited";
  if (text.includes("calma") || text.includes("tranquilo")) return "calm";
  if (text.includes("profundo") || text.includes("ritual")) return "deep";
  return "neutral";
}

async function speakRealEmotion(text) {
  const apiKey = CONFIG.AUTH_TOKEN || '';
  const emotion = detectEmotion(text);
  const voice = voiceMap[emotion];
  const model = 'tts-1';

  const response = await fetch("https://openrouter.ai/api/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      voice,
      input: text
    })
  });

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}

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
    trackAudio.src = `../../assets/sounds/trilhas/${trackSelect.value}.mp3`;
    trackAudio.play();
    playPauseBtn.textContent = "⏸";
  });

  binauralSelect.addEventListener("change", () => {
    if (binauralSelect.value) {
      binauralAudio.src = `../../assets/sounds/binaural/${binauralSelect.value}.mp3`;
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
      loadTrack(`../../assets/sounds/trilhas/${trackSelect.value}.mp3`, trackVolume.value);
      playPauseBtn.textContent = "⏸";
    } else {
      fadeAudio(trackAudio, 0);
      setTimeout(() => trackAudio.pause(), 1000);
    }
  });

  binauralSelect.addEventListener("change", () => {
    if (binauralSelect.value) {
      loadBinaural(`../../assets/sounds/binaural/${binauralSelect.value}.wav`, binauralVolume.value);
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
    if (preset.track) loadTrack(`../../assets/sounds/trilhas/${preset.track}.mp3`, preset.trackVol);
    if (preset.binaural) loadBinaural(`../../assets/sounds/binaural/${preset.binaural}.wav`, preset.binauralVol);
  });

  function loadPresets() {
    presetSelect.innerHTML = '<option>🎛️ Presets salvos...</option>';
    const presets = JSON.parse(localStorage.getItem("koblluxPresets") || "[]");
    presets.forEach(p => {
      const opt = document.createElement("option");
      opt.textContent = p.name;
      presetSelect.appendChild(opt);
    });
  }

  loadPresets();
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('togglePlayer').addEventListener('click', () => {
    document.getElementById('playerWrapper').classList.toggle('hidden');
  });
});

  document.getElementById('userThemeBtn')?.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem("SaveDesign"));
    if (!saved) return alert("Nenhum tema de usuário salvo.");
    document.body.classList.add("user");
    saved.forEach(({ property, value }) => {
      document.body.style.setProperty(property, value);
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("themeSelector");
  const adv = document.getElementById("advancedThemes");
  const savedGroup = document.getElementById("savedThemes");
  // Load saved themes into savedGroup
  function loadSaved() {
    const saved = JSON.parse(localStorage.getItem("savedThemes") || "[]");
    savedGroup.innerHTML = "";
    saved.forEach(item => {
      const opt = document.createElement("option");
      opt.value = "saved:" + item.value;
      opt.textContent = "💾 " + item.name;
      savedGroup.appendChild(opt);
    });
  }
  function applyBasicTheme(theme) {
    document.body.classList.remove("light","medium","vibe");
    if (theme !== "dark") document.body.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("infodoseTheme", theme);
  }
  // init
  const savedTheme = localStorage.getItem("infodoseTheme") || "dark";
  applyBasicTheme(savedTheme);
  sel.value = savedTheme;
  loadSaved();
  sel.addEventListener("change", () => {
    const val = sel.value;
    if (val === "toggle-advanced") {
      adv.style.display = adv.style.display === "none" ? "block" : "none";
      savedGroup.style.display = adv.style.display; // show saved with advanced
      sel.value = document.documentElement.getAttribute("data-theme") || "dark";
    } else if (val === "save-current") {
      // Prompt for name
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const name = prompt("Nome para salvar o tema:");
      if (name) {
        const list = JSON.parse(localStorage.getItem("savedThemes") || "[]");
        list.push({ value: current, name: name });
        localStorage.setItem("savedThemes", JSON.stringify(list));
        loadSaved();
      }
      // keep advanced open
      sel.value = current;
    } else if (val.startsWith("saved:")) {
      const key = val.split(":")[1];
      const list = JSON.parse(localStorage.getItem("savedThemes") || "[]");
      const item = list.find(i => i.name === key);
      if (item) applyBasicTheme(item.value);
      adv.style.display = "none";
      savedGroup.style.display = "none";
      sel.value = item.value;
    } else {
      applyBasicTheme(val);
      adv.style.display = "none";
      savedGroup.style.display = "none";
    }
  });
});

  document.getElementById('themeSelector').addEventListener('change', function () {
    document.documentElement.setAttribute('data-theme', this.value);

    // Layer extra para Matrix
    const existing = document.querySelector('.pulse-energy');
    if (this.value === 'matrix' && !existing) {
      const pulse = document.createElement('div');
      pulse.className = 'pulse-energy';
      document.body.appendChild(pulse);
    } else if (this.value !== 'matrix' && existing) {
      existing.remove();
    }
  });

  function speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }

  document.querySelectorAll('.block').forEach(block => {
    let clickedOnce = false;
    block.addEventListener('click', () => {
      const title = block.querySelector('.intro, .middle, .ending')?.textContent || 'Bloco';
      const text = block.querySelector('p')?.textContent || '';
      const fullText = title + ": " + text;

      if (!clickedOnce) {
        speakText(fullText);
        clickedOnce = true;
      } else {
        window.speechSynthesis.cancel();
        const input = document.getElementById('userInput');
        if (input) input.value = fullText;
        clickedOnce = false;
      }
    });
  });

  // Atualiza a lista de temas
  const nebulaOption = document.createElement("option");
  nebulaOption.value = "nebula";
  nebulaOption.textContent = "🌌 Nebula";
  document.querySelector("#advancedThemes")?.appendChild(nebulaOption);

  // Som ao clicar
  const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_ae7b82e34e.mp3?filename=click-124467.mp3");
  clickSound.volume = 0.15;

  // Adiciona som a todos os blocos
  document.addEventListener("click", function (e) {
    const block = e.target.closest(".response-block");
    if (block) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  });

  // Fallback para voz feminina com prioridade `nova`
  function speakTextEnhanced(text) {
    const emotion = detectEmotion?.(text) || "neutral";
    const preferredVoice = {
      excited: "nova",
      calm: "fable",
      mysterious: "onyx",
      deep: "echo",
      neutral: "nova"
    }[emotion] || "nova";

    fetch("https://openrouter.ai/api/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": CONFIG.AUTH_TOKEN || '',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: preferredVoice,
        input: text
      })
    }).then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      }).catch(err => {
        console.error("Fala com fallback:", err);
        const fallback = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(fallback);
      });
  }

  // Substitui a função de fala padrão
  window.autoSpeakPage = function (text) {
    if (typeof text === "string" && text.trim()) {
      speakTextEnhanced(text);
    }
  };

// Função para aplicar templates inner dinamicamente
function applyAdvancedTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  const msg = {
    'matrix': '🧪 Ativando realidade em código verde...',
    'cyberpunk': '☣️ Injetando neons e distorções...',
    'turbo': '⚡ Modo Turbo ativado. Velocidade máxima!',
    'tesseract': '📐 Dobras multidimensionais em andamento...',
    'nebula': '🌌 Conectando ao vórtice estelar...'
  };
  console.log(msg[themeName] || '🌐 Tema aplicado:', themeName);
}

// Escuta mudanças no seletor de tema
document.addEventListener('DOMContentLoaded', () => {
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      const theme = e.target.value;
      applyAdvancedTheme(theme);
    });
  }

  // Aplicar o tema salvo previamente
  const savedTheme = localStorage.getItem('infodoseTheme');
  if (savedTheme) {
    applyAdvancedTheme(savedTheme);
  }
});

// 🎭 ROLE SYSTEM 3D :: Variações de personalidade por tema

const rolePersonalities = {
  'matrix': {
    prefix: '[MATRIX] ',
    tone: 'sereno, enigmático, com referências à realidade simulada'
  },
  'cyberpunk': {
    prefix: '[CYBER] ',
    tone: 'sarcástico, rebelde e com glitch estilizado'
  },
  'turbo': {
    prefix: '[TURBO] ',
    tone: 'rápido, direto, sempre energético'
  },
  'tesseract': {
    prefix: '[TESS] ',
    tone: 'filosófico, multidimensional, com vocabulário cósmico'
  },
  'nebula': {
    prefix: '[NEBULA] ',
    tone: 'suave, onírico, introspectivo'
  }
};

// Hook de resposta
function modulateResponseByTheme(originalText) {
  const activeTheme = document.body.getAttribute('data-theme');
  const role = rolePersonalities[activeTheme];
  if (!role) return originalText;

  const prefix = role.prefix || '';
  const styled = `🌐 ${prefix}${originalText}`;
  return styled;
}

// Exemplo de uso na IA (substituir renderResponse se quiser integrar nativamente)
window.modulateResponseByTheme = modulateResponseByTheme;

  // 🎧 Sons de interface - Coblux UI Samples
  const uiSounds = {
    click: new Audio('../../assets/sounds/uiSamples/navigation.wav'),
    hover: new Audio('../../assets/sounds/uiSamples/hover.wav'),
    confirm: new Audio('../../assets/sounds/uiSamples/confirm.wav'),
    back: new Audio('../../assets/sounds/uiSamples/back.wav'),
    temaUp: new Audio('../../assets/sounds/uiSamples/back-action.wav'),
    temaDown: new Audio('../../assets/sounds/uiSamples/back-action.wav'),
  };

  // Volume padrão
  for (const key in uiSounds) {
    uiSounds[key].volume = 0.4;
  }

  // ⛔ Remover microfone automático
  window.SpeechRecognition = null;
  window.webkitSpeechRecognition = null;

  // 🎯 Sons ao interagir
  document.addEventListener("DOMContentLoaded", () => {
    // Clique em qualquer botão
    document.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        uiSounds.click.currentTime = 0;
        uiSounds.click.play().catch(() => {});
      });
      btn.addEventListener("mouseover", () => {
        uiSounds.hover.currentTime = 0;
        uiSounds.hover.play().catch(() => {});
      });
    });

    // Enviar mensagem (confirmar)
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        uiSounds.confirm.currentTime = 0;
        uiSounds.confirm.play().catch(() => {});
      });
    }

    // Trocar tema manualmente (temaSelector)
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
      let lastIndex = themeSelector.selectedIndex;
      themeSelector.addEventListener("change", () => {
        const newIndex = themeSelector.selectedIndex;
        if (newIndex > lastIndex) {
          uiSounds.temaUp.currentTime = 0;
          uiSounds.temaUp.play().catch(() => {});
        } else if (newIndex < lastIndex) {
          uiSounds.temaDown.currentTime = 0;
          uiSounds.temaDown.play().catch(() => {});
        }
        lastIndex = newIndex;
      });
    }

    // Navegação entre páginas
    document.querySelectorAll('[data-action="prev"]').forEach(btn =>
      btn.addEventListener("click", () => {
        uiSounds.back.currentTime = 0;
        uiSounds.back.play().catch(() => {});
      })
    );
    document.querySelectorAll('[data-action="next"]').forEach(btn =>
      btn.addEventListener("click", () => {
        uiSounds.confirm.currentTime = 0;
        uiSounds.confirm.play().catch(() => {});
      })
    );
  });

// 🎧 Novos sons com base em IDs
const uiBL = {
  toggle: new Audio('../../assets/sounds/uiSamples/toggleBtn-sfx.wav'),
  kitty: new Audio('../../assets/sounds/uiSamples/kittyBtn-sfx.wav'),
  ativar: new Audio('../../assets/sounds/uiSamples/ativar-click-toggleBtn.wav'),
  nav: new Audio('../../assets/sounds/uiSamples/navigation.wav'),

  cancel: new Audio('../../assets/sounds/uiSamples/cancel.wav')
};

// Volume padrão
for (const k in uiBL) uiBL[k].volume = 0.45;

document.addEventListener("DOMContentLoaded", () => {
  // Botão toggle (login)
  const toggle = document.getElementById("toggleBtn");
  if (toggle) toggle.addEventListener("click", () => {
    uiBL.toggle.currentTime = 0;
    uiBL.toggle.play().catch(()=>{});
  });

  // Botão kitty
  const kitty = document.getElementById("kittyBtn");
  if (kitty) kitty.addEventListener("click", () => {
    uiBL.kitty.currentTime = 0;
    uiBL.kitty.play().catch(()=>{});
  });

  // Botão ativar no login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", () => {
      uiBL.ativar.currentTime = 0;
      uiBL.ativar.play().catch(()=>{});
    });
  }

 

  // Copiar / colar
  document.querySelectorAll('.copy-button, .paste-button').forEach(btn =>
    btn.addEventListener("click", () => {
      uiBL.cancel.currentTime = 0;
      uiBL.cancel.play().catch(()=>{});
    })
  );
});

const themePresets = {
  "Nebulosa Mística": {
    bg: "#1b003b",
    text: "#cfcaff",
    glow: 0.4
  },
  "Céu da Manhã": {
    bg: "#dbe9ff",
    text: "#001f3f",
    glow: 0.15
  },
  "Modo Hacker": {
    bg: "#000000",
    text: "#00ff00",
    glow: 0.3
  },
  "Código Cósmico": {
    bg: "#0a0a23",
    text: "#ff99ff",
    glow: 0.5
  }
};

const presetSelector = document.createElement("select");
presetSelector.style.cssText = "margin-top:10px; padding:6px; background:#111; color:#0ff; border-radius:8px;";
presetSelector.innerHTML = "<option disabled selected>🎨 Aplicar Preset</option>" +
  Object.keys(themePresets).map(name => `<option value='\${name}'>\${name}</option>`).join("");
document.getElementById("themeEditor")?.appendChild(presetSelector);

presetSelector.addEventListener("change", (e) => {
  const p = themePresets[e.target.value];
  if (!p) return;
  document.body.style.background = p.bg;
  document.body.style.color = p.text;
  document.querySelectorAll(".response-block").forEach(el => {
    el.style.boxShadow = `0 0 \${p.glow * 40}px rgba(0,255,255,\${p.glow})`;
  });
});

(function autoDarkMode(){
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 6) {
    document.body.setAttribute("data-theme", "dark");
    document.body.classList.add("theme-fade");
  }
})();

let preferClean = localStorage.getItem('preferClean') === 'false' ? false : true;

document.addEventListener("DOMContentLoaded", () => {
  const toggleModeBtn = document.createElement('button');
  toggleModeBtn.id = 'toggleCleanMode';
  toggleModeBtn.innerText = '💬=' + (preferClean ? '🫧' : '🫆');
  toggleModeBtn.style.cssText = `
    position: fixed;
    top: 8px;
    left: 20px;
    padding: 6px 9px;
    background: rgba(0, 0, 0, 0.6);
    color: #0ff;
    border: none;
    border-radius: 5px;
    font-size: 9px;
    opacity:0.8;
    cursor: pointer;
    z-index: 3;
  `;
  document.body.appendChild(toggleModeBtn);

  toggleModeBtn.addEventListener('click', () => {
    preferClean = !preferClean;
    localStorage.setItem('preferClean', preferClean);
    toggleModeBtn.innerText = ':' + (preferClean ? '🫧' : '🫆');
    if (navigator.vibrate) navigator.vibrate([30]);
  });
});

function showLoading(msg){
  const wrap = document.querySelector('.pages-wrapper');
  wrap.innerHTML = '';
  const p = document.createElement('div');
  p.className = 'page active';
  const foot = document.createElement('p');
  foot.className = 'footer-text loading pulse-glow';
  msg.split('').forEach((ch, i) => {
    const sp = document.createElement('span');
    sp.textContent = ch;
    sp.style.animationDelay = (i * 0.04) + 's';
    sp.classList.add('typewriter-char');
    foot.appendChild(sp);
    if (navigator.vibrate) navigator.vibrate(5);
  });
  p.appendChild(foot);
  wrap.appendChild(p);
  document.getElementById('pageIndicator').textContent = '1 / 1';
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  if (navigator.vibrate) navigator.vibrate([20,10,20]);
}

function vibrateOnResponse() {
  if (navigator.vibrate) navigator.vibrate([12, 6, 12]);
}
