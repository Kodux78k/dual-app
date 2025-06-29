// Botão toggle (login)
  const toggle = document.getElementById("toggleBtn");
  if (toggle) toggle.addEventListener("click", () => {
    uiBL.toggle.currentTime = 0;
    uiBL.toggle.play().catch(()=>{});
  });