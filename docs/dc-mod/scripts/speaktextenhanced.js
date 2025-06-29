function speakTextEnhanced(text) {
    const emotion = detectEmotion?.(text) || "neutral";
    const preferredVoice = {
      excited: "nova",
      calm: "fable",
      mysterious: "onyx",
      deep: "echo",
      neutral: "nova"
    }[emotion] || "nova";

    fetch("https: