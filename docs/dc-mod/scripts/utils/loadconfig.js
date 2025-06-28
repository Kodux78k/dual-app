function loadConfig(){
      if(localStorage.getItem(STORAGE_KEY)==='1'){
        isEnabled=true;
        userName=localStorage.getItem('userName')||'';
        assistantBase=localStorage.getItem('assistantBase')||'';
        conversation=[{
          role:'system',
          content:(chunks[0]||training)
            + `\n\nUsuário: ${userName}.\nAssistente: ${assistantBase} dual.infodose.`
        }];
        chunkIndex=1;
        updateUI();
      }
      if(localStorage.getItem(HISTORY_KEY)==='1'){ isHistory=true; updateUI(); }
    }

    