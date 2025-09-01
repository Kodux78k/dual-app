function initPatchManager() {
  // Only initialise once
  if (window.__patchManagerInitialised) {
    return;
  }
  window.__patchManagerInitialised = true;

  // Create the patch manager panel markup.  The style rules for the patch manager
  // remain in the main HTML, so we only need to inject the DOM structure here.
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="patchMgrPanel" role="dialog" aria-modal="true" aria-labelledby="pmTitle">
      <div class="pm-profile">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 20a8 8 0 0 1 16 0z"></path></svg>
        <div class="pm-profile-info">
          <strong id="pmUserName">Seu Perfil</strong>
          <small>Gerencie seus patches e preferências</small>
          <div class="pm-socials">
            <button class="social-btn git" title="Conectar com GitHub" onclick="window.open('https://github.com/login','_blank')">GitHub</button>
            <button class="social-btn apple" title="Conectar com Apple" onclick="window.open('https://appleid.apple.com/auth/authorize','_blank')">Apple</button>
            <button class="social-btn fb" title="Conectar com Facebook" onclick="window.open('https://www.facebook.com/login','_blank')">Facebook</button>
            <button class="social-btn google" title="Conectar com Google" onclick="window.open('https://accounts.google.com/signin','_blank')">Google</button>
          </div>
        </div>
        <input id="avatarUpload" type="file" accept="image/*" style="display:none;" />
      </div>
      <header>
        <strong id="pmTitle">Gerenciador de Patches</strong>
        <div class="pm-actions">
          <button id="pmImport">Importar .json</button>
          <button id="pmPaste">Colar JSON</button>
          <button id="pmExport">Exportar</button>
          <button id="pmStorage">Storage</button>
          <button id="pmQuick">Rápido</button>
          <button id="pmTerminal">Terminal</button>
          <button id="pmBackgrounds">Fundos</button>
          <button id="pmClose">Fechar</button>
        </div>
      </header>
      <small>Os patches são salvos localmente e aplicados em ordem de prioridade.</small>
      <div id="patchList"></div>
      <div id="storageManager">
        <div class="pm-actions">
          <button id="storageRefresh">Atualizar</button>
          <button id="storageClear">Limpar tudo</button>
          <button id="storageExport">Exportar</button>
          <button id="storageAdd">Adicionar</button>
        </div>
        <div id="storageList"></div>
        <textarea id="cssInput" placeholder="Cole seu CSS aqui"></textarea>
        <div class="pm-actions">
          <button id="applyCSS">Aplicar CSS</button>
        </div>
      </div>
      <div id="terminalManager">
        <iframe id="pmTerminalFrame" src="Dual-terminal-0.html"></iframe>
      </div>
      <div id="quickManager">
        <label for="quickInput">Injeção rápida:</label>
        <textarea id="quickInput" placeholder="Cole CSS ou JS aqui..."></textarea>
        <div class="pm-actions">
          <button id="applyQuick">Injetar</button>
        </div>
      </div>
      <div id="bgManager">
        <div class="pm-actions">
          <button id="bgUploadBtn">Upload BG</button>
          <input id="bgUploadInput" type="file" accept="image/*" multiple style="display:none" />
        </div>
        <div id="bgList" class="bg-list"></div>
      </div>
    </div>
    <div id="kdx-footer-spacer"></div>
  `;
  // Append the panel and spacer to the body
  document.body.appendChild(wrapper.firstElementChild);
  document.body.appendChild(wrapper.lastElementChild);

  // Now that the DOM exists, run the original patch manager logic.
  (function(){
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
    // Quick Manager toggle logic
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
    // Avatar upload handling
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
        const item = document.createElement('div');
        item.className = 'bg-item';
        const img = document.createElement('img');
        img.src = bg.url;
        item.appendChild(img);
        const actions = document.createElement('div');
        actions.className = 'bg-actions';
        const btnUse = document.createElement('button');
        btnUse.textContent = 'Aplicar';
        btnUse.onclick = () => {
          document.body.style.backgroundImage = `url(${bg.url})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
        };
        const btnDel = document.createElement('button');
        btnDel.textContent = 'Excluir';
        btnDel.onclick = () => {
          const idx = arr.indexOf(bg);
          arr.splice(idx, 1);
          saveBackgrounds(arr);
          renderBackgrounds();
        };
        actions.appendChild(btnUse);
        actions.appendChild(btnDel);
        item.appendChild(actions);
        dom.bgList.appendChild(item);
      });
    }
    function uploadBackground(files){
      const arr = loadBackgrounds();
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target.result;
          arr.push({ url });
          saveBackgrounds(arr);
          renderBackgrounds();
        };
        reader.readAsDataURL(file);
      });
    }
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
    // load saved patches and avatar on init
    loadAvatar();
    render();
    applyAll();
  })();
}

// Expose the initializer globally so it can be called by the lazy loader
window.initPatchManager = initPatchManager;