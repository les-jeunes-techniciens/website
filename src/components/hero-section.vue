<template>
  <section id="accueil" class="hero-section">
    <div class="hero-container">
      <div class="hero-content reveal">
        <h1>CONCEPTION DE SOLUTIONS LOGICIELLES</h1>
        <p>
          Nous accompagnons votre croissance avec des solutions numériques innovantes,
          alliant cybersécurité de pointe et automatisation intelligente.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#contact">Prêt à démarrer ton projet ?</a>
          <a class="hero-secondary" href="#services">
            <span class="play-icon">▶</span> Voir nos services
          </a>
        </div>
      </div>

      <div class="hero-illustration reveal delay-one">
        <div class="hero-image-panel">
          <div class="hero-image-meta">
            <span>Équipe dédiée</span>
            <strong>Solutions conçues pour les mandats ambitieux</strong>
          </div>
          <div class="hero-image-cards">
            <article class="hero-card">
              <p>Architecture fiable</p>
              <strong>Sélection de composants et sécurité éprouvées</strong>
            </article>
            <article class="hero-card">
              <p>Interfaces modernes</p>
              <strong>Design responsive et expérience fluide</strong>
            </article>
            <article class="hero-card">
              <p>Livraison structurée</p>
              <strong>Déploiement clair et suivi continu</strong>
            </article>
          </div>
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
  color: var(--deep);
}

.hero-content p:not(.section-kicker) {
  font-size: 1.2rem;
  color: var(--muted);
  max-width: 580px;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero-illustration {
  display: flex;
  justify-content: center;
}

.hero-image-panel {
  width: min(100%, 520px);
  padding: 2rem;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(7, 14, 25, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.42);
}

.hero-image-meta {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.hero-image-meta span {
  color: var(--primary);
  font-size: 0.85rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 800;
}

.hero-image-meta strong {
  display: block;
  font-size: 1.15rem;
  line-height: 1.4;
  color: var(--deep);
}

.hero-image-cards {
  display: grid;
  gap: 1rem;
}

.hero-card {
  padding: 1.3rem 1.25rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-card p {
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 0.45rem;
}

.hero-card strong {
  display: block;
  color: var(--deep);
  font-size: 1.05rem;
  line-height: 1.4;
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
