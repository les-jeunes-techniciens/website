<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { store } from '../store'

const isMenuOpen = ref(false)
const hasScrolled = ref(false)
let logoClickCount = 0
let logoClickTimer = null
let prideResetTimer = null
let emojiResetTimer = null
let lastPointerShift = false
const emojiLang = ref('')

const navigationLinks = computed(() => {
  if (store.locale === 'fr') {
    return [
      { label: 'Accueil', href: '#accueil' },
      { label: 'Services', href: '#services' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'À propos', href: '#a-propos' },
    ]
  } else {
    return [
      { label: 'Home', href: '#accueil' },
      { label: 'Services', href: '#services' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'About', href: '#a-propos' },
    ]
  }
})

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function updateHeaderState() {
  hasScrolled.value = window.scrollY > 20
}

function captureModifier(event) {
  lastPointerShift = event.shiftKey
}

function changeLang(lang, showEmoji = false) {
  store.setLocale(lang)

  if (showEmoji) {
    emojiLang.value = lang
    if (emojiResetTimer) {
      window.clearTimeout(emojiResetTimer)
    }
    emojiResetTimer = window.setTimeout(() => {
      emojiLang.value = ''
      emojiResetTimer = null
    }, 3000)
  } else {
    emojiLang.value = ''
  }
}

function onLangClick(lang, event) {
  const showEmoji = event?.shiftKey || lastPointerShift
  lastPointerShift = false
  changeLang(lang, showEmoji)
}

function resetLogoClickState() {
  logoClickCount = 0
  logoClickTimer = null
}

function resetPrideFlag() {
  document.body.classList.remove('pride-easter-egg')
  prideResetTimer = null
}

function togglePrideFlag() {
  const isActive = document.body.classList.contains('pride-easter-egg')
  if (isActive) {
    if (prideResetTimer) {
      window.clearTimeout(prideResetTimer)
    }
    resetPrideFlag()
    return
  }

  document.body.classList.add('pride-easter-egg')
  if (prideResetTimer) {
    window.clearTimeout(prideResetTimer)
  }
  prideResetTimer = window.setTimeout(() => {
    resetPrideFlag()
  }, 9000)
}

function onLogoClick() {
  const now = new Date()
  if (now.getMonth() !== 5) {
    return
  }

  logoClickCount += 1
  if (logoClickCount === 1) {
    logoClickTimer = window.setTimeout(() => {
      resetLogoClickState()
    }, 2000)
    return
  }

  if (logoClickCount === 2) {
    if (logoClickTimer) {
      window.clearTimeout(logoClickTimer)
    }
    resetLogoClickState()
    togglePrideFlag()
  }
}

onMounted(() => {
  store.setLocale('fr') // Le site est obligatoirement en français lors de l'ouverture
  document.documentElement.dataset.theme = 'dark'
  updateHeaderState()
  window.addEventListener('scroll', updateHeaderState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateHeaderState)
  if (logoClickTimer) {
    window.clearTimeout(logoClickTimer)
  }
  if (prideResetTimer) {
    window.clearTimeout(prideResetTimer)
  }
  if (emojiResetTimer) {
    window.clearTimeout(emojiResetTimer)
  }
  document.body.classList.remove('pride-easter-egg')
})
</script>

<template>
  <header :class="['site-header', { 'is-scrolled': hasScrolled }]">
    <a class="brand" href="#accueil" @click="closeMenu">
      <img src="/favicon.svg" alt="Les Jeunes Techniciens" class="brand-logo" @click="onLogoClick" />
      <span class="brand-name">Les Jeunes Techniciens</span>
    </a>

    <nav :class="['nav-links', { 'is-open': isMenuOpen }]" aria-label="Navigation principale">
      <a
        v-for="navigationLink in navigationLinks"
        :key="navigationLink.href"
        :href="navigationLink.href"
        @click="closeMenu"
      >
        {{ navigationLink.label }}
      </a>
    </nav>

    <div class="header-actions">
      <!-- Sélecteur de Langue FR/EN -->
      <div class="lang-selector">
        <button
          :class="{ 'is-active': store.locale === 'fr' }"
          type="button"
          @pointerdown="captureModifier"
          @click="onLangClick('fr', $event)"
        >{{ emojiLang === 'fr' ? '🥖' : 'FR' }}</button>
        <span class="lang-divider">|</span>
        <button
          :class="{ 'is-active': store.locale === 'en' }"
          type="button"
          @pointerdown="captureModifier"
          @click="onLangClick('en', $event)"
        >{{ emojiLang === 'en' ? '🍵' : 'EN' }}</button>
      </div>

      <a href="#contact" class="contact-link" @click="closeMenu">Contact</a>
      
      <button
        class="menu-button"
        type="button"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.lang-selector {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--surface-strong);
  border: 1px solid var(--line);
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  margin-right: 0.75rem;
}

.lang-selector button {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
}

.lang-selector button.is-active {
  color: var(--primary);
  background: rgba(52, 211, 153, 0.12);
}

.lang-selector button:hover:not(.is-active) {
  color: var(--deep);
}

.lang-divider {
  color: var(--line);
  font-size: 0.8rem;
  font-weight: 800;
}

.site-header {
  position: sticky;
  top: 1.5rem;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(12px);
  transition: all 320ms ease;
}

.site-header.is-scrolled {
  top: 0.75rem;
  background: rgba(10, 10, 10, 0.85);
  box-shadow: var(--shadow);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--deep);
  font-weight: 800;
  text-decoration: none;
}

.brand-logo {
  width: 2.25rem;
  height: 2.25rem;
  object-fit: contain;
}

.brand-name {
  font-size: 1.15rem;
  letter-spacing: -0.03em;
  font-weight: 900;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-links a {
  padding: 0.6rem 1rem;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
}

.nav-links a:hover:not(.contact-link) {
  color: var(--deep);
}

.contact-link {
  background: var(--secondary);
  color: #ffffff;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 200ms ease;
  white-space: nowrap;
}

.contact-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
}

@media (max-width: 560px) {
  .contact-link {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-button {
  display: none;
  place-items: center;
  width: 2rem;
  overflow: hidden;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.24);
  transform: translateY(-1px);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.18);
}

.menu-button span {
  display: block;
  width: 1.7rem;
  height: 2px;
  border-radius: 999px;
  background: #929292;
}

.menu-button span + span {
  margin-top: 0.35rem;
}

@media (max-width: 900px) {
  .brand-name {
    display: none;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 0.75rem);
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 0.5rem;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--surface-strong);
    box-shadow: var(--shadow-strong);
    z-index: 30;
    overflow: hidden;
  }

  .nav-links.is-open {
    display: flex;
  }

  .nav-links a,
  .contact-link {
    width: 100%;
    text-align: center;
  }

  .nav-links a {
    padding: 0.85rem 1rem;
    border-radius: 16px;
    font-size: 0.92rem;
  }

  .header-actions .contact-link {
    display: none;
  }

  .contact-link {
    padding: 0.85rem 1rem;
    border-radius: 16px;
    font-size: 0.92rem;
  }

  .menu-button {
    display: grid;
  }
}

@media (max-width: 560px) {
  .site-header {
    top: 0.5rem;
    width: calc(100% - 1rem);
    margin: 0.5rem auto 0;
  }
}
</style>