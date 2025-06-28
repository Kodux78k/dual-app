function speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  }

  document.querySelectorAll('.block').forEach(block => {
    let clickedOnce = false;
    block.addEventListener('click', () => {
      const title = block.querySelector('.intro, .middle, .ending')?.textContent || 'Bloco';
      const text = block.querySelector('p')?.textContent || '';
      const fullText = title + ": " + text;

      if (!clickedOnce) {
        speakText(fullText);
        clickedOnce = true;
      } else {
        window.speechSynthesis.cancel();
        const input = document.getElementById('userInput');
        if (input) input.value = fullText;
        clickedOnce = false;
      }
    });
  });