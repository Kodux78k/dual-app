const frame = document.getElementById('frame');
    const activationSound = new Audio('assets/sounds/acts/wounds/codigo-MT-OLX-0.wav');


    function loadPage(url) {
      // Antes de carregar uma nova página, certifica que o iframe está
      // visível. O iframe começa oculto (display:none) para não exibir
      // erros de páginas inexistentes. Ao carregar um arquivo válido,
      // mostramos o iframe e aplicamos a classe 'active' após o load.
      frame.style.display = 'block';
      frame.classList.remove('active');
      setTimeout(() => {
        frame.src = url;
        frame.onload = () => frame.classList.add('active');
      }, 300);
    }

    const uploadInput = document.getElementById('uploadHTML');
    document.getElementById('uploadComponentBtn').onclick = () => {
      playSound();
      uploadInput.click();
    };

    uploadInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file && file.name.endsWith('.html')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const blob = new Blob([ev.target.result], { type: 'text/html' });
          const blobUrl = URL.createObjectURL(blob);
          const frame = document.createElement('my-frame-loader');
          frame.src = blobUrl;
          document.body.appendChild(frame);
        };
        reader.readAsText(file);
      } else {
        alert('Selecione um arquivo .html válido.');
      }
    };

    document.getElementById('remoteComponentBtn').onclick = () => {
      playSound();
      const url = prompt("URL do componente remoto:");
      if (url) {
        const frame = document.createElement('my-frame-loader');
        frame.src = url;
        document.body.appendChild(frame);
      }
    };

    const toggleDecoderBtn = document.getElementById('toggleDecoderBtn');
    const decoderBox = document.getElementById('decoderBox');
    toggleDecoderBtn.onclick = () => {
      playSound();
      decoderBox.style.display = decoderBox.style.display === 'none' ? 'block' : 'none';
    };

    const CODE_MAP = {
      "DUAL": "menu.html",
      "KBX": "menu-x-1.html",
      "ATVR": "render-response.html",
      "ATVD": "decodificador.html",
      "337": "KOBLLUX_MetaLux_CLEANED.html",
      "DBK": "dual-book-12.html",
      "IMN": "index-manifestado.html",
      "IMNN": "index-manifestado-tangle.html",
      "BTS": "botao-simbolico.html",
      "SBK": "SmbS-book-4.html",
      "SBL": "SmbS-book-2.html",
      "KDX": "menu-kobllux-v2-completo.html",
      "KDI": "menu-integrado-kobllux.html",
      "KDP": "menu-x-1-E-4.html",
      "KDF": "menu-x-1-E-8.html",
      "KDB": "menu-x-1-E-10.html",
      "KDJ": "menu-x-1-E-4-com-botoes-injetados.html",
      "HTM": "KBLX-HTML-v4.1-FULLSCREEN-SEPARADOR.html",
      "MN6": "menu-x-1-E-6.html",
      "MN7": "menu-x-1-E-7.html",
      "MN8": "menu-x-1-E-8.html",
      "MN9": "menu-x-1-E-9.html",
      "MN10": "menu-x-1-E-10.html",
      "MN11e": "menu-x-1-E-11e.html",
      "MN12": "menu-x-1-E-12.html",
      "MN13": "menu-final-com-pulso.html",
      "MN14": "menu-pulso-final.html",
      "MN15": "menu-x-1-E-15.html",
      "MN16": "menu-x-1-E-16.html",
    };

    function decodeSymbolicCode() {
      playSound();
      const code = document.getElementById('codeInput').value.trim().toUpperCase();
      const dest = CODE_MAP[code];
      if (dest) {
        const frame = document.createElement('my-frame-loader');
        frame.src = dest;
        document.body.appendChild(frame);
        decoderBox.style.display = 'none';
      } else {
        alert('Selo desconhecido ou não registrado.');
      }
    }

document.getElementById("btn-expandir-ritual").onclick = () => {
  const alvo = document.getElementById("corpo-espelho") || document.getElementById("pulsos");
  if (alvo) {
    alvo.style.display = alvo.style.display === "none" ? "block" : "none";
    logMistico("⧉ Expandiu o plano ritual oculto.");
  }
};

document.getElementById("btn-expandir-ritual").onclick = () => {
  const alvo = document.getElementById("corpo-espelho") || document.getElementById("pulsos");
  if (alvo) {
    alvo.style.display = alvo.style.display === "none" ? "block" : "none";
    logMistico("⧉ Expandiu o plano ritual oculto.");
  }
};

const pulsos = document.getElementById("pulsos");


  pulsos.addEventListener("click", () => {
    pulsos.classList.toggle("expanded");
    if (!pulsos.classList.contains("expanded")) {
      pulsos.scrollTop = pulsos.scrollHeight;
    }
  });


  // Pulso na página principal
  document.addEventListener("click", e => {
    logMistico("Pulso simbiótico em " + e.clientX + ", " + e.clientY);
  });

  // Recebe cliques do iframe
  window.addEventListener("message", function(event) {
    if (event.data?.type === "iframeClick") {
      const iframe = document.getElementById("seuIframeID"); // Troque para o ID real do seu iframe
      if (!iframe) return;

      const rect = iframe.getBoundingClientRect();
      const xGlobal = rect.left + event.data.x;
      const yGlobal = rect.top + event.data.y;

      logMistico("⚡ Pulso no iFrame em " + event.data.x + ", " + event.data.y);
    }
  });

document.addEventListener("DOMContentLoaded", () => {
const toggleBtn = document.getElementById("togglePlayer");
const controls = document.getElementById("playerControls");
const playPauseBtn = document.getElementById("playPause");
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
trackAudio.loop = true;
trackAudio.volume = trackVolume.value;
trackAudio.play();
playPauseBtn.textContent = "⏸";
} else {
trackAudio.pause();
trackAudio.src = "";
}
});
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

document.addEventListener("click", function(e) {
    window.parent.postMessage({
      type: "iframeClick",
      x: e.clientX,
      y: e.clientY
    }, "*");
  });
  document.addEventListener("touchstart", function(e) {
    const t = e.touches[0];
    if (t) {
      window.parent.postMessage({
        type: "iframeClick",
        x: t.clientX,
        y: t.clientY
      }, "*");
    }
  });

document.getElementById("btn-expandir-ritual")?.addEventListener("click", () => {
    const pulsos = document.getElementById("pulsos");
    if (pulsos) {
      pulsos.classList.toggle("expanded");
      if (!pulsos.classList.contains("expanded")) {
        pulsos.scrollTop = pulsos.scrollHeight;
      }
    }
  });



(function(){
    const STORAGE_KEY  = 'infodoseEnabled',
          THEME_KEY    = 'infodoseTheme',
          KIT_PRIMARY  = 'assets/icons/DualKittyKard-icon-3.png',
          KIT_FALLBACK = 'assets/icons/dual_Dual_Infodose.svg',
          CONFIG = {
            /*
             * O arquivo de treinamento "data/Oidual.txt" não está presente no pacote
             * base. Para evitar falhas no carregamento de configuração, não
             * carregamos nenhum arquivo. Se desejar usar um prompt de sistema
             * customizado para contextualizar o assistente, defina
             * CONFIG.TRAINING_FILE com um caminho válido e coloque o arquivo
             * correspondente na pasta. Caso contrário, deixe como null para que
             * a rotina init() ignore o fetch.
             */
            TRAINING_FILE: null,
            /* Endereço da API do modelo. Ajuste se estiver usando outra rota ou
             * hospedagem. A rotina callAI() irá exibir uma mensagem de erro
             * amigável se a chamada falhar.
             */
            API_URL: 'https://openrouter.ai/api/v1/chat/completions',
            MODEL: 'deepseek/deepseek-chat-v3-0324:free',
            TEMP: 0.2,
            CHUNK_SIZE: 12000,
            AUTH_TOKEN: ''
          };

    let training = '', chunks = [], chunkIndex = 0;
    let isEnabled = false, isStudying = false;
    let userName = '', assistantBase = '';
    let conversation = [];
    let pages = [], currentPage = 0, autoAdvance = true;
    let originalLogo = '';

    const $ = s => document.querySelector(s);
    const create = (t,c,h) => {
      const e = document.createElement(t);
      if(c) e.className = c;
      if(h) e.innerHTML = h;
      return e;
    };
    particlesJS('particles-js',{
      particles:{ number:{value:40}, color:{value:['#0ff','#f0f']},
        shape:{type:'circle'}, opacity:{value:0.4}, size:{value:2.4},
        move:{enable:true,speed:1.5}
      }, retina_detect:true
    });








    function autoSpeakPage(i){
  const txts = Array.from(pages[i].querySelectorAll('p'))
    .map(p=>p.textContent).join(' ');
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(txts);
  
  utter.onend = () => {
    if (autoAdvance && i < pages.length - 1) {
      changePage(1);
    } else if (i === pages.length - 1) {
      // Aqui, só após a ÚLTIMA página:
      speechSynthesis.speak(
        new SpeechSynthesisUtterance('Do seu jeito. Sempre único. Sempre seu.')
      );
    }
  };

  speechSynthesis.speak(utter);
}



    function bindUI(){
      $('#sendBtn').addEventListener('click',onSend);
      $('#userInput').addEventListener('keypress',e=>{ if(e.key==='Enter') onSend(); });
      $('#voiceBtn').addEventListener('click',()=>{
        const rec = new (window.SpeechRecognition||window.webkitSpeechRecognition)();
        rec.lang='pt-BR'; rec.start();
        rec.onresult=evt=>{
          $('#userInput').value=evt.results[0][0].transcript; onSend();
        };
      });

      document.querySelector('.control-buttons').addEventListener('click',e=>{
        if(e.target.closest('.copy-button')){
          const txt=pages.map(p=>p.innerText.trim()).join('\n\n');
          navigator.clipboard.writeText(txt);
        }
        if(e.target.closest('.paste-button')){
          navigator.clipboard.readText().then(txt=>$('#userInput').value=txt);
        }
        if(e.target.closest('#toggleBtn')){
          if(!isEnabled) $('#loginBox').classList.add('active');
          else {
            isEnabled=false; localStorage.removeItem(STORAGE_KEY);
            conversation=[]; updateUI();
          }
        }
        if(e.target.closest('#kittyBtn')){
          isStudying=!isStudying;
          if(isStudying){
            conversation=[{
              role:'system',
              content:(chunks[0]||training)+'\n\nVocê é Assistente de Estudos dual.infodose.'
            }];
            changeLogo([KIT_PRIMARY,KIT_FALLBACK]);
          } else {
            changeLogo(originalLogo); loadConfig();
          }
          updateUI();
        }
      });

      document.querySelector('.pagination').addEventListener('click',e=>{
        if(e.target.dataset.action==='prev') changePage(-1);
        if(e.target.dataset.action==='next') changePage(1);
        autoAdvance=false;
      });

      $('#loginForm').addEventListener('submit',e=>{
        e.preventDefault();
        const u=$('#userName').value.trim(), a=$('#assistantInput').value.trim();
        if(!u||!a) return alert('Preencha os dados');
        isEnabled=true; userName=u; assistantBase=a;
        localStorage.setItem(STORAGE_KEY,'1');
        localStorage.setItem('userName',u);
        localStorage.setItem('assistantBase',a);
        loadConfig(); $('#loginBox').classList.remove('active');
      });

      // A alternância de visibilidade das páginas é gerenciada por um
      // script dedicado no rodapé (v6.2.4). Removemos o listener
      // anterior para evitar duplicação e conflitos de estado.
    }

    function onSend(){
      const raw=$('#userInput').value.trim(); if(!raw) return;
      $('#userInput').value=''; autoAdvance=false;
      showLoading('Pulso enviado...Recebendo intenção…');
      conversation.push({role:'user',content:raw});
      callAI();
    }

    document.addEventListener('DOMContentLoaded',init);
  })();


