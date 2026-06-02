<script setup>
import { store } from '../store'
</script>

<template>
  <footer class="site-footer">
    <p>© 2026 Les Jeunes Techniciens</p>
    <p>
      <a href="https://github.com/les-jeunes-techniciens/website" target="_blank" rel="noopener" class="github-link">
        {{ store.locale === 'fr' ? 'Voir la source du site web' : 'View our source' }}
      </a>
    </p>
    <p>
      {{ store.locale === 'fr' ? 'Expertise numérique étudiante au service de votre performance.' : 'Student digital expertise at the service of your performance.' }}
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 2% 1% 2.5%;
  border-top: 1px solid var(--line);
  transition: border-color 320ms ease;
  background: transparent;
}

.site-footer p {
  margin: 0;
  font-size: 0.95rem;
}

.site-footer p:first-child {
  color: var(--deep);
  font-weight: 800;
}

.github-link {
  display: inline-block;
  margin: 0 auto;
}

.site-footer p:nth-child(2) {
  text-align: center;
}

@media (max-width: 560px) {
  .site-footer {
    width: calc(100% - 2rem);
    flex-direction: column;
    padding: 3% 1.5%;
  }
}
</style>
