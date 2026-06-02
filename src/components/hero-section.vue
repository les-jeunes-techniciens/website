<script setup>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import { store } from '../store'

const currentImageIndex = ref(0)
const images = ['/President.png', '/VP.png']
let fadeInterval

const typePhrasesFr = [
  'Développement web',
  'Automatisation',
  'IA',
  'Cybersécurité',
  'Infrastructure TI',
  'La solution à votre problème',
  'Consultation TI',
]

const typePhrasesEn = [
  'Web development',
  'Automation',
  'AI',
  'Cybersecurity',
  'IT infrastructure',
  'The custom solution to your problem',
  'IT consulting',
]

const typePhrases = computed(() => (store.locale === 'fr' ? typePhrasesFr : typePhrasesEn))
const currentText = ref('')
const currentPhraseIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)
const isPausedAfterComplete = ref(false)
const showCursor = computed(() => currentText.value && !isPausedAfterComplete.value)
let typingTimeout = null

function scheduleTyping(timeout) {
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = window.setTimeout(runTyping, timeout)
}

function runTyping() {
  const phrases = typePhrases.value
  if (!phrases.length) return

  const phrase = phrases[currentPhraseIndex.value % phrases.length]

  if (isDeleting.value) {
    if (isPausedAfterComplete.value) {
      isPausedAfterComplete.value = false
    }

    currentCharIndex.value = Math.max(currentCharIndex.value - 1, 0)
    currentText.value = phrase.slice(0, currentCharIndex.value)

    if (currentCharIndex.value === 0) {
      isDeleting.value = false
      currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length
      scheduleTyping(600)
      return
    }

    scheduleTyping(40 + Math.random() * 50)
    return
  }

  currentCharIndex.value = Math.min(currentCharIndex.value + 1, phrase.length)
  currentText.value = phrase.slice(0, currentCharIndex.value)

  if (currentText.value === phrase) {
    isDeleting.value = true
    isPausedAfterComplete.value = true
    scheduleTyping(1400)
    return
  }

  scheduleTyping(80 + Math.random() * 70)
}

function resetTyping() {
  currentText.value = ''
  currentPhraseIndex.value = 0
  currentCharIndex.value = 0
  isDeleting.value = false
  isPausedAfterComplete.value = false
  scheduleTyping(500)
}

onMounted(() => {
  fadeInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 10000)

  scheduleTyping(500)
})

watch(
  () => store.locale,
  async () => {
    await nextTick()
    resetTyping()
  }
)

onUnmounted(() => {
  if (fadeInterval) clearInterval(fadeInterval)
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<template>
  <section id="accueil" class="hero-section">
    <div class="hero-container">
      <div class="hero-content reveal">
        <template v-if="store.locale === 'fr'">
          <h1>CONCEPTION DE SOLUTIONS LOGICIELLES</h1>
          <p>
            Nous accompagnons votre croissance avec des solutions numériques en
            <span class="typing-line">
              <span class="typing-text">{{ currentText }}</span>
              <span v-if="showCursor" class="typing-cursor" aria-hidden="true"></span>
            </span>
          </p>
          <div class="hero-actions">
            <a class="primary-button" href="#contact">Démarrer un projet</a>
            <a class="hero-secondary" href="#services">
              <span class="play-icon">▶</span> Voir nos services
            </a>
          </div>
        </template>
        <template v-else>
          <h1>CUSTOM SOFTWARE SOLUTIONS</h1>
          <p>
            We empower your growth with innovative digital systems including
            <span class="typing-line">
              <span class="typing-text">{{ currentText }}</span>
              <span v-if="showCursor" class="typing-cursor" aria-hidden="true"></span>
            </span>
          </p>
          <div class="hero-actions">
            <a class="primary-button" href="#contact">Start a Project</a>
            <a class="hero-secondary" href="#services">
              <span class="play-icon">▶</span> Explore Services
            </a>
          </div>
        </template>
      </div>

      <div class="hero-illustration reveal delay-one">
        <div class="hero-images">
          <img 
            v-for="(image, index) in images" 
            :key="image"
            :src="image" 
            :alt="`Team Member ${index + 1}`"
            :class="{ active: currentImageIndex === index }"
            class="hero-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: clamp(5rem, 12vw, 10rem) 0;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.hero-kicker {
  margin-bottom: 1.5rem !important;
  display: block;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5.5vw, 4.8rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 2rem;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: #ffffff;
}

.hero-content p:not(.section-kicker) {
  font-size: 1.2rem;
  color: var(--muted);
  max-width: 580px;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.typing-line {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--primary);
  font-weight: 800;
}

.typing-text {
  display: inline-block;
  min-width: 1ch;
  white-space: nowrap;
}

.typing-cursor {
  display: inline-block;
  width: 0.17em;
  height: 1.25em;
  margin-left: 0.1rem;
  background-color: var(--primary);
  animation: blink-cursor 700ms step-end infinite;
  border-radius: 999px;
}

@keyframes blink-cursor {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.hero-illustration img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.hero-images {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  border-radius: 24px;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
  animation: float 6s ease-in-out infinite;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  z-index: 1;
}

.hero-image.active {
  opacity: 1;
  z-index: 2;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.hero-secondary {
  background: transparent;
  border: none;
  color: var(--ink);
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: transform 200ms ease, color 200ms ease;
}

.hero-secondary:hover {
  color: var(--secondary);
  transform: translateX(8px);
}

.play-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid var(--secondary);
  border-radius: 50%;
  color: var(--secondary);
  font-size: 0.9rem;
  transition: background 200ms ease;
}

.hero-secondary:hover .play-icon {
  background: rgba(99, 102, 241, 0.2);
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-content p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-illustration {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