document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer-text");
  const inputContainer = document.querySelector(".input-container");
  const controls = document.querySelector(".control-buttons");
  const pagination = document.querySelector(".pagination");
const ritualBtn = document.getElementById("btn-expandir-ritual");

  // Estado inicial: ocultar UI e botões/ícones
  if (inputContainer) inputContainer.classList.add('hidden');
  if (controls) controls.classList.add('hidden');
  if (pagination) pagination.classList.add('hidden');
  if (ritualBtn) ritualBtn.classList.add('move-to-bottom-ritual');
  if (footer) footer.classList.add('move-to-bottom');
  // Ocultar logo, symbol bar e botões laterais
  document.querySelectorAll('.svg-container, .symbol-bar, #uploadComponentBtn, #remoteComponentBtn, #toggleDecoderBtn').forEach(el => {
    if (el) el.style.display = 'none';
  });

  if (footer && inputContainer && controls && pagination) {
    footer.addEventListener("click", () => {
      inputContainer.classList.toggle("hidden");
      controls.classList.toggle("hidden");
      pagination.classList.toggle("hidden");
    ritualBtn.classList.toggle("move-to-bottom-ritual");
      footer.classList.toggle("move-to-bottom");
    });
  }
});

// 🎧 Sons de interface - Coblux UI Samples
const uiSounds = {
click: new Audio('assets/sounds/uiSamples/navigation.wav'),
hover: new Audio('assets/sounds/uiSamples/hover.wav'),
confirm: new Audio('assets/sounds/uiSamples/confirm.wav'),
back: new Audio('assets/sounds/uiSamples/back.wav'),
temaUp: new Audio('assets/sounds/uiSamples/back-action.wav'),
temaDown: new Audio('assets/sounds/uiSamples/back-action.wav'),
};
// Volume padrão
for (const key in uiSounds) {
uiSounds[key].volume = 0.4;
}
// ⛔ Remover microfone automático
// window.SpeechRecognition = null;
// window.webkitSpeechRecognition = null;
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
toggle: new Audio('assets/sounds/uiSamples/toggleBtn-sfx.wav'),
kitty: new Audio('assets/sounds/uiSamples/kittyBtn-sfx.wav'),
ativar: new Audio('assets/sounds/uiSamples/ativar-click-toggleBtn.wav'),
nav: new Audio('assets/sounds/uiSamples/navigation.wav'),
cancel: new Audio('assets/sounds/uiSamples/cancel.wav')
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

// Toggle do painel de controle
document.getElementById('togglePanelBtn').addEventListener('click', function () {
  const panel = document.getElementById('layoutTogglePanel');
  panel.style.display = (panel.style.display === 'none' || getComputedStyle(panel).display === 'none') ? 'flex' : 'none';
});

// Funções básicas de mostrar/ocultar

// LocalStorage

// MODO SIMBIÓTICO PRESET

// Carregar config ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  carregarEstadoUI();
  // Inicializar nível de desempenho e listeners de performance
  const perfRadios = document.querySelectorAll('#performanceOptions input[name="performance"]');
  perfRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const level = radio.value;
      document.body.classList.remove('perf-low','perf-medium','perf-high');
      document.body.classList.add('perf-' + level);
    });
  });
});

