
// 🔮 renderResponse simbiótico com suporte a :::option / :::content
function renderResponseSimbiotico(markdownText, containerElement) {
  const html = parseSimbioMarkdown(markdownText);
  const block = document.createElement("div");
  block.className = "response-block";
  block.innerHTML = html;
  containerElement.appendChild(block);
  processNestedBlocks(block);
}

// ✨ Parser simbiótico para :::option / :::content blocos
function parseSimbioMarkdown(markdownText) {
  const lines = markdownText.split('\n');
  let html = '';
  let insideOption = false;
  let optionHeader = '';
  let optionContent = '';

  for (let line of lines) {
    if (line.trim().startsWith(':::option')) {
      insideOption = true;
      optionHeader = '';
      optionContent = '';
      continue;
    }
    if (line.trim().startsWith(':::content')) {
      continue;
    }
    if (line.trim().startsWith(':::')) {
      // Fecha bloco atual
      html += `
        <div class="nested-block">
          <div class="nested-header">${optionHeader.trim()}</div>
          <div class="nested-content">${optionContent.trim()}</div>
        </div>
      `;
      insideOption = false;
      optionHeader = '';
      optionContent = '';
      continue;
    }
    if (insideOption && !optionHeader) {
      optionHeader = line;
    } else if (insideOption) {
      optionContent += line + '\n';
    } else {
      html += '<p>' + line + '</p>';
    }
  }

  return html;
}

// 🔁 Função que ativa clique em nested blocks (usada após inserir no DOM)
function processNestedBlocks(container) {
  container.querySelectorAll(".nested-block").forEach(block => {
    const header = block.querySelector(".nested-header");
    const content = block.querySelector(".nested-content");
    if (header && content) {
      content.style.display = "none";
      header.addEventListener("click", () => {
        const isVisible = content.style.display === "block";
        content.style.display = isVisible ? "none" : "block";
      });
    }
  });
}
