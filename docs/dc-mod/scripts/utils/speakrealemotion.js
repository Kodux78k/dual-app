function speakRealEmotion(text) {
  const apiKey = CONFIG.AUTH_TOKEN || '';
  const emotion = detectEmotion(text);
  const voice = voiceMap[emotion];
  const model = 'tts-1';

  const response = await fetch("https: