// particles.js
// Implementação simplificada de partículas para o Dual App.
// Esta versão cria partículas animadas que se movem lentamente em
// direções aleatórias dentro do elemento especificado. Não requer
// configurações externas e fornece um efeito visual agradável para
// substituir a dependência de bibliotecas externas.

;(function() {
  if (window.particlesJS) return;
  window.particlesJS = {
    load: function(elId, configPath, callback) {
      const container = document.getElementById(elId);
      if (!container) {
        console.warn('[particles] Elemento não encontrado:', elId);
        callback?.();
        return;
      }
      // Cria um canvas para as partículas
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.zIndex = '-1';
      canvas.style.pointerEvents = 'none';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let width, height;
      let particles = [];
      function resize() {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        // Regerar partículas
        particles = [];
        const count = 80;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.6 + 0.2
          });
        }
      }
      function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        particles.forEach(p => {
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          // Bounce on edges
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });
        requestAnimationFrame(draw);
      }
      resize();
      window.addEventListener('resize', resize);
      draw();
      callback?.();
    }
  };
})();