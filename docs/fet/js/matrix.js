// matrix.js
import { unlockFET } from './fet-loader.js';
export function initMatrix() {
  const btn = document.querySelector('[data-fet-mode="matrix"]');
  let canvas, ctx, w, h, cols, ys;
  btn.addEventListener('click', () => {
    unlockFET('matrix');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'canvas-matrix';
      document.body.append(canvas);
      ctx = canvas.getContext('2d');
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      cols = Math.floor(w / 20);
      ys = Array(cols).fill(0);
      requestAnimationFrame(draw);
    }
  });
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = 'var(--matrix-color,#0f0)';
    ctx.font = '20px monospace';
    ys.forEach((y,i)=>{
      const text = String.fromCharCode(0x30A0 + Math.random()*96);
      ctx.fillText(text, i*20, y);
      ys[i] = y > h && Math.random() > 0.975 ? 0 : y + 20;
    });
    requestAnimationFrame(draw);
  }
}
