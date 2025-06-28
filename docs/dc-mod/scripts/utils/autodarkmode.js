function autoDarkMode(){
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 6) {
    document.body.setAttribute("data-theme", "dark");
    document.body.classList.add("theme-fade");
  }
})();


let preferClean = localStorage.getItem('preferClean') === 'false' ? false : true;

document.addEventListener("DOMContentLoaded", () => {
  const toggleModeBtn = document.createElement('button');
  toggleModeBtn.id = 'toggleCleanMode';
  toggleModeBtn.innerText = '💬=' + (preferClean ? '🫧' : '🫆');
  toggleModeBtn.style.cssText = `
    position: fixed;
    top: 8px;
    left: 20px;
    padding: 6px 9px;
    background: rgba(0, 0, 0, 0.6);
    color: #0ff;
    border: none;
    border-radius: 5px;
    font-size: 9px;
    opacity:0.8;
    cursor: pointer;
    z-index: 3;
  `;
  document.body.appendChild(toggleModeBtn);

  toggleModeBtn.addEventListener('click', () => {
    preferClean = !preferClean;
    localStorage.setItem('preferClean', preferClean);
    toggleModeBtn.innerText = ':' + (preferClean ? '🫧' : '🫆');
    if (navigator.vibrate) navigator.vibrate([30]);
  });
});

