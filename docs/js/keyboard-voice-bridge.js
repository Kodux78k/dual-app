
/*! Keyboard↔Voice Bridge — auto-fala no envio */
(function(){
  function captureInputValue(){
    const el = document.querySelector('#userInput, #txt, .input-container input[type="text"], input[type="text"]');
    return el ? (el.value||"").trim() : "";
  }
  function onSendTriggered(){
    const txt = captureInputValue();
    if(!txt) return;
    setTimeout(()=>{
      if(window.DualTTS && typeof window.DualTTS.speak === 'function' && window.DualTTS.state.autoSpeak){
        window.DualTTS.speak(txt);
      }
    }, 80);
  }
  // Hook buttons
  function hook(){
    const btns = Array.from(document.querySelectorAll('#btnSend, #send, .input-container button[title="Enviar"], .input-container button'));
    btns.forEach(b=>{
      if(b.__kvHooked) return;
      b.__kvHooked = true;
      b.addEventListener('click', onSendTriggered, true);
      b.addEventListener('mousedown', ()=>setTimeout(onSendTriggered,0), true);
    });
    // Hook Enter key on inputs
    const inputs = Array.from(document.querySelectorAll('.input-container input[type="text"], input[type="text"]'));
    inputs.forEach(i=>{
      if(i.__kvHooked) return;
      i.__kvHooked = true;
      i.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ onSendTriggered(); } }, true);
    });
  }
  hook();
  // Observe dynamic changes
  const mo = new MutationObserver(hook);
  mo.observe(document.documentElement, { childList:true, subtree:true });
})();
