// cyberpunk.js
import { unlockFET } from './fet-loader.js';
export function initCyberpunk() {
  const btn = document.querySelector('[data-fet-mode="cyberpunk"]');
  btn.addEventListener('click', () => {
    unlockFET('cyberpunk');
    document.body.classList.toggle('vaporwave');
  });
}
