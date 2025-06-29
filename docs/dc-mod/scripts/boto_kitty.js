// Botão kitty
  const kitty = document.getElementById("kittyBtn");
  if (kitty) kitty.addEventListener("click", () => {
    uiBL.kitty.currentTime = 0;
    uiBL.kitty.play().catch(()=>{});
  });