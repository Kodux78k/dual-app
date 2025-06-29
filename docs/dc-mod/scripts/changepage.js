function changePage(d){
      const np = currentPage + d;
      if(np<0||np>=pages.length) return;
      pages[currentPage].classList.remove('active');
      pages[np].classList.add('active');
      currentPage=np;
      $('#pageIndicator').textContent = `${np+1} / ${pages.length}`;
      if(autoAdvance) autoSpeakPage(np);
    }

    async 