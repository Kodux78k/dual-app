// Segunda vez: expande e envia para a IA
      block.classList.add('expanded');

      if (!isEnabled) {
        isEnabled = true;
        localStorage.setItem(STORAGE_KEY, '1');
        updateUI();
      }

      showLoading(' Pulso em Expansão...');

      conversation.push({
        role: 'user',
        content: para,