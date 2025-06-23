// tesseract.js
import { unlockFET } from './fet-loader.js';

export function initTesseract() {
  const btn = document.querySelector('.tesseract-btn');
  btn.addEventListener('click', () => {
    unlockFET('tesseract');
    // interactive rotation logic...
  });
}
