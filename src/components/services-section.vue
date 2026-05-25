<script setup>
import ServiceCard from './service-card.vue'

const services = [
  {
    category: 'Conception Logicielle',
    title: 'Architectures logicielles sur mesure',
    description:
      'Conception de systèmes robustes, évolutifs et adaptés à vos flux de travail spécifiques.',
    items: [
      'Analyse de besoins et architecture',
      'Développement d\'applications métiers',
      'Optimisation de code source',
      'Maintenance logicielle proactive',
    ],
  },
  {
    category: 'Composants Matériels',
    title: 'Expertise Hardware & Infrastructure',
    description:
      'Conseil et intégration matérielle avec sélection rigoureuse de composants critiques pour fiabilité et performance.',
    items: [
      'Sélection de composants',
      'Audit matériel et recommandations',
      'Assemblage de stations durables',
      'Surveillance et support d\'infrastructure',
    ],
  },
  {
    category: 'Support & Assistance',
    title: 'Ligne d\'assistance',
    description:
      'Une assistance directe et réactive pour résoudre vos défis techniques au quotidien.',
    items: [
      'Support en direct 24/7',
      'Prise en main à distance sécurisée',
      'Assistance utilisateur immédiate',
      'Résolution d\'incidents critiques',
    ],
  },
  {
    category: 'Sécurité Numérique',
    title: 'Protection de vos actifs numériques',
    description:
      'Des protocoles de sécurité avancés pour garantir l\'intégrité de vos données.',
    items: [
      'Audit de sécurité opérationnel',
      'Renforcement des accès et chiffrement',
      'Formation du personnel',
      'Plan de reprise et conformité',
    ],
  },
  {
    category: 'Automatisation & IA',
    title: 'Optimisation par l\'intelligence artificielle',
    description:
      'Intégration de solutions IA pour automatiser vos processus et gagner en productivité.',
    items: [
      'Automatisation de flux de travail',
      'Intégration de modèles IA',
      'Scripts d\'optimisation',
      'Analyse de données intelligente',
    ],
  },
  {
    category: 'Développement Web',
    title: 'Expériences numériques premium',
    description:
      'Conception de sites et applications web modernes, performants et orientés utilisateur.',
    items: [
      'Sites vitrines haute performance',
      'Plateforme web',
      'Optimisation SEO technique',
      'Maintenance évolutive et performance continue',
    ],
  },
  {
    category: 'Projet sur mesure',
    title: 'Solutions personnalisées pour mandats spécifiques',
    description:
      'Accompagnement complet pour concevoir, développer et livrer des projets sur mesure, en respectant vos contraintes métier.',
    items: [
      'Analyse précise du besoin',
      'Prototype et maquette rapide',
      'Développement full stack',
      'Support post-lancement renforcé',
    ],
  },
]
</script>

<template>
  <section id="services" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">Expertise</p>
      <h2>Des services structurés pour accompagner votre croissance.</h2>
    </div>

    <div class="services-grid">
      <ServiceCard
        v-for="service in services"
        :key="service.title"
        :service="service"
        class="reveal"
      />
    </div>
  </section>
</template>

<style scoped>
.services-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.services-grid > *:nth-child(7) {
  grid-column: 1 / -1;
}

@media (max-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .services-grid > *:nth-child(7) {
    grid-column: auto;
  }
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
