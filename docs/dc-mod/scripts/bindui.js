function bindUI(){
      $('#historyBtn').addEventListener('click',()=>{
        isHistory = !isHistory;
        localStorage.setItem(HISTORY_KEY, isHistory?'1':'0');
        startConversation();
      });
      $('#kittyBtn').addEventListener('click',()=>{
        isStudying = !isStudying;
        if(isStudying){
          conversation = [{ role:'system', content: (CONFIG?.SYSTEM_PROMPT || '') + training + '\n\nVocê é Assistente de Estudos dual.infodose.' }];
        } else {
          loadConfig();
        }
        updateUI();
      });
      $('#toggleBtn').addEventListener('click',()=>{
        if(!isEnabled) $('#loginBox').classList.add('active');
        else {
          isEnabled = false;
          localStorage.removeItem(STORAGE_KEY);
          conversation = [];
          updateUI();
        }
      });
      document.querySelector('.copy-button').addEventListener('click', ()=>{
        const allBlocks = document.querySelectorAll('.response-block');
        const textToCopy = Array.from(allBlocks).map(b => b.innerText).join('\n\n');
        navigator.clipboard.writeText(textToCopy);
      });
      document.querySelector('.paste-button').addEventListener('click',()=>{
        navigator.clipboard.readText().then(txt=>$('#userInput').value = txt);
      });
      $('#sendBtn').addEventListener('click', onSend);
      $('#userInput').addEventListener('keypress', e=>{ if(e.key==='Enter') onSend(); });
      $('#voiceBtn').addEventListener('click', ()=>{
        const rec = new (window.SpeechRecognition||window.webkitSpeechRecognition)();
        rec.lang='pt-BR'; rec.start();
        rec.onresult = evt=>{
          $('#userInput').value = evt.results[0][0].transcript;
          onSend();
        };
      });
      document.querySelector('.pagination').addEventListener('click', e=>{
        if(e.target.dataset.action==='prev') changePage(-1);
        if(e.target.dataset.action==='next') changePage(1);
        autoAdvance = false;
      });
      $('#loginForm').addEventListener('submit', e=>{
        e.preventDefault();
        const u = $('#userName').value.trim(), a = $('#assistantInput').value.trim();
        if(!u||!a) return alert('Preencha os dados');
        isEnabled = true; userName = u; assistantBase = a;
        localStorage.setItem(STORAGE_KEY,'1');
        localStorage.setItem('userName', u);
        localStorage.setItem('assistantBase', a);
        loadConfig();
        $('#loginBox').classList.remove('active');
      });
      document.body.addEventListener('click', e=>{
        if(e.target.closest('.footer-text')){
          document.querySelector('.pages-wrapper').classList.toggle('collapsed');
          e.target.closest('.footer-text').classList.toggle('active');
        }
      });
    }

    