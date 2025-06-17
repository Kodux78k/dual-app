import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env.js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const storedEmailKey = 'infodose_user'
const storedIFTKey   = 'ift_tokens'

export async function verificaIFT(minimo = 1000) {
  const tokens = parseInt(localStorage.getItem(storedIFTKey)) || 0
  if (tokens < minimo) {
    exibirAlertaIFT(tokens)
    return false
  }
  return true
}

function exibirAlertaIFT(qtd) {
  const msg = document.createElement('div')
  msg.textContent = `⚠️ Apenas ${qtd} IFT disponíveis. Recarregue o fluxo em breve!`
  msg.style = `
    position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
    background:#200022; color:#fff; padding:1rem 1.4rem;
    border:2px solid #f0f; border-radius:20px; z-index:999;
    font-family: 'Montserrat', sans-serif; font-weight:600;
    animation: glowMsg 1s ease-in-out infinite alternate;
  `
  document.body.appendChild(msg)
  setTimeout(() => msg.remove(), 8000)
}

export async function gastaIFT(qtd = 1) {
  const email = localStorage.getItem(storedEmailKey)
  let atual = parseInt(localStorage.getItem(storedIFTKey)) || 0
  if (!email || atual < qtd) {
    exibirAlertaIFT(atual)
    return false
  }

  const novo = atual - qtd
  localStorage.setItem(storedIFTKey, novo)

  const { error } = await supabase
    .from('usuarios')
    .update({ ift_tokens: novo })
    .eq('email', email)

  if (error) {
    console.error('Erro ao atualizar IFT:', error)
    return false
  }

  if (novo < 1000) exibirAlertaIFT(novo)
  return true
}

export function mostrarIFTVisual() {
  const el = document.getElementById('loggedUsername')
  if (!el) return
  const nome = localStorage.getItem(storedEmailKey)
  const tokens = localStorage.getItem(storedIFTKey)
  el.innerHTML = `${nome}<br><span style="font-size:0.8em;opacity:0.7">IFT: ${tokens}</span>`
}