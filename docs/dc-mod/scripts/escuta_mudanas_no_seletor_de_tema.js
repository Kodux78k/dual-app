// Escuta mudanças no seletor de tema
document.addEventListener('DOMContentLoaded', () => {
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      const theme = e.target.value;
      applyAdvancedTheme(theme);
    });
  }