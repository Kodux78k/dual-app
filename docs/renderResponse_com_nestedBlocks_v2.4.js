
// 📦 Função para parse de blocos ::: com toggle visual
function parseNestedBlocks(texto) {
  return texto.replace(/:::([\s\S]*?):::/g, (match, inner) => {
    return `
      <div class="nested-block">
        <div class="nested-header">🌀 Abrir Bloco</div>
        <div class="nested-content">${inner.trim()}</div>
      </div>
    `;
  });
}

// 🎯 Evento para ativar/desativar o conteúdo ao clicar no header
document.addEventListener("click", function(e) {
  if (e.target && e.target.classList.contains("nested-header")) {
    const content = e.target.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  }
});

// ✅ Função principal de renderização com suporte a blocos :::
function renderResponse(texto, classe = "middle") {
  const responseContainer = document.querySelector("#response .pages-wrapper") || document.querySelector(".pages-wrapper");
  if (!responseContainer) return;

  responseContainer.innerHTML = '';
  pages = []; currentPage = 0; autoAdvance = true;

  const page = document.createElement("div");
  page.className = "page active";

  const bloco = document.createElement("div");
  bloco.className = `response-block ${classe}`;
  bloco.innerHTML = parseNestedBlocks(texto); // 🌟 Aqui ocorre a mágica

  page.appendChild(bloco);
  responseContainer.appendChild(page);
  pages.push(page);

  autoSpeakPage(0);
}
