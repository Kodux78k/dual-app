function detectEmotion(text) {
  text = text.toLowerCase();
  if (text.includes("mistério") || text.includes("interdimensional")) return "mysterious";
  if (text.includes("urgente") || text.includes("agora") || text.includes("!!!")) return "excited";
  if (text.includes("calma") || text.includes("tranquilo")) return "calm";
  if (text.includes("profundo") || text.includes("ritual")) return "deep";
  return "neutral";
}

async 