function initKeyManager() {
  // Only initialise once
  if (window.__keyManagerInitialised) {
    return;
  }
  window.__keyManagerInitialised = true;

  // Create the key manager panel markup.  CSS for the key manager lives in the main HTML.
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="keymgr-panel" id="keymgrPanel">
      <div class="keymgr-hd">
        <h3>Chaves &amp; Treinamentos — Dual.Infodose</h3>
        <button class="keymgr-close" id="keymgrClose">Fechar</button>
      </div>
      <p class="user-info">Usuário: <span id="keymgrUserName"></span> — Assistente: <span id="keymgrAssistantName"></span></p>
      <div class="keymgr-grid">
        <div class="cardx">
          <h4>OpenRouter — Chaves</h4>
          <div class="row">
            <input id="orKeyName" placeholder="Nome da chave (ex.: Pessoal, Work)" type="text">
            <input id="orKeyValue" placeholder="Cole sua chave sk-..." type="password">
            <button class="btnx" id="btnPasteKey">Colar</button>
            <button class="btnx" id="btnSaveKey">Salvar</button>
          </div>
          <div class="list" id="keysList"></div>
        </div>
        <div class="cardx">
          <h4>Treinamento Base (TXT)</h4>
          <div class="row">
            <input id="baseTrainName" placeholder="Nome (ex.: Unificado v6)" type="text">
            <button class="btnx" id="btnLoadBaseTxt">Carregar TXT</button>
            <input accept=".txt" id="baseTrainFile" style="display:none" type="file">
            <button class="btnx" id="btnApplyBaseTxt">Aplicar</button>
            <label class="switch"><input checked id="baseTrainEnabled" type="checkbox"> Ativo</label>
          </div>
          <textarea id="baseTrainText" placeholder="Conteúdo do TXT base"></textarea>
        </div>
        <div class="cardx">
          <h4>Treinamentos Extras / Ativações</h4>
          <div class="row">
            <input id="extraName" placeholder="Nome do extra/ativação" type="text">
            <button class="btnx" id="btnLoadExtraTxt">Adicionar TXT</button>
            <input accept=".txt" id="extraFile" style="display:none" type="file">
          </div>
          <div class="list" id="extrasList"></div>
        </div>
        <div class="cardx">
          <h4>Componentes &amp; Uploads</h4>
          <div class="row">
            <button class="btnx" id="btnUploadHTML">Carregar HTML</button>
            <button class="btnx" id="btnUploadSymbol">Upload Arquivo</button>
            <button class="btnx" id="btnRemoteComponent">Carregar URL</button>
            <button class="btnx" id="btnToggleDecoder">Decodificador</button>
          </div>
        </div>
      </div>
    </div>
  `;
  // Append the panel to the body
  document.body.appendChild(wrapper.firstElementChild);

  // Now run the original key manager logic
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
        alert('Treinamento Base atualizado.');
      }catch(e){ alert('Falha ao salvar o treinamento base: '+e.message); }
    });
    // extras
    function renderExtras(){
      const list = store.get(LS_KEYS.TRAIN_EXTRAS, []);
      extrasList.innerHTML='';
      list.forEach((ext, idx)=>{
        const item = document.createElement('div'); item.className='item';
        item.innerHTML = '<div class="badges"><span class="badge">'+(ext.name||('Extra '+(idx+1)))+'</span>'+(ext.enabled?'':'<span class="badge">DESATIVADO</span>')+'</div>';
        const actions = document.createElement('div'); actions.className='row';
        const btnAct = document.createElement('button'); btnAct.className='btnx'; btnAct.textContent= ext.enabled?'Desativar':'Ativar';
        btnAct.addEventListener('click', ()=>{ ext.enabled = !ext.enabled; store.set(LS_KEYS.TRAIN_EXTRAS, list); renderExtras(); });
        const btnDel = document.createElement('button'); btnDel.className='btnx'; btnDel.textContent='Excluir';
        btnDel.addEventListener('click', ()=>{ list.splice(idx,1); store.set(LS_KEYS.TRAIN_EXTRAS, list); renderExtras(); });
        actions.append(btnAct, btnDel);
        item.append(actions);
        extrasList.append(item);
      });
    }
    function addExtra(name, text){
      const list = store.get(LS_KEYS.TRAIN_EXTRAS, []);
      list.push({ name: name||('Extra '+(list.length+1)), text, enabled:true });
      store.set(LS_KEYS.TRAIN_EXTRAS, list);
      renderExtras();
    }
    btnLoadExt && btnLoadExt.addEventListener('click', ()=> extraFile.click());
    extraFile && extraFile.addEventListener('change', async (e)=>{
      const f = e.target.files[0]; if(!f) return;
      const txt = await f.text();
      const name = (extraName.value||f.name.replace(/\.txt$/i,'')).trim();
      if(!name){ return alert('Nome do extra é obrigatório'); }
      addExtra(name, txt);
      extraName.value='';
      extraFile.value='';
    });
    // uploads and decoder toggles
    btnUploadHTML && btnUploadHTML.addEventListener('click', ()=> uploadHTMLInput && uploadHTMLInput.click());
    btnUploadSymbol && btnUploadSymbol.addEventListener('click', ()=> uploadSymbolInput && uploadSymbolInput.click());
    btnRemoteComponent && btnRemoteComponent.addEventListener('click', ()=>{
      const url = prompt('URL do componente remoto (.js):');
      if(!url) return;
      const script = document.createElement('script');
      script.src = url;
      script.onload = ()=> alert('Componente carregado!');
      script.onerror = ()=> alert('Falha ao carregar componente.');
      document.body.appendChild(script);
    });
    btnToggleDecoder && btnToggleDecoder.addEventListener('click', ()=>{
      if(decoderBox) decoderBox.classList.toggle('open');
    });

    // initial renders
    renderKeys();
    renderExtras();
  })();
}

// Expose the initializer globally
window.initKeyManager = initKeyManager;