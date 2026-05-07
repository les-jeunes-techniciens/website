<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isMenuOpen = ref(false)
const hasScrolled = ref(false)
const isDarkMode = ref(false)
const isHeaderHidden = ref(true)

const hideScrollThreshold = 220
const cursorRevealThreshold = 90
let lastCursorY = Infinity

const navigationLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'À propos', href: '#a-propos' },
  { label: 'Contact', href: '#contact' },
]

function getDefaultTheme() {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(shouldSave = true) {
  document.documentElement.dataset.theme = isDarkMode.value ? 'dark' : 'light'

  if (shouldSave) {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }
}

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  applyTheme()
}

function recomputeHeaderVisibility() {
  if (isMenuOpen.value || window.scrollY <= hideScrollThreshold) {
    isHeaderHidden.value = false
    return
  }
  isHeaderHidden.value = lastCursorY > cursorRevealThreshold
}

function onMouseMove(event) {
  lastCursorY = event.clientY
  recomputeHeaderVisibility()
}

function updateHeaderState() {
  hasScrolled.value = window.scrollY > 12
  recomputeHeaderVisibility()
}

onMounted(() => {
  isDarkMode.value = getDefaultTheme() === 'dark'
  applyTheme(localStorage.getItem('theme') !== null)
  updateHeaderState()
  window.addEventListener('scroll', updateHeaderState, { passive: true })
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  requestAnimationFrame(recomputeHeaderVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateHeaderState)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <header :class="['site-header', { 'is-scrolled': hasScrolled, 'is-hidden': isHeaderHidden }]">
    <a class="brand" href="#accueil" @click="closeMenu">
      <span class="brand-mark">LJT</span>
      <span>Les Jeunes Techniciens</span>
    </a>

    <div class="header-actions">
      <button
        class="theme-button"
        type="button"
        :aria-label="isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'"
        @click="toggleTheme"
      >
        <span aria-hidden="true">{{ isDarkMode ? '☀️' : '🌙' }}</span>
      </button>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>
    </div>

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
  </header>

  <span class="header-hint" :class="{ 'is-visible': isHeaderHidden }" aria-hidden="true"></span>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 1rem;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(1120px, calc(100% - 2rem));
  margin: 1rem auto 0;
  padding: 0.72rem 0.8rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--header);
  backdrop-filter: blur(24px);
  transition:
    background-color 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease,
    color 320ms ease,
    transform 480ms cubic-bezier(0.2, 0.85, 0.28, 1),
    opacity 360ms ease;
}

.site-header.is-hidden {
  opacity: 0;
  transform: translateY(-160%);
  pointer-events: none;
}

.site-header.is-scrolled {
  border-color: var(--line);
  background: var(--header-strong);
  box-shadow: var(--shadow);
}

.header-hint {
  position: fixed;
  top: 0.5rem;
  left: 50%;
  z-index: 19;
  width: min(1080px, calc(100% - 3rem));
  height: 4px;
  border-radius: 999px;
  background: rgba(128, 128, 128, 0.6);
  transform: translate(-50%, -200%);
  opacity: 0;
  pointer-events: none;
  transition: transform 320ms ease, opacity 320ms ease;
}

.header-hint.is-visible {
  opacity: 1;
  transform: translate(-50%, 0);
}

.brand,
.header-actions,
.nav-links {
  display: flex;
  align-items: center;
}

.brand {
  gap: 0.7rem;
  color: var(--deep);
  font-weight: 800;
}

.brand-mark {
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, var(--green), var(--turquoise));
  box-shadow: 0 12px 24px rgba(21, 207, 192, 0.24);
}

.nav-links {
  gap: 0.18rem;
}

.nav-links a {
  padding: 0.62rem 0.8rem;
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.92rem;
  font-weight: 700;
  transition: color 200ms ease, background-color 200ms ease;
}

.nav-links a:hover {
  color: var(--deep);
  background: var(--accent-soft);
}

.header-actions {
  order: 3;
  gap: 0.5rem;
}

.theme-button,
.menu-button {
  color: var(--deep);
  background: var(--accent-soft);
  transition: background-color 240ms ease, color 240ms ease, transform 200ms ease;
}

.theme-button {
  display: grid;
  place-items: center;
  width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  border-radius: 999px;
  font-size: 1.12rem;
  line-height: 1;
}

.theme-button:hover,
.menu-button:hover {
  transform: translateY(-1px);
}

.menu-button {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border-radius: 50%;
}

.menu-button span {
  display: block;
  width: 1.1rem;
  height: 2px;
  border-radius: 999px;
  background: var(--deep);
}

.menu-button span + span {
  margin-top: 0.32rem;
}

@media (max-width: 900px) {
  .site-header {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .menu-button {
    display: grid;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 0.6rem);
    right: 0;
    left: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 0.7rem;
    border: 1px solid var(--line);
    border-radius: 24px;
    background: var(--surface-strong);
    box-shadow: var(--shadow);
  }

  .nav-links.is-open {
    display: flex;
  }

  .nav-links a {
    padding: 0.86rem 1rem;
  }
}

@media (max-width: 560px) {
  .site-header {
    top: 0.5rem;
    width: min(100% - 1rem, 1120px);
  }

  .brand {
    font-size: 0.95rem;
  }
}
</style>
