
/*! KOBLLUX Symbols – DOM Transliterator v0 (offline) */
(function(){
  var MAP = {"A": "⟊", "B": "⌁", "C": "⋔", "D": "⊏", "E": "∷", "F": "∺", "G": "◔", "H": "⫴", "I": "⎯", "J": "،", "K": "⌯", "L": "◢", "M": "◱", "N": "⟍", "O": "◯", "P": "⊓", "Q": "⊘", "R": "◭", "S": "Ϟ", "T": "״", "U": "︶", "V": "ˇ", "W": "᷾", "X": "≛", "Y": "┼", "Z": "﹨"};
  var ENABLED = true;
  var SELECTOR = '.kobllux-text';
  var ATTR_ORIG = 'data-kobllux-orig';

  function translit(str){ 
    if(!str) return str;
    var out = '';
    for (var i=0;i<str.length;i++) { 
      var ch = str[i];
      var up = ch.toUpperCase();
      if (MAP[up]) out += MAP[up];
      else out += ch;
    }
    return out;
  }

  function shouldSkip(node){
    if (!node) return true;
    var tag = (node.tagName||'').toLowerCase();
    return tag==='input'||tag==='textarea'||tag==='script'||tag==='style';
  }

  function transformElement(el){
    if (!ENABLED||!el||shouldSkip(el)) return;
    if (!el.hasAttribute(ATTR_ORIG)) {
      var orig = el.textContent;
      el.setAttribute(ATTR_ORIG, orig);
      el.textContent = translit(orig);
    }
  }

  function restoreElement(el){
    if (!el||!el.hasAttribute(ATTR_ORIG)) return;
    el.textContent = el.getAttribute(ATTR_ORIG);
    el.removeAttribute(ATTR_ORIG);
  }

  function processAll(root){
    var scope = root||document;
    var nodes = scope.querySelectorAll(SELECTOR);
    nodes.forEach(transformElement);
  }

  var mo = new MutationObserver(function(muts){
    if(!ENABLED) return;
    for (var i=0;i<muts.length;i++){
      var m = muts[i];
      if (m.type==='childList'){
        m.addedNodes && m.addedNodes.forEach(function(n){
          if (n.nodeType===1){
            if (n.matches && n.matches(SELECTOR)) transformElement(n);
            var inner = n.querySelectorAll ? n.querySelectorAll(SELECTOR) : [];
            inner && inner.forEach(transformElement);
          }
        });
      } else if (m.type==='characterData'){
        var p = m.target && m.target.parentElement;
        if (p && p.matches && p.matches(SELECTOR)) {
          p.setAttribute(ATTR_ORIG, p.textContent);
          p.textContent = translit(p.textContent);
        }
      }
    }
  });

  function enable(){
    ENABLED = true;
    processAll(document);
    try{ mo.observe(document.body, {subtree:true, childList:true, characterData:true}); }catch(e){}
  }

  function disable(){
    ENABLED = false;
    try{ mo.disconnect(); }catch(e){}
    document.querySelectorAll(SELECTOR).forEach(restoreElement);
  }

  window.KoblluxSymbols = { enable: enable, disable: disable, translit: translit, processAll: processAll, set selector(v){SELECTOR=v;} };

  var css = document.createElement('style');
  css.textContent = '.kobllux-text{letter-spacing:.08em}';
  document.head.appendChild(css);

  if (document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', enable); 
  } else { enable(); }

  ['renderResponse','renderResponseBlocks'].forEach(function(fn){
    if (typeof window[fn] === 'function'){
      var orig = window[fn];
      window[fn] = function(){
        var res = orig.apply(this, arguments);
        try { setTimeout(function(){ window.KoblluxSymbols.processAll(document); }, 0); } catch(e){}
        return res;
      };
    }
  });
})();
