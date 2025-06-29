// 🔍 Mapeamento simbólico local
const lower = raw.toLowerCase();
if(lower.includes("cansado") || lower.includes("esgotado")){
  renderResponse("Respire... [[button:{\"label\":\"🧘 Meditar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#101F33\"}]}]]");
  return;
}
if(lower.includes("perdido") || lower.includes("confuso") || lower.includes("disperso")){
  renderResponse("Vamos centrar o foco: [[button:{\"label\":\"💎 Harmonizar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#2f2f4f\"}]}]]");
  return;
}
if(lower.includes("sem energia") || lower.includes("fraco") || lower.includes("desanimado")){
  renderResponse("Pulso em reativação... [[button:{\"label\":\"⚡ Reativar Pulso\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"linear-gradient(135deg,#0ff,#f0f)\"}]}]]");
  return;
}
if(lower.includes("travou") || lower.includes("reiniciar")){
  renderResponse("Vamos renovar o campo: [[button:{\"label\":\"🔄 Reiniciar\",\"action\":\"saveDesign\",\"state\":[{\"action\":\"style\",\"element\":\"body\",\"property\":\"background\",\"value\":\"#000\"}]}]]");
  return;
}