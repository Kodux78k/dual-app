

<!-- ✅ COMPONENTE: trinity-response -->
<script>
class TrinityResponse extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Montserrat', sans-serif;
          background: var(--bg, #111);
          color: var(--text, #0ff);
          padding: 16px;
          margin: 8px 0;
          border-radius: 12px;
          box-shadow: 0 0 12px #0ff7;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .device-list {
          margin-top: 12px;
        }
        .device {
          padding: 6px;
          margin: 4px 0;
          border: 1px solid #0ff4;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .device:hover {
          background: #0ff2;
        }
        button {
          background: transparent;
          border: 1px solid #0ff7;
          border-radius: 8px;
          color: var(--text);
          padding: 6px 10px;
          cursor: pointer;
          font-size: 14px;
        }
      </style>
      <div class="header">
        <span>📡 Bluetooth Ritual</span>
        <button id="scan">🔍 Buscar</button>
      </div>
      <div class="device-list" id="devices">
        <div class="device">🔄 Nenhum dispositivo encontrado...</div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#scan").addEventListener("click", async () => {
      const list = this.shadowRoot.querySelector("#devices");
      list.innerHTML = `<div class="device">⏳ Procurando...</div>`;
      try {
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        list.innerHTML = `<div class="device">📱 ${device.name || "Sem nome"} conectado!</div>`;
        if (typeof renderResponse === "function") {
          renderResponse(`:::Dispositivo Conectado:::\nNome: ${device.name || "sem nome"}\nID: ${device.id}`);
        }
      } catch (err) {
        list.innerHTML = `<div class="device">⚠️ Erro: ${err.message}</div>`;
      }
    });
  }
}
customElements.define("trinity-response", TrinityResponse);
</script>

<!-- ✅ BOTÃO EXPORTAÇÃO -->
<button onclick="baixarArquivo()">💾 Exportar Sessão</button>

<script>
function baixarArquivo() {
  const texto = localStorage.getItem("livroDeAtivacoes") || "Nada para exportar.";
  const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dualBook-infodose.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}
</script>