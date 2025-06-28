function enterTranscendence() {
  if (transcending) return;
  transcending = true;

  document.body.style.transition = 'all 3s ease-in-out';
  document.body.style.background = 'linear-gradient(135deg, #3f007f, #000)';
  document.body.style.color = '#ccffcc';
  document.body.classList.add('transcendence');

  const veil = document.createElement('div');
  veil.id = 'veil';
  veil.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;background:url(https: