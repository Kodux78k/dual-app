function detectarPulsoSimbolico(inputTexto) {
  const simbolos = ['Δ', '⚡', '🧠', '👁️'];
  const encontrados = simbolos.filter(s => inputTexto.includes(s));
  if (encontrados.length) {
    console.log('Pulso simbólico detectado:', encontrados.join(', '));
  }
}


