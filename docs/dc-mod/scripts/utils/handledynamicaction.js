function handleDynamicAction(payload) {
      switch (payload.action) {
        case 'copy':
          navigator.clipboard.writeText(payload.data);
          break;
        case 'alert':
          alert(payload.message);
          break;
        case 'saveDesign':
          localStorage.setItem('designState', JSON.stringify(payload.state));
          break;
      }
    }

    