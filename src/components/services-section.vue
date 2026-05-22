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
      'Conseil et intégration de matériel informatique de pointe pour optimiser vos performances.',
    items: [
      'Sélection de composants critiques',
      'Assemblage de stations de travail',
      'Diagnostic de performance hardware',
      'Mises à niveau d\'infrastructure',
    ],
  },
  {
    category: 'Support & Assistance',
    title: 'Support technique, appels et aide',
    description:
      'Une assistance directe et réactive pour résoudre vos défis techniques au quotidien.',
    items: [
      'Ligne de support téléphonique',
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
      'Audit de sécurité complet',
      'Gestion sécurisée des accès',
      'Sensibilisation cyber-menaces',
      'Plans de reprise d\'activité',
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
      'E-commerce et plateformes web',
      'Optimisation SEO technique',
      'Web-design réactif (Responsive)',
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

@media (max-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
