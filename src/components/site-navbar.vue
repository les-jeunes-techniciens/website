<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isMenuOpen = ref(false)
const hasScrolled = ref(false)
const isDarkMode = ref(false)

const navigationLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Projets', href: '#projets' },
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

function updateHeaderState() {
  hasScrolled.value = window.scrollY > 12
}

onMounted(() => {
  isDarkMode.value = getDefaultTheme() === 'dark'
  applyTheme(localStorage.getItem('theme') !== null)
  updateHeaderState()
  window.addEventListener('scroll', updateHeaderState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateHeaderState)
})
</script>

<template>
  <header :class="['site-header', { 'is-scrolled': hasScrolled }]">
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
</template>
