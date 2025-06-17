import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env.js'
import { mostrarIFTVisual } from './tokens.js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const storedEmailKey = 'infodose_user'
const storedIFTKey   = 'ift_tokens'

const loginBox = document.getElementById('loginBox')
const userInput = document.getElementById('user')
const passInput = document.getElementById('pass')
const submitBtn = document.getElementById('submitBtn')
const messageBox = document.getElementById('messageBox')
const logoutArea = document.querySelector('.logout-area')
const logoutBtn = document.getElementById('logoutBtn')
const loggedUser = document.getElementById('loggedUsername')

function showLoginUI() {
  loginBox.classList.add('active')
  userInput.style.display  = ''
  passInput.style.display  = ''
  submitBtn.style.display  = ''
  logoutArea.style.display = 'none'
  messageBox.style.display = 'none'
}

function showLogoutUI(user) {
  loginBox.classList.add('active')
  userInput.style.display  = 'none'
  passInput.style.display  = 'none'
  submitBtn.style.display  = 'none'
  logoutArea.style.display = 'block'
  loggedUser.textContent   = user ? `${user}` : ''
  messageBox.style.display = 'none'
  mostrarIFTVisual()
}

async function goToMenu() {
  const audio = new Audio('assets/sounds/suave_portal.mp3')
  audio.volume = 1
  await audio.play().catch(() => {})
  setTimeout(() => window.location.href = 'menu.html', 1399)
}

async function login() {
  const email = userInput.value.trim()
  const password = passInput.value.trim()
  if (!email || !password) {
    messageBox.textContent = 'Preencha email e senha.'
    messageBox.style.display = 'block'
    return
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    messageBox.textContent = 'Erro ao entrar. Verifique seus dados.'
    messageBox.style.display = 'block'
    return
  }

  const { data: userData, error: fetchError } = await supabase
    .from('usuarios')
    .select('ift_tokens')
    .eq('email', email)
    .single()

  if (fetchError || !userData) {
    messageBox.textContent = 'Usuário sem tokens registrados.'
    messageBox.style.display = 'block'
    return
  }

  localStorage.setItem(storedEmailKey, email)
  localStorage.setItem(storedIFTKey, userData.ift_tokens)
  mostrarIFTVisual()
  await goToMenu()
}

submitBtn.addEventListener('click', login)
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem(storedEmailKey)
  localStorage.removeItem(storedIFTKey)
  showLoginUI()
})

window.addEventListener('load', () => {
  const stored = localStorage.getItem(storedEmailKey)
  stored ? showLogoutUI(stored) : showLoginUI()
})