<script setup>
import ProjectCard from './project-card.vue'

const projects = [
  {
    title: 'Agents d’automatisation IA pour entreprises',
    description:
      'Des agents intelligents pour accélérer le support, analyser les données, détecter les anomalies et automatiser les réponses de façon sécurisée.',
    technology: 'Python, OpenAI API, Node.js, SQL, PowerShell, cybersécurité',
  },
  {
    title: 'Infrastructure et déploiement de postes',
    description:
      'Des environnements informatiques prêts à l’emploi pour entreprises, équipes et laboratoires: postes optimisés, réseau, sécurité et gestion de base.',
    technology: 'Windows, Linux, Active Directory, virtualisation, hardware',
  },
  {
    title: 'Plateforme de formation en cybersécurité',
    description:
      'Une expérience web interactive pour sensibiliser vos équipes au phishing, à la sécurité réseau, à l’éthique hacker et aux bons réflexes numériques.',
    technology: 'React, Node.js, SQL, Python, OWASP',
  },
  {
    title: 'Sites web sécurisés et API',
    description:
      'Des sites modernes avec des API solides pour gérer les accès, protéger les données et offrir une expérience rapide, claire et professionnelle.',
    technology: 'TypeScript, Express, FastAPI, Django, SQL, JWT, OAuth',
  },
  {
    title: 'Applications mobiles et desktop',
    description:
      'Des applications utiles pour piloter les tâches, centraliser les suivis, gérer les clients ou créer des tableaux de bord adaptés à vos opérations.',
    technology: 'Kotlin, Swift, C#, Flutter, React Native, SQL',
  },
  {
    title: 'Système de gestion intelligent',
    description:
      'Une plateforme complète pour structurer l’inventaire, les employés, les projets et les rapports automatisés avec l’appui de l’IA.',
    technology: 'Python, TypeScript, React, Vue.js, Node.js, PostgreSQL, REST',
  },
]
</script>

<template>
  <section id="projets" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">Projets</p>
      <h2>Des solutions prêtes à créer de la valeur pour vos opérations.</h2>
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
