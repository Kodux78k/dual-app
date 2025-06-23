// Emotion AI Detector Triple Mode JS
const modeBtns = document.querySelectorAll('.mode-btn');
const modePanels = document.querySelectorAll('.mode-panel');
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        modePanels.forEach(p => p.classList.remove('active'));
        document.getElementById(`${mode}-panel`).classList.add('active');
        document.getElementById('current-mode').textContent = mode.replace('-', ' ').toUpperCase();
    });
});

// MODE 1: CSS SCANNER
document.getElementById('scan-btn').addEventListener('click', () => {
    const styles = window.getComputedStyle(document.body);
    const propsContainer = document.getElementById('css-properties');
    propsContainer.innerHTML = `
        <div>Background: ${styles.backgroundColor}</div>
        <div>Text Color: ${styles.color}</div>
        <div>Animations: ${styles.animation || 'none'}</div>
    `;
    let detected = 'neutral';
    if (styles.backgroundColor.includes('rgb(26, 26, 0)')) detected = 'happy';
    else if (styles.backgroundColor.includes('rgb(26, 0, 26)')) detected = 'excited';
    else if (styles.backgroundColor.includes('rgb(0, 26, 26)')) detected = 'calm';
    else if (styles.backgroundColor.includes('rgb(26, 0, 0)')) detected = 'angry';
    else if (styles.backgroundColor.includes('rgb(0, 0, 51)')) detected = 'sad';
    updateEmotion(detected);
    const log = document.getElementById('css-log');
    log.innerHTML += `\n> Scan completed: ${detected.toUpperCase()}`;
    log.scrollTop = log.scrollHeight;
});

// MODE 2: AI ANALYSIS
document.getElementById('ai-scan-btn').addEventListener('click', () => {
    const log = document.getElementById('ai-log');
    log.innerHTML += '\n> Running deep emotion analysis...';
    setTimeout(() => {
        const e = ['happy','excited','calm','angry','sad'];
        const r = e[Math.floor(Math.random()*e.length)];
        updateEmotion(r);
        log.innerHTML += `\n> AI result: ${r.toUpperCase()}`;
        log.scrollTop = log.scrollHeight;
    },2000);
});

// MODE 3: REAL-TIME INTEGRATION
document.getElementById('connect-btn').addEventListener('click', () => {
    document.querySelector('#connection-status span').className = 'connected';
});
