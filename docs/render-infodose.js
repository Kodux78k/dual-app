
function renderResponse(text, containerId = "response") {
  const container = document.getElementById(containerId);
  const blocks = text.split(':::').filter(Boolean);
  container.innerHTML = "";

  blocks.forEach((raw, i) => {
    const [title, ...bodyLines] = raw.trim().split('\n');
    const body = bodyLines.join('\n').trim();
    const block = document.createElement('div');
    block.className = 'response-block intro';

    const toggle = document.createElement('div');
    toggle.className = 'dose-toggle';
    toggle.textContent = `▼ ${title}`;
    toggle.style.cursor = "pointer";
    toggle.style.color = "#0ff";
    toggle.style.fontWeight = "bold";

    const content = document.createElement('div');
    content.innerHTML = parseActions(body);
    content.classList.add('dose-hidden');

    toggle.onclick = () => {
      content.classList.toggle('dose-hidden');
      toggle.textContent = content.classList.contains('dose-hidden') ? `▼ ${title}` : `▲ ${title}`;
    };

    block.appendChild(toggle);
    block.appendChild(content);
    container.appendChild(block);
  });
}

function parseActions(text) {
  return text
    .replace(/\[abrir::(.*?)\]/g, (_, url) =>
      `<div class="dose-btn" onclick="abrirURL('${url}')">🌐 Abrir Conteúdo</div>`)
    .replace(/\[audio::(.*?)\]/g, (_, url) =>
      `<audio controls src="${url}" style="margin-top:10px; width:100%"></audio>`)
    .replace(/\[pdf::(.*?)\]/g, (_, url) =>
      `<iframe src="${url}" style="width:100%; height:500px; margin-top:10px;"></iframe>`)
    .replace(/\[tema::(.*?)\]/g, (_, nome) =>
      `<div class="dose-btn" onclick="changeTheme('${nome}')">🎨 Mudar para tema: ${nome}</div>`)
    .replace(/\[flow::(.*?)\]/g, (_, fluxo) =>
      `<div class="dose-btn" onclick="startFlow('${fluxo}')">🚀 Iniciar fluxo: ${fluxo}</div>`);
}

function abrirURL(url) {
  const nova = window.open('', '_blank');
  nova.document.write(`<iframe src="${url}" style="width:100vw; height:100vh; border:none;"></iframe>`);
}

function changeTheme(val) {
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) themeSelector.value = val;
  document.body.setAttribute('data-theme', val);
  localStorage.setItem('infodoseTheme', val);
}

function startFlow(nome) {
  alert(`🧬 Fluxo iniciado: ${nome}`);
}
