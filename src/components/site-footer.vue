<template>
  <footer class="site-footer">
    <div class="site-footer-line">
      <p>© 2026 Les Jeunes Techniciens</p>
    </div>
    <div class="site-footer-line">
      <p>Expertise numérique étudiante au service de votre performance.</p>
      <p>
        <a href="https://github.com/les-jeunes-techniciens/website" target="_blank" rel="noreferrer noopener">
          Source du site web
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
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

.site-footer-line {
  text-align: center;
}

.site-footer a {
  color: var(--primary);
  text-decoration: underline;
}

@media (max-width: 560px) {
  .site-footer {
    width: min(100% - 1rem, 1120px);
  }
}
</style>
