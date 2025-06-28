function createAsciiButton(text, callback) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.onclick = callback;
  return btn;
}
