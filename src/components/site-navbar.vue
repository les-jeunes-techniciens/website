<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isMenuOpen = ref(false)
const hasScrolled = ref(false)

const navigationLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'À propos', href: '#a-propos' },
]

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function updateHeaderState() {
  hasScrolled.value = window.scrollY > 20
}

onMounted(() => {
  document.documentElement.dataset.theme = 'dark'
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
      <a href="#contact" class="contact-link" @click="closeMenu">Contact</a>
      
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
  </header>
</template>

<style scoped>
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

.brand-mark {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 900;
  background: var(--secondary);
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
  transition: all 200ms ease;
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
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  color: var(--deep);
  background: var(--accent-soft);
  cursor: pointer;
  transition: all 200ms ease;
}

.menu-button:hover {
  background: var(--line-strong);
  transform: translateY(-1px);
}

.menu-button {
  display: none;
}

.menu-button span {
  display: block;
  width: 1.1rem;
  height: 2px;
  border-radius: 999px;
  background: var(--deep);
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
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--surface-strong);
    box-shadow: var(--shadow-strong);
  }

  .nav-links.is-open {
    display: flex;
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
