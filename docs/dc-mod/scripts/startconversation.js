function startConversation(){
      const base = isHistory ? trainingHistory : (chunks[0]||training)+ `\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.`;
      const persona = isHistory ? 'CODEX dual.infodose.' : 'CODEX KOBLLUX Dual.infodose.';
      conversation=[{role:'system',content: base + '\n\nVocê é o ' + persona}];
      updateUI();
    }

    