    async function callAI(){
      try {
        // Verifica se o usuário configurou uma chave de API no painel de
        // segurança. Se não houver token, aborta a chamada e informa ao
        // usuário como proceder.
        const token = (window.DualStore && DualStore.get()?.security?.token) || '';
        if(!token){
          const msg = 'Nenhuma chave de API configurada. Abra o painel de chaves (ícone de chave) para informar sua sk-...';
          conversation.push({ role:'assistant', content: msg });
          renderResponse(msg);
          return;
        }
        // Garante que a URL da API está definida. Caso contrário, aborta.
        if(!CONFIG.API_URL){
          const msg = 'URL da API não configurada. Defina CONFIG.API_URL antes de enviar mensagens.';
          conversation.push({ role:'assistant', content: msg });
          renderResponse(msg);
          return;
        }
        /*
         * Para evitar requisições lentas causadas pelo envio de um histórico de
         * conversa muito longo, cortamos a conversa antes de enviá‑la para a API.
         * Mantemos sempre a primeira mensagem do tipo system (que contém o
         * treinamento inicial) e apenas as últimas interações do usuário e
         * assistente. Isso reduz o tamanho do payload e melhora o tempo de
         * resposta sem perder o contexto imediato.
         */
        let messages;
        if (conversation.length > 8) {
          // mantém a mensagem de sistema original e as 6 últimas interações
          messages = [conversation[0], ...conversation.slice(-6)];
        } else {
          messages = conversation;
        }

        const res = await fetch(CONFIG.API_URL, {
          method: 'POST',
          headers: {
            // A chave de autorização será injetada dinamicamente pelo gerenciador de chaves (fetch wrapper)
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: CONFIG.MODEL,
            messages: messages,
            temperature: CONFIG.TEMP
          })
        });

        const payload = await res.json();
        if (!res.ok) throw new Error(payload.error?.message || res.statusText);
        if (!payload.choices?.length) throw new Error('Resposta vazia da API');
        const ans = payload.choices[0].message.content.trim();
        conversation.push({ role: 'assistant', content: ans });
        renderResponse(ans);

      } catch (err) {
        console.error('callAI erro:', err);
        const fallback = 'Desculpe, não consegui obter resposta. Tente novamente.';
        conversation.push({ role: 'assistant', content: fallback });
        renderResponse(fallback);
      }
    }
    function changePage(d){
      const np = currentPage + d;
      if(np<0||np>=pages.length) return;
      pages[currentPage].classList.remove('active');
      pages[np].classList.add('active');
      currentPage=np;
      $('#pageIndicator').textContent = `${np+1} / ${pages.length}`;
      if(autoAdvance) autoSpeakPage(np)
    }