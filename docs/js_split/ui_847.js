    function applyTheme(theme){
      document.body.classList.remove('light','medium','vibe');
      if(theme!=='dark') document.body.classList.add(theme);
    }
    function toggleTheme(){
      const order=['dark','light','medium','vibe'];
      const cur=localStorage.getItem(THEME_KEY)||'dark';
      const next=order[(order.indexOf(cur)+1)%order.length];
      applyTheme(next);
      localStorage.setItem(THEME_KEY,next);
    }
    function changeLogo(srcs){
      const cont=$('#logoContainer'), obj=$('#logoObj');
      cont.classList.add('fading');
      cont.addEventListener('transitionend',function once(){
        cont.removeEventListener('transitionend',once);
        if(Array.isArray(srcs)){
          obj.data=srcs[0];
          obj.onerror=()=>obj.data=srcs[1];
        } else obj.data=srcs;
        cont.classList.remove('fading');
      });
    }
    async function init(){
      applyTheme(localStorage.getItem(THEME_KEY)||'dark');
      $('#themeToggle').addEventListener('click',toggleTheme);
      originalLogo = $('#logoObj').data;

      // Carrega o texto de treinamento se um caminho válido tiver sido
      // configurado. Quando CONFIG.TRAINING_FILE é null ou undefined,
      // pulamos esse passo. Isso evita falhas quando o arquivo não existe.
      if(CONFIG.TRAINING_FILE){
        try {
          training = await fetch(CONFIG.TRAINING_FILE).then(r=>r.text());
          for(let i=0;i<training.length;i+=CONFIG.CHUNK_SIZE){
            chunks.push(training.slice(i,i+CONFIG.CHUNK_SIZE));
          }
        } catch(e){ console.error('Falha no treinamento:',e); training=""; chunks=[]; }
      } else {
        training="";
        chunks=[];
      }

      loadConfig();
      if(!conversation.length){
        // Constrói a mensagem de sistema a partir do primeiro chunk de
        // treinamento (se existir) seguido de uma descrição padrão do
        // assistente. Usa trim() para remover quebras de linha extras.
        const sysMsg = ((chunks[0] || training) + '\n\nVocê é o assistente Dual.infodose.').trim();
        conversation.push({ role:'system', content: sysMsg });
        chunkIndex = chunks.length > 0 ? 1 : 0;
      }
      bindUI();
    }
    function loadConfig(){
      if(localStorage.getItem(STORAGE_KEY)==='1'){
        isEnabled=true;
        userName=localStorage.getItem('userName')||'';
        assistantBase=localStorage.getItem('assistantBase')||'';
        const sysContent = ((chunks[0]||training)
          +`\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.`).trim();
        conversation=[{
          role:'system',
          content: sysContent
        }];
        chunkIndex = chunks.length > 0 ? 1 : 0;
        updateUI();
      }
    }
    function updateUI(){
      $('#toggleBtn').classList.toggle('active',isEnabled);
      $('#kittyBtn').classList.toggle('active',isStudying);
      $('#assistantName').textContent = isStudying
        ? 'Estudos dual.infodose'
        : (isEnabled ? `${assistantBase} dual.infodose` : '');
    }
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
function toggleElement(selector, input) {
  selector.split(',').forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.display = input.checked ? '' : 'none';
    });
  });
}
function ocultarTodosLayout() {
  ['#response', '.svg-container', '#koblluxPlayer', '#uploadComponentBtn', '#remoteComponentBtn', '#toggleDecoderBtn', '.symbol-bar']
    .forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = 'none'));
}
function mostrarTodosLayout() {
  ['#response', '.svg-container', '#koblluxPlayer', '#uploadComponentBtn', '#remoteComponentBtn', '#toggleDecoderBtn', '.symbol-bar']
    .forEach(sel => document.querySelectorAll(sel).forEach(el => el.style.display = ''));
}
function togglePanel(force){
  const p = document.getElementById('layoutTogglePanel');
  if(!p) return;
  if(force === true) p.style.display = 'block';
  else if(force === false) p.style.display = 'none';
  else p.style.display = (p.style.display === 'block' ? 'none' : 'block');
}
function getDisplayState(selector) {
  const el = document.querySelector(selector.split(',')[0]);
  return el?.style.display !== 'none';
}
function salvarEstadoUI() {
  const estado = {
    response: getDisplayState('#response'),
    svg: getDisplayState('.svg-container'),
    player: getDisplayState('#koblluxPlayer'),
    botoes: getDisplayState('#uploadComponentBtn,#remoteComponentBtn,#toggleDecoderBtn'),
    bar: getDisplayState('.symbol-bar')
  };
  localStorage.setItem('layoutConfig', JSON.stringify(estado));
  logMistico?.("🎛️ Preferência de layout salva.");
}
function carregarEstadoUI() {
  const saved = JSON.parse(localStorage.getItem('layoutConfig') || '{}');
  Object.entries(saved).forEach(([key, visible]) => {
    let sel;
    if (key === 'response') sel = '#response';
    if (key === 'svg') sel = '.svg-container';
    if (key === 'player') sel = '#koblluxPlayer';
    if (key === 'botoes') sel = '#uploadComponentBtn,#remoteComponentBtn,#toggleDecoderBtn';
    if (key === 'bar') sel = '.symbol-bar';
    sel && document.querySelectorAll(sel).forEach(el => el.style.display = visible ? '' : 'none');
  });
}
function ativarModo(modo) {
  ocultarTodosLayout();
  const modos = {
    pulse: ['#koblluxPlayer'],
    happyHour: ['#response', '.symbol-bar'],
    ritual: ['#response', '#koblluxPlayer'],
    exploracao: ['#response', '.symbol-bar', '#koblluxPlayer', '#uploadComponentBtn', '#remoteComponentBtn', '#toggleDecoderBtn', '.svg-container']
  };
  (modos[modo] || []).forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.style.display = '');
  });
  logMistico?.("⚙️ Modo ativado: " + modo);
}