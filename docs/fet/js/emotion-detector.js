// Emotion Detector JS
const emotions = {
    happy: {
        icon: '😄',
        color: '#ffff00',
        styles: ['bright', 'warm', 'vibrant'],
        desc: 'Cores quentes e animações fluidas detectadas!'
    },
    excited: {
        icon: '🤩',
        color: '#ff00ff',
        styles: ['flash', 'neon', 'pulse'],
        desc: 'Muitas animações e cores neon! Você está energizado!'
    },
    calm: {
        icon: '😌',
        color: '#00ffff',
        styles: ['cool', 'smooth', 'gradient'],
        desc: 'Cores frias e transições suaves. Paz interior detectada.'
    },
    angry: {
        icon: '😠',
        color: '#ff0000',
        styles: ['contrast', 'shake', 'bold'],
        desc: 'Cores contrastantes e animações agressivas. Hmm...'
    },
    sad: {
        icon: '😔',
        color: '#6666ff',
        styles: ['dark', 'fade', 'blur'],
        desc: 'Cores escuras e efeitos de desfoque detectados.'
    },
    neutral: {
        icon: '😐',
        color: '#0f0',
        styles: ['default', 'static', 'simple'],
        desc: 'Estilo padrão detectado. Emoções neutras.'
    }
};

function detectEmotion() {
    const styles = window.getComputedStyle(document.body);
    const bgColor = styles.backgroundColor;
    const textColor = styles.color;

    let detectedEmotion = 'neutral';
    let intensity = 0.5;

    if (bgColor.includes('rgb(26, 26, 0)') || textColor.includes('rgb(255, 255, 0)')) {
        detectedEmotion = 'happy';
        intensity = 0.8;
    } else if (bgColor.includes('rgb(26, 0, 26)') || textColor.includes('rgb(255, 0, 255)')) {
        detectedEmotion = 'excited';
        intensity = 0.9;
    } else if (bgColor.includes('rgb(0, 26, 26)') || textColor.includes('rgb(0, 255, 255)')) {
        detectedEmotion = 'calm';
        intensity = 0.6;
    } else if (bgColor.includes('rgb(26, 0, 0)') || textColor.includes('rgb(255, 0, 0)')) {
        detectedEmotion = 'angry';
        intensity = 0.7;
    } else if (bgColor.includes('rgb(0, 0, 51)') || textColor.includes('rgb(102, 102, 255)')) {
        detectedEmotion = 'sad';
        intensity = 0.5;
    }

    updateEmotionDisplay(detectedEmotion, intensity);
}

function simulateRandom() {
    const keys = Object.keys(emotions);
    const em = keys[Math.floor(Math.random() * keys.length)];
    const intensity = Math.random().toFixed(1);
    updateEmotionDisplay(em, intensity);
}

function updateEmotionDisplay(emotion, intensity) {
    const data = emotions[emotion];
    document.getElementById('emotion-icon').textContent = data.icon;
    document.getElementById('emotion-name').textContent = emotion.toUpperCase();
    document.getElementById('intensity-level').textContent = (intensity*100).toFixed(0) + '%';
    document.getElementById('css-type').textContent = data.styles[0].toUpperCase();
    document.getElementById('emotion-analysis').innerHTML = 
        `> EMOÇÃO PRIMÁRIA: ${emotion.toUpperCase()}<br>` +
        `> CARACTERÍSTICAS CSS: ${data.styles.join(', ')}<br>` +
        `> ANÁLISE: ${data.desc}`;
    const scanner = document.getElementById('scanner');
    scanner.className = 'emotion-scanner';
    scanner.classList.add(`${emotion}-style`);
    document.documentElement.style.setProperty('--color-intensity', intensity);
    scanner.style.opacity = intensity;
}

window.onload = () => setTimeout(detectEmotion, 1500);