// ========= Markdown simbiótico =========
function renderMarkdown(raw) {
  return raw
    .replace(/(["“”'])(.+?)\1/g, '<button class="response-button">"$2"</button>')
    .replace(/\[(.+?)\]/g, '<button class="response-button">[$1]</button>')
    .replace(/([\u231A-\u2B55\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}])/gu, '<button class="emoji-button">$1</button>')
    .replace(/^### (.*)/gm, '<h3>$1</h3>')
    .replace(/^## (.*)/gm, '<h2>$1</h2>')
    .replace(/^# (.*)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

// ========= Separador de parágrafos robusto =========

// ========= Função renderResponse simbiótica =========

function transformarSimbolosAvancado() {
  const targetBlocks = document.querySelectorAll('.renderResponse, .response-block, .output-block, .console');

  targetBlocks.forEach(block => {
    if (!block.dataset.parsed) {
      let html = block.innerHTML;

      // Colchetes [simbolo]
      html = html.replace(/\[(.+?)\]/g, (_, simbolo) =>
        `<span class="symbol-button tipo-colchete" onclick="registrarPulsoEEnviar('${simbolo}')">[${simbolo}]</span>`
      );

      // Chaves {simbolo}
      //html = html.replace(/\{(.+?)\}/g, (_, simbolo) =>
      //  `<span class="symbol-button tipo-chave" onclick="enviarPulsoSimbolico('${simbolo}')">{${simbolo}}</span>`
      //);

      // Parênteses (simbolo)
      //html = html.replace(/\((.+?)\)/g, (_, simbolo) =>
      //  `<span class="symbol-button tipo-parenteses" onclick="enviarPulsoSimbolico('${simbolo}')">(${simbolo})</span>`
      //);

      // Emojis únicos (corrigido: evita quadrado duplicado)
      html = html.replace(/([\p{Emoji}])/gu, (_, emoji) =>
        `<span class="symbol-button tipo-emoji" onclick="registrarPulsoEEnviar('${emoji}')">${emoji}</span>`
      );

      // ASCII blocks (3+ linhas)
      //* html = html.replace(/(?:<br\s*\/?>\s*){2,}([\s\S]+?)(?:<br\s*\/?>\s*){2,}/g, (_, ascii) => {
        //const id = 'ascii-' + Math.random().toString(36).substr(2, 6);
        //return `
        //  <div class="ascii-container">
         //   <span class="symbol-button tipo-ascii-toggle" onclick="toggleNested('${id}')">▶️ ASCII</span>
        //    <pre id="${id}" class="nestedBlock hidden">${ascii.trim()}</pre>
       //   </div>`;
     // }); 

      block.innerHTML = html;
      block.dataset.parsed = "true";
    }
  });
}

function enviarPulsoSimbolico(simbolo, tipo = "SimboloAvancado") {
  const role = localStorage.getItem("role") || "user";
  const system = localStorage.getItem("system") || "";

  const entradaSimbolica = {
    role,
    content: `[${simbolo}]`,
    system,
    tipo,
  };

  renderResponse(entradaSimbolica.content, tipo);
  console.log("🔮 Pulso simbiótico:", entradaSimbolica);
}

function toggleNested(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('hidden');
    const toggle = el.previousElementSibling;
    toggle.innerText = el.classList.contains('hidden') ? '▶️ ASCII' : '▼ ASCII';
  }
}

// Otimizado com MutationObserver (sem setInterval)
const observer = new MutationObserver(transformarSimbolosAvancado);
observer.observe(document.body, { childList: true, subtree: true });

function expandirPulso() {
  const pulsos = document.getElementById("pulsos");
  if (pulsos && !pulsos.classList.contains("expanded")) {
    pulsos.classList.add("expanded");
    pulsos.scrollTop = pulsos.scrollHeight;
    logMistico("◉ Pulso ativado com expansão externa.");
  }
}




  if (intro) wrap.appendChild(renderBlock(intro, "intro", "🎁"));
  if (middle) wrap.appendChild(renderBlock(middle, "middle", "👁️"));
  if (ending) wrap.appendChild(renderBlock(ending, "ending", "◉"));
}

function salvarHistorico(pulso) {
  logResponseHistorico.push({ ...pulso, timestamp: new Date().toISOString() });

  const pulsos = document.getElementById("pulsos");
  if (pulsos) {
    const item = document.createElement("div");
    item.className = "pulso-item";
    item.innerHTML = `
      <div><strong>🕒</strong> ${new Date().toLocaleTimeString()}</div>
      <div>🎁 ${pulso.intro?.slice(0, 30) || ''}</div>
      <div>👁️ ${pulso.middle?.slice(0, 30) || ''}</div>
      <div>◉ ${pulso.ending?.slice(0, 30) || ''}</div>
      <button class="replay-btn">🔁 Repetir</button>
      <hr/>
    `;
    item.querySelector("button").addEventListener("click", () => {
      renderResponse(pulso);
      logMistico("♻️ Pulso do histórico reativado.");
    });
    pulsos.prepend(item);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const voiceBtn = document.getElementById("voiceBtn");
  if (!voiceBtn) return;

  let recognition;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Reconhecimento de voz não suportado.");
    voiceBtn.style.opacity = 0.2;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    voiceBtn.classList.add("listening");
    logMistico("🎤 Pulso iniciado: ouvindo...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    document.getElementById("userInput").value = transcript;
    logMistico("🎤 Voz detectada: " + transcript);
    document.getElementById("sendBtn").click();

    
  };

  recognition.onerror = (event) => {
    logMistico("⚠️ Erro de voz: " + event.error);
  };

  recognition.onend = () => {
    voiceBtn.classList.remove("listening");
    logMistico("🛑 Pulso finalizado");
  };

  voiceBtn.addEventListener("click", () => {
    try {
      recognition.start();
    } catch (err) {
      logMistico("🚫 Falha ao iniciar reconhecimento: " + err.message);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadFileBtn");
  const inputFile = document.getElementById("symbolicFileInput");

  uploadBtn?.addEventListener("click", () => {
    inputFile?.click();
  });

  inputFile?.addEventListener("change", () => {
    const file = inputFile.files[0];
    if (file) {
      logMistico("📂 Arquivo enviado: " + file.name);
      const reader = new FileReader();
      reader.onload = () => {
        logMistico("📖 Conteúdo: " + reader.result.slice(0, 300) + "...");
      };
      reader.readAsText(file);
    }
  });
});

function salvarConfiguracoesAvancadas() {
  const newSK = document.getElementById("skInput")?.value.trim();
  const roleSystem = document.getElementById("roleSystemInput")?.value.trim();
  const newModel = document.getElementById("modelSelector")?.value;

  if (newSK) {
    localStorage.setItem("INFODOSE_SK", newSK);
    logMistico("🔐 Nova chave SK salva.");
  }

  if (roleSystem) {
    sessionStorage.setItem("ROLE_SYSTEM_DOC", roleSystem);
    logMistico("📜 Role System atualizado.");
  }

  if (newModel) {
    localStorage.setItem("INFODOSE_MODEL", newModel);
    logMistico("🤖 Modelo alterado para: " + newModel);
  }

  alert("Configurações avançadas aplicadas.");
}

function ATIVAR_KOBLLUX_PATCH() {
  // CSS refinado com bordas suaves
  const style = document.createElement("style");
  style.textContent = `
    :root {
    
      --mask-REDACTED: linear-gradient(45deg, #F0F, #0FF);
    }

    button,
    .symbol-button,
   

    
    .response-container,
    .login-container,
    #decoderBox,
    #koblluxPlayer,
    #pulsos-container {

    -webkit-mask-image: var(--mask-REDACTED);
      mask-image: var(--mask-REDACTED);
      border-image: var(--mask-REDACTED);
      border-image-slice: 1;
      border-width: 1px;
      border-style: solid;
      border-radius: 28px;
    
  transition: transform 0.2s, box-shadow 0.3s;

  cursor: pointer;
    }

    .symbol-btn {
      -webkit-mask-image: var(--mask-REDACTED);
      mask-image: var(--mask-REDACTED);
      border-image: var(--mask-REDACTED);
      border-image-slice: 1;
      background: var(--bg);
      border: 1px solid rgba(0, 255, 255, 0.2);
      color: #0ff;
      border-radius: 8px;
      padding: 2px 6px;
      margin: 2px;
      cursor: pointer;
      font-size: 0.9em;
    }

    .response-block {
      padding: 1.8rem !important;
    }
  `;
  document.head.appendChild(style);

  // renderResponse aprimorado
  window.renderResponse = function(text) {
    const container = document.querySelector(".pages-wrapper");
    if (!container) return;
    container.innerHTML = "";

    const sentences = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const classes = ["intro", "middle", "ending"];

    sentences.forEach((para, index) => {
      const block = document.createElement("div");
      block.className = "response-block " + classes[index % 3];

      const parsed = para
        .replace(/(\p{Emoji_Presentation}|\p{Emoji})/gu, match =>
          `<button class="symbol-btn" onclick="logMistico('Emoji: ${match}')">${match}</button>`
        )
        .replace(/\[(.+?)\]/g, (match, p1) =>
          `<button class="symbol-btn" onclick="logMistico('[${p1}]')">[${p1}]</button>`
        );

      block.innerHTML = parsed;

      block.addEventListener("click", () => {
        block.classList.toggle("expanded");
        const pulsos = document.getElementById("pulsos");
        if (pulsos) pulsos.classList.toggle("expanded");
        logMistico("◉ Expandiu bloco: " + block.className);
      });

      container.appendChild(block);
    });

    logMistico("✅ renderResponse executado com " + sentences.length + " blocos");
  };

  // VoiceBtn refinado
  const voiceBtn = document.getElementById("voiceBtn");
  if (voiceBtn) {
    voiceBtn.addEventListener("click", () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const inputField = document.getElementById("userInput");
        if (inputField) {
          inputField.value = transcript;
          document.getElementById("sendBtn")?.click();
          logMistico("🎤 Voz capturada: " + transcript);
        }
      };

      recognition.onerror = (event) => {
        logMistico("❌ Erro no microfone: " + event.error);
      };

      logMistico("🎤 Microfone ativado");
    });
  }

  // LOG MISTICO — Universal logging visual + ações opcionais
window.logMistico = function(msg, options = {}) {
  const el = document.createElement("div");
  el.className = "debug-mistico";
  el.innerText = "◉ " + msg;

  const pulsos = document.getElementById("pulsos");
  if (pulsos) {
    pulsos.appendChild(el);
    pulsos.scrollTop = pulsos.scrollHeight;
  } else {
    console.log("[KOBLLUX LOG]:", msg);
  }

  // Ações opcionais integradas ao log
  if (options.enviarPulso && options.simbolo) {
    registrarPulsoEEnviar(options.simbolo);
  }

  if (options.callAI) {
    callAI();
  }

  if (options.updateUI) {
    updateUI();
  }
};

  // Eventos extras
  document.getElementById("toggleBtn")?.addEventListener("click", () => logMistico("🧠 Assistente Toggled"));
  document.getElementById("kittyBtn")?.addEventListener("click", () => logMistico("🐱 Kitty ativado"));
  document.getElementById("sendBtn")?.addEventListener("click", () => {
    const msg = document.getElementById("userInput")?.value;
    logMistico("📤 Enviado: " + msg);
  });

  logMistico("✨ PATCH KOBLLUX SUPREMO ativado");
}

function registrarPulsoEEnviar(simbolo) {
  logMistico(`🧿 Pulso simbólico ativado: ${simbolo}`);
  
  if (!isEnabled) {
    isEnabled = true;
    localStorage.setItem(STORAGE_KEY, '1');
    updateUI();
  }

  showLoading(` Pulso simbiótico de "${simbolo}" em expansão...`);
  conversation.push({
    role: 'user',
    content: `✨ Pulso simbólico: ${simbolo}`
  });

  callAI();
}

ATIVAR_KOBLLUX_PATCH();

(function(){
  function wireButtons(){
    const input = document.getElementById('userInput');
    // SEND
    const send = document.getElementById('sendBtn');
    if (send && !send.dataset.koduxWired) {
      const newSend = send.cloneNode(true);
      send.parentNode.replaceChild(newSend, send);
      newSend.dataset.koduxWired = "1";
      newSend.addEventListener('click', () => {
        const val = (input?.value || '').trim();
        if (!val) { input?.focus(); return; }
        if (typeof window.onSend === 'function') {
          try { window.onSend(); return; } catch(e){}
        }
        // Fallback: dispatch click to any original sendBtn (if re-added later)
        newSend.dispatchEvent(new Event('kodux-send', {bubbles:true}));
      });
    }
    // VOICE
    const voice = document.getElementById('voiceBtn');
    if (voice && !voice.dataset.koduxWired) {
      const newVoice = voice.cloneNode(true);
      voice.parentNode.replaceChild(newVoice, voice);
      newVoice.dataset.koduxWired = "1";
      newVoice.addEventListener('click', () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          try {
            const rec = new SpeechRecognition();
            rec.lang = 'pt-BR';
            rec.interimResults = false;
            rec.maxAlternatives = 1;
            newVoice.classList.add('listening');
            rec.onresult = (evt) => {
              const transcript = evt.results[0][0].transcript || '';
              if (input) input.value = transcript.trim();
              const val = (input?.value || '').trim();
              if (val && typeof window.onSend === 'function') {
                try { window.onSend(); } catch(e){}
              }
            };
            rec.onerror = () => { /* graceful fallback below onend */ };
            rec.onend = () => {
              newVoice.classList.remove('listening');
              // Fallback: if user dictated or typed something, send it
              const val = (input?.value || '').trim();
              if (val && typeof window.onSend === 'function') {
                try { window.onSend(); } catch(e){}
              } else {
                input?.focus();
              }
            };
            rec.start();
            return;
          } catch(err) {
            // continue to fallback
          }
        }
        // No SR support -> treat as quick-send
        const val = (input?.value || '').trim();
        if (val && typeof window.onSend === 'function') {
          try { window.onSend(); } catch(e){}
        } else {
          input?.focus();
        }
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButtons);
  } else {
    wireButtons();
  }
})();

(function(){
  const b=document.getElementById('sumbus-toggle'); if(!b) return;
  const K='SUMBUS_ACTIVE'; const saved=localStorage.getItem(K);
  if(saved==='false'){ window.__SUMBUS_ACTIVE__=false; b.textContent='SÜMBÜS: OFF'; b.style.color='#aaa'; }
  b.addEventListener('click',(ev)=>{ ev.stopPropagation();
    const on = !(window.__SUMBUS_ACTIVE__===true);
    window.__SUMBUS_ACTIVE__ = on;
    b.textContent = on? 'SÜMBÜS: ON' : 'SÜMBÜS: OFF';
    b.style.color = on? '#0ff' : '#aaa';
    localStorage.setItem(K,String(on));
  });
})();

// SuperPatch v6.2.2 — no MetaLux, keep upload, single feed
(function(){
  if (window.__SUPERPATCH_V622__) return; window.__SUPERPATCH_V622__=true;
  window.__SUMBUS_ACTIVE__ = (window.__SUMBUS_ACTIVE__ ?? true);
  const INJECT_OUTBOUND = true;
  const $=(s,r=document)=>r.querySelector(s);
  const now=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`};
  function dual_formatter(t){try{t=String(t??'');t=t.replace(/\.{3}/g,'…⚡');t=t.replace(/(\d+)/g,'🔢 $1');t=t.replace(/\b(\w+)\b(?=!)/g,'🌟 $1');if(/\?\s*$/.test(t))t=t.replace(/\?\s*$/,'')+'🌀';t=t.replace(/\s{2,}/g,'⸱');return t}catch(e){return String(t??'')}}
  function detectArch(t){const A=[[/(meta)?lux/i,'🜚 MetaLux'],[/kaos|caos|chaos/i,'🌪️ Chaos'],[/lumine|luz/i,'🌟 Lumine'],[/pulse|pulso/i,'💓 Pulse'],[/atlas|mundo|terra/i,'🌍 Atlas'],[/rhea|lua/i,'🌙 Rhea'],[/rhia/i,'🧬 RHIA'],[/nova/i,'☀️ Nova'],[/sol/i,'🔥 Sol'],[/ion|íon/i,'⚛️ Ion'],[/artemis/i,'🏹 Artemis'],[/anfodote|antidoto|antídoto/i,'🧪 Anfodote']];for(const [k,l] of A) if(k.test(t))return l;return '🧬 Neutro';}
  function vib(t){let h=0,s=String(t??'');for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;const v=((h%40)/4+6.0);return Math.min(10,Math.max(1,+(v/1.75).toFixed(1)))}
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const br=s=>esc(s).replace(/\n/g,'<br/>');

  function updateHUD({regex,vib,arch}){
    const ft=$('.footer-text'); if(!ft) return;
    ft.setAttribute('data-hud','1');
    const base=ft.getAttribute('data-base')||ft.textContent.trim()||'sempre único, sempre seu';
    ft.setAttribute('data-base',base);
    ft.innerHTML = `${esc(base)} · <span class="dual-chip">${esc(arch||'Neutro')}</span> <span class="dual-chip">Regex</span> <span class="dual-chip">Vib: ${esc(String(vib??'–'))}</span>`;
  }
  function logPulso(msg){
    const p=$('#pulsos'); if(!p) return;
    const d=document.createElement('div'); d.className='debug-mistico';
    const ts=new Date(),pad=n=>String(n).padStart(2,'0');
    d.textContent=`[${pad(ts.getHours())}:${pad(ts.getMinutes())}:${pad(ts.getSeconds())}] ${msg}`;
    p.prepend(d);
  }
function applyArchName(label){
    const name=String(label||'').replace(/^[^A-Za-zÀ-ÿ]*\s*/, '').trim()||'Neutro';
    document.body.dataset.arch=name;
    localStorage.setItem('SUMBUS_LAST_ARCH',name);
    document.body.classList.add('vibe'); setTimeout(()=>document.body.classList.remove('vibe'),600);
    return name;
  }
  (function rsArch(){const last=localStorage.getItem('SUMBUS_LAST_ARCH'); if(last) document.body.dataset.arch=last;})();

  (function rsScroll(){
    const c=$('.response-container'); if(!c) return;
    const K='SUMBUS_SCROLL_TOP'; const last=+localStorage.getItem(K); if(!isNaN(last)) c.scrollTop=last;
    c.addEventListener('scroll',()=>localStorage.setItem(K,c.scrollTop),{passive:true});
  })();

  function renderDual({userQuery,resposta,regex,arch,energy}){
    const el=document.createElement('div'); el.className='dual-md';
    el.innerHTML = `<blockquote>🌌 ${esc(userQuery||'Dual.Infodose')}<br/><small>${now()}</small></blockquote>`+
      `<div>${br(resposta||'')}</div>`+
      `<div style="margin-top:10px"><span class="dual-chip">Regex: ${esc(regex||'')}</span> <span class="dual-chip">Arquétipo: ${esc(arch||'')}</span> <span class="dual-chip">Vibração: ${esc(String(energy||''))}/10</span></div>`;
    const cont=$('.response-container')||document.body; cont.appendChild(el); cont.scrollTop=cont.scrollHeight; return el;
  }

  if (typeof window.splitText==='function' && !window.splitText.__v622){
    const prev=window.splitText;
    window.splitText=function(text,maxLen){ try{return [String(text??'')]}catch(e){return prev.call(this,text,maxLen)} };
    window.splitText.__v622=true;
  }

  (function hookRender(){
    const g=window; if(typeof g.renderResponse!=='function' || g.renderResponse.__v622) return;
    const prev=g.renderResponse;
    g.renderResponse=function(...a){
      const ret=prev.apply(this,a);
      try{
        if(!window.__SUMBUS_ACTIVE__) return ret;
        const txt=(a && typeof a[0]==='string')?a[0]:''; if(!txt) return ret;
        const arch=detectArch(txt), energy=vib(txt), regex=r'\b(\w+)\b(?=!) + \?$ + \.\.\.→…⚡ + (\d+)';
        const out=dual_formatter(txt);
        const name=applyArchName(arch);
        updateHUD({regex,vib:energy,arch:name}); logPulso('🔁 Voz: '+arch);
        renderDual({userQuery: window.__KOBLLUX_LAST_QUERY__||'Dual.Infodose', resposta: out, regex, arch, energy});
      }catch(e){}
      return ret;
    }; g.renderResponse.__v622=true;
  })();

  (function hookCall(){
    const g=window; if(typeof g.callAI!=='function' || g.callAI.__v622) return;
    const prev=g.callAI;
    g.callAI=function(prompt,...rest){
      const raw=(typeof prompt==='string'?prompt:String(prompt??''));
      window.__KOBLLUX_LAST_QUERY__=raw;
      if(window.__SUMBUS_ACTIVE__){
        const energy=vib(raw); renderDual({userQuery:'Você',resposta:dual_formatter(raw),regex:'ida',arch:'Usuário',energy});
      }
      const payload=(window.__SUMBUS_ACTIVE__&&INJECT_OUTBOUND) ? dual_formatter(raw) : raw;
      const r=prev.call(this,payload,...rest);
      if(r && typeof r.then==='function'){ return r.then(x=>{ try{ window.renderResponse && window.renderResponse(String(x)); }catch(e){} return x; }); }
      return r;
    }; g.callAI.__v622=true;
  })();

  (function rememberInput(){
    const i=$('.input-container input'), b=$('.input-container button');
    if(!i||!b) return; const set=()=>window.__KOBLLUX_LAST_QUERY__=i.value;
    b.addEventListener('click',set,{capture:true}); i.addEventListener('keydown',ev=>{if(ev.key==='Enter') set();});
  })();

  // Do not remove upload; no MetaLux button
})();

(function(){
  if (window.__REFINE_629__) return; window.__REFINE_629__=true;

  const $ = (s,r=document)=>r.querySelector(s);
  const create = (t,c,h)=>{ const e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e; };
  const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function protectCode(text){
    const stash=[];
    let i=0;
    const protected = text
      // ```code``` blocks
      .replace(/```([\s\S]*?)```/g, (_,code)=>`§§CODE${stash.push(code)-1}§§`)
      // inline `code`
      .replace(/`([^`]+)`/g, (_,code)=>`§§INL${stash.push(code)-1}§§`);
    return { 
      text: protected, 
      restore: (t)=>t
        .replace(/§§CODE(\d+)§§/g, (_,k)=>"<pre><code>"+esc(stash[+k])+"</code></pre>")
        .replace(/§§INL(\d+)§§/g,  (_,k)=>"<code>"+esc(stash[+k])+"</code>")
    };
  }

  function dualFormatter(t){
    // safe formatting outside of code
    const {text, restore} = protectCode(String(t||''));
    let x = text;
    x = x.replace(/\.{3}/g,'…⚡');
    x = x.replace(/(?<!\w)(\d{1,3}(?:[.,]\d{3})*|\d+)(?!\w)/g,'<span class="num">🔢 $1</span>');
    x = x.replace(/\b(\w+)\b(?=!)/g,'<span class="em">🌟 $1</span>');
    x = x.replace(/\?\s*$/,'🌀');
    x = x.replace(/\s{2,}/g,'⸱');
    return restore(x);
  }

  // smarter split for single-page blocks
  function smartSplit(text, maxChars){
    const MAX = +localStorage.getItem('SUMBUS_MAX_CHARS') || (maxChars||1200);
    const segments = [];
    const {text: safe, restore} = protectCode(text);
    // split on strong boundaries while preserving tables and code markers we've stashed
    let parts = safe
      .split(/\n(?=#{1,6}\s)|\n-{3,}\n|\n\*{3,}\n|\n\s*\n/g)
      .filter(p=>p && p.trim());

    // re-wrap to MAX by sentence if needed
    const out=[];
    for (let p of parts){
      if (p.length<=MAX){ out.push(p); continue; }
      const sentences = p.match(/[^\.!\?]+[\.!\?]+|\S+$/g) || [p];
      let buf="";
      for (const s of sentences){
        if ((buf+s).length>MAX){
          out.push(buf.trim()); buf=s;
        } else {
          buf+=s;
        }
      }
      if (buf.trim()) out.push(buf.trim());
    }
    for (const o of out) segments.push( restore(o) );
    return segments;
  }


  // hook original renderResponse if exists
  const g=window;
  if (typeof g.renderResponse === 'function' && !g.renderResponse.__refine629){
    const prev = g.renderResponse;
    g.renderResponse = function(text){
      try{
        renderResponseUnified(String(text||''));
      }catch(e){
        console.warn('refine629 fallback', e);
        return prev.apply(this, arguments);
      }
    };
    g.renderResponse.__refine629 = true;
  }

  // also refine when calling AI result comes back as string
  if (typeof g.callAI === 'function' && !g.callAI.__refine629){
    const prev = g.callAI;
    g.callAI = function(prompt, ...rest){
      const r = prev.call(this, prompt, ...rest);
      if (r && typeof r.then === 'function'){
        return r.then(ans=>{
          try{ renderResponseUnified(String(ans||'')); }catch(e){}
          return ans;
        });
      }
      return r;
    };
    g.callAI.__refine629 = true;
  }

  // Center controls if pagination is removed
  (function centerControls(){
    const rc = document.querySelector('.response-controls');
    if (rc){
      // ensure only control-buttons are visible inside
      const pag = rc.querySelector('.pagination');
      if (pag) pag.style.display='none';
    }
  })();

  /*
   * Substitui a implementação global de renderResponse por uma função
   * simplificada que delega ao renderResponseUnified. Essa substituição
   * é feita após o refinamento original para garantir que o g.callAI
   * continue funcionando. Se o Unified falhar, mostramos o texto puro
   * dentro de um bloco simples. Ao definir a propriedade __refine629
   * evitamos novas interceptações.
   */
  window.renderResponse = function(text){
    try{
      renderResponseUnified(String(text || ''));
    }catch(e){
      console.error('renderResponse fallback', e);
      const wrap = document.querySelector('.pages-wrapper') || document.getElementById('pagesWrapper');
      if(wrap){
        wrap.innerHTML = '';
        const page = document.createElement('div');
        page.className = 'page active';
        const block = document.createElement('div');
        block.className = 'response-block';
        block.innerHTML = '<p>'+String(text || '')+'</p>';
        page.appendChild(block);
        wrap.appendChild(page);
      }
    }
  };
  window.renderResponse.__refine629 = true;

})();



(function(){
      // LocalStorage keys
      const LS_KEYS = {
        OR_KEYS: 'OR_KEYS',           // array of {name, key}
        OR_ACTIVE: 'OR_ACTIVE',       // name of active key
        TRAIN_BASE: 'TRAIN_BASE_TEXT',
        TRAIN_BASE_NAME: 'TRAIN_BASE_NAME',
        TRAIN_BASE_ENABLED: 'TRAIN_BASE_ENABLED',
        TRAIN_EXTRAS: 'TRAIN_EXTRAS'  // array of {name, text, enabled}
      };
      // Helpers
      const qs = (s, r=document)=>r.querySelector(s);
      const store = {
        get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch(e){ return d; } },
        set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
      };
      // UI refs
      const openBtn  = qs('#keymgrOpen');
      const panel    = qs('#keymgrPanel');
      const closeBtn = qs('#keymgrClose');
      const orKeyName  = qs('#orKeyName');
      const orKeyValue = qs('#orKeyValue');
      const btnPaste   = qs('#btnPasteKey');
      const btnSaveKey = qs('#btnSaveKey');
      const keysList   = qs('#keysList');
      const baseName   = qs('#baseTrainName');
      const baseText   = qs('#baseTrainText');
      const baseFile   = qs('#baseTrainFile');
      const btnLoadBase= qs('#btnLoadBaseTxt');
      const btnApply   = qs('#btnApplyBaseTxt');
      const baseEnabled= qs('#baseTrainEnabled');
      const extraName  = qs('#extraName');
      const extraFile  = qs('#extraFile');
      const btnLoadExt = qs('#btnLoadExtraTxt');
      const extrasList = qs('#extrasList');

      // Novos elementos para uploads e info de usuário
      const keymgrUserName = qs('#keymgrUserName');
      const keymgrAssistantName = qs('#keymgrAssistantName');
      const btnUploadHTML = qs('#btnUploadHTML');
      const btnUploadSymbol = qs('#btnUploadSymbol');
      const btnRemoteComponent = qs('#btnRemoteComponent');
      const btnToggleDecoder = qs('#btnToggleDecoder');
      const uploadHTMLInput = document.getElementById('uploadHTML');
      const uploadSymbolInput = document.getElementById('symbolicFileInput');
      const decoderBox = document.getElementById('decoderBox');

      // open/close panel
      openBtn && openBtn.addEventListener('click', ()=>{
        panel.classList.add('open');
        // Atualiza informações do usuário e assistente ao abrir
        if (keymgrUserName) keymgrUserName.textContent = localStorage.getItem('userName') || '';
        if (keymgrAssistantName) keymgrAssistantName.textContent = localStorage.getItem('assistantBase') || '';
      });
      closeBtn && closeBtn.addEventListener('click', ()=> panel.classList.remove('open'));

      // clipboard support
      btnPaste && btnPaste.addEventListener('click', async ()=>{
        try{ orKeyValue.value = await navigator.clipboard.readText(); }catch(e){ alert('Não consegui ler o clipboard.'); }
      });

      // render keys
      function renderKeys(){
        const list = store.get(LS_KEYS.OR_KEYS, []);
        const active = store.get(LS_KEYS.OR_ACTIVE, null);
        keysList.innerHTML = '';
        list.forEach((k, idx)=>{
          const item = document.createElement('div'); item.className='item';
          item.innerHTML = '<div class="badges"><span class="badge">'+(k.name||('Chave '+(idx+1)))+'</span>'+(active===k.name?'<span class="badge">ATIVA</span>':'')+'</div>';
          const actions = document.createElement('div'); actions.className='row';
          const btnAct = document.createElement('button'); btnAct.className='btnx'; btnAct.textContent='Ativar';
          btnAct.addEventListener('click', ()=>{ store.set(LS_KEYS.OR_ACTIVE, k.name); renderKeys(); });
          const btnDel = document.createElement('button'); btnDel.className='btnx'; btnDel.textContent='Excluir';
          btnDel.addEventListener('click', ()=>{ list.splice(idx,1); store.set(LS_KEYS.OR_KEYS, list); if (active===k.name) store.set(LS_KEYS.OR_ACTIVE, null); renderKeys(); });
          actions.append(btnAct, btnDel);
          item.append(actions);
          keysList.append(item);
        });
      }
      // save key
      btnSaveKey && btnSaveKey.addEventListener('click', ()=>{
        const name = (orKeyName.value||'').trim(); const val = (orKeyValue.value||'').trim();
        if (!val || !/^sk-/.test(val)){ return alert('Cole uma chave começando com sk-'); }
        const list = store.get(LS_KEYS.OR_KEYS, []);
        const i = list.findIndex(x=>x.name===name);
        if (i>=0) list[i].key = val; else list.push({name: name||('Chave '+(list.length+1)), key: val});
        store.set(LS_KEYS.OR_KEYS, list);
        if (!store.get(LS_KEYS.OR_ACTIVE,null)) store.set(LS_KEYS.OR_ACTIVE, list[0].name);
        orKeyValue.value='';
        renderKeys();
        alert('Chave salva.');
      });
      // public helper
      window.getOpenRouterKey = function(){
        const list = store.get(LS_KEYS.OR_KEYS, []);
        const active = store.get(LS_KEYS.OR_ACTIVE, null);
        const item = list.find(x=>x.name===active) || list[0];
        return item ? item.key : null;
      };
      // patch fetch to inject Authorization header
      if (!window.__openrouterPatched){
        const origFetch = window.fetch;
        window.fetch = async function(input, init={}){
          try{
            const url = (typeof input === 'string') ? input : (input && input.url) || '';
            const key = window.getOpenRouterKey && window.getOpenRouterKey();
            if (key){
              init = init || {};
              init.headers = new Headers(init.headers || {});
              if (/openrouter|\/v1\/chat\/|\/v1\/completions/.test(url)){
                if (!init.headers.get('Authorization')) init.headers.set('Authorization','Bearer '+key);
              }
            }
          }catch(e){ console.warn('OpenRouter wrapper falhou', e); }
          return origFetch(input, init);
        };
        window.__openrouterPatched = true;
      }
      // training base
      function loadBaseFromLS(){
        baseName.value = store.get(LS_KEYS.TRAIN_BASE_NAME, 'Base (inline)');
        baseText.value = store.get(LS_KEYS.TRAIN_BASE, '') || (window.TRAININGS && window.TRAININGS.unificado) || '';
        baseEnabled.checked = store.get(LS_KEYS.TRAIN_BASE_ENABLED, true);
      }
      loadBaseFromLS();
      btnLoadBase && btnLoadBase.addEventListener('click', ()=> baseFile.click());
      baseFile && baseFile.addEventListener('change', async (e)=>{
        const f = e.target.files[0]; if (!f) return;
        const txt = await f.text();
        baseName.value = f.name.replace(/\.txt$/i,'');
        baseText.value = txt;
      });
      btnApply && btnApply.addEventListener('click', ()=>{
        store.set(LS_KEYS.TRAIN_BASE_NAME, baseName.value.trim()||'Base');
        store.set(LS_KEYS.TRAIN_BASE, baseText.value||'');
        store.set(LS_KEYS.TRAIN_BASE_ENABLED, baseEnabled.checked);
        try{
          if (baseEnabled.checked && typeof window.setTrainingText==='function'){
            window.setTrainingText(baseText.value||'');
            localStorage.setItem('DUAL_TRAINING_MODE','unificado');
          }
          alert('Treinamento base aplicado.');
          if (window.logMistico) window.logMistico('⚙️ Base aplicada: '+(baseName.value||'Base'));
        }catch(e){ console.warn('Falha ao aplicar base', e); }
      });
      baseEnabled && baseEnabled.addEventListener('change', ()=> store.set(LS_KEYS.TRAIN_BASE_ENABLED, baseEnabled.checked));
      // extras / ativações
      function renderExtras(){
        const extras = store.get(LS_KEYS.TRAIN_EXTRAS, []);
        extrasList.innerHTML='';
        extras.forEach((ex, idx)=>{
          const row = document.createElement('div'); row.className='item';
          const left = document.createElement('div'); left.className='badges';
          left.innerHTML = '<span class="badge">'+(ex.name||('Extra '+(idx+1)))+'</span>';
          const right = document.createElement('div'); right.className='row';
          const toggle = document.createElement('label'); toggle.className='switch';
          const cb = document.createElement('input'); cb.type='checkbox'; cb.checked=!!ex.enabled;
          cb.addEventListener('change', ()=>{ ex.enabled = cb.checked; extras[idx]=ex; store.set(LS_KEYS.TRAIN_EXTRAS, extras); });
          toggle.append(cb, document.createTextNode(' Ativo'));
          const btnView = document.createElement('button'); btnView.className='btnx'; btnView.textContent='Ver';
          btnView.addEventListener('click', ()=>{ alert(ex.text.slice(0,1200) + (ex.text.length>1200?'...':'')); });
          const btnDel = document.createElement('button'); btnDel.className='btnx'; btnDel.textContent='Excluir';
          btnDel.addEventListener('click', ()=>{ extras.splice(idx,1); store.set(LS_KEYS.TRAIN_EXTRAS, extras); renderExtras(); });
          right.append(toggle, btnView, btnDel);
          row.append(left, right);
          extrasList.append(row);
        });
      }
      renderExtras();
      btnLoadExt && btnLoadExt.addEventListener('click', ()=> extraFile.click());
      extraFile && extraFile.addEventListener('change', async (e)=>{
        const f = e.target.files[0]; if (!f) return;
        const txt = await f.text();
        const name = (extraName.value||f.name.replace(/\.txt$/i,'')).trim() || ('Extra '+(store.get(LS_KEYS.TRAIN_EXTRAS, []).length+1));
        const extras = store.get(LS_KEYS.TRAIN_EXTRAS, []);
        extras.push({name, text: txt, enabled:true});
        store.set(LS_KEYS.TRAIN_EXTRAS, extras);
        extraName.value='';
        renderExtras();
      });

      // Integração de uploads e componentes no painel
      if (btnUploadHTML && uploadHTMLInput) {
        btnUploadHTML.addEventListener('click', () => {
          uploadHTMLInput.click();
        });
      }
      if (btnUploadSymbol && uploadSymbolInput) {
        btnUploadSymbol.addEventListener('click', () => {
          uploadSymbolInput.click();
        });
      }
      if (btnRemoteComponent) {
        btnRemoteComponent.addEventListener('click', () => {
          const url = prompt("URL do componente remoto:");
          if (url) {
            const frame = document.createElement('my-frame-loader');
            frame.src = url;
            document.body.appendChild(frame);
          }
        });
      }
      if (btnToggleDecoder && decoderBox) {
        btnToggleDecoder.addEventListener('click', () => {
          decoderBox.style.display = decoderBox.style.display === 'none' ? 'block' : 'none';
        });
      }
      // Oculta os botões laterais originais, pois agora estão acessíveis pelo painel
      const sideBtns = document.querySelectorAll('#uploadComponentBtn, #remoteComponentBtn, #toggleDecoderBtn');
      sideBtns.forEach(el => el.style.display = 'none');
      // merge extras to system prompt
      if (!window.__mergeExtrasInstalled){
        const origBuild = window.buildSystemPrompt;
        window.buildSystemPrompt = function(){
          let base = '';
          if (store.get(LS_KEYS.TRAIN_BASE_ENABLED, true)){
            base = store.get(LS_KEYS.TRAIN_BASE, '') || (window.TRAININGS && window.TRAININGS.unificado) || '';
          } else {
            base = (window.TRAININGS && window.TRAININGS.unificado) || '';
          }
          const extras = store.get(LS_KEYS.TRAIN_EXTRAS, []).filter(x=>x.enabled).map(x=>x.text).join('\n\n');
          return [base, extras].filter(Boolean).join('\n\n');
        };
        window.__mergeExtrasInstalled = true;
      }
      // apply base on boot
      try{
        if (store.get(LS_KEYS.TRAIN_BASE, '')){
          if (typeof window.setTrainingText==='function' && store.get(LS_KEYS.TRAIN_BASE_ENABLED, true)){
            window.setTrainingText(store.get(LS_KEYS.TRAIN_BASE, ''));
          }
        }
      }catch(e){}
      // initial render of keys
      renderKeys();
    })();

// v6.2.2 footer-click → oculta/exibe respostas renderizadas (.response-container)
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer-text");
  const responseContainer = document.getElementById("response");

  if (!footer || !responseContainer) return;

  // estado inicial persistente (opcional)
  try {
    const saved = localStorage.getItem("dual_footer_hide_response");
    if (saved === "1") {
      responseContainer.style.display = "none";
      footer.classList.add("active");
    }
  } catch(_) {}

  footer.addEventListener("click", () => {
    const isHidden = responseContainer.style.display === "none";
    // alterna display
    responseContainer.style.display = isHidden ? "block" : "none";
    footer.classList.toggle("active", !isHidden);

    // persiste preferencia
    try {
      localStorage.setItem("dual_footer_hide_response", (!isHidden) ? "1" : "0");
    } catch(_) {}
  });
});

// v6.2.3 — Cria #response-inner e garante que o footer nunca suma
(function(){
  // use existing q() defined earlier; avoid redefining it
  function wrapResponseInner(){
    const resp = q('#response');
    if(!resp) return;
    // Procura footer
    const footer = resp.querySelector('.footer-text');
    // Já existe inner?
    if(resp.querySelector('#response-inner')) return;
    const inner = document.createElement('div');
    inner.id = 'response-inner';
    // Move tudo que NÃO é footer para dentro do inner
    Array.from(resp.childNodes).forEach(node=>{
      if(node.nodeType===1 && node.classList && node.classList.contains('footer-text')) return;
      if(node === footer) return;
      inner.appendChild(node);
    });
    // Insere antes do footer (se houver), senão no fim
    if(footer) resp.insertBefore(inner, footer);
    else resp.appendChild(inner);
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    wrapResponseInner();
    // Se algum script antigo tentar dar display:none em #response, desfazemos para não perder o footer
    const resp = q('#response');
    if(resp && getComputedStyle(resp).display === 'none'){
      resp.style.display = 'block';
    }
  });
})();

// v6.2.4 — Footer alterna apenas as páginas renderizadas (mantém #response visível)
(function(){
  function q(sel, root=document){ return root.querySelector(sel); }
  document.addEventListener('DOMContentLoaded', ()=>{
    const resp = q('#response');
    const footer = resp ? resp.querySelector('.footer-text') : null;
    if(!resp || !footer) return;

    // failsafe: se algum código antigo esconder o #response, reexibe
    if(getComputedStyle(resp).display === 'none'){ resp.style.display = 'block'; }

    // restaura estado salvo
    try{
      const saved = localStorage.getItem('dual_pages_hidden');
      if(saved === '1'){ resp.setAttribute('data-pages-hidden','1'); }
    }catch(_){}

    footer.addEventListener('click', ()=>{
      const hidden = resp.getAttribute('data-pages-hidden') === '1';
      resp.setAttribute('data-pages-hidden', hidden ? '0' : '1');
      try{ localStorage.setItem('dual_pages_hidden', hidden ? '0' : '1'); }catch(_){}
    });
  });
})();

document.addEventListener('DOMContentLoaded',function(){
  const host=document.querySelector('#layoutToggle,[data-ui="layout-toggle"]');
  function ensure(btn,svg){
    if(!btn) return;
    btn.classList.add('kdx-round');
    if(!btn.querySelector('svg')) btn.innerHTML = svg;
    if(btn.parentElement!==host && host) host.appendChild(btn);
  }
  ensure(document.querySelector('#lockButton,[data-role="lock"],.lock-btn,button[name="lock"],button[data-action="lock"]'), `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 11v-2a4 4 0 0 1 8 0v2"></path><rect x="8" y="11" width="8" height="7" rx="2" ry="2"></rect></svg>`);
  ensure(document.querySelector('#themeToggle,[data-role="theme"],.theme-toggle,button[name="theme"],button[data-action="theme"]'), `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 0 0 20a8 8 0 0 1 0-20z"></path></svg>`);

  const b=document.createElement('button'); b.id='kdx-reload'; b.type='button'; b.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v4l3 1"></path></svg>`; b.onclick=()=>location.reload(); document.body.appendChild(b);
});

(() => {
  const LS_KEY = 'dualapp.patches';
  const dom = {
    btn: document.getElementById('patchMgrBtn'),
    panel: document.getElementById('patchMgrPanel'),
    list: document.getElementById('patchList'),
    patchList: document.getElementById('patchList'),
    imp: document.getElementById('pmImport'),
    paste: document.getElementById('pmPaste'),
    exp: document.getElementById('pmExport'),
    close: document.getElementById('pmClose'),
    storageBtn: document.getElementById('pmStorage'),
    storagePanel: document.getElementById('storageManager'),
    storageList: document.getElementById('storageList'),
    storageRefresh: document.getElementById('storageRefresh'),
    storageClear: document.getElementById('storageClear'),
    storageExport: document.getElementById('storageExport'),
    storageAdd: document.getElementById('storageAdd'),
    cssInput: document.getElementById('cssInput'),
    applyCSSBtn: document.getElementById('applyCSS'),
    terminalBtn: document.getElementById('pmTerminal'),
    terminalPanel: document.getElementById('terminalManager'),
    terminalFrame: document.getElementById('pmTerminalFrame'),
    // Quick injection panel elements
    quickBtn: document.getElementById('pmQuick'),
    quickPanel: document.getElementById('quickManager'),
    quickInput: document.getElementById('quickInput'),
    applyQuickBtn: document.getElementById('applyQuick'),
    // Avatar upload and profile elements
    avatarUpload: document.getElementById('avatarUpload'),
    pmAvatarSvg: document.querySelector('.pm-profile svg'),
    pmUserName: document.getElementById('pmUserName'),

    // Background manager elements
    bgBtn: document.getElementById('pmBackgrounds'),
    bgPanel: document.getElementById('bgManager'),
    bgUploadBtn: document.getElementById('bgUploadBtn'),
    bgUploadInput: document.getElementById('bgUploadInput'),
    bgList: document.getElementById('bgList'),
  };
  const guards = {
    maxCss: 50000,
    maxJs: 50000,
    blocked: [/document\.write\s*\(/i, /new\s+Function\s*\(/i, /\beval\s*\(/i],
  };
  function load(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||'[]'); }catch{ return []; } }
  function save(arr){ localStorage.setItem(LS_KEY, JSON.stringify(arr||[])); }
  function byPriority(a,b){ return (a.priority??0) - (b.priority??0); }
  function validate(p){
    if(!p || typeof p!=='object') throw new Error('patch inválido');
    if(!p.id || typeof p.id!=='string') throw new Error('id obrigatório');
    if(p.css && p.css.length>guards.maxCss) throw new Error('CSS muito grande');
    if(p.js && p.js.length>guards.maxJs) throw new Error('JS muito grande');
    const bad = (p.js||'');
    guards.blocked.forEach(rx=>{ if(rx.test(bad)) throw new Error('JS bloqueado por política'); });
    return true;
  }
  function removeOne(id){
    document.querySelectorAll(`[data-patch="${id}"]`).forEach(el=>el.remove());
  }
  function applyOne(p){
    removeOne(p.id);
    if(p.css){
      const st = document.createElement('style');
      st.setAttribute('data-patch', p.id);
      st.textContent = p.css;
      document.head.appendChild(st);
    }
    if(p.js){
      const sc = document.createElement('script');
      sc.setAttribute('data-patch', p.id);
      sc.textContent = `(function(){ try{ ${p.js}\n }catch(e){console.warn('Patch JS falhou',e)} })();`;
      document.body.appendChild(sc);
    }
  }
  function applyAll(){
    const arr = load().filter(p=>p.enabled!==false).sort(byPriority);
    arr.forEach(applyOne);
  }
  function upsert(patch){
    validate(patch);
    const arr = load();
    const i = arr.findIndex(x=>x.id===patch.id);
    if(i>=0) arr[i] = {...arr[i], ...patch};
    else arr.push({...patch, enabled:true});
    save(arr); render(); applyAll();
  }
  function toggle(id,on){
    const arr = load();
    const i = arr.findIndex(x=>x.id===id);
    if(i>=0){ arr[i].enabled = on; save(arr); render(); applyAll(); }
  }
  function remove(id){
    const arr = load().filter(x=>x.id!==id);
    save(arr);
    removeOne(id);
    render();
    applyAll();
  }
  function exportAll(){
    const data = JSON.stringify(load(), null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dualapp-patches.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function renderStorage() {
    if (!dom.storageList) return;
    const list = dom.storageList;
    list.innerHTML = '';
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k !== LS_KEY) keys.push(k);
    }
    if (keys.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'pm-item';
      empty.innerHTML = '<em>Sem dados</em>';
      list.appendChild(empty);
      return;
    }
    keys.sort();
    keys.forEach(key => {
      const val = localStorage.getItem(key) || '';
      const displayVal = val.length > 40 ? val.slice(0, 40) + '…' : val;
      const row = document.createElement('div');
      row.className = 'pm-item';
      row.innerHTML = `<div><strong>${key}</strong><small style="opacity:.7;display:block">${displayVal}</small></div><div class="pm-actions"><button data-act="edit">Editar</button><button data-act="rm">Remover</button></div>`;
      row.querySelector('[data-act="edit"]').onclick = () => {
        const current = localStorage.getItem(key);
        const nv = prompt('Novo valor para ' + key, current);
        if (nv !== null) {
          try {
            localStorage.setItem(key, nv);
            renderStorage();
          } catch (e) { alert('Erro ao gravar no localStorage: ' + e.message); }
        }
      };
      row.querySelector('[data-act="rm"]').onclick = () => {
        if (confirm('Remover ' + key + '?')) {
          localStorage.removeItem(key);
          renderStorage();
        }
      };
      list.appendChild(row);
    });
  }
  function clearStorage() {
    if (confirm('Limpar TODOS os dados do localStorage?')) {
      localStorage.clear();
      renderStorage();
    }
  }
  function exportStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dualapp-localstorage.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  function addStorage() {
    const key = prompt('Nome da chave');
    if (!key) return;
    const val = prompt('Valor para ' + key);
    if (val === null) return;
    try {
      localStorage.setItem(key, val);
      renderStorage();
    } catch (e) { alert('Erro ao gravar no localStorage: ' + e.message); }
  }
  function applyCSS() {
    if (!dom.cssInput) return;
    const css = dom.cssInput.value || '';
    let styleEl = document.getElementById('customCssPatch');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'customCssPatch';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
    try { localStorage.setItem('dualapp_custom_css', css); } catch (_) {}
  }
  function loadCustomCSS() {
    try {
      const css = localStorage.getItem('dualapp_custom_css');
      if (css && dom.cssInput) {
        dom.cssInput.value = css;
        applyCSS();
      }
    } catch (_) {}
  }
  function render(){
    const arr = load().sort(byPriority);
    dom.list.innerHTML = '';
    arr.forEach(p=>{
      const row = document.createElement('div'); row.className = 'pm-item';
      row.innerHTML = `<div><strong>${p.id}</strong><small style="opacity:.7;display:block">prio: ${p.priority??0} · css:${p.css?'✔︎':'–'} · js:${p.js?'✔︎':'–'}</small></div><div class="pm-actions"><button class="${p.enabled!==false?'pm-on':'pm-off'}" data-act="toggle">${p.enabled!==false?'On':'Off'}</button><button data-act="edit">Editar</button><button data-act="rm">Remover</button></div>`;
      row.querySelector('[data-act="toggle"]').onclick = () => toggle(p.id, !(p.enabled!==false));
      row.querySelector('[data-act="rm"]').onclick = () => remove(p.id);
      row.querySelector('[data-act="edit"]').onclick = () => {
        const txt = prompt('Edite o JSON do patch', JSON.stringify(p, null, 2));
        if(!txt) return;
        try{ upsert(JSON.parse(txt)); }catch(e){ alert('JSON inválido: ' + e.message); }
      };
      dom.list.appendChild(row);
    });
  }
  async function importFile(){
    const input = Object.assign(document.createElement('input'), {type:'file', accept:'application/json'});
    input.onchange = () => {
      const f = input.files?.[0]; if(!f) return;
      const r = new FileReader();
      r.onload = () => {
        try{
          const j = JSON.parse(r.result);
          (Array.isArray(j) ? j : [j]).forEach(upsert);
        }catch(e){ alert('JSON inválido: ' + e.message); }
      };
      r.readAsText(f);
    };
    input.click();
  }
  async function pasteJson(){
    const txt = prompt('Cole o JSON do patch:');
    if(!txt) return;
    try{
      const j = JSON.parse(txt);
      (Array.isArray(j) ? j : [j]).forEach(upsert);
    }catch(e){ alert('JSON inválido: ' + e.message); }
  }
  if(dom.btn){
    dom.btn.onclick = () => {
      dom.panel.style.display = (dom.panel.style.display==='block'?'none':'block');
    };
  }
  if(dom.close) dom.close.onclick = () => dom.panel.style.display = 'none';
  if(dom.imp) dom.imp.onclick = importFile;
  if(dom.paste) dom.paste.onclick = pasteJson;
  if(dom.exp) dom.exp.onclick = exportAll;
  if(dom.storageBtn){
    dom.storageBtn.onclick = () => {
      if(!dom.storagePanel) return;
      const visible = dom.storagePanel.style.display === 'block';
      if(visible){
        dom.storagePanel.style.display = 'none';
        dom.patchList.style.display = '';
      } else {
        dom.storagePanel.style.display = 'block';
        dom.patchList.style.display = 'none';
        if(dom.terminalPanel) dom.terminalPanel.style.display = 'none';
        renderStorage();
        loadCustomCSS();
      }
    };
  }
  if(dom.storageRefresh) dom.storageRefresh.onclick = renderStorage;
  if(dom.storageClear) dom.storageClear.onclick = clearStorage;
  if(dom.storageExport) dom.storageExport.onclick = exportStorage;
  if(dom.storageAdd) dom.storageAdd.onclick = addStorage;
  if(dom.applyCSSBtn) dom.applyCSSBtn.onclick = applyCSS;
  if(dom.terminalBtn){
    dom.terminalBtn.onclick = () => {
      if(!dom.terminalPanel) return;
      const visible = dom.terminalPanel.style.display === 'block';
      if(visible){
        dom.terminalPanel.style.display = 'none';
        dom.patchList.style.display = '';
      } else {
        dom.terminalPanel.style.display = 'block';
        dom.patchList.style.display = 'none';
        if(dom.storagePanel) dom.storagePanel.style.display = 'none';
      }
    };
  }

  // -----------------------
  // Quick Manager toggle logic
  // Show or hide the quick injection panel when clicking the Rápido button
  if(dom.quickBtn){
    dom.quickBtn.onclick = () => {
      if(!dom.quickPanel) return;
      const visible = dom.quickPanel.style.display === 'block';
      if(visible){
        dom.quickPanel.style.display = 'none';
        dom.patchList.style.display = '';
      } else {
        dom.quickPanel.style.display = 'block';
        dom.patchList.style.display = 'none';
        if(dom.storagePanel) dom.storagePanel.style.display = 'none';
        if(dom.terminalPanel) dom.terminalPanel.style.display = 'none';
      }
    };
  }

  // Apply quick injection of CSS or JS entered by the user
  if(dom.applyQuickBtn){
    dom.applyQuickBtn.onclick = () => {
      if(!dom.quickInput) return;
      const txt = dom.quickInput.value.trim();
      if(!txt) return;
      const id = 'quick-' + Date.now();
      const patch = { id };
      // Determine if the payload is likely JavaScript by looking for common JS keywords
      if(/[;{}]/.test(txt) && /(function|const|let|var|=>|console|return)/.test(txt)){
        patch.js = txt;
      } else {
        patch.css = txt;
      }
      try {
        upsert(patch);
        // clear the input after injection
        dom.quickInput.value = '';
      } catch(e){ alert('Erro ao injetar: ' + e.message); }
    };
  }

  // Avatar upload handling: allow the user to click on the avatar to select an image
  if(dom.pmAvatarSvg && dom.avatarUpload){
    dom.pmAvatarSvg.style.cursor = 'pointer';
    dom.pmAvatarSvg.addEventListener('click', () => {
      dom.avatarUpload.click();
    });
    dom.avatarUpload.addEventListener('change', () => {
      const file = dom.avatarUpload.files?.[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        try {
          localStorage.setItem('dualapp.userAvatar', dataUrl);
        } catch(err){}
        const img = document.createElement('img');
        img.src = dataUrl;
        img.width = dom.pmAvatarSvg.clientWidth || 42;
        img.height = dom.pmAvatarSvg.clientHeight || 42;
        img.style.borderRadius = '50%';
        dom.pmAvatarSvg.replaceWith(img);
        dom.pmAvatarSvg = img;
        // Also set the avatar as background on the patch manager button
        if(dom.btn){
          dom.btn.style.backgroundImage = `url(${dataUrl})`;
          dom.btn.style.backgroundSize = 'cover';
          dom.btn.style.backgroundPosition = 'center';
          dom.btn.style.backgroundRepeat = 'no-repeat';
          dom.btn.textContent = '';
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Background manager: toggle panel visibility and handle uploads
  if(dom.bgBtn){
    dom.bgBtn.onclick = () => {
      if(!dom.bgPanel) return;
      const visible = dom.bgPanel.style.display === 'block';
      if(visible){
        dom.bgPanel.style.display = 'none';
        dom.patchList.style.display = '';
      } else {
        dom.bgPanel.style.display = 'block';
        dom.patchList.style.display = 'none';
        if(dom.storagePanel) dom.storagePanel.style.display = 'none';
        if(dom.terminalPanel) dom.terminalPanel.style.display = 'none';
        if(dom.quickPanel) dom.quickPanel.style.display = 'none';
        // ensure backgrounds list is up to date when opening
        renderBackgrounds();
      }
    };
  }
  if(dom.bgUploadBtn){
    dom.bgUploadBtn.onclick = () => {
      if(dom.bgUploadInput) dom.bgUploadInput.click();
    };
  }
  if(dom.bgUploadInput){
    dom.bgUploadInput.addEventListener('change', () => {
      if(dom.bgUploadInput.files && dom.bgUploadInput.files.length){
        uploadBackground(dom.bgUploadInput.files);
        dom.bgUploadInput.value = '';
      }
    });
  }

  // Load avatar from localStorage if present and replace the default icon
  function loadAvatar(){
    try{
      const dataUrl = localStorage.getItem('dualapp.userAvatar');
      if(dataUrl && dom.pmAvatarSvg){
        const img = document.createElement('img');
        img.src = dataUrl;
        img.width = dom.pmAvatarSvg.clientWidth || 42;
        img.height = dom.pmAvatarSvg.clientHeight || 42;
        img.style.borderRadius = '50%';
        dom.pmAvatarSvg.replaceWith(img);
        dom.pmAvatarSvg = img;
        // Also set the avatar on the patch manager button at load time
        if(dom.btn){
          dom.btn.style.backgroundImage = `url(${dataUrl})`;
          dom.btn.style.backgroundSize = 'cover';
          dom.btn.style.backgroundPosition = 'center';
          dom.btn.style.backgroundRepeat = 'no-repeat';
          dom.btn.textContent = '';
        }
      }
    }catch(e){}
  }

  // Background manager helper functions
  function loadBackgrounds(){
    try{
      return JSON.parse(localStorage.getItem('dualapp.backgrounds') || '[]');
    }catch(e){ return []; }
  }
  function saveBackgrounds(arr){
    try{ localStorage.setItem('dualapp.backgrounds', JSON.stringify(arr||[])); }catch(e){}
  }
  function renderBackgrounds(){
    if(!dom.bgList) return;
    const arr = loadBackgrounds();
    dom.bgList.innerHTML = '';
    if(arr.length === 0){
      const p = document.createElement('p');
      p.textContent = 'Nenhum fundo salvo.';
      p.style.opacity = '0.7';
      dom.bgList.appendChild(p);
      return;
    }
    arr.forEach(bg => {
      const wrapper = document.createElement('div');
      wrapper.className = 'bg-item';
      wrapper.dataset.id = bg.id;
      const img = document.createElement('img');
      img.src = bg.data;
      wrapper.appendChild(img);
      const actions = document.createElement('div');
      actions.className = 'bg-actions';
      const activateBtn = document.createElement('button');
      activateBtn.textContent = 'Usar';
      activateBtn.onclick = () => useBackground(bg.id);
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.onclick = () => deleteBackground(bg.id);
      actions.appendChild(activateBtn);
      actions.appendChild(removeBtn);
      wrapper.appendChild(actions);
      dom.bgList.appendChild(wrapper);
    });
  }
  function useBackground(id){
    const arr = loadBackgrounds();
    const found = arr.find(b => b.id === id);
    if(found){
      document.body.style.backgroundImage = `url(${found.data})`;
      try{ localStorage.setItem('dualapp.activeBackground', id); }catch(e){}
    }
  }
  function deleteBackground(id){
    let arr = loadBackgrounds();
    arr = arr.filter(b => b.id !== id);
    saveBackgrounds(arr);
    if(localStorage.getItem('dualapp.activeBackground') === id){
      localStorage.removeItem('dualapp.activeBackground');
      document.body.style.backgroundImage = '';
    }
    renderBackgrounds();
  }
  function uploadBackground(files){
    let arr = loadBackgrounds();
    const readers = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      readers.push(new Promise((resolve) => {
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          arr.push({ id: 'bg-' + Date.now() + Math.random().toString(16).slice(2), data: dataUrl });
          resolve();
        };
      }));
      reader.readAsDataURL(file);
    });
    Promise.all(readers).then(() => {
      saveBackgrounds(arr);
      renderBackgrounds();
    });
  }
  function loadActiveBackground(){
    try{
      const activeId = localStorage.getItem('dualapp.activeBackground');
      if(activeId){
        const arr = loadBackgrounds();
        const found = arr.find(b => b.id === activeId);
        if(found){
          document.body.style.backgroundImage = `url(${found.data})`;
        }
      }
    }catch(e){}
  }
  window.addEventListener('DOMContentLoaded', () => {
    render();
    applyAll();
    loadCustomCSS();
    // restore the user’s avatar if one is saved
    loadAvatar();
    // load backgrounds list and apply active background
    renderBackgrounds();
    loadActiveBackground();
  });
})();

(function(){
  try {
    const pulseLogger = window.logMistico;
    if (typeof pulseLogger === 'function') {
      const origLog = console.log;
      console.log = function(...args) {
        try { pulseLogger(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')); } catch (e) {}
        return origLog.apply(console, args);
      };
      const origWarn = console.warn;
      console.warn = function(...args) {
        try { pulseLogger('⚠️ ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')); } catch (e) {}
        return origWarn.apply(console, args);
      };
      const origError = console.error;
      console.error = function(...args) {
        try { pulseLogger('❌ ' + args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')); } catch (e) {}
        return origError.apply(console, args);
      };
    }
  } catch (err) {
    // swallow errors and fallback to standard console
    console.warn && console.warn('Pulsos logger hook failed', err);
  }
})();

/* Abrir/fechar painel */

/* Mostrar / Ocultar principais áreas (Response, Input, Footer) */
function mostrarBaseUI(){
  ['.response-container','.input-container','.footer-text']
    .forEach(sel => document.querySelectorAll(sel).forEach(el => el && (el.style.display = '')));
}
function ocultarBaseUI(){
  ['.response-container','.input-container','.footer-text']
    .forEach(sel => document.querySelectorAll(sel).forEach(el => el && (el.style.display = 'none')));
}

/* Tema base + VARs */
function setThemeBase(val){
  document.body.classList.remove('light','medium'); // “escuro” é default
  if(val === 'light')  document.body.classList.add('light');
  if(val === 'medium') document.body.classList.add('medium');
}
function aplicarVars(){
  const bg   = (document.getElementById('varBg')||{}).value?.trim?.() || '';
  const text = (document.getElementById('varText')||{}).value?.trim?.() || '';
  if(bg)   document.documentElement.style.setProperty('--bg', bg);
  if(text) document.documentElement.style.setProperty('--text', text);
  // persiste preferências
  try{
    const cfg = JSON.parse(localStorage.getItem('layoutConfig') || '{}');
    if(bg)   cfg.bg = bg;
    if(text) cfg.text = text;
    localStorage.setItem('layoutConfig', JSON.stringify(cfg));
  }catch(e){}
}

/* Performance (animações/partículas) */
function setPerf(level){
  document.body.classList.remove('perf-low','perf-medium','perf-high');
  document.body.classList.add('perf-'+level);
}

/* Bind inicial — não altera footer/input por padrão */
document.addEventListener('DOMContentLoaded', () => {
  // tema base
  document.querySelectorAll('input[name="themeBase"]').forEach(r =>
    r.addEventListener('change', e => setThemeBase(e.target.value))
  );
  // performance
  document.querySelectorAll('input[name="perf"]').forEach(r =>
    r.addEventListener('change', e => setPerf(e.target.value))
  );
  // restaurar vars personalizadas
  try{
    const saved = JSON.parse(localStorage.getItem('layoutConfig') || '{}');
    if(saved.bg)   document.documentElement.style.setProperty('--bg', saved.bg);
    if(saved.text) document.documentElement.style.setProperty('--text', saved.text);
    if(saved.bg)   { const el=document.getElementById('varBg'); if(el) el.value = saved.bg; }
    if(saved.text) { const el=document.getElementById('varText'); if(el) el.value = saved.text; }
  }catch(e){}
});

/* === Global click guard: ignore visuals on top of input & patch panels === */
(function(){
  const SAFE_AREAS = ['.input-container', '#patchMgrPanel', '.keymgr-panel', '#layoutTogglePanel'];
  function isInSafeArea(el){
    return SAFE_AREAS.some(sel => el && (el.closest ? el.closest(sel) : null));
  }
  const _origAdd = document.addEventListener;
  document.addEventListener = function(type, listener, opts){
    if(type === 'click' && typeof listener === 'function'){
      const wrapped = function(ev){
        if(isInSafeArea(ev.target)) return;
        return listener.call(this, ev);
      };
      return _origAdd.call(document, type, wrapped, opts);
    }
    return _origAdd.call(document, type, listener, opts);
  };
})();

/* === Patch Manager UX: toggle + drag + persist === */
(function(){
  const panel = document.getElementById('patchMgrPanel');
  const btn   = document.getElementById('patchMgrBtn');
  if(!panel || !btn) return;

  btn.addEventListener('click', ()=> {
    panel.style.display = (panel.style.display === 'block' ? 'none' : 'block');
    if(panel.style.display === 'block') panel.focus?.();
  });

  const header = panel.querySelector('header');
  let drag = null;
  function onDown(e){
    drag = {
      sx: (e.touches?e.touches[0].clientX:e.clientX),
      sy: (e.touches?e.touches[0].clientY:e.clientY),
      x:  panel.offsetLeft,
      y:  panel.offsetTop
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, {passive:false});
    document.addEventListener('touchend', onUp);
  }
  function onMove(e){
    if(!drag) return;
    e.preventDefault?.();
    const cx = (e.touches?e.touches[0].clientX:e.clientX);
    const cy = (e.touches?e.touches[0].clientY:e.clientY);
    const nx = Math.max(8, Math.min(window.innerWidth  - panel.offsetWidth  - 8, drag.x + (cx - drag.sx)));
    const ny = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, drag.y + (cy - drag.sy)));
    panel.style.left = nx + 'px';
    panel.style.top  = ny + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  }
  function onUp(){
    if(!drag) return;
    localStorage.setItem('pm.pos', JSON.stringify({ left: panel.style.left, top: panel.style.top }));
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
    drag = null;
  }
  header?.addEventListener('mousedown', onDown);
  header?.addEventListener('touchstart', onDown, {passive:true});

  // Restore position
  try{
    const pos = JSON.parse(localStorage.getItem('pm.pos')||'null');
    if(pos?.left && pos?.top){
      panel.style.left = pos.left; panel.style.top = pos.top;
      panel.style.right = 'auto'; panel.style.bottom = 'auto';
    }
  }catch(e){}
})();

// === PatchMgr: toggle behavior (safe append) ===
document.addEventListener("DOMContentLoaded", () => {
  try{
    const patchBtn = document.getElementById("patchMgrBtn");
    const patchPanel = document.getElementById("patchMgrPanel");
    if (patchBtn && patchPanel) {
      patchBtn.addEventListener("click", () => {
        patchPanel.classList.toggle("active");
        // ensure compatibility with older CSS
        if (patchPanel.classList.contains("active")) {
          patchPanel.style.display = "block";
          requestAnimationFrame(()=>{ patchPanel.style.opacity = "1"; });
        } else {
          patchPanel.style.opacity = "0";
          setTimeout(()=>{ patchPanel.style.display = "none"; }, 250);
        }
      });
    } else {
      console.warn("[PatchMgr] Elementos não encontrados:", { btn: !!patchBtn, panel: !!patchPanel });
    }
  }catch(e){ console.error("[PatchMgr] erro:", e); }
});

(function(){
  function ensureControls(){
    const panel = document.getElementById('patchMgrPanel');
    if(!panel || panel.querySelector('.kdx-presets-ui')) return;

    const box = document.createElement('div');
    box.className = 'kdx-presets-ui';
    box.style.marginTop = '10px';
    box.innerHTML = `
      <div style="border-top:1px solid rgba(255,255,255,.12); margin:.6rem 0; opacity:.8"></div>
      <h4 style="margin-bottom:.4rem; letter-spacing:.03em; opacity:.9;">Presets de Layout do Response</h4>
      <div class="kdx-grid" style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px;">
        <div class="cardx">
          <strong style="font-size:12px; opacity:.8;">Gap inferior</strong>
          <div class="row" style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btnx" data-gap="var(--resp-gap-low)">Baixo</button>
            <button class="btnx" data-gap="var(--resp-gap-med)">Médio</button>
            <button class="btnx" data-gap="var(--resp-gap-high)">Alto</button>
            <input id="kdx-gap-custom" type="text" placeholder="px (ex.: 64px)" style="flex:1; min-width:120px;">
            <button class="btnx" id="kdx-apply-gap">Aplicar</button>
          </div>
        </div>

        <div class="cardx">
          <strong style="font-size:12px; opacity:.8;">Estilo visual</strong>
          <div class="row" style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btnx" data-style="glass">Glass</button>
            <button class="btnx" data-style="paper">Paper</button>
            <button class="btnx" data-style="neon">Neon</button>
          </div>
        </div>

        <div class="cardx">
          <strong style="font-size:12px; opacity:.8;">Fonte</strong>
          <div class="row" style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btnx" data-font="sans">Sans</button>
            <button class="btnx" data-font="grotesk">Grotesk</button>
            <button class="btnx" data-font="mono">Mono</button>
            <button class="btnx" data-font="serif">Serif</button>
          </div>
        </div>

        <div class="cardx">
          <strong style="font-size:12px; opacity:.8;">Reset</strong>
          <div class="row" style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btnx" id="kdx-reset-presets">Limpar estilos</button>
          </div>
        </div>
      </div>
    `;
    panel.appendChild(box);

    // Wire buttons
    box.querySelectorAll('[data-gap]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const val = getComputedStyle(document.documentElement).getPropertyValue(btn.getAttribute('data-gap')).trim();
        document.documentElement.style.setProperty('--resp-extra-gap', val || '0px');
      });
    });
    box.querySelector('#kdx-apply-gap').addEventListener('click', ()=>{
      const t = box.querySelector('#kdx-gap-custom').value.trim();
      if(t) document.documentElement.style.setProperty('--resp-extra-gap', t);
    });
    box.querySelectorAll('[data-style]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.body.setAttribute('data-resp-style', btn.getAttribute('data-style'));
      });
    });
    box.querySelectorAll('[data-font]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.body.setAttribute('data-resp-font', btn.getAttribute('data-font'));
      });
    });
    box.querySelector('#kdx-reset-presets').addEventListener('click', ()=>{
      document.documentElement.style.removeProperty('--resp-extra-gap');
      document.body.removeAttribute('data-resp-style');
      document.body.removeAttribute('data-resp-font');
    });
  }

  // Attach when DOM is ready and also when PatchMgr is opened later
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensureControls);
  }else{
    ensureControls();
  }
  // Also observe for panel insertion if it loads after
  const obs = new MutationObserver(()=>ensureControls());
  obs.observe(document.documentElement, {subtree:true, childList:true});
})();



