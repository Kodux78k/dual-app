function renderResponse(txt){
  const wrap = document.querySelector('.pages-wrapper');
  wrap.innerHTML = '';
  pages = []; currentPage = 0; autoAdvance = true;

  txt = txt
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>');

  const paras = splitText(txt),
        total = paras.length;
  if (total === 0) return;

  const maxPerPage = 3,
        numPages   = Math.ceil(total / maxPerPage),
        baseSize   = Math.floor(total / numPages),
        extra      = total % numPages;

  let cursor = 0;
  for(let i = 0; i < numPages; i++){
    const thisSize = baseSize + (i < extra ? 1 : 0),
          pg        = document.createElement('div');
    pg.className = 'page' + (i === 0 ? ' active' : '');

    for(let j = 0; j < thisSize; j++){
      const para = paras[cursor++].trim(),
            posClass = j === 0 ? 'intro' : (j === thisSize - 1 ? 'ending' : 'middle'),
            block = document.createElement('div');
      block.className = `response-block ${posClass}`;
      block.innerHTML = `<p>${para}</p>`;
      processDynamicCommands(block.querySelector('p'));
      attachBlockListeners(block, para);
      pg.appendChild(block);
    }

    wrap.appendChild(pg);
    pages.push(pg);
  }

  document.getElementById('pageIndicator').textContent = `1 / ${pages.length}`;
  autoSpeakPage(0);
}
