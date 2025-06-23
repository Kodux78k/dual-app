// Turbo Mode JS
function activateTurbo() {
    const btn = document.querySelector('.turbo-btn');
    const border = document.querySelector('.matrix-border');

    // Efeito visual
    btn.textContent = ">> TURBO ATIVADO <<";
    border.style.animation = "pulse 0.5s infinite";
    document.body.style.backgroundColor = "#001a00";

    // ASCII Art dinâmica
    document.querySelector('.ascii-art').innerHTML = 
       "   _____  \n" +
       "  /     \\ \n" +
       " | ✓✓ ✓✓ |\n" +
       "  \\  ▲  / \n" +
       "   |||||  \n" +
       "   |||||  \n" +
       "  TURBO!";

    // Atualiza status
    document.querySelector('.footer').innerHTML = 
        "> Status do sistema: TURBO MAXIMO<br>" +
        "<br> > Processando infodose...";

    // Efeito sonoro (opcional)
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
    audio.play();

    // Prepara para input
    setTimeout(() => {
        prompt("Sistema turbo pronto. Insira seu comando:");
    }, 1500);
}

// Cria animação de pulso
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% { box-shadow: 0 0 10px #0f0; }
    50% { box-shadow: 0 0 30px #0f0; }
    100% { box-shadow: 0 0 10px #0f0; }
}
`;
document.head.appendChild(style);
