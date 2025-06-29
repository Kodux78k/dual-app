// Layer extra para Matrix
    const existing = document.querySelector('.pulse-energy');
    if (this.value === 'matrix' && !existing) {
      const pulse = document.createElement('div');
      pulse.className = 'pulse-energy';
      document.body.appendChild(pulse);
    } else if (this.value !== 'matrix' && existing) {
      existing.remove();
    }
  });

  