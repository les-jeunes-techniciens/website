<script setup>
const values = ['Transparence', 'Simplicité', 'Orientation résultats']

const proofPoints = [
  'Une équipe motivée et encadrée',
  'Des solutions simples et adaptées',
  'Une communication claire et transparente',
]
</script>

<template>
  <section id="a-propos" class="about-section page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">À propos</p>
      <h2>Une équipe étudiante motivée, encadrée et prête à apprendre par des projets réels.</h2>
    </div>

    <div class="about-grid">
      <div class="about-copy">
        <p>
          Les Jeunes Techniciens est un projet étudiant en informatique qui vise à offrir des services concrets aux entreprises et aux particuliers, tout en permettant aux étudiants de développer leur expérience sur des mandats réels.
        </p>
        <p>
          Notre approche est simple : comprendre le besoin, proposer une solution réaliste et livrer un travail clair, utile et bien structuré. Chaque mandat est une occasion d’apprendre, de collaborer et de créer une valeur concrète.
        </p>
      </div>

      <div class="about-card">
        <h3>Pourquoi travailler avec nous ?</h3>
        <ul>
          <li v-for="proofPoint in proofPoints" :key="proofPoint">{{ proofPoint }}</li>
        </ul>
      </div>
    </div>

    <div class="values-row">
      <div>
        <p class="section-kicker">Nos valeurs</p>
        <p>Un cadre simple pour créer une relation de confiance dès le premier échange.</p>
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
  background: linear-gradient(135deg, var(--green), var(--turquoise));
}

.values-row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.values-row p {
  max-width: 520px;
  margin-bottom: 0;
}

.values-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.values-list span {
  padding: 0.7rem 0.95rem;
  border-radius: 999px;
  color: var(--deep);
  font-weight: 800;
  background: var(--accent-soft);
  transition: background-color 320ms ease, color 320ms ease;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .values-row {
    grid-template-columns: 1fr;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
