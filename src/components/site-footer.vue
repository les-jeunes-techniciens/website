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
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 2.5rem;
  border-top: 1px solid var(--line);
  transition: border-color 320ms ease;
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
    width: min(100% - 1rem, 1120px);
    flex-direction: column;
  }
}
</style>
