/* dual-render.js :: UNO=verdade (render consistente) */
(function(){
  const ASCII_RE = /[╔╦╚╝═│┌┐└┘█▄▀◉■□◆◇▲△▶▷▼▽◀◁─┼┤├┴┬╭╮╯╰]/;
  const TARGET_SEL = '#response, .response, [data-response], #output, .messages, .chat-output';

  function toPre(el, text){
    const pre = document.createElement('pre');
    pre.className = 'dual-pre';
    pre.textContent = text;
    el.innerHTML = '';
    el.appendChild(pre);
    return pre;
  }
  function ensurePre(node){
    if (!node) return null;
    if (node.tagName === 'PRE') return node;
    const pre = document.createElement('pre');
    pre.className = 'dual-pre';
    pre.textContent = node.textContent || '';
    node.replaceWith(pre);
    return pre;
  }

  // Public API
  window.DualRender = window.DualRender || {};
  // Força ASCII
  window.DualRender.renderASCII = function(container, text){
    const pre = ensurePre(container);
    pre.textContent = text;
  };
  // Decide automático
  window.DualRender.renderSmart = function(container, text){
    if (ASCII_RE.test(text)) return window.DualRender.renderASCII(container, text);
    container.innerHTML = text;
  };

  // Mutation Observer para containers de resposta
  function inspect(el){
    if (!el) return;
    const text = el.textContent || '';
    if (ASCII_RE.test(text) && el.tagName !== 'PRE'){
      toPre(el, text);
    }
  }
  function observeTargets(){
    document.querySelectorAll(TARGET_SEL).forEach(target => {
      if (target.__asciiObserved) return;
      target.__asciiObserved = true;
      const mo = new MutationObserver(muts => {
        for (const m of muts){
          if (m.type === 'childList'){
            m.addedNodes && m.addedNodes.forEach(n => {
              if (n.nodeType === 1) inspect(n);
              else if (n.nodeType === 3) inspect(m.target);
            });
          }
        }
      });
      mo.observe(target, { childList:true, subtree:true });
    });
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', observeTargets, { once:true });
  } else { observeTargets(); }

  // Patch escopo local de insertAdjacentHTML
  const origInsert = Element.prototype.insertAdjacentHTML;
  Element.prototype.insertAdjacentHTML = function(position, html){
    try{
      if (this.matches && this.matches(TARGET_SEL) && ASCII_RE.test(html)){
        const pre = document.createElement('pre');
        pre.className = 'dual-pre';
        pre.textContent = html;
        if (position === 'beforeend'){ this.appendChild(pre); return; }
        if (position === 'afterbegin'){ this.insertBefore(pre, this.firstChild); return; }
      }
    }catch(e){/* ignore */}
    return origInsert.call(this, position, html);
  };

  // CSS base
  const css = `
.dual-pre{ white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Roboto Mono", monospace; line-height:1.35; overflow:auto }
`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
})();