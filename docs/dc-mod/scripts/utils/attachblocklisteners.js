function attachBlockListeners(block, para){
  block.addEventListener('click', () => {
    autoAdvance = false;
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const clean = para.replace(/["“”‘’]/g,'').replace(/[\u1F300-\u1F6FF\u1F900-\u1F9FF\u2600-\u26FF\u2700-\u27BF]/g,'');
    const utter = new SpeechSynthesisUtterance(clean);
    speechSynthesis.speak(utter);
  });
}
