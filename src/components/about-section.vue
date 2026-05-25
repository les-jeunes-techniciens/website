<script setup>
import { computed } from 'vue'
import { store } from '../store'

const valuesFr = ['Excellence', 'Rigueur', 'Transparence', 'Innovation', 'Fiabilité', 'Sécurité']
const valuesEn = ['Excellence', 'Rigour', 'Transparency', 'Innovation', 'Reliability', 'Security']

const proofPointsFr = [
  'Encadrement professionnel rigoureux',
  'Méthodologies éprouvées et sécurisées',
  'Accompagnement personnalisé et réactif',
]
const proofPointsEn = [
  'Rigorous professional mentoring',
  'Proven and secure methodologies',
  'Personalized and responsive support',
]

const values = computed(() => {
  return store.locale === 'fr' ? valuesFr : valuesEn
})

const proofPoints = computed(() => {
  return store.locale === 'fr' ? proofPointsFr : proofPointsEn
})
</script>

<template>
  <section id="a-propos" class="about-section page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">
        {{ store.locale === 'fr' ? 'Notre Vision' : 'Our Vision' }}
      </p>
      <h2>
        {{ store.locale === 'fr' ? "L'alliance de l'innovation étudiante et de la rigueur professionnelle." : "The alliance of student innovation and professional rigor." }}
      </h2>
    </div>

    <div class="about-grid">
      <div class="about-copy">
        <p v-if="store.locale === 'fr'">
          Les Jeunes Techniciens est une initiative qui mobilise les meilleurs talents étudiants en informatique pour répondre aux besoins technologiques du marché. Nous offrons une expertise moderne, encadrée par des standards de qualité élevés.
        </p>
        <p v-else>
          Les Jeunes Techniciens is an initiative that mobilizes the best student talents in computer science to meet market technology needs. We offer modern expertise, framed by high quality standards.
        
        </p>
        <br>
        <p v-if="store.locale === 'fr'">
          Notre mission est double : fournir des résultats tangibles à nos clients tout en forgeant l'expérience de la prochaine génération d'experts. Cette symbiose nous permet de proposer des solutions innovantes, fiables et à forte valeur ajoutée.
        </p>
        <p v-else>
          Our mission is twofold: to deliver tangible results to our clients while forging the experience of the next generation of experts. This symbiosis allows us to offer innovative, reliable, and high-value-added solutions.
        </p>
      </div>

      <div class="about-card">
        <h3>
          {{ store.locale === 'fr' ? 'Pourquoi nous faire confiance ?' : 'Why trust us?' }}
        </h3>
        <ul>
          <li v-for="proofPoint in proofPoints" :key="proofPoint">{{ proofPoint }}</li>
        </ul>
      </div>
    </div>

    <div class="values-row">
      <div>
        <p class="section-kicker">
          {{ store.locale === 'fr' ? 'Nos Fondements' : 'Our Foundations' }}
        </p>
        <p>
          {{ store.locale === 'fr' ? 'Des principes solides pour bâtir une relation de partenariat durable.' : 'Solid principles to build a lasting partnership.' }}
        </p>
      </div>
      <div class="values-list">
        <span v-for="value in values" :key="value">{{ value }}</span>
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

.values-row {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 3rem;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.values-row p {
  max-width: 520px;
  margin-bottom: 0;
}

.values-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
}

.values-list span {
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  color: var(--deep);
  font-weight: 800;
  background: var(--accent-soft);
  transition: all 250ms ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.values-list span:hover {
  background: var(--primary);
  color: #050b09;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(52, 211, 153, 0.25);
  cursor: default;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .values-row {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .values-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
