<script setup>
import { nextTick, ref, watch } from 'vue'
import { store } from '../store'

const isOpen = ref(false)
const inputMessage = ref('')
const chatMessages = ref([
  {
    id: 1,
    sender: 'bot',
    textFr: "Bonjour ! Je suis l'assistant de support de **Les Jeunes Techniciens**.",
    textEn: "Hello! I am the support assistant for **Les Jeunes Techniciens**.",
    time: getCurrentTime()
  },
  {
    id: 2,
    sender: 'bot',
    textFr: "Comment puis-je vous aider aujourd'hui ? Choisissez un domaine ci-dessous ou décrivez votre problème.",
    textEn: "How can I help you today? Choose a domain below or describe your problem.",
    time: getCurrentTime(),
    showSuggestions: true
  }
])

const chatContainer = ref(null)

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

async function scrollToBottom() {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

function formatMessage(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

function handleSuggestion(domainFr, domainEn) {
  addUserMessage(domainFr, domainEn)
  
  setTimeout(() => {
    addBotResponse(domainFr, domainEn)
  }, 600)
}

function handleSend() {
  const text = inputMessage.value.trim()
  if (!text) return

  addUserMessage(text, text)
  inputMessage.value = ''
  
  setTimeout(() => {
    addBotResponse(text, text)
  }, 800)
}

function addUserMessage(textFr, textEn) {
  chatMessages.value.push({
    id: Date.now(),
    sender: 'user',
    textFr,
    textEn: textEn || textFr,
    time: getCurrentTime()
  })
  scrollToBottom()
}

function addBotResponse(phraseFr, phraseEn) {
  const cleanFr = phraseFr.toLowerCase()
  const cleanEn = phraseEn.toLowerCase()
  
  let botTextFr = ''
  let botTextEn = ''
  
  // French response logic
  if (phraseFr.length > 55) {
    botTextFr = "Votre demande est très précise et requiert l'intervention directe d'un de nos techniciens. Veuillez nous contacter à **support@lesjeunestechniciens.com** ou via le formulaire de contact. Nous vous répondrons sous 2h."
  }
  else if (containsAny(cleanFr, ['site', 'web', 'dev', 'logiciel', 'prog', 'code', 'application', 'logiciels', 'conception', 'software', 'app'])) {
    botTextFr = "Pour nos services de **Conception Logicielle & Web**, nous concevons des applications métiers et des sites performants. Votre besoin concerne-t-il un nouveau projet ou un bug sur un outil existant ? Écrivez-nous à **support@lesjeunestechniciens.com** pour obtenir de l'aide."
  }
  else if (containsAny(cleanFr, ['matériel', 'hardware', 'composant', 'pc', 'ordinateur', 'serveur', 'réseau', 'lent', 'infrastructure', 'materiel', 'computer', 'server', 'network', 'slow'])) {
    botTextFr = "Pour notre expertise **Hardware & Infrastructure**, nous gérons la sélection de composants, l'assemblage et les diagnostics. Si vous rencontrez un problem réseau ou matériel spécifique, veuillez nous envoyer les détails à **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanFr, ['sécurité', 'cyber', 'securite', 'hacker', 'piratage', 'audit', 'protection', 'mot de passe', 'mfa', 'security', 'hack', 'password'])) {
    botTextFr = "La **Sécurité Numérique** est l'un de nos piliers (Audits, Pentesting, Zero-Trust). Pour tout incident de sécurité ou demande d'audit de vos systèmes, contactez notre équipe à **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanFr, ['chatbot', 'ia', 'automatisation', 'robot', 'ai', 'automation'])) {
    botTextFr = "Nous concevons des chatbots intelligents et automatisons vos flux métiers. Pour concevoir un assistant IA sur mesure pour vos besoins, contactez-nous via : **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanFr, ['prix', 'tarif', 'cout', 'coût', 'budget', 'cher', 'price', 'rate', 'cost', 'quote', 'expensive'])) {
    botTextFr = "Nos tarifs dépendent de l'ampleur du projet. Pour obtenir une soumission sur mesure gratuite, veuillez détailler votre projet dans le formulaire de contact ou écrivez-nous à **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanFr, ['aide', 'support', 'contact', 'email', 'courriel', 'téléphone', 'aidez', 'help', 'phone'])) {
    botTextFr = "Vous pouvez contacter directement notre équipe de support par courriel à **support@lesjeunestechniciens.com** ou en remplissant le formulaire de contact en bas de page."
  }
  else {
    botTextFr = "Je comprends. Pour ce type de demande technique spécifique, il est préférable de contacter notre support par courriel à **support@lesjeunestechniciens.com** afin qu'un technicien qualifié analyse votre dossier de façon détaillée."
  }

  // English response logic
  if (phraseEn.length > 55) {
    botTextEn = "Your request is highly specific and requires direct intervention from one of our technicians. Please contact us at **support@lesjeunestechniciens.com** or via the contact form. We will reply within 2 hours."
  }
  else if (containsAny(cleanEn, ['site', 'web', 'dev', 'logiciel', 'prog', 'code', 'application', 'logiciels', 'conception', 'software', 'app'])) {
    botTextEn = "For our **Software & Web Design** services, we build custom business applications and high-performance websites. Does your request concern a new project or a bug on an existing tool? Email us at **support@lesjeunestechniciens.com** for assistance."
  }
  else if (containsAny(cleanEn, ['matériel', 'hardware', 'composant', 'pc', 'ordinateur', 'serveur', 'réseau', 'lent', 'infrastructure', 'materiel', 'computer', 'server', 'network', 'slow'])) {
    botTextEn = "For our **Hardware & Infrastructure** expertise, we handle component selection, assembly, and diagnostics. If you are experiencing a network issue or a specific hardware failure, please email details to **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanEn, ['sécurité', 'cyber', 'securite', 'hacker', 'piratage', 'audit', 'protection', 'mot de passe', 'mfa', 'security', 'hack', 'password'])) {
    botTextEn = "**Digital Security** is one of our core pillars (Audits, Pentesting, Zero-Trust). For any security incident or system audit request, contact our team at **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanEn, ['chatbot', 'ia', 'automatisation', 'robot', 'ai', 'automation'])) {
    botTextEn = "We design intelligent chatbots and automate your business workflows. To create a custom AI assistant tailored to your needs, contact us at **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanEn, ['prix', 'tarif', 'cout', 'coût', 'budget', 'cher', 'price', 'rate', 'cost', 'quote', 'expensive'])) {
    botTextEn = "Our rates depend on the scope of the project. To obtain a free custom quote, please detail your project in the contact form or email us at **support@lesjeunestechniciens.com**."
  }
  else if (containsAny(cleanEn, ['aide', 'support', 'contact', 'email', 'courriel', 'téléphone', 'aidez', 'help', 'phone'])) {
    botTextEn = "You can directly contact our support team by email at **support@lesjeunestechniciens.com** or by filling out the contact form at the bottom of the page."
  }
  else {
    botTextEn = "I understand. For this type of specific technical request, it is best to contact our support by email at **support@lesjeunestechniciens.com** so that a qualified technician can analyze your file in detail."
  }
  
  chatMessages.value.push({
    id: Date.now() + 1,
    sender: 'bot',
    textFr: botTextFr,
    textEn: botTextEn,
    time: getCurrentTime()
  })
  scrollToBottom()
}

function containsAny(str, keywords) {
  return keywords.some(k => str.includes(k))
}
</script>

<template>
  <div class="chatbot-wrapper">
    <!-- Floating Chat Button -->
    <button class="chat-bubble" @click="toggleChat" :aria-label="store.locale === 'fr' ? 'Ouvrir l\'assistant de support' : 'Open support assistant'" type="button">
      <span class="chat-icon">💬</span>
      <span class="online-indicator"></span>
    </button>

    <!-- Chat window widget -->
    <Transition name="chat-window-fade">
      <div v-if="isOpen" class="chat-window">
        <header class="chat-header">
          <div class="header-info">
            <span class="avatar-mark">LJT</span>
            <div>
              <h3>Support LJT</h3>
              <p class="status-text">{{ store.locale === 'fr' ? 'Assistant de support en ligne' : 'Online support assistant' }}</p>
            </div>
          </div>
          <button class="close-chat" @click="toggleChat" :aria-label="store.locale === 'fr' ? 'Fermer le chat' : 'Close chat'" type="button">×</button>
        </header>

        <div ref="chatContainer" class="chat-messages">
          <div
            v-for="msg in chatMessages"
            :key="msg.id"
            :class="['message-row', msg.sender === 'user' ? 'is-user' : 'is-bot']"
          >
            <div class="message-bubble">
              <p class="message-text" v-html="formatMessage(store.locale === 'fr' ? msg.textFr : msg.textEn)"></p>
              <span class="message-time">{{ msg.time }}</span>
            </div>

            <!-- Suggestions shown in Bot replies -->
            <div v-if="msg.showSuggestions" class="suggestions-list">
              <button
                class="suggestion-btn"
                type="button"
                @click="handleSuggestion('Logiciel & Web', 'Software & Web')"
              >
                💻 {{ store.locale === 'fr' ? 'Logiciel & Web' : 'Software & Web' }}
              </button>
              <button
                class="suggestion-btn"
                type="button"
                @click="handleSuggestion('Hardware & Réseaux', 'Hardware & Networks')"
              >
                ⚙️ {{ store.locale === 'fr' ? 'Hardware & Réseaux' : 'Hardware & Networks' }}
              </button>
              <button
                class="suggestion-btn"
                type="button"
                @click="handleSuggestion('Sécurité Numérique', 'Digital Security')"
              >
                🛡️ {{ store.locale === 'fr' ? 'Sécurité Numérique' : 'Digital Security' }}
              </button>
              <button
                class="suggestion-btn"
                type="button"
                @click="handleSuggestion('Autre demande', 'Other request')"
              >
                ❓ {{ store.locale === 'fr' ? 'Autre demande' : 'Other request' }}
              </button>
            </div>
          </div>
        </div>

        <form class="chat-input-area" @submit.prevent="handleSend">
          <input
            v-model="inputMessage"
            type="text"
            :placeholder="store.locale === 'fr' ? 'Posez votre question de support...' : 'Ask your support question...'"
            :aria-label="store.locale === 'fr' ? 'Message de support' : 'Support message'"
          />
          <button class="send-btn" type="submit" :aria-label="store.locale === 'fr' ? 'Envoyer' : 'Send'" :disabled="!inputMessage.trim()">
            ➔
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  font-family: inherit;
}

.chat-bubble {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  box-shadow: 0 8px 24px rgba(52, 211, 153, 0.4);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 300ms cubic-bezier(0.2, 0.85, 0.28, 1);
  z-index: 101;
}

.chat-bubble:hover {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 12px 30px rgba(52, 211, 153, 0.55);
}

.chat-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.online-indicator {
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  width: 0.85rem;
  height: 0.85rem;
  background: #10b981;
  border: 2px solid var(--page-background);
  border-radius: 50%;
  animation: pulse-online 2s infinite;
}

@keyframes pulse-online {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* Chat Window */
.chat-window {
  position: absolute;
  bottom: 4.5rem;
  right: 0;
  width: 380px;
  height: 520px;
  background: rgba(10, 20, 16, 0.95);
  border: 1px solid var(--line-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-strong);
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: chat-window-scale 350ms cubic-bezier(0.2, 0.85, 0.28, 1) both;
}

@keyframes chat-window-scale {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(15px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.chat-header {
  padding: 1.2rem;
  background: rgba(17, 40, 33, 0.4);
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-mark {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: var(--secondary);
  color: #ffffff;
  font-weight: 900;
  font-size: 0.8rem;
  display: grid;
  place-items: center;
}

.header-info h3 {
  font-size: 1rem;
  font-weight: 800;
  color: var(--deep);
  margin: 0;
}

.status-text {
  font-size: 0.75rem;
  color: var(--primary);
  margin: 0;
  font-weight: 600;
}

.close-chat {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 200ms ease;
  line-height: 1;
}

.close-chat:hover {
  color: var(--deep);
}

/* Messages Box */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-behavior: smooth;
}

.message-row {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  animation: message-fade 300ms ease both;
}

@keyframes message-fade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-row.is-user {
  align-self: flex-end;
}

.message-row.is-bot {
  align-self: flex-start;
}

.message-bubble {
  padding: 0.8rem 1.1rem;
  border-radius: 16px;
  position: relative;
  max-width: 100%;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.is-user .message-bubble {
  background: var(--primary);
  color: #050b09;
  border-bottom-right-radius: 4px;
}

.is-bot .message-bubble {
  background: var(--surface-strong);
  border: 1px solid var(--line);
  color: var(--ink);
  border-bottom-left-radius: 4px;
}

.message-text {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.is-user .message-text {
  color: #050b09 !important;
}

.is-bot .message-text {
  color: var(--ink) !important;
}

.message-text :deep(strong) {
  color: inherit;
  font-weight: 800;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.6;
  margin-top: 0.35rem;
  display: block;
  text-align: right;
}

/* Suggestions */
.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 0.65rem;
  width: 100%;
}

.suggestion-btn {
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid var(--line);
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.5rem 0.85rem;
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  transition: all 200ms ease;
  width: 100%;
}

.suggestion-btn:hover {
  background: rgba(52, 211, 153, 0.16);
  border-color: var(--primary);
  transform: translateX(4px);
}

/* Input Area */
.chat-input-area {
  padding: 0.9rem 1.2rem;
  border-top: 1px solid var(--line);
  background: rgba(10, 20, 16, 0.6);
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.chat-input-area input {
  flex: 1;
  background: var(--field);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.65rem 1rem;
  color: var(--ink);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 200ms ease;
}

.chat-input-area input:focus {
  border-color: var(--primary);
}

.send-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  color: #050b09;
  font-size: 0.9rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 200ms ease;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

/* Chat Window Transitions */
.chat-window-fade-enter-active,
.chat-window-fade-leave-active {
  transition: opacity 250ms ease, transform 250ms cubic-bezier(0.2, 0.85, 0.28, 1);
}

.chat-window-fade-enter-from,
.chat-window-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(15px);
}

@media (max-width: 480px) {
  .chat-window {
    width: min(calc(100vw - 2rem), 350px);
    height: 480px;
    right: 0;
  }
  .chatbot-wrapper {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
