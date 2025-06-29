// Adiciona som a todos os blocos
  document.addEventListener("click", function (e) {
    const block = e.target.closest(".response-block");
    if (block) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  });