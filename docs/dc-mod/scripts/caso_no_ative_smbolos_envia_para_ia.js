// caso não ative símbolos, envia para IA
showLoading('Pulso enviado... Recebendo intenção…');
conversation.push({ role:'user', content: raw });
callAI();
    }