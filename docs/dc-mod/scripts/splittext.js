function splitText(text, maxLen=1000) {
  const chunks = [];
  while (text.length > 0) chunks.push(text.slice(0, maxLen)), text = text.slice(maxLen);
  return chunks;
}
