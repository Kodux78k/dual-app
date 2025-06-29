function processDynamicCommands(root) {
  root.innerHTML = root.innerHTML.replace(
    /\[\[button:([^\|\]]+)\|([^\]]+)\]\]/g,
    (_, lbl, cmd) => {
      const id = `btn-${Date.now()}-${Math.random()}`;
      setTimeout(() => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => handleCommand(cmd));
      }, 0);
      return `<button id="${id}">${lbl}</button>`;
    }
  );
}
