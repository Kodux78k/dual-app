// Prompt for name
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const name = prompt("Nome para salvar o tema:");
      if (name) {
        const list = JSON.parse(localStorage.getItem("savedThemes") || "[]");
        list.push({ value: current, name: name });
        localStorage.setItem("savedThemes", JSON.stringify(list));
        loadSaved();
      }