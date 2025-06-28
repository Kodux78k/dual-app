//openrouter.ai/api/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": CONFIG.AUTH_TOKEN || '',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: preferredVoice,
        input: text
      })
    }).then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      }).catch(err => {
        console.error("Fala com fallback:", err);
        const fallback = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(fallback);
      });
  }