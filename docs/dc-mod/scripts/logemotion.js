function logEmotion(state) {
  const now = new Date().toISOString();
  emotionalLog.push({ time: now, ...state });
  localStorage.setItem('emotionalTimeline', JSON.stringify(emotionalLog));
}

