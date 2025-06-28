function applyAdvancedTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  const msg = {
    'matrix': '🧪 Ativando realidade em código verde...',
    'cyberpunk': '☣️ Injetando neons e distorções...',
    'turbo': '⚡ Modo Turbo ativado. Velocidade máxima!',
    'tesseract': '📐 Dobras multidimensionais em andamento...',
    'nebula': '🌌 Conectando ao vórtice estelar...'
  };
  console.log(msg[themeName] || '🌐 Tema aplicado:', themeName);
}