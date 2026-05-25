<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ProjectCard from './project-card.vue'

const projects = [
  {
    title: 'Écosystème Web Premium',
    summary:
      'Plateforme client moderne et évolutive pour augmenter visibilité et conversions.',
    description:
      'Refonte complète d’une plateforme web professionnelle avec un parcours utilisateur optimisé et un back-office sécurisé.',
    objective:
      'Créer une présence digitale fiable, performante et facile à faire évoluer selon les besoins métier.',
    technology: 'Vue.js, Vite, Node.js, Architecture Cloud, SEO technique',
    mandateType: 'Mandat de développement complet',
    result:
      'Livraison en 10 semaines avec une performance en hausse et une structure prête pour les évolutions futures.',
  },
  {
    title: 'Flux d’Automatisation IA',
    summary:
      'Solution intelligente pour automatiser la gestion de données et alléger les opérations internes.',
    description:
      'Conception d’un moteur d’automatisation qui relie les systèmes de l’entreprise et réduit les interventions manuelles.',
    objective:
      'Déployer un flux de travail autonome pour les tâches répétitives et les processus administratifs.',
    technology: 'Python, OpenAI API, LangChain, Automatisation No-Code',
    mandateType: 'Mandat d’intégration et paramétrage',
    result:
      'Résultat : gain de temps significatif, meilleure qualité des données et suivi en temps réel.',
  },
  {
    title: 'Audit & Sécurité',
    summary:
      'Évaluation complète des risques pour protéger les actifs numériques et maintenir la confiance.',
    description:
      'Audit de cybersécurité appliqué aux applications, réseaux et postes de travail avec recommandations priorisées.',
    objective:
      'Identifier les vulnérabilités et offrir un plan d’action pragmatique pour réduire les risques.',
    technology: 'Pentesting, MFA, Chiffrement, Normes de Sécurité',
    mandateType: 'Mandat d’audit et plan d’action',
    result:
      'Documentation claire et mesures correctives mises en place pour renforcer la posture de sécurité.',
  },
  {
    title: 'Infrastructure SI',
    summary:
      'Installation et maintenance d’une infrastructure fiable pour soutenir vos opérations digitales.',
    description:
      'Mise en place de serveurs, réseaux et solutions de sauvegarde adaptés à la taille de l’organisation.',
    objective:
      'Établir une infrastructure stable, sécurisée et performante pour les équipes et les services.',
    technology: 'Virtualisation, Monitoring, Sauvegarde, Réseaux',
    mandateType: 'Mandat d’infrastructure et supervision',
    result:
      'Environnement opérationnel stabilisé avec surveillance continue et intervention proactive.',
  },
  {
    title: 'Outils Métiers Sur Mesure',
    summary:
      'Applications internes adaptées pour automatiser la gestion de stocks, projets ou clients.',
    description:
      'Conception d’outils métiers taillés pour les processus spécifiques de l’entreprise.',
    objective:
      'Créer un outil métier qui réduit les tâches manuelles et centralise les informations clés.',
    technology: 'React, PostgreSQL, API REST, Docker',
    mandateType: 'Mandat de développement d’application interne',
    result:
      'Application livrée avec une interface intuitive, des rapports automatisés et un déploiement sécurisé.',
  },
  {
    title: 'Conseil Technologique',
    summary:
      'Accompagnement stratégique pour sélectionner et déployer les meilleures solutions du marché.',
    description:
      'Analyse des besoins existants pour proposer une feuille de route technique claire et réaliste.',
    objective:
      'Fournir des recommandations pragmatiques pour améliorer l’efficacité opérationnelle.',
    technology: 'Analyse de besoins, Roadmap, Formation, Veille',
    mandateType: 'Mandat de conseil et planification',
    result:
      'Client équipé d’un plan d’action précis pour accélérer ses projets technologiques.',
  },
]

const selectedProject = ref(null)

function openProjectDetails(project) {
  selectedProject.value = project
}

function closeProjectDetails() {
  selectedProject.value = null
}

function handleGlobalKeydown(event) {
  if (event.key !== 'Escape') return

  closeProjectDetails()
}

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleGlobalKeydown))
</script>

<template>
  <section id="solutions" class="page-section projects-section">
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
        @openProject="openProjectDetails"
      />
    </div>

    <div
      v-if="selectedProject"
      class="project-modal-overlay"
      @click.self="closeProjectDetails"
    >
      <div class="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-title">
        <button
          class="project-modal-close"
          type="button"
          @click="closeProjectDetails"
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>
        <div class="project-modal-header">
          <p class="section-kicker">Détails du projet</p>
          <h3 id="project-title">{{ selectedProject.title }}</h3>
          <p>{{ selectedProject.description }}</p>
        </div>

        <div class="project-modal-grid">
          <div>
            <h4>Objectif</h4>
            <p>{{ selectedProject.objective }}</p>
          </div>
          <div>
            <h4>Technologies</h4>
            <p>{{ selectedProject.technology }}</p>
          </div>
          <div>
            <h4>Type de mandat</h4>
            <p>{{ selectedProject.mandateType }}</p>
          </div>
          <div>
            <h4>Résultat final</h4>
            <p>{{ selectedProject.result }}</p>
          </div>
        </div>
      </div>
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
  cursor: pointer;
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

.project-modal-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  z-index: 50;
}

.project-modal {
  width: min(760px, 100%);
  max-height: min(90vh, 920px);
  overflow-y: auto;
  padding: 2rem;
  border-radius: 32px;
  background: rgba(6, 15, 23, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-strong);
}

.project-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.35);
  color: var(--deep);
  font-size: 1.15rem;
  font-weight: 800;
}

.project-modal-header {
  margin-bottom: 1.75rem;
}

.project-modal-header h3 {
  margin-top: 0.75rem;
  margin-bottom: 1rem;
}

.project-modal-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.project-modal-grid h4 {
  margin-bottom: 0.55rem;
  color: var(--primary);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-modal-grid p {
  margin: 0;
  color: var(--muted);
}

.projects-section .section-heading h2 {
  font-size: clamp(2.5rem, 4.8vw, 4.8rem);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 840px) {
  .project-modal-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
