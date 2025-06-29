// Fala com texto limpo
    const utter = new SpeechSynthesisUtterance(cleanPara);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);

    if (!block.dataset.spoken) {