
// =========================
// 🔁 renderResponseModule.js
// =========================

// ========= Markdown simbiótico =========
export function renderMarkdown(raw) {
  return raw
    .replace(/(["“”'])(.+?)\1/g, '<button class="response-button">"$2"</button>')
    .replace(/\[(.+?)\]/g, '<button class="response-button">[$1]</button>')
    .replace(/([\u231A-\u2B55\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}])/gu, '<button class="emoji-button">$1</button>')
    .replace(/^### (.*)/gm, '<h3>$1</h3>')
    .replace(/^## (.*)/gm, '<h2>$1</h2>')
    .replace(/^# (.*)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

// ========= Separador de parágrafos robusto =========
export function splitText(t) {
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

// ========= Função renderResponse simbiótica =========
export function renderResponse(txt) {
  const wrap = document.querySelector(".pages-wrapper");
  wrap.innerHTML = "";
  let pages = [], currentPage = 0;
  txt = renderMarkdown(txt);

  const groups = splitText(txt),
        titles = ["🎁 Recompensa Inicial", "👁️ Exploração", "⚡️ Antecipação"];

  groups.forEach((grp, gi) => {
    const pg = document.createElement("div");
    pg.className = "page" + (gi === 0 ? " active" : "");

    grp.forEach((para, j) => {
      const cls = j === 0 ? "intro" : j === 1 ? "middle" : "ending";
      const block = document.createElement("div");
      block.className = "response-block " + cls;
      block.innerHTML = "<p>" + para + "</p>";

      block.addEventListener("click", () => {
        speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(block.textContent);
        speechSynthesis.speak(utter);
        block.classList.add("clicked");
      });

      pg.appendChild(block);
    });

    wrap.appendChild(pg);
    pages.push(pg);
  });

  const pageIndicator = document.getElementById("pageIndicator");
  if (pageIndicator) pageIndicator.textContent = "1 / " + pages.length;
}
