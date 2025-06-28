function applyThemeSelector(val){
      const body = document.body;
      body.classList.remove('light','medium','vibe','dark','cyberpunk','anime');
      if(val !== 'dark') body.classList.add(val);
      localStorage.setItem('infodoseTheme', val);
    }
    

  (function(){
    const STORAGE_KEY   = 'infodoseEnabled',
          THEME_KEY     = 'infodoseTheme',
          HISTORY_KEY   = 'historyMode',
          CONFIG = {
            TRAINING_MAIN:    'data/manifesto_infinity_metalux.txt',
            TRAINING_HISTORY: 'data/codex/Protocolo_de_Equalização_KOBLLUX_A_Verdade_do_Uno.txt',
            API_URL:          'https: