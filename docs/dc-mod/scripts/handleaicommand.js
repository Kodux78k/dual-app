function handleAICommand(cmd) {
      switch(cmd.action) {
        case 'updateTheme':
          applyDynamicCSS(cmd.payload.cssVariable, cmd.payload.value);
          conversation.push({ role:'system', content:'Theme updated via AI command.' });
          break;
        case 'createButton':
          createPersistentButton(
            cmd.payload.id,
            cmd.payload.label,
            () => fetch(cmd.payload.onClickFetch.url, { method: cmd.payload.onClickFetch.method||'GET' })
                     .then(res => res.json())
                     .then(data => console.log(data))
          );
          conversation.push({ role:'system', content:'Button "'+cmd.payload.label+'" created via AI command.' });
          break;
        default:
          console.warn('Unknown AI action:', cmd.action);
      }
    }
    window.handleAICommand = handleAICommand;
      particlesJS('particles-js',{
        particles:{ number:{value:40}, color:{value:['#0ff','#f0f']},
          shape:{type:'circle'}, opacity:{value:0.4}, size:{value:2.4},
          move:{enable:true,speed:1.5}
        }, retina_detect:true
      });
      try {
        training = await fetch(CONFIG.TRAINING_MAIN).then(r=>r.text());
        for(let i=0;i<training.length;i+=CONFIG.CHUNK_SIZE) chunks.push(training.slice(i,i+CONFIG.CHUNK_SIZE));
      } catch(e){ console.error('Erro no treino:',e); }
      try { trainingHistory = await fetch(CONFIG.TRAINING_HISTORY).then(r=>r.text()); }
      catch(e){ console.error(e); }
      init();
    });

    