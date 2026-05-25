<script setup>
const valueCards = [
  {
    title: 'Apprentissage',
    description:
      'Chaque mandat est une opportunité d’apprendre sur le terrain tout en produisant des résultats mesurables.',
  },
  {
    title: 'Transparence',
    description:
      'Communication claire et livrables visibles à chaque étape pour éviter les surprises.',
  },
  {
    title: 'Professionnalisme',
    description:
      'Approche structurée et respect des délais, même dans les projets les plus exigeants.',
  },
  {
    title: 'Collaboration',
    description:
      'Travail de concert avec vos équipes pour aligner les solutions sur vos objectifs réels.',
  },
  {
    title: 'Responsabilité',
    description:
      'Engagement à livrer des solutions fiables et à assumer les résultats de nos recommandations.',
  },
  {
    title: 'Innovation accessible',
    description:
      'Des technologies modernes appliquées de manière pragmatique, sans complexité inutile.',
  },
]
</script>

<template>
  <section id="a-propos" class="about-section page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">Notre Vision</p>
      <h2>L'alliance de l'innovation étudiante et de la rigueur professionnelle.</h2>
    </div>

    <div class="about-grid">
      <div class="about-copy reveal">
        <p>
          Les Jeunes Techniciens est une initiative qui mobilise les meilleurs talents étudiants en informatique pour répondre aux besoins technologiques du marché. Nous offrons une expertise moderne, encadrée par des standards de qualité élevés.
        </p>
        <br>
        <p>
          Notre mission est double : fournir des résultats tangibles à nos clients tout en forgeant l'expérience de la prochaine génération d'experts. Cette symbiose nous permet de proposer des solutions innovantes, fiables et à forte valeur ajoutée.
        </p>
      </div>

      <div class="about-card reveal">
        <h3>Pourquoi nous faire confiance ?</h3>
        <ul>
          <li v-for="proofPoint in ['Encadrement professionnel rigoureux', 'Méthodologies éprouvées et sécurisées', 'Accompagnement personnalisé et réactif']" :key="proofPoint">
            {{ proofPoint }}
          </li>
        </ul>
      </div>
    </div>

    <div class="values-section reveal">
      <p class="section-kicker">Nos valeurs</p>
      <div class="values-grid">
        <article v-for="value in valueCards" :key="value.title" class="value-card">
          <span class="value-icon">✔</span>
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: clamp(1.5rem, 4vw, 3rem);
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.62fr);
  gap: 2rem;
  align-items: start;
}

.about-copy p {
  max-width: 720px;
}

.about-copy p:last-child {
  margin-bottom: 0;
}

.about-card {
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--surface-strong);
}

.about-card h3 {
  margin-bottom: 1rem;
}

.about-card ul {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-card li {
  position: relative;
  padding-left: 1.2rem;
  color: var(--ink);
  font-weight: 700;
}

.about-card li::before {
  content: "";
  position: absolute;
  top: 0.72rem;
  left: 0;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
}

.values-section {
  margin-top: 2.5rem;
}

.values-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 1.25rem;
}

.value-card {
  padding: 1.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.value-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  margin-bottom: 1rem;
  border-radius: 14px;
  background: rgba(52, 211, 153, 0.15);
  color: var(--primary);
  font-weight: 900;
}

.value-card h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.value-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
