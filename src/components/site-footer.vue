<script setup>
import { store } from '../store'
</script>

<template>
  <footer class="site-footer">
    <p>© 2026 Les Jeunes Techniciens</p>
    <p>
      {{ store.locale === 'fr' ? 'Expertise numérique étudiante au service de votre performance.' : 'Student digital expertise at the service of your performance.' }}
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: min(1120px, 96%);
  margin: 0 auto;
  padding: 2% 1% 2.5%;
  border-top: 0.08% solid var(--line);
  transition: border-color 320ms ease;
  background: var(--page-background);
  z-index: 50;
}

.site-footer p {
  margin: 0;
  font-size: 0.95rem;
}

.site-footer p:first-child {
  color: var(--deep);
  font-weight: 800;
}

@media (max-width: 560px) {
  .site-footer {
    width: calc(100% - 2rem);
    flex-direction: column;
    left: 50%;
    transform: translateX(-50%);
    padding: 3% 1.5%;
  }
}
</style>
