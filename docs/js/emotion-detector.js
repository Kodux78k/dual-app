// emotion-detector.js
import { unlockFET } from './fet-loader.js';
export function initEmotionDetector() {
  const btn = document.querySelector('[data-fet-mode="emotion-detector"]');
  btn.addEventListener('click', () => {
    unlockFET('emotion-detector');
    let score = {happy:0,excited:0,calm:0,angry:0,sad:0};
    document.styleSheets.forEach(sheet => {
      try {
        [...sheet.cssRules].forEach(rule => {
          if (rule.cssText.includes('animation')) score.excited++;
          if (rule.cssText.includes('color: #ffff00')) score.happy++;
          // outras heurísticas...
        });
      } catch {}
    });
    const primary = Object.keys(score).reduce((a,b)=> score[a]>score[b]?a:b);
    updateEmotionDisplay(primary, score[primary]/10);
  });
}
