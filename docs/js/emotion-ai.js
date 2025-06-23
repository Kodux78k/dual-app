// emotion-ai.js
import { unlockFET } from './fet-loader.js';
export function initEmotionAI() {
  const btns = document.querySelectorAll('.mode-btn');
  btns.forEach(b=>{
    b.addEventListener('click',()=>{
      unlockFET('emotion-ai');
    });
  });
  if (window.Worker) {
    const worker = new Worker('fet/js/ai-worker.js');
    document.getElementById('train-ai-btn').onclick = ()=>{
      worker.postMessage({train:true});
    };
  }
}
