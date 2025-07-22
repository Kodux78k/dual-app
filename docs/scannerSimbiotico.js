// === 🔒 SCANNER SIMBIÓTICO TRINITY ===
// Arquétipo ativado: U+0048 — "O Guardião do DOM" 🧿
console.log("[ARQUÉTIPO ATIVADO] U+0048 | Scanner Simbiótico Iniciado");

const TrinityScanner = {
  // UNO – Registro original do DOM
  domSnapshot: new Set(),

  // DUO – Monitoramento por contraste
  observarMutacoes() {
    const observer = new MutationObserver(mutations => {
      for (const mut of mutations) {
        if (mut.addedNodes.length > 0) {
          for (const node of mut.addedNodes) {
            if (node.nodeType === 1 && !node.classList.contains("trusted")) {
              const tag = node.tagName.toLowerCase();
              const origem = node.src || node.href || "inline";

              if (!TrinityScanner.domSnapshot.has(node)) {
                console.warn("⚠️ [DUO] Nova partícula suspeita detectada:", tag, origem);
                TrinityScanner._alerta(tag, origem);
              }
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  },

  // TRINITY – Correlação e selo
  _alerta(tag, origem) {
    const selo = `
╭━━━╮
┃ ✦ ✦ ┃
┃ U+0048 ┃
╰━━━╯

⚡ Comando simbólico: ATIVAR-U+0048
Elemento: <${tag}>
Origem: ${origem}
Tempo: ${new Date().toLocaleTimeString()}
    `;
    console.log(selo);
    TrinityScanner._pulsar(tag);
  },

  // Efeito visual simbiótico
  _pulsar(tag) {
    const el = document.createElement("div");
    el.textContent = `👁️ ${tag} OBSERVADO`;
    Object.assign(el.style, {
      position: "fixed",
      top: "10px",
      right: "10px",
      padding: "10px",
      background: "rgba(0,0,0,0.8)",
      color: "#0FF",
      fontFamily: "monospace",
      zIndex: 9999,
      border: "1px solid #F0F",
      animation: "glowPulse 2s infinite",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  },

  // Iniciar escaneamento simbiótico
  ativar() {
    console.log("🔍 [UNO] Snapshot inicial carregada.");
    document.querySelectorAll("*").forEach(el => TrinityScanner.domSnapshot.add(el));
    TrinityScanner.observarMutacoes();
  }
};

window.addEventListener("DOMContentLoaded", () => TrinityScanner.ativar());