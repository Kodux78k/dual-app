/* DualApp+ v2.1 — unificação total do LocalStorage para páginas Infodose/Dual
   Canon: localStorage["dualapp.settings"]
   Espelho compat: infodoseEnabled ('1'|'0'), infodoseTheme, userName, assistantBase
   Inputs auto-bind (se existirem): 
     #archetype, #assistant, #theme, #style, #density, #accent,
     #userName, #assistantInput, #skInput, #roleSystemInput, #modelSelector, #bgUrl
   Flags: <body data-company> (ativação)
   Preferências: ui.theme, ui.bgImage (cover/center/fixed), tipografia/estilo/densidade
   Segurança: injeta Authorization em chamadas OpenRouter se security.token presente
   API: window.DualStore.get(), set(partial), onChange(fn), save()
*/
(function(){
  const KEY="dualapp.settings";
  const LEGACY = { enable:"infodoseEnabled", theme:"infodoseTheme", user:"userName", asst:"assistantBase" };
  const LS = window.localStorage;

  function jget(k){ try{ const v=LS.getItem(k); return v?JSON.parse(v):null; }catch(_){ return null; } }
  function jset(k,v){ try{ LS.setItem(k, JSON.stringify(v)); }catch(_){ } }
  function deep(a,b){
    const o={...(a||{})};
    for(const k in (b||{})){
      const v=b[k];
      o[k] = (v && typeof v==="object" && !Array.isArray(v)) ? deep(o[k]||{}, v) : v;
    }
    return o;
  }

  // base
  let base = jget(KEY) || {};
  base.ui = base.ui || {};
  base.arch = base.arch || {};
  base.security = base.security || {};
  base.training = base.training || {};
  base.activation = base.activation || {};
  jset(KEY, base);

  // migrate legacy → canon
  (function migrate(){
    const patch = {};
    const en = LS.getItem(LEGACY.enable);
    if(en!=null) patch.activation = { enabled: en==="1" };
    const th = LS.getItem(LEGACY.theme);
    if(th) patch.ui = deep(patch.ui,{ theme: th });
    const un = LS.getItem(LEGACY.user);
    if(un) patch.user = { name: un };
    const ab = LS.getItem(LEGACY.asst);
    if(ab) patch.arch = deep(patch.arch, { assistant: ab });
    if(Object.keys(patch).length) jset(KEY, deep(jget(KEY)||{}, patch));
  })();

  const listeners = new Set();
  function emit(v){ listeners.forEach(fn=>{ try{ fn(v); }catch(_){ } }); }

  const DualStore = {
    get(){ return jget(KEY) || {}; },
    set(partial){
      const merged = deep(jget(KEY)||{}, partial||{});
      jset(KEY, merged);
      // mirror to legacy
      try{
        if(merged.activation?.enabled != null){
          LS.setItem(LEGACY.enable, merged.activation.enabled ? "1" : "0");
        }
        if(merged.ui?.theme){ LS.setItem(LEGACY.theme, merged.ui.theme); }
        if(merged.user?.name){ LS.setItem(LEGACY.user, merged.user.name); }
        if(merged.arch?.assistant){ LS.setItem(LEGACY.asst, merged.arch.assistant); }
      }catch(_){}
      emit(merged);
    },
    save(){ emit(jget(KEY)||{}); },
    onChange(fn){ listeners.add(fn); return ()=>listeners.delete(fn); }
  };
  window.DualStore = DualStore;

  // helpers
  function bindValue(id, path){
    const el = document.getElementById(id);
    if(!el) return;
    const getPath = (obj, p)=> p.split('.').reduce((a,k)=> (a && a[k]!=null)?a[k]:null, obj);
    const setPath = (p, v)=> p.split('.').reverse().reduce((acc,k,i,arr)=> i?{[arr[arr.length-1-i]]:acc}:{[k]:v}, {});
    const store = DualStore.get();
    const val = getPath(store, path);
    if(val!=null){
      el.value = val;
      el.dispatchEvent(new Event('change', {bubbles:true}));
    } else {
      // seed store with initial UI value
      DualStore.set(setPath(path, el.value));
    }
    const h = ()=> DualStore.set(setPath(path, el.value));
    el.addEventListener("change", h);
    if(el.tagName==="INPUT") el.addEventListener("input", h);
  }

  function applyUI(s){
    const theme = s?.ui?.theme || LS.getItem(LEGACY.theme) || "dark";
    try{
      // remove known theme markers (light/medium/vibe/classic)
      document.body.classList.remove("light","medium","vibe","dark");
      // some UIs usam body.className 'theme-xxx'; se existir, mantenha.
      if(!/theme-/.test(document.body.className)){
        document.body.classList.add(theme);
      }
      LS.setItem(LEGACY.theme, theme);
    }catch(_){}
    if(s?.ui?.bgImage){
      document.body.style.backgroundImage = `url('${s.ui.bgImage}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundAttachment = "fixed";
    }
    // refletir ativação
    try{
      if(s?.activation?.enabled!=null){
        document.body.dataset.company = s.activation.enabled ? "on":"off";
      }
    }catch(_){}
  }

  function watchBodyCompany(){
    try{
      const obs = new MutationObserver((muts)=>{
        muts.forEach(m=>{
          if(m.type==="attributes" && m.attributeName==="data-company"){
            DualStore.set({ activation:{ enabled: document.body.dataset.company==="on" } });
          }
        });
      });
      obs.observe(document.body, { attributes:true });
    }catch(_){}
  }

  function wire(){
    // common binds
    bindValue("archetype", "arch.type");
    bindValue("assistant", "arch.assistant");
    bindValue("theme", "ui.theme");
    bindValue("style", "ui.style");
    bindValue("density", "ui.density");
    bindValue("accent", "ui.accent");
    // extended binds
    bindValue("userName", "user.name");
    bindValue("assistantInput", "arch.assistant");
    bindValue("skInput", "security.token");
    bindValue("roleSystemInput", "training.roleSystem");
    bindValue("modelSelector", "training.model");
    bindValue("bgUrl", "ui.bgImage");
    // activation flag
    if(document.body?.dataset?.company){
      DualStore.set({ activation:{ enabled: document.body.dataset.company==="on" } });
    }
    applyUI(DualStore.get());
    watchBodyCompany();
  }

  // fetch wrapper p/ OpenRouter
  (function patchFetch(){
    const _fetch = window.fetch;
    window.fetch = function(input, init){
      try{
        const s = DualStore.get();
        const token = s?.security?.token;
        const url = (typeof input==="string") ? input : (input?.url||"");
        const isOR = /openrouter\.ai\/api\/v1\/chat\/completions/.test(url);
        if(token && isOR){
          init = init || {};
          const h = new Headers(init.headers || {});
          if(!h.has("Authorization")) h.set("Authorization", `Bearer ${token}`);
          init.headers = h;
        }
      }catch(_){}
      return _fetch(input, init);
    };
  })();

  DualStore.onChange(applyUI);

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", wire);
  }else{
    wire();
  }
})();