function showLoading(msg){
  const wrap = document.querySelector('.pages-wrapper');
  wrap.innerHTML = '';
  const p = document.createElement('div');
  p.className = 'page active';
  const foot = document.createElement('p');
  foot.className = 'footer-text loading pulse-glow';
  msg.split('').forEach((ch, i) => {
    const sp = document.createElement('span');
    sp.textContent = ch;
    sp.style.animationDelay = (i * 0.04) + 's';
    sp.classList.add('typewriter-char');
    foot.appendChild(sp);
    if (navigator.vibrate) navigator.vibrate(5);
  });
  p.appendChild(foot);
  wrap.appendChild(p);
  document.getElementById('pageIndicator').textContent = '1 / 1';
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  if (navigator.vibrate) navigator.vibrate([20,10,20]);
}

