/**
 * render-sandbox.js
 * Módulo simbiótico de renderização Trinity para testes criativos e manipulação dinâmica
 * Desenvolvido para integração com sistemas Dual.infodose
 */

const pages = [];
let currentPage = 0;
let autoAdvance = false;

function $(s) {
  return document.querySelector(s);
}

function create(tag, className, html) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (html) el.innerHTML = html;
  return el;
}

function splitText(txt) {
  let parts = txt.split(/\n\s*\n/).filter(p => p.trim());
  if (parts.length % 3 !== 0) {
    parts = (txt.match(/[^.!?]+[.!?]+/g) || []).map(s => s.trim());
  }
  const grouped = [];
  for (let i = 0; i < parts.length; i += 3) {
    grouped.push(parts.slice(i, i + 3));
  }
  return grouped;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function logMistico(msg) {
  const pulsos = document.getElementById("pulsos");
  if (!pulsos) return;
  const el = document.createElement("div");
  el.className = "debug-mistico";
  el.innerText = "🌀 " + msg;
  pulsos.appendChild(el);
  if (!pulsos.classList.contains("expanded")) {
    pulsos.scrollTop = pulsos.scrollHeight;
  }
}

function renderResponse(txt) {
  const wrap = $(".pages-wrapper");
  wrap.innerHTML = "";
  pages.length = 0;
  currentPage = 0;
  autoAdvance = true;

  const groups = splitText(txt);
  const titles = ["🎁 Recompensa Inicial", "👁️ Exploração", "⚡️ Antecipação"];

  groups.forEach((grp, gi) => {
    const pg = create("div", "page" + (gi === 0 ? " active" : ""));
    grp.forEach((para, j) => {
      const cls = j === 0 ? "intro" : j === 1 ? "middle" : "ending";
      const block = create("div", "response-block " + cls, "<p>" + para + "</p>");
      block.addEventListener("click", () => {
        speak(para);
        block.classList.add("clicked");
        if (!block.dataset.spoken) {
          block.dataset.spoken = "1";
        } else {
          block.classList.toggle("expanded");
          logMistico("🌐 Pulso expandido: " + para.slice(0, 20) + "...");
        }
      });
      pg.appendChild(block);
    });
    wrap.appendChild(pg);
    pages.push(pg);
  });

  $("#pageIndicator").textContent = "1 / " + pages.length;
  autoSpeakPage(0);
}

function autoSpeakPage(i) {
  const txts = Array.from(pages[i].querySelectorAll("p"))
    .map(p => p.textContent).join(" ");
  speak(txts);
}

function changePage(dir) {
  const np = currentPage + dir;
  if (np < 0 || np >= pages.length) return;
  pages[currentPage].classList.remove("active");
  pages[np].classList.add("active");
  currentPage = np;
  $("#pageIndicator").textContent = (np + 1) + " / " + pages.length;
  if (autoAdvance) autoSpeakPage(np);
}

// Utilitário simbiótico manual
function sandboxRender({ intro = "", middle = "", ending = "" }) {
  const wrap = $(".pages-wrapper");
  const pg = create("div", "page active");

  function createBlock(txt, cls) {
    const blk = create("div", "response-block " + cls, txt);
    blk.addEventListener("click", () => {
      blk.classList.toggle("expanded");
      logMistico("📌 Bloco simbólico: " + cls);
      speak(blk.textContent);
    });
    return blk;
  }

  if (intro) pg.appendChild(createBlock(intro, "intro"));
  if (middle) pg.appendChild(createBlock(middle, "middle"));
  if (ending) pg.appendChild(createBlock(ending, "ending"));
  wrap.innerHTML = "";
  wrap.appendChild(pg);
  pages.length = 1;
  currentPage = 0;
  $("#pageIndicator").textContent = "1 / 1";
  speak(pg.textContent);
}

window.sandboxRender = sandboxRender;
window.renderResponse = renderResponse;
window.changePage = changePage;