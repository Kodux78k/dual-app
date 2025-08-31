// patchMgr_advanced.js
// Gerenciador de patches avançado para o Dual App.
// Este script substitui o placeholder e implementa uma interface mínima
// para adicionar, editar, remover e exportar patches (CSS/JS) que
// personalizam o comportamento da página.

;(function() {
  const LS_KEY = 'dual.patches';
  /** Carrega patches do localStorage. */
  function load() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    } catch (e) {
      console.warn('[PatchMgr] falha ao carregar patches:', e);
      return [];
    }
  }
  /** Salva patches no localStorage. */
  function save(arr) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(arr || []));
    } catch (e) {
      console.warn('[PatchMgr] falha ao salvar patches:', e);
    }
  }
  /** Aplica um patch adicionando tags <style> e <script>. */
  function applyPatch(p) {
    // remove previamente inserido
    document.querySelectorAll('[data-patch="' + p.id + '"]').forEach(el => el.remove());
    if (p.css) {
      const st = document.createElement('style');
      st.setAttribute('data-patch', p.id);
      st.textContent = p.css;
      document.head.appendChild(st);
    }
    if (p.js) {
      const sc = document.createElement('script');
      sc.setAttribute('data-patch', p.id);
      sc.textContent = `(function(){ try { ${p.js} } catch(e){ console.warn('Patch JS falhou:', e); } })();`;
      document.body.appendChild(sc);
    }
  }
  /** Remove patch do DOM. */
  function removeFromDOM(id) {
    document.querySelectorAll('[data-patch="' + id + '"]').forEach(el => el.remove());
  }
  /** Aplica todos os patches habilitados. */
  function applyAll() {
    const arr = load();
    arr.filter(p => p.enabled !== false).forEach(applyPatch);
  }
  /** Insere ou atualiza um patch. */
  function upsert(patch) {
    if (!patch || !patch.id) return;
    const arr = load();
    const idx = arr.findIndex(x => x.id === patch.id);
    if (idx >= 0) arr[idx] = { ...arr[idx], ...patch };
    else arr.push({ ...patch, enabled: true });
    save(arr);
    applyAll();
    renderList();
  }
  /** Ativa ou desativa um patch. */
  function toggle(id, on) {
    const arr = load();
    const idx = arr.findIndex(x => x.id === id);
    if (idx >= 0) {
      arr[idx].enabled = on;
      save(arr);
      applyAll();
      renderList();
    }
  }
  /** Remove patch do armazenamento. */
  function remove(id) {
    const arr = load().filter(x => x.id !== id);
    save(arr);
    removeFromDOM(id);
    applyAll();
    renderList();
  }
  /** Exporta patches para arquivo JSON. */
  function exportPatches() {
    const data = JSON.stringify(load(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dual-patches.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  /** Importa patches de arquivo JSON. */
  function importPatches() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const arr = JSON.parse(e.target.result);
          if (!Array.isArray(arr)) throw new Error('Formato inválido');
          save(arr);
          applyAll();
          renderList();
        } catch (err) {
          alert('Erro ao importar patches: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
  /** Limpa todos os patches. */
  function clearPatches() {
    if (!confirm('Limpar todos os patches?')) return;
    save([]);
    document.querySelectorAll('[data-patch]').forEach(el => el.remove());
    renderList();
  }
  /** Renderiza a lista de patches no painel. */
  function renderList() {
    const list = document.getElementById('patchList');
    if (!list) return;
    const patches = load();
    if (patches.length === 0) {
      list.innerHTML = '<em>Nenhum patch configurado.</em>';
      return;
    }
    list.innerHTML = '';
    patches.forEach(p => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.alignItems = 'center';
      row.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      row.style.padding = '4px 0';
      row.innerHTML = `<div><strong>${p.id}</strong><br/><small style="opacity:0.7;">${p.css ? 'CSS' : ''}${p.js ? (p.css ? ' + ' : '') + 'JS' : ''}</small></div>`;
      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.gap = '6px';
      // Toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = p.enabled === false ? 'Off' : 'On';
      toggleBtn.style.padding = '2px 6px';
      toggleBtn.style.border = 'none';
      toggleBtn.style.borderRadius = '6px';
      toggleBtn.style.cursor = 'pointer';
      toggleBtn.style.background = p.enabled === false ? 'rgba(255,255,255,0.1)' : 'rgba(0,255,255,0.2)';
      toggleBtn.addEventListener('click', () => {
        toggle(p.id, p.enabled === false);
      });
      actions.appendChild(toggleBtn);
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.style.padding = '2px 6px';
      editBtn.style.border = 'none';
      editBtn.style.borderRadius = '6px';
      editBtn.style.cursor = 'pointer';
      editBtn.style.background = 'rgba(255,255,255,0.1)';
      editBtn.addEventListener('click', () => {
        const json = prompt('Edite o JSON do patch', JSON.stringify(p, null, 2));
        if (!json) return;
        try {
          const newPatch = JSON.parse(json);
          upsert(newPatch);
        } catch (e) {
          alert('JSON inválido: ' + e.message);
        }
      });
      actions.appendChild(editBtn);
      // Remove button
      const rmBtn = document.createElement('button');
      rmBtn.textContent = 'Remover';
      rmBtn.style.padding = '2px 6px';
      rmBtn.style.border = 'none';
      rmBtn.style.borderRadius = '6px';
      rmBtn.style.cursor = 'pointer';
      rmBtn.style.background = 'rgba(255,255,255,0.1)';
      rmBtn.addEventListener('click', () => {
        if (confirm('Remover patch ' + p.id + '?')) remove(p.id);
      });
      actions.appendChild(rmBtn);
      row.appendChild(actions);
      list.appendChild(row);
    });
  }
  /** Constrói o painel de patches quando o DOM está pronto. */
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('patchMgrBtn');
    const panel = document.getElementById('patchMgrPanel');
    if (!btn || !panel) return;
    // Prepara estrutura do painel
    panel.innerHTML = '';
    panel.style.display = 'none';
    panel.style.position = 'fixed';
    panel.style.right = '18px';
    panel.style.bottom = '160px';
    panel.style.zIndex = '1000';
    panel.style.width = 'min(480px, 90vw)';
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.padding = '12px';
    panel.style.borderRadius = '14px';
    panel.style.background = 'rgba(10,12,16,0.78)';
    panel.style.backdropFilter = 'blur(10px)';
    panel.style.border = '1px solid rgba(255,255,255,0.12)';
    panel.style.color = 'var(--text)';
    // Header
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    const title = document.createElement('h3');
    title.textContent = 'Gerenciador de Patches';
    title.style.margin = '0';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fechar';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'rgba(255,255,255,0.1)';
    closeBtn.style.borderRadius = '8px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => panel.style.display = 'none');
    header.appendChild(title);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    // Lista de patches
    const list = document.createElement('div');
    list.id = 'patchList';
    list.style.marginTop = '10px';
    panel.appendChild(list);
    // Barra de ações
    const actionsBar = document.createElement('div');
    actionsBar.style.display = 'flex';
    actionsBar.style.gap = '6px';
    actionsBar.style.marginTop = '10px';
    // Botão adicionar
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Adicionar';
    addBtn.style.border = 'none';
    addBtn.style.background = 'rgba(0,255,255,0.2)';
    addBtn.style.borderRadius = '8px';
    addBtn.style.cursor = 'pointer';
    addBtn.addEventListener('click', () => {
      const id = prompt('ID do patch');
      if (!id) return;
      const css = prompt('Código CSS (opcional)') || '';
      const js = prompt('Código JS (opcional)') || '';
      upsert({ id, css, js, enabled: true });
    });
    actionsBar.appendChild(addBtn);
    // Botão exportar
    const expBtn = document.createElement('button');
    expBtn.textContent = 'Exportar';
    expBtn.style.border = 'none';
    expBtn.style.background = 'rgba(255,255,255,0.1)';
    expBtn.style.borderRadius = '8px';
    expBtn.style.cursor = 'pointer';
    expBtn.addEventListener('click', exportPatches);
    actionsBar.appendChild(expBtn);
    // Botão importar
    const impBtn = document.createElement('button');
    impBtn.textContent = 'Importar';
    impBtn.style.border = 'none';
    impBtn.style.background = 'rgba(255,255,255,0.1)';
    impBtn.style.borderRadius = '8px';
    impBtn.style.cursor = 'pointer';
    impBtn.addEventListener('click', importPatches);
    actionsBar.appendChild(impBtn);
    // Botão limpar
    const clrBtn = document.createElement('button');
    clrBtn.textContent = 'Limpar';
    clrBtn.style.border = 'none';
    clrBtn.style.background = 'rgba(255,255,255,0.1)';
    clrBtn.style.borderRadius = '8px';
    clrBtn.style.cursor = 'pointer';
    clrBtn.addEventListener('click', clearPatches);
    actionsBar.appendChild(clrBtn);
    panel.appendChild(actionsBar);
    // Toggle panel
    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
    // Aplicar e renderizar
    applyAll();
    renderList();
  });
})();