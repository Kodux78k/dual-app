    function playSound() {
      activationSound.volume = 1;
      activationSound.play().catch(()=>{});
    }
  function spawnCosmicExplosion(x, y) {
    const boom = document.createElement("div");
    boom.style.position = "absolute";
    boom.style.left = x + "px";
    boom.style.top = y + "px";
    boom.style.width = boom.style.height = "12px";
    boom.style.borderRadius = "50%";
    boom.style.background = "radial-gradient(circle, #0ff, #f0f0ff, transparent)";
    boom.style.pointerEvents = "none";
    boom.style.animation = "pulse 0.4s ease-out";
    document.body.appendChild(boom);
    setTimeout(() => boom.remove(), 1000);
  }
  function logMistico(msg) {
    const el = document.createElement("div");
    el.className = "debug-mistico";
    el.innerText = "◉ " + msg;
    pulsos.appendChild(el);
    if (!pulsos.classList.contains("expanded")) {
      pulsos.scrollTop = pulsos.scrollHeight;
    }
  }
  function spawnCosmicExplosion(x, y) {
    spawnCosmicExplosion(e.clientX, e.clientY);
    navigator.vibrate?.([5, 15, 5]);
      spawnCosmicExplosion(xGlobal, yGlobal);
      navigator.vibrate?.([5, 15, 5]);
const trackSelect = document.getElementById("trackSelect");
const binauralSelect = document.getElementById("binauralSelect");
trackSelect.addEventListener("change", () => {
if (trackSelect.value) {
trackAudio.src = `assets/sounds/trilhas/${trackSelect.value}.mp3`;
binauralSelect.addEventListener("change", () => {
if (binauralSelect.value) {
binauralAudio.src = `assets/sounds/binaural/${binauralSelect.value}.wav`;