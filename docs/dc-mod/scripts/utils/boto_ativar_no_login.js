// Botão ativar no login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", () => {
      uiBL.ativar.currentTime = 0;
      uiBL.ativar.play().catch(()=>{});
    });
  }