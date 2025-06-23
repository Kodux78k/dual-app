// matrix.js
import { unlockFET } from './fet-loader.js';

export function initMatrix() {
  const btn = document.querySelector('.matrix-btn');
  btn.addEventListener('click', () => {
    unlockFET('matrix');
  });
}
