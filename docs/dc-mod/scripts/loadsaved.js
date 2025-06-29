function loadSaved() {
    const saved = JSON.parse(localStorage.getItem("savedThemes") || "[]");
    savedGroup.innerHTML = "";
    saved.forEach(item => {
      const opt = document.createElement("option");
      opt.value = "saved:" + item.value;
      opt.textContent = "💾 " + item.name;
      savedGroup.appendChild(opt);
    });
  }
  