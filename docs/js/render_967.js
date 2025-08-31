function splitTextLegacy1(t){
      let ps = t.split(/\n\s*\n/).filter(p=>p.trim());
      if(ps.length % 3 !== 0){
        ps = (t.match(/[^\.!\?]+[\.!\?]+/g)||[]).map(s=>s.trim());
      }
      const out=[];
      for(let i=0;i<ps.length;i+=3){
        out.push(ps.slice(i,i+3));
      }
      return out;
    }
function splitText(t) {
  return t
    .split(/\n\s*\n|(?<!\d)\. |! |\? /)
    .map(p => p.trim())
    .filter(Boolean)
    .reduce((acc, cur, i) => {
      const index = Math.floor(i / 3);
      acc[index] = acc[index] || [];
      acc[index].push(cur);
      return acc;
    }, []);
}
      function mergeShortParagraphs(paragraphs, threshold = 30) {
        const merged = [];
        let buffer = '';
        paragraphs.forEach(p => {
          // remove tags para calcular comprimento real
          const plain = p.replace(/<[^>]+>/g,'').trim();
          if(plain.length < threshold) {
            buffer += (buffer ? ' ' : '') + p;
          } else {
            if(buffer) { merged.push(buffer.trim()); buffer=''; }
            merged.push(p);
          }
        });
        if(buffer) merged.push(buffer.trim());
        return merged;
      }
  function createBlockLegacy1(content, className) {
    const block = document.createElement("div");
    block.className = "response-block " + className;

    const parsed = content
      .replace(/(\p{Emoji_Presentation}|\p{Emoji})/gu, match => {
        return `<button class="symbol-btn" onclick="registrarPulsoEEnviar('Emoji: ${match}')">${match}</button>`;
      })
      .replace(/\[(.+?)\]/g, (match, p1) => {
        return `<button class="symbol-btn" onclick="registrarPulsoEEnviar('[${p1}]')">[${p1}]</button>`;
      });

    block.innerHTML = parsed;

    block.addEventListener("click", () => {
      block.classList.toggle("expanded");
      const pulsos = document.getElementById("pulsos");
      if (pulsos) pulsos.classList.toggle("expanded");
      logMistico("◉ Expandiu bloco: " + className);
    });

    return block;
  }
  function createBlock(content, className) {
    const block = document.createElement("div");
    block.className = "response-block " + className;

    const parsed = content
      .replace(/(\p{Emoji_Presentation}|\p{Emoji})/gu, match => {
        return `<button class="symbol-btn" onclick="expandirPulso(); logMistico('Emoji: ${match}')">${match}</button>`;
      })
      .replace(/\[(.+?)\]/g, (match, p1) => {
        return `<button class="symbol-btn" onclick="expandirPulso(); logMistico('[${p1}]')">[${p1}]</button>`;
      });

    block.innerHTML = parsed;

    block.addEventListener("click", () => {
      block.classList.toggle("expanded");
      expandirPulso();
      logMistico("◉ Expandiu bloco: " + className);
    });

    return block;
  }
function renderResponseLegacy1(txt){
      const wrap=$('.pages-wrapper');
      wrap.innerHTML=''; pages=[]; currentPage=0; autoAdvance=true;
      txt = txt 
        .replace(/`([^`]+)`/g,'<code>$1</code>') 
        .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>') 
        .replace(/\*(.+?)\*/g,'<em>$1</em>');
      // AJUSTE 2: Substituir emojis por símbolos Unicode de forma consistente.
      // Este mapeamento converte os emojis temáticos em símbolos Unicode mais "limpos".
      const emojiMap = { '🎁':'◇', '👁️':'◆', '⚡️':'✦', '⚡':'✦' };
      txt = txt.replace(/([\u1F300-\u1F9FF\u2600-\u26FF\u2700-\u27BF])/g, m => emojiMap[m] || m);
      const groups = splitTextLegacy1(txt), 
            titles = ['🎁 Recompensa Inicial','👁️ Exploração','⚡️ Antecipação'];

      // AJUSTE 1: Combinar blocos consecutivos se a soma do conteúdo for muito curta.
      function mergeShortParagraphs(paragraphs, threshold = 30) {
        const merged = [];
        let buffer = '';
        paragraphs.forEach(p => {
          // remove tags para calcular comprimento real
          const plain = p.replace(/<[^>]+>/g,'').trim();
          if(plain.length < threshold) {
            buffer += (buffer ? ' ' : '') + p;
          } else {
            if(buffer) { merged.push(buffer.trim()); buffer=''; }
            merged.push(p);
          }
        });
        if(buffer) merged.push(buffer.trim());
        return merged;
      }
      groups.forEach((grp, gi)=>{ 
        // unir pequenos parágrafos antes de renderizar
        const mergedGrp = mergeShortParagraphs(grp); 
        const pg = create('div','page'+(gi===0?' active':''),''); 
        mergedGrp.forEach((para,j)=>{ 
          const cls = j===0?'intro':j===1?'middle':'ending'; 
          // AJUSTE 3: detectar tokens de cor (#RGB ou #RRGGBB) dentro do parágrafo e aplicá-los no estilo
          let colorMatch = para.match(/#([0-9a-fA-F]{3,6})/);
          let colorToken = null;
          if(colorMatch){
            colorToken = colorMatch[0];
            para = para.replace(colorToken,'');
            // normalizar tokens abreviados (#f0f -> #ff00ff)
            if(colorToken.length === 4){
              const r = colorToken[1], g = colorToken[2], b = colorToken[3];
              colorToken = '#' + r + r + g + g + b + b;
            }
          }
          const block = create('div',`response-block ${cls}`,`<p>${para}</p>`); 
          if(colorToken){
            block.style.color = colorToken;
            block.style.borderLeftColor = colorToken;
            block.style.transition = 'all 0.3s ease';
          }
          block.addEventListener('click',()=>{
            autoAdvance=false;
                  const cleanPara = para
          .replace(/["“”‘’]/g, '')                        // aspas
          .replace(/[\u1F300-\u1F6FF\u1F900-\u1F9FF\u2600-\u26FF\u2700-\u27BF]/g, ''); // emojis
      
        const utter = new SpeechSynthesisUtterance(cleanPara);
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
      
        if (!block.dataset.spoken) {
          block.dataset.spoken = '1';
          block.classList.add('clicked');
        } else {
          block.classList.add('expanded');
          if (!isEnabled) {
            isEnabled = true;
            localStorage.setItem(STORAGE_KEY, '1');
            updateUI();
              }
              showLoading(' Pulso em Expansão...');
              conversation.push({role:'user',content:`${titles[j]}\n\n${para}`});
              callAI();
            }
          });
          pg.appendChild(block);
        });
        wrap.appendChild(pg);
        pages.push(pg);
      });

      $('#pageIndicator').textContent = `1 / ${pages.length}`;
      autoSpeakPage(0);
    }
function renderResponseBlocksLegacy1({ intro = "", middle = "", ending = "" }) {
  const container = document.querySelector(".pages-wrapper");

  function createBlockLegacy1(content, className) {
    const block = document.createElement("div");
    block.className = "response-block " + className;

    const parsed = content
      .replace(/(\p{Emoji_Presentation}|\p{Emoji})/gu, match => {
        return `<button class="symbol-btn" onclick="registrarPulsoEEnviar('Emoji: ${match}')">${match}</button>`;
      })
      .replace(/\[(.+?)\]/g, (match, p1) => {
        return `<button class="symbol-btn" onclick="registrarPulsoEEnviar('[${p1}]')">[${p1}]</button>`;
      });

    block.innerHTML = parsed;

    block.addEventListener("click", () => {
      block.classList.toggle("expanded");
      const pulsos = document.getElementById("pulsos");
      if (pulsos) pulsos.classList.toggle("expanded");
      logMistico("◉ Expandiu bloco: " + className);
    });

    return block;
  }

  if (intro)  container.appendChild(createBlockLegacy1(intro, "intro"));
  if (middle) container.appendChild(createBlockLegacy1(middle, "middle"));
  if (ending) container.appendChild(createBlockLegacy1(ending, "ending"));
}
function renderResponseLegacy2(txt) {
  const wrap = document.querySelector(".pages-wrapper");
  wrap.innerHTML = "";
  let pages = [], currentPage = 0;
  txt = renderMarkdown(txt);
  // AJUSTE 2: Substituir emojis por símbolos Unicode para limpeza visual.
  const emojiMap2 = { '🎁':'◇', '👁️':'◆', '⚡️':'✦', '⚡':'✦' };
  txt = txt.replace(/([\u1F300-\u1F9FF\u2600-\u26FF\u2700-\u27BF])/g, m => emojiMap2[m] || m);

  // AJUSTE 1: Combinar blocos consecutivos pequenos
  function mergeShortParagraphs2(paragraphs, threshold = 30) {
    const merged = [];
    let buffer = '';
    paragraphs.forEach(p => {
      const plain = p.replace(/<[^>]+>/g,'').trim();
      if(plain.length < threshold) {
        buffer += (buffer ? ' ' : '') + p;
      } else {
        if(buffer) { merged.push(buffer.trim()); buffer=''; }
        merged.push(p);
      }
    });
    if(buffer) merged.push(buffer.trim());
    return merged;
  }

  const groups = splitText(txt),
        titles = ["🎁 Recompensa Inicial", "👁️ Exploração", "⚡️ Antecipação"];

  groups.forEach((grp, gi) => {
    const mergedGrp = mergeShortParagraphs2(grp);
    const pg = document.createElement("div");
    pg.className = "page" + (gi === 0 ? " active" : "");

    mergedGrp.forEach((para, j) => {
      const cls = j === 0 ? "intro" : j === 1 ? "middle" : "ending";
      // AJUSTE 3: interpretar tokens de cor no texto e aplicar no estilo
      let colorMatch2 = para.match(/#([0-9a-fA-F]{3,6})/);
      let colorToken2 = null;
      if(colorMatch2){
        colorToken2 = colorMatch2[0];
        para = para.replace(colorToken2,'');
        if(colorToken2.length === 4){
          const r=colorToken2[1], g=colorToken2[2], b=colorToken2[3];
          colorToken2 = '#' + r + r + g + g + b + b;
        }
      }
      const block = document.createElement("div");
      block.className = "response-block " + cls;
      block.innerHTML = "<p>" + para + "</p>";
      if(colorToken2){
        block.style.color = colorToken2;
        block.style.borderLeftColor = colorToken2;
        block.style.transition = 'all 0.3s ease';
      }
      block.addEventListener("click", () => {
        // AJUSTE 4: garantir que o TTS fale o conteúdo completo após renderização
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(block.textContent);
        setTimeout(() => {
          speechSynthesis.speak(utter);
        }, 50);
        block.classList.add("clicked");
      });

      pg.appendChild(block);
    });

    wrap.appendChild(pg);
    pages.push(pg);
  });

  document.getElementById("pageIndicator").textContent = "1 / " + pages.length;
}
function renderResponseBlocksLegacy2({ intro = "", middle = "", ending = "" }) {
  const container = document.querySelector(".pages-wrapper");

  function createBlock(content, className) {
    const block = document.createElement("div");
    block.className = "response-block " + className;

    const parsed = content
      .replace(/(\p{Emoji_Presentation}|\p{Emoji})/gu, match => {
        return `<button class="symbol-btn" onclick="expandirPulso(); logMistico('Emoji: ${match}')">${match}</button>`;
      })
      .replace(/\[(.+?)\]/g, (match, p1) => {
        return `<button class="symbol-btn" onclick="expandirPulso(); logMistico('[${p1}]')">[${p1}]</button>`;
      });

    block.innerHTML = parsed;

    block.addEventListener("click", () => {
      block.classList.toggle("expanded");
      expandirPulso();
      logMistico("◉ Expandiu bloco: " + className);
    });

    return block;
  }

  if (intro)  container.appendChild(createBlock(intro, "intro"));
  if (middle) container.appendChild(createBlock(middle, "middle"));
  if (ending) container.appendChild(createBlock(ending, "ending"));
}
function renderSplitText(txt) {
  const groups = txt.split("---").map(str => str.trim()).filter(Boolean);
  return {
    intro: groups[0] || "",
    middle: groups[1] || "",
    ending: groups[2] || ""
  };
}
function renderResponse(input) {
  const wrap = document.querySelector(".pages-wrapper") || document.getElementById("pagesWrapper");
  if (!wrap) return console.warn("⚠️ .pages-wrapper não encontrado");

  wrap.innerHTML = "";

  // Aceita string dividida ou objeto Trinity
  const { intro, middle, ending } = typeof input === "string" ? renderSplitText(input) : input;

  const renderBlock = (text, className, icon) => {
    const block = document.createElement("div");
    block.className = `response-block ${className}`;
    
    // Submenu dinâmico
    const submenu = document.createElement("div");
    submenu.className = "submenu hidden";
    submenu.innerHTML = `
      <button onclick="logMistico('🔁 Reiniciando pulso: ${className}')">🔄 Repetir Pulso</button>
      <button onclick="mostrarNucleoAntecipacao()">◉ Ativar Núcleo</button>
      <button onclick="alert('💾 Exportar conteúdo em construção')">📥 Exportar</button>
    `;

    block.innerHTML = `
      <div class="nestedBlock">
        <div class="symbol-header">${icon}</div>
        <div class="symbol-body">${text}</div>
      </div>
    `;

    block.appendChild(submenu);

    // Toggle de submenu
    block.addEventListener("click", () => {
      submenu.classList.toggle("hidden");
      block.classList.toggle("expanded");
      logMistico(`🧬 Pulso expandido: ${className}`);
    pg.appendChild(block);
        });
        wrap.appendChild(pg);
        pages.push(pg);
    });

    return block;
  };
  function renderResponseUnified(txt){
    const wrap = document.querySelector('.pages-wrapper');
    if (!wrap) return;
    wrap.innerHTML = '';
    const page = create('div','page active','');
    const blocks = smartSplit(dualFormatter(txt));

    blocks.forEach((chunk, idx)=>{
      const cls = idx===0?'intro': (idx%3===1?'middle':'ending');
      const block = create('div','response-block '+cls, '<p>'+chunk+'</p>');
      page.appendChild(block);
    });
    wrap.appendChild(page);

    const ind = document.querySelector('#pageIndicator');
    if (ind) ind.textContent = '1 / 1';
  }