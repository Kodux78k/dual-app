
/*! KOBLLUX Voice Surgeon — Dual TTS (Artemis+Genus+Nova)
 *  - Web Speech API (speechSynthesis) com 12 arquétipos
 *  - Preferência pt-BR, fallback inteligentte
 *  - Integra com inputs padrão do app (se existir) ou fala texto digitado
 *  - UI embutível no #koblluxPlayer existente OU cria overlay não-destrutivo
 */
(function (global){
  const LS_KEY = 'kobllux_tts_v1';
  const Archetypes = [
    // nome, {rate, pitch, volume, hints[]}
    ["Inocente",       { rate: 1.0, pitch: 1.1, vol: 1.0, hints: ["pt-BR", "Brazil", "Google português (Brasil)", "Microsoft Maria"] }],
    ["Cara Comum",     { rate: 1.0, pitch: 1.0, vol: 1.0, hints: ["pt-BR", "Google", "Microsoft"] }],
    ["Herói",          { rate: 1.15, pitch: 0.95, vol: 1.0, hints: ["pt-BR", "Ricardo", "Gustavo", "Antônio"] }],
    ["Cuidador",       { rate: 0.95, pitch: 1.05, vol: 1.0, hints: ["pt-BR", "Maria", "Letícia"] }],
    ["Explorador",     { rate: 1.10, pitch: 1.05, vol: 1.0, hints: ["pt-BR"] }],
    ["Criador",        { rate: 1.0,  pitch: 1.15, vol: 1.0, hints: ["pt-BR"] }],
    ["Governante",     { rate: 0.95, pitch: 0.9,  vol: 1.0, hints: ["pt-BR"] }],
    ["Mago",           { rate: 1.08, pitch: 1.08, vol: 1.0, hints: ["pt-BR"] }],
    ["Amante",         { rate: 0.98, pitch: 1.12, vol: 1.0, hints: ["pt-BR"] }],
    ["Bobo",           { rate: 1.2,  pitch: 1.2,  vol: 1.0, hints: ["pt-BR"] }],
    ["Sábio",          { rate: 0.95, pitch: 1.02, vol: 1.0, hints: ["pt-BR"] }],
    ["Fora da Lei",    { rate: 1.05, pitch: 0.85, vol: 1.0, hints: ["pt-BR"] }],
  ];

  const Util = {
    qs: (s, r=document)=>r.querySelector(s),
    qsa: (s, r=document)=>Array.from(r.querySelectorAll(s)),
    save(state){ try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); }catch(e){} },
    load(){ try{ return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch(e){ return {}; } },
    prefers(lang, voice){ return voice && (voice.lang||"").toLowerCase().startsWith(lang.toLowerCase()); },
    matchVoice(hints, list){
      const lower = (s)=>s.toLowerCase();
      for(const hint of hints){
        const v = list.find(v=> lower(v.name).includes(lower(hint)) || lower(v.lang||"").includes(lower(hint)));
        if(v) return v;
      }
      return null;
    },
    findInput(){
      // tenta IDs comuns do app; fallback: primeiro input de texto visível
      const ids = ['#userInput', '#txt', '.input-container input[type="text"]', 'input[type="text"]'];
      for(const id of ids){
        const el = Util.qs(id);
        if(el) return el;
      }
      return null;
    },
    findLastMessage(){
      const containers = ['.response-list', '#responseList', '#list'];
      for(const c of containers){
        const wrap = Util.qs(c);
        if(!wrap) continue;
        const arts = Util.qsa('article', wrap);
        if(arts.length){
          const last = arts[arts.length-1];
          const div = Util.qs('div:last-child', last) || last;
          return (div.textContent||"").trim();
        }
      }
      return "";
    }
  };

  const TTS = {
    synth: window.speechSynthesis,
    state: {
      theme: 'neon',
      autoSpeak: false,
      archetype: 0, voiceURI: "", rate: 1.0, pitch: 1.0, vol: 1.0, hidden:false, lang: "pt-BR"
    },
    voices: [],
    ui: null,
    ensureUI(opts={}){
      // Shadow host support via opts.attachNode
      if(opts && opts.attachNode && opts.attachNode.nodeType===1){
        let host = opts.attachNode;
        if(!host.id) host.id = 'koblluxPlayer';
        host.innerHTML = '';
        this._buildUIInto(host);
        return;
      }

      let host = document.getElementById('koblluxPlayer');
      if(!host && opts.attachTo){
        host = Util.qs(opts.attachTo);
      }
      if(!host){
        host = document.createElement('div');
        host.id = 'koblluxPlayer';
        host.className = 'kobllux-player';
        document.body.appendChild(host);
      }
      this._buildUIInto(host);
    },

    _buildUIInto(host){
      host.innerHTML = `
        <div class="kx-header">
          <span class="kx-title">KOBLLUX • Voice</span>
          <span class="kx-chip">TTS</span>
          <span class="kx-dot" id="kxDot"></span>
          <div class="kx-spacer"></div>
          <button class="kx-btn kx-min" id="kxMin">–</button>
        </div>
        <div id="kxBody">
          <div class="kx-row">
            <button class="kx-btn" id="kxPlay">▶</button>
            <button class="kx-btn" id="kxPause">⏸</button>
            <button class="kx-btn" id="kxStop">■</button>
            <div class="kx-spacer"></div>
            <button class="kx-btn" id="kxSpeakInput" title="Falar input">⌨︎</button>
            <button class="kx-btn" id="kxSpeakLast"  title="Falar última resposta">⟲</button>
          </div>

          <div class="kx-row">
            <div class="kx-col">
              <label class="kx-small">Arquétipo</label>
              <select class="kx-select" id="kxArch"></select>
            </div>
            <div class="kx-col">
              <label class="kx-small">Voz</label>
              <select class="kx-select" id="kxVoice"></select>
            </div>
          </div>

          <div class="kx-row compact">
            <div class="kx-col">
              <label class="kx-small">Rate <span id="kxRateVal"></span></label>
              <input class="kx-range" id="kxRate" type="range" min="0.5" max="2" step="0.01" value="1.0">
            </div>
            <div class="kx-col">
              <label class="kx-small">Pitch <span id="kxPitchVal"></span></label>
              <input class="kx-range" id="kxPitch" type="range" min="0" max="2" step="0.01" value="1.0">
            </div>
            <div class="kx-col">
              <label class="kx-small">Vol <span id="kxVolVal"></span></label>
              <input class="kx-range" id="kxVol" type="range" min="0" max="1" step="0.01" value="1.0">
            </div>
          </div>

          <div class="kx-row compact"><label class="kx-small"><input type="checkbox" id="kxAuto"> Falar automaticamente ao enviar</label></div>
          <div class="kx-footer">
            <select class="kx-select" id="kxTheme"><option value="dark">Dark</option><option value="light">Light</option><option value="neon">Neon</option><option value="vibe">Vibe</option><option value="lux">Lux</option></select>
            <input id="kxText" class="kx-text kx-grow" placeholder="Texto para falar (opcional)">
            <button class="kx-btn" id="kxSpeakText">Falar</button>
            <button class="kx-btn" id="kxHide">Ocultar</button>
          </div>
          <div class="kx-inline-note kx-muted">Dica: defina o arquétipo e ajuste {rate, pitch, vol}. As vozes reais dependem do seu sistema/navegador.</div>
        </div>
      `;
      this.ui = { /* toggle auto-speak will be bound later */
        host,
        min: Util.qs('#kxMin', host),
        body: Util.qs('#kxBody', host),
        dot: Util.qs('#kxDot', host),
        play: Util.qs('#kxPlay', host),
        pause: Util.qs('#kxPause', host),
        stop: Util.qs('#kxStop', host),
        arch: Util.qs('#kxArch', host),
        voice: Util.qs('#kxVoice', host),
        rate: Util.qs('#kxRate', host),
        pitch: Util.qs('#kxPitch', host),
        vol: Util.qs('#kxVol', host),
        rateVal: Util.qs('#kxRateVal', host),
        pitchVal: Util.qs('#kxPitchVal', host),
        volVal: Util.qs('#kxVolVal', host),
        text: Util.qs('#kxText', host),
        speakText: Util.qs('#kxSpeakText', host),
        speakInput: Util.qs('#kxSpeakInput', host),
        speakLast: Util.qs('#kxSpeakLast', host),
        hide: Util.qs('#kxHide', host),
        themeSel: Util.qs('#kxTheme', host),
        auto: Util.qs('#kxAuto', host),
      };
      this.ui.min.addEventListener('click', ()=>{
        const h = this.ui.host;
        const c = h.classList.toggle('kx-hidden');
        this.state.hidden = c;
        Util.save(this.state);
      });
    },

    populateArchetypes(){
      const s = this.ui.arch;
      s.innerHTML = "";
      Archetypes.forEach(([name], i)=>{
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = `${i+1}. ${name}`;
        s.appendChild(opt);
      });
      s.value = String(this.state.archetype);
      s.addEventListener('change', ()=>{
        this.state.archetype = parseInt(s.value,10);
        this.applyArchetypeDefaults();
        this.updateUIFromState();
        Util.save(this.state);
      });
    },

    loadVoicesOnce(){
      return new Promise(resolve=>{
        const load = ()=>{
          const list = this.synth.getVoices();
          if(list && list.length){
            this.voices = list.slice().sort((a,b)=> (a.lang||"").localeCompare(b.lang||""));
            resolve(this.voices);
          } else {
            // alguns navegadores precisam de async load
            setTimeout(load, 150);
          }
        };
        load();
      });
    },

    populateVoices(){
      const s = this.ui.voice;
      s.innerHTML = "";
      this.voices.forEach(v=>{
        const opt = document.createElement('option');
        opt.value = v.voiceURI || v.name;
        opt.textContent = `${v.name} — ${v.lang}`;
        s.appendChild(opt);
      });
      // escolher baseado no estado/hints
      let chosen = this.voices.find(v=> (v.voiceURI||v.name) === this.state.voiceURI);
      if(!chosen){
        const [_, cfg] = Archetypes[this.state.archetype];
        chosen = Util.matchVoice([this.state.lang, ...(cfg.hints||[])], this.voices) || this.voices.find(v=>Util.prefers(this.state.lang, v)) || this.voices[0];
      }
      if(chosen){
        this.state.voiceURI = chosen.voiceURI || chosen.name;
        s.value = this.state.voiceURI;
      }
      s.addEventListener('change', ()=>{
        this.state.voiceURI = s.value;
        Util.save(this.state);
      });
    },

    applyArchetypeDefaults(){
      const [_, cfg] = Archetypes[this.state.archetype];
      if(!cfg) return;
      this.state.rate  = cfg.rate;
      this.state.pitch = cfg.pitch;
      this.state.vol   = cfg.vol;
    },

    updateUIFromState(){
      const st = this.state;
      this.ui.rate.value = st.rate; this.ui.pitch.value = st.pitch; this.ui.vol.value = st.vol;
      this.ui.rateVal.textContent = Number(st.rate).toFixed(2);
      this.ui.pitchVal.textContent = Number(st.pitch).toFixed(2);
      this.ui.volVal.textContent = Number(st.vol).toFixed(2);
      if(st.hidden) this.ui.host.classList.add('kx-hidden'); else this.ui.host.classList.remove('kx-hidden');
    },

    bindControls(){
      const st = this.state;
      this.ui.rate.addEventListener('input', ()=>{ st.rate = +this.ui.rate.value; this.updateUIFromState(); Util.save(st); });
      this.ui.pitch.addEventListener('input', ()=>{ st.pitch = +this.ui.pitch.value; this.updateUIFromState(); Util.save(st); });
      this.ui.vol.addEventListener('input', ()=>{ st.vol = +this.ui.vol.value; this.updateUIFromState(); Util.save(st); });

      this.ui.play.addEventListener('click', ()=>{
        const txt = this.ui.text.value.trim() || Util.findInput()?.value?.trim() || Util.findLastMessage() || 'Sem texto.';
        this.speak(txt);
      });
      this.ui.speakText.addEventListener('click', ()=>{
        const txt = this.ui.text.value.trim();
        if(txt) this.speak(txt);
      });
      this.ui.speakInput.addEventListener('click', ()=>{
        const input = Util.findInput();
        const txt = input ? (input.value||"").trim() : "";
        if(txt) this.speak(txt); else alert("Não encontrei texto no input.");
      });
      this.ui.speakLast.addEventListener('click', ()=>{
        const txt = Util.findLastMessage();
        if(txt) this.speak(txt); else alert("Sem última resposta para falar.");
      });
      this.ui.pause.addEventListener('click', ()=>{
        if(this.synth.speaking && !this.synth.paused) this.synth.pause();
        else if(this.synth.paused) this.synth.resume();
      });
      this.ui.stop.addEventListener('click', ()=>{
        this.synth.cancel();
      });
      this.ui.auto = Util.qs('#kxAuto', this.ui.host);
      this.ui.auto.checked = this.state.autoSpeak;
      this.ui.auto.addEventListener('change', ()=>{ this.state.autoSpeak=this.ui.auto.checked; Util.save(this.state); });

      this.ui.hide.addEventListener('click', ()=>{
        this.ui.host.style.display = 'none';
        this.state.hidden = true; Util.save(this.state);
      });
    },

    isAutoSpeakEnabled(){ return !!this.state.autoSpeak; },

    setTheme(theme){
      try{
        this.state.theme = theme; Util.save(this.state);
        document.body.setAttribute('data-theme', theme);
        // notify shadow panels too
        window.dispatchEvent(new CustomEvent('DualThemeChanged', { detail:{ theme } }));
      }catch(e){}
    },

    currentVoice(){
      return this.voices.find(v=> (v.voiceURI||v.name) === this.state.voiceURI) || null;
    },

    speak(text){
      if(!('speechSynthesis' in window)){
        alert("Seu navegador não suporta Speech Synthesis.");
        return;
      }
      this.synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = this.state.rate;
      u.pitch = this.state.pitch;
      u.volume = this.state.vol;
      const v = this.currentVoice();
      if(v){ u.voice = v; u.lang = v.lang || this.state.lang; }
      else { u.lang = this.state.lang; }
      const dot = this.ui.dot;
      u.onstart = ()=> dot.style.background = '#0f0';
      u.onend = ()=> dot.style.background = '#0ff';
      u.onerror = ()=>{ dot.style.background = '#f00'; };
      this.synth.speak(u);
    },

    async init(opts={}){
      // estado
      const saved = Util.load();
      Object.assign(this.state, saved, opts || {});
      this.ensureUI(opts);
      this.populateArchetypes();
      this.applyArchetypeDefaults();
      await this.loadVoicesOnce();
      this.populateVoices();
      this.bindControls();
      if(this.ui.themeSel){ this.ui.themeSel.value = this.state.theme || 'neon'; this.ui.themeSel.addEventListener('change', ()=> this.setTheme(this.ui.themeSel.value)); }
      this.setTheme(this.state.theme || 'neon');
      this.updateUIFromState();
      // atualiza lista ao evento assíncrono (Chrome)
      window.speechSynthesis.onvoiceschanged = async ()=>{
        await this.loadVoicesOnce();
        this.populateVoices();
      };
      return this;
    }
  };

  global.DualTTS = TTS;
})(window);
