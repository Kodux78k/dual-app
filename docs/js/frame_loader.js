class MyFrameLoader extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
          <style>
            .overlay {
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.6);
              backdrop-filter: blur(8px);
              z-index: 999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              width: 92%;
              height: 86%;
              background: #111;
              border-radius: 20px;
              box-shadow: 0 0 20px #0ff;
              overflow: hidden;
              position: relative;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
            .close-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              background: #f0f;
              border: none;
              color: #000;
              font-weight: bold;
              border-radius: 12px;
              padding: 4px 10px;
              cursor: pointer;
              z-index: 10;
            }
          </style>
          <div class="overlay">
            <div class="container">
              <button class="close-btn">✖</button>
              <iframe></iframe>
            </div>
          </div>
        `;
        this.iframe = shadow.querySelector('iframe');
        shadow.querySelector('.close-btn').onclick = () => this.remove();
      }
      set src(val) {
        this.iframe.src = val;
      }
    }
    customElements.define('my-frame-loader', MyFrameLoader);