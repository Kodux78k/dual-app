// Cyberpunk Style Guide JS
const text = "> Sistema pronto para criação hiperdimensional...";
let i = 0;
const speed = 50;
const elem = document.getElementById("terminal-text");

function typeWriter() {
    if (i < text.length) {
        elem.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        elem.classList.remove("typewriter");
    }
}
setTimeout(typeWriter, 1000);

// GLITCH RANDOMICO
setInterval(() => {
    const glitch = document.querySelector(".glitch-effect");
    glitch.style.animation = "none";
    void glitch.offsetWidth; // Trigger reflow
    glitch.style.animation = "";
}, 5000);
