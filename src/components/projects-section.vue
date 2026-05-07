<script setup>
import ProjectCard from './project-card.vue'

const projects = [
  {
    title: 'Site web vitrine',
    description:
      'Création d’un site simple, moderne et responsive pour présenter une entreprise, un service ou un projet.',
    technology: 'HTML, CSS, JavaScript, React, SEO de base',
  },
  {
    title: 'Automatisation de tâches',
    description:
      'Mise en place de petits systèmes pour automatiser des actions répétitives comme les formulaires, les courriels, les suivis ou l’organisation de données.',
    technology: 'Python, JavaScript, API, Google Sheets, outils no-code',
  },
  {
    title: 'Diagnostic cybersécurité',
    description:
      'Analyse de base des pratiques numériques pour aider une organisation à mieux comprendre ses risques et améliorer ses habitudes.',
    technology: 'MFA, bonnes pratiques, phishing, gestion des accès',
  },
  {
    title: 'Support et configuration informatique',
    description:
      'Aide pour installer, configurer, optimiser ou entretenir des postes informatiques selon les besoins.',
    technology: 'Windows, Linux, matériel, logiciels, configuration',
  },
  {
    title: 'Outil interne simple',
    description:
      'Création d’un outil léger pour aider une équipe à mieux gérer ses informations, ses clients, ses suivis ou ses tâches.',
    technology: 'React, Node.js, SQL, Google Workspace, API',
  },
  {
    title: 'Mandat personnalisé',
    description:
      'Chaque besoin est différent. Nous pouvons analyser votre demande et proposer une solution réaliste selon nos compétences et nos disponibilités.',
    technology: 'Web, automatisation, support, données, documentation',
  },
]
</script>

<template>
  <section id="solutions" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">PROJETS POSSIBLES</p>
      <h2>Des idées concrètes que nous pouvons développer selon vos besoins.</h2>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        :project="project"
        class="reveal"
      />
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: stretch;
}

.projects-grid > * {
  grid-column: span 2;
}

.projects-grid > :nth-child(4) {
  grid-column: 2 / span 2;
}

.projects-grid > :nth-child(5) {
  grid-column: 4 / span 2;
}

.projects-grid > :nth-child(6) {
  grid-column: 3 / span 2;
}

.project-card {
  padding: 1.5rem;
}

.projects-grid .project-card {
  position: relative;
  overflow: hidden;
  animation-duration: 760ms;
  animation-timing-function: cubic-bezier(0.2, 0.85, 0.28, 1);
}

.projects-grid .project-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 1.4rem;
  left: 1.4rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--green), var(--turquoise));
  opacity: 0.72;
  transform: scaleX(0.36);
  transform-origin: left;
  transition: transform 260ms ease, opacity 260ms ease;
}

.projects-grid .project-card:hover {
  transform: translateY(-9px) scale(1.015);
}

.projects-grid .project-card:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.projects-grid .project-card:nth-child(1),
.projects-grid .project-card:nth-child(4) {
  animation-name: slideProjectLeft;
}

.projects-grid .project-card:nth-child(2),
.projects-grid .project-card:nth-child(6) {
  animation-name: slideProjectCenter;
}

.projects-grid .project-card:nth-child(3),
.projects-grid .project-card:nth-child(5) {
  animation-name: slideProjectRight;
}

.projects-grid .project-card:nth-child(1) {
  animation-delay: 40ms;
}

.projects-grid .project-card:nth-child(2) {
  animation-delay: 140ms;
}

.projects-grid .project-card:nth-child(3) {
  animation-delay: 240ms;
}

.projects-grid .project-card:nth-child(4) {
  animation-delay: 340ms;
}

.projects-grid .project-card:nth-child(5) {
  animation-delay: 440ms;
}

.projects-grid .project-card:nth-child(6) {
  animation-delay: 540ms;
}

@keyframes slideProjectLeft {
  from {
    opacity: 0;
    transform: translate(-42px, 24px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@keyframes slideProjectCenter {
  from {
    opacity: 0;
    transform: translateY(36px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideProjectRight {
  from {
    opacity: 0;
    transform: translate(42px, 24px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid > *,
  .projects-grid > :nth-child(4),
  .projects-grid > :nth-child(5),
  .projects-grid > :nth-child(6) {
    grid-column: 1;
  }
}
</style>
