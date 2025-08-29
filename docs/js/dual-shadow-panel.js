
/*! Dual Shadow Surgeon Panel — hosts KOBLLUX player inside Shadow DOM */
(function(){
  // Create panel host
  const panel = document.createElement('div');
  panel.id = 'dual-shadow-panel-host';
  Object.assign(panel.style, {
    position:'fixed', right:'12px', bottom:'12px', zIndex:'99998',
    width:'min(96vw, 360px)', maxWidth:'360px',
    borderRadius:'18px', border:'1px solid rgba(125,249,255,.22)',
    backdropFilter:'blur(10px) saturate(160%)',
    WebkitBackdropFilter:'blur(10px) saturate(160%)',
    boxShadow:'0 16px 48px rgba(0,0,0,.45)', overflow:'hidden'
  });
  document.body.appendChild(panel);
  const root = panel.attachShadow({mode:'open'});

  // Minimal CSS for player inside Shadow
  const style = document.createElement('style');
  style.textContent = `
    /* Theme bridge */
    :host,[data-theme]{ --c1: inherit; --c2: inherit; --ink: inherit; }

    :host{ all:initial; contain: content; }
    .wrap{ all:unset; display:block; background:rgba(14,16,22,.78); color:#e8ecf1; font: 13px/1.4 system-ui, -apple-system, Segoe UI, Inter, Roboto, Arial; }
    .drag{ all:unset; display:flex; align-items:center; gap:8px; padding:8px 10px; border-bottom:1px solid rgba(125,249,255,.18); background:linear-gradient(180deg, rgba(10,14,23,.9), rgba(10,14,23,0)); cursor: default;}
    .title{ font-weight:700; letter-spacing:.2px }
    .pill{ font-size:11px; padding:2px 6px; border-radius:999px; border:1px solid rgba(125,249,255,.22); background:rgba(255,255,255,.06) }
    #shadowPlayerHost{ all:unset; display:block; padding:10px }
    .min{ margin-left:auto; border:1px solid rgba(125,249,255,.25); border-radius:8px; padding:4px 8px; background:rgba(255,255,255,.06); color:#e8ecf1; cursor:pointer}
    .hidden #shadowPlayerHost{ display:none }
  `;
  root.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.innerHTML = `
    <div class="drag"><span class="title">Shadow Surgeon</span><span class="pill">Sandbox</span><button class="min" id="minBtn">–</button></div>
    <div id="shadowPlayerHost"></div>
  `;
  root.appendChild(wrap);

  // minimize toggle
  root.getElementById('minBtn').addEventListener('click', ()=> wrap.classList.toggle('hidden'));

  // Theme sync
  function applyTheme(theme){ wrap.setAttribute('data-theme', theme); }
  window.addEventListener('DualThemeChanged', (e)=> applyTheme(e.detail?.theme||'neon'));
  applyTheme((window.DualTTS && DualTTS.state && DualTTS.state.theme) || 'neon');

  // Initialize TTS into shadow using attachNode
  if (window.DualTTS && typeof window.DualTTS.init === 'function'){
    window.DualTTS.init({ lang:'pt-BR', attachNode: root.getElementById('shadowPlayerHost') });
  } else {
    // If script loaded later, try again
    window.addEventListener('DualTTSReady', ()=>{
      window.DualTTS.init({ lang:'pt-BR', attachNode: root.getElementById('shadowPlayerHost') });
    }, { once:true });
  }
})();
