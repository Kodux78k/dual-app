//openrouter.ai/api/v1/chat/completions',
            MODEL:            'deepseek/deepseek-chat-v3-0324:free',
            TEMP:             0.2,
            CHUNK_SIZE:       12000,
            AUTH_TOKEN:       window.env?.API_KEYS || 'Bearer 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'
          };

    let training='', chunks=[], chunkIndex=0;
    let trainingHistory='', conversation=[];
    let isEnabled=false, isStudying=false, isHistory=false;
    let userName='', assistantBase='';
    let pages=[], currentPage=0, autoAdvance=true;
    const titles = ['🎁 Recompensa Inicial','👁️ Exploração e Curiosidade','⚡️ Antecipação Vibracional'];

    const $ = s => document.querySelector(s),
          create = (t,c,h) => { const e=document.createElement(t); if(c)e.className=c; if(h)e.innerHTML=h; return e; };

    document.addEventListener('DOMContentLoaded', async ()=>{