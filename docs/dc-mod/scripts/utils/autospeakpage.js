function autoSpeakPage(i=0){
  if (!pages[i]) return;
  const blocks = pages[i].querySelectorAll('.response-block');
  let idx = 0;
  const speakNext = () => {
    if (idx >= blocks.length) return;
    const u = new SpeechSynthesisUtterance(blocks[idx].textContent);
    u.onend = speakNext;
    speechSynthesis.speak(u);
    idx++;
  };
  speakNext();
}
