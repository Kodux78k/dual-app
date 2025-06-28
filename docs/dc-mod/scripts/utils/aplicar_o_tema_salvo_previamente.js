// Aplicar o tema salvo previamente
  const savedTheme = localStorage.getItem('infodoseTheme');
  if (savedTheme) {
    applyAdvancedTheme(savedTheme);
  }
});