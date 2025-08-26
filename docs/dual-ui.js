/* dual-ui.js :: TRINITY=harmonia (UI + Estado + IA) */
(function(){
  // Anti-multiclick
  const clicked = new WeakSet();
  document.addEventListener('click', (ev)=>{
    const el = ev.target.closest('[data-send], [data-role="enter-templo"], #btn-expandir-ritual, button[type="submit"]');
    if (!el) return;
    const isCritical = el.matches('[data-role="enter-templo"], [data-send], #btn-expandir-ritual');
    if (isCritical){
      if (clicked.has(el)){ ev.stopImmediatePropagation(); ev.preventDefault(); return false; }
      clicked.add(el); setTimeout(()=>clicked.delete(el), 1200);
    }
  }, true);

  // Ritual toggle unificado
  const btn = document.getElementById('btn-expandir-ritual');
  if (btn && !btn.__dualBound){
    btn.__dualBound = true;
    btn.addEventListener('click', ()=>{
      const alvo = document.getElementById('corpo-espelho') || document.getElementById('pulsos');
      if (!alvo) return;
      alvo.style.display = (alvo.style.display === 'none' || !alvo.style.display) ? 'block' : 'none';
      if (alvo.id === 'pulsos' && alvo.style.display === 'block'){
        alvo.scrollTop = alvo.scrollHeight;
      }
    }, { once:false });
  }

  // CTA "Do seu jeito"
  const footerCTA = Array.from(document.querySelectorAll('.footer-text, a, button'))
    .find(el => /do seu jeito/i.test(el.textContent||''));
  if (footerCTA) footerCTA.classList.add('dual-footer-cta');

  const css = `
.dual-footer-cta{
  display:block; text-align:center; margin:12px auto; padding:10px 14px; border-radius:12px;
  border:1px solid rgba(255,255,255,.14); background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.22));
  font-weight:700; color:#d4af37; box-shadow: 0 4px 18px rgba(212,175,55,.15);
}
#btn-expandir-ritual{ bottom: 37px !important; }
#btn-expandir-ritual:hover{ opacity:1 !important; transform: scale(1.06); }
`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
})();