// auto exit after 60s
  setTimeout(() => {
    document.body.classList.remove('transcendence');
    document.body.style.background = '';
    document.body.style.color = '';
    if (document.getElementById('veil')) document.getElementById('veil').remove();
    chant.pause();
    transcending = false;
    document.getElementById("status")?.textContent = "🌌 Voltou do modo TRANSCENDÊNCIA";
  }, 60000);
}

