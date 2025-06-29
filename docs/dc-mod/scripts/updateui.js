function updateUI(){
      $('#toggleBtn').classList.toggle('active',isEnabled);
      $('#kittyBtn').classList.toggle('active',isStudying);
      $('#historyBtn').classList.toggle('active',isHistory);
      $('#assistantName').textContent = isHistory
        ? 'CODEX: dual.infodose'
        : (isStudying ? 'Estudos dual.infodose' : (isEnabled ? assistantBase+' dual.infodose':''));  
      const cont=$('#logoContainer'), logo=$('#logoObj');
      cont.classList.add('fading');
      setTimeout(()=>{
        if(isHistory)       logo.data='assets/icons/pill_fusion-kblx-trinity3.png';
        else if(isStudying) logo.data='assets/icons/DualKittyKard-icon-3.png';
        else                 logo.data='assets/icons/pill_fusion-kblx-1.png';
        cont.classList.remove('fading');
      },999);
    }

    