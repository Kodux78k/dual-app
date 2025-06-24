// turbo.js
import { unlockFET } from './fet-loader.js';
export function initTurbo() {
  const btn = document.querySelector('[data-fet-mode="turbo"]');
  let locked = false;
  btn.addEventListener('click', () => {
    if (locked) return;
    locked = true;
    unlockFET('turbo');
    btn.textContent = 'TURBO ON';
    // Partículas simples
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      Object.assign(p.style, {
        position: 'absolute',
        width: '6px',
        height: '6px',
        background: getComputedStyle(btn).color,
        borderRadius: '50%',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 1,
        transition: 'all 1s ease-out'
      });
      document.body.append(p);
      setTimeout(() => {
        p.style.transform = 'translateY(-50px) scale(0)';
        p.style.opacity = 0;
        setTimeout(() => p.remove(), 1000);
      }, 10);
    }
    setTimeout(() => locked = false, 1000);
  });
}
