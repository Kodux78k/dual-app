// tesseract.js
import { unlockFET } from './fet-loader.js';
export function initTesseract() {
  const btn = document.querySelector('[data-fet-mode="tesseract"]');
  btn.addEventListener('click', () => {
    unlockFET('tesseract');
    document.addEventListener('mousemove', onMove);
  });
  function onMove(e) {
    window._tessRAF && cancelAnimationFrame(window._tessRAF);
    window._tessRAF = requestAnimationFrame(()=>{
      const x = (e.clientX/window.innerWidth-0.5)*360;
      const y = (e.clientY/window.innerHeight-0.5)*180;
      document.querySelector('.tesseract-container')
              .style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
  }
}
