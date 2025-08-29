(function(){
  function setVH(){ const vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', vh + 'px'); }
  setVH(); addEventListener('resize', setVH);
  function setSafeBottom(){
    const test = getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)');
    const px = (parseInt(test) || 0) + 'px';
    document.documentElement.style.setProperty('--safe-bottom', px);
  }
  setSafeBottom();
  let lastH = window.innerHeight;
  function detectKB(){
    const h = window.innerHeight;
    const delta = Math.abs(h - lastH);
    if (delta > 120){ document.body.setAttribute('data-kb', h < lastH ? 'open' : 'closed'); lastH = h; }
  }
  addEventListener('resize', detectKB);
  if(!document.body.dataset.gap){ document.body.dataset.gap = 'med'; }
})();
