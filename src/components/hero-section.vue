<template>
  <section id="accueil" class="hero-section">
    <div class="hero-content reveal">
      <p class="section-kicker">Organisation étudiante en informatique</p>
      <h1>Des services techniques sérieux, humains et orientés résultats.</h1>
      <p>
        Les Jeunes Techniciens accompagnent les entreprises et les particuliers avec
        des solutions concrètes en cybersécurité, automatisation, web et support
        informatique.
      </p>
      <a class="primary-button" href="#contact">Nous contacter</a>
    </div>

    <div class="hero-panel reveal delay-one">
      <span>Approche</span>
      <strong>Stratégie claire, exécution rapide, impact mesurable.</strong>
      <p>
        Nous transformons vos besoins en actions concrètes pour renforcer votre
        présence, optimiser vos processus et générer des résultats.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: clamp(3.5rem, 8vw, 6rem) 0;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 1.25rem;
  align-items: center;
  min-height: calc(100vh - 7rem);
}

.hero-content {
  padding: clamp(1.65rem, 4vw, 3.2rem);
}

.hero-panel {
  padding: clamp(1.35rem, 3vw, 2rem);
}

.hero-panel strong {
  display: block;
  margin-bottom: 1rem;
  color: var(--deep);
  font-size: clamp(1.8rem, 3vw, 2.55rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
  transition: color 320ms ease;
}

.hero-panel p {
  margin-bottom: 0;
}

.hero-content p:not(.section-kicker) {
  max-width: 690px;
  margin-bottom: 2rem;
  font-size: 1.08rem;
}

@media (max-width: 900px) {
  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
</style>
