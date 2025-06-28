function modulateResponseByTheme(originalText) {
  const activeTheme = document.body.getAttribute('data-theme');
  const role = rolePersonalities[activeTheme];
  if (!role) return originalText;

  const prefix = role.prefix || '';
  const styled = `🌐 ${prefix}${originalText}`;
  return styled;
}