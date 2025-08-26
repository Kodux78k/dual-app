/* Dual Splash Integration — Route Patch (robust)
   initSplashRoute({ mountId:'app', defaultRoute:'#/chat', splashPath:'splash_dual_infodose.html', indexPath:'index.html', asModal:true })
*/
export function initSplashRoute(opts = {}){
  const cfg = Object.assign({
    splashPath: 'splash_dual_infodose.html',
    indexPath: 'index.html',
    storageKey: 'dual.splash.dismissed',
    defaultRoute: '#/chat',
    mountId: 'app',
    useHash: true,
    asModal: true,
  }, opts);

  const $ = (sel, root=document)=> root.querySelector(sel);
  const mount = document.getElementById(cfg.mountId) || document.body;

  function renderSplashIframe(){
    (function(__el,__val){try{if(window.DualRender){if(typeof __val==='string' && (/[╔╦╚╝═│┌┐└┘█▄▀◉`]/.test(__val))){return DualRender.renderASCII(__el,__val);}else{return (DualRender.renderSmart?DualRender.renderSmart(__el,__val):(__el.innerHTML=__val));}}}catch(__e){}__el.innerHTML=__val;})(mount, `
      <div class="dual-splash-frame">
        <iframe src="${cfg.splashPath}" title="Dual Splash" frameborder="0" class="dual-splash-iframe"></iframe>
        <div class="dual-splash-toolbar">
          <button id="dualEnterBtn" class="dual-btn">Entrar no Templo</button>
          <label class="dual-check"><input type="checkbox" id="dualSkip"> não mostrar novamente</label>
        </div>
      </div>`);
    $('#dualEnterBtn').addEventListener('click', ()=>{
      const skip = $('#dualSkip').checked;
      if (skip) localStorage.setItem(cfg.storageKey, '1');
      navigate(cfg.defaultRoute);
    });
  }

  function renderIndexIframe(){
    (function(__el,__val){try{if(window.DualRender){if(typeof __val==='string' && (/[╔╦╚╝═│┌┐└┘█▄▀◉`]/.test(__val))){return DualRender.renderASCII(__el,__val);}else{return (DualRender.renderSmart?DualRender.renderSmart(__el,__val):(__el.innerHTML=__val));}}}catch(__e){}__el.innerHTML=__val;})(mount, `
      <div class="dual-index-frame">
        <iframe src="${cfg.indexPath}" title="Dual Index" frameborder="0" class="dual-index-iframe"></iframe>
      </div>`);
  }

  function navigate(hash){
    if (cfg.useHash && location.hash !== hash) location.hash = hash;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function route(){
    const h = location.hash || '#/splash';
    if (h.startsWith('#/splash')) return renderSplashIframe();
    if (h.startsWith('#/index'))  return renderIndexIframe();
    // leave other routes to your app (ex: #/chat)
  }

  if (!localStorage.getItem(cfg.storageKey)) {
    if (!location.hash || location.hash === '#/' || location.hash === '#/chat') {
      location.hash = '#/splash';
    }
  }

  window.addEventListener('hashchange', route);
  route();

  if (cfg.asModal){
    window.DualSplash = {
      open(){
        const modal = document.createElement('div');
        modal.className = 'dual-splash-modal';
        (function(__el,__val){try{if(window.DualRender){if(typeof __val==='string' && (/[╔╦╚╝═│┌┐└┘█▄▀◉`]/.test(__val))){return DualRender.renderASCII(__el,__val);}else{return (DualRender.renderSmart?DualRender.renderSmart(__el,__val):(__el.innerHTML=__val));}}}catch(__e){}__el.innerHTML=__val;})(modal, `
          <div class="dual-splash-modal__backdrop"></div>
          <div class="dual-splash-modal__panel">
            <button class="dual-splash-modal__close" aria-label="Fechar">×</button>
            <iframe src="${cfg.splashPath}" class="dual-splash-modal__iframe" title="Dual Splash"></iframe>
            <div class="dual-splash-modal__footer">
              <button id="dualEnterBtnModal" class="dual-btn">Entrar no Templo</button>
              <label class="dual-check"><input type="checkbox" id="dualSkipModal"> não mostrar novamente</label>
            </div>
          </div>`);
        document.body.appendChild(modal);
        modal.querySelector('.dual-splash-modal__close').onclick = ()=> modal.remove();
        modal.querySelector('.dual-splash-modal__backdrop').onclick = ()=> modal.remove();
        modal.querySelector('#dualEnterBtnModal').onclick = ()=>{
          if (modal.querySelector('#dualSkipModal').checked) localStorage.setItem(cfg.storageKey, '1');
          modal.remove();
          navigate(cfg.defaultRoute);
        };
      }
    };
  }

  const css = `
.dual-splash-frame, .dual-index-frame{position:relative; height:100vh; width:100%; background:#0b0b10}
.dual-splash-iframe, .dual-index-iframe{position:absolute; inset:0; width:100%; height:100%}
.dual-splash-toolbar{
  position:absolute; left:50%; bottom:18px; transform:translateX(-50%);
  display:flex; gap:12px; align-items:center; background:rgba(0,0,0,.35);
  border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:8px 12px; backdrop-filter: blur(6px);
}
.dual-btn{
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.25));
  color:#d4af37; border:1px solid rgba(255,255,255,.12); padding:8px 12px; border-radius:10px; font-weight:700; cursor:pointer;
}
.dual-check{color:#c9b37a; font-size:13px; user-select:none}
.dual-splash-modal{position:fixed; inset:0; z-index:99999}
.dual-splash-modal__backdrop{position:absolute; inset:0; background:rgba(0,0,0,.6); backdrop-filter: blur(2px)}
.dual-splash-modal__panel{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  width:min(980px, 96vw); height:min(640px, 86vh); border-radius:16px; overflow:hidden;
  border:1px solid rgba(255,255,255,.12); box-shadow: 0 10px 60px rgba(0,0,0,.5);
}
.dual-splash-modal__iframe{width:100%; height:100%; display:block; background:#0b0b10}
.dual-splash-modal__footer{
  position:absolute; inset:auto 0 0 0; display:flex; justify-content:center; gap:12px; padding:10px;
  background:linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.6));
}
.dual-splash-modal__close{
  position:absolute; right:10px; top:10px; width:32px; height:32px; border-radius:50%;
  border:1px solid rgba(255,255,255,.12); color:#d4af37; background:rgba(0,0,0,.3); cursor:pointer; font-size:18px; line-height:28px;
}`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
}
