function typeWriter() {
    if (i < txt.length) {
      el.textContent += txt.charAt(i);
      i++;
      setTimeout(typeWriter, 42);
    } else {
      el.classList.add("pulse");
    }
  }
  typeWriter();
});


async 