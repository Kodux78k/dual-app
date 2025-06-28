function analyzeToneAndTrigger(inputText) {
  const lower = inputText.toLowerCase();
  const tone = {
    joy: lower.includes("feliz") || lower.includes("grato"),
    despair: lower.includes("cansado") || lower.includes("triste") || lower.includes("vazio"),
    wonder: lower.includes("maravilha") || lower.includes("cosmos") || lower.includes("amor")
  };

  if (tone.wonder) enterTranscendence();
  logEmotion({ input: inputText, tone });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  if (input) {
    input.addEventListener("change", () => analyzeToneAndTrigger(input.value));
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("bootText");
  const txt = el?.dataset?.text || "";
  if (!el) return;
  el.textContent = "";
  let i = 0;
  