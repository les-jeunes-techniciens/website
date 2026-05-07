<script setup>
import ServiceCard from './service-card.vue'

const services = [
  {
    category: 'CYBERSÉCURITÉ B2B',
    title: 'Renforcer vos bases de sécurité',
    description:
      'Nous aidons les organisations à identifier les risques simples, améliorer leurs pratiques et sensibiliser leurs équipes aux bonnes habitudes numériques.',
    items: [
      'Diagnostic de sécurité de base',
      'Sensibilisation au phishing',
      'Vérification des accès et mots de passe',
      'Mise en place de bonnes pratiques',
    ],
  },
  {
    category: 'IA & AUTOMATISATION B2B',
    title: 'Automatiser les tâches répétitives',
    description:
      'Nous créons des solutions simples pour aider les entreprises à gagner du temps, réduire les tâches manuelles et mieux organiser leurs processus.',
    items: [
      'Automatisation de tâches',
      'Formulaires intelligents',
      'Assistants IA simples',
      'Optimisation de processus',
    ],
  },
  {
    category: 'SERVICES INFORMATIQUES',
    title: 'Support technique accessible',
    description:
      'Nous offrons un soutien technique clair et pratique pour les besoins informatiques du quotidien.',
    items: [
      'Montage et démontage de PC',
      'Installation Windows / OS',
      'Nettoyage et entretien',
      'Optimisation et support de base',
    ],
  },
  {
    category: 'MANDATS COMPLÉMENTAIRES',
    title: 'Des projets adaptés à vos besoins',
    description:
      'Selon le projet, nous pouvons aussi réaliser des mandats informatiques réalistes liés au web, aux outils internes et au développement.',
    items: [
      'Sites web vitrines',
      'Outils internes simples',
      'Applications ou scripts utiles',
      'Projets personnalisés',
    ],
  },
]
</script>

<template>
  <section id="services" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">SERVICES</p>
      <h2>Une offre claire pour répondre à vos besoins informatiques.</h2>
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
