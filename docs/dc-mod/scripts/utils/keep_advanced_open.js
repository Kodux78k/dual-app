// keep advanced open
      sel.value = current;
    } else if (val.startsWith("saved:")) {
      const key = val.split(":")[1];
      const list = JSON.parse(localStorage.getItem("savedThemes") || "[]");
      const item = list.find(i => i.name === key);
      if (item) applyBasicTheme(item.value);
      adv.style.display = "none";
      savedGroup.style.display = "none";
      sel.value = item.value;
    } else {
      applyBasicTheme(val);
      adv.style.display = "none";
      savedGroup.style.display = "none";
    }
  });
});


  document.getElementById('themeSelector').addEventListener('change', function () {
    document.documentElement.setAttribute('data-theme', this.value);