<script setup>
import ProjectCard from './project-card.vue'

const projects = [
  {
    title: 'Écosystème Web Premium',
    description:
      'Développement de plateformes modernes et performantes, optimisées pour le référencement et l’expérience utilisateur.',
    technology: 'Vue.js, Vite, Node.js, Architecture Cloud',
  },
  {
    title: 'Flux d’Automatisation IA',
    description:
      'Intégration d’agents intelligents pour automatiser la gestion des données, le service client et les workflows internes.',
    technology: 'Python, OpenAI API, LangChain, Automatisation No-Code',
  },
  {
    title: 'Audit & Sécurité',
    description:
      'Analyse approfondie des infrastructures numériques pour garantir la confidentialité et l’intégrité de vos données.',
    technology: 'Pentesting, MFA, Chiffrement, Normes de Sécurité',
  },
  {
    title: 'Infrastructure SI',
    description:
      'Mise en place et maintenance de serveurs, réseaux et postes de travail pour une productivité maximale.',
    technology: 'Virtualisation, Monitoring, Sauvegarde, Réseaux',
  },
  {
    title: 'Outils Métiers Sur Mesure',
    description:
      'Conception d’applications internes spécifiques pour la gestion de stocks, de projets ou de relations clients.',
    technology: 'React, PostgreSQL, API REST, Docker',
  },
  {
    title: 'Conseil Technologique',
    description:
      'Accompagnement stratégique pour le choix et l’implémentation des meilleures solutions du marché.',
    technology: 'Analyse de besoins, Roadmap, Formation, Veille',
  },
]
</script>

<template>
  <section id="solutions" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">Réalisations</p>
      <h2>Des solutions concrètes pour propulser votre entreprise.</h2>
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
  gap: 1.25rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.project-card {
  padding: 1.75rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.projects-grid .project-card {
  position: relative;
  overflow: hidden;
  transition: all 300ms ease;
}

.projects-grid .project-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: all 300ms ease;
}

.projects-grid .project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-strong);
}

.projects-grid .project-card:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
