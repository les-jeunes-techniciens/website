<script setup>
import ServiceCard from './service-card.vue'

const services = [
  {
    category: 'Cybersécurité B2B',
    title: 'Sécuriser vos opérations',
    description:
      'Nous aidons les organisations à identifier les risques, renforcer leurs systèmes et sensibiliser leurs équipes.',
    items: ['Audit de sécurité', 'Protection des systèmes', 'Sensibilisation'],
  },
  {
    category: 'IA & automatisation B2B',
    title: 'Gagner du temps avec des outils intelligents',
    description:
      'Nous automatisons les tâches répétitives et améliorons les processus avec des solutions simples à adopter.',
    items: [
      'Automatisation de tâches',
      'Optimisation de processus',
      'Intégration d’outils intelligents',
    ],
  },
  {
    category: 'Services informatiques',
    title: 'Accompagner les particuliers',
    description:
      'Nous offrons un soutien technique clair, accessible et adapté aux besoins quotidiens.',
    items: ['Montage PC', 'Installation Windows', 'Entretien et optimisation', 'Support technique'],
  },
  {
    category: 'Mandats complémentaires',
    title: 'Créer des solutions sur mesure',
    description:
      'Nous réalisons des projets personnalisés pour répondre à des besoins précis et concrets.',
    items: ['Création de sites web', 'Projets personnalisés', 'Création de contenu numérique'],
  },
]
</script>

<template>
  <section id="services" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">Services</p>
      <h2>Une offre lisible pour passer rapidement à l’action.</h2>
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
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
