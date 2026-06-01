<script setup>
import { computed } from 'vue'
import { store } from '../store'
import ServiceCard from './service-card.vue'

const servicesFr = [
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
      'Sélection et intégration de composants',
      'Assemblage de stations de travail',
      'Diagnostic de performance hardware',
      'Mises à niveau d\'infrastructure',
    ],
  },
  {
    category: 'Support & Assistance',
    title: 'Support technique & Chatbot IA',
    description:
      'Une assistance intelligente et instantanée via notre chatbot IA pour résoudre vos questions techniques au quotidien.',
    items: [
      'Chatbot IA d\'assistance disponible 24h/24',
      'Prise en main à distance sécurisée',
      'Résolution instantanée dans le chat du site',
      'Support utilisateur et diagnostic guidé',
    ],
    isConstruction: true,
  },
  {
    category: 'Sécurité Numérique',
    title: 'Audit, conformité & cybersécurité',
    description:
      'Sécurisation intégrale de vos systèmes avec des audits approfondis et la mise en place de défenses proactives.',
    items: [
      'Audits de vulnérabilité & Pentesting',
      'Sécurisation de réseaux & protocoles Zero-Trust',
      'Protection avancée contre les ransomwares',
      'Plans de reprise d\'activité & PCA/PRA',
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
      'Design Web & applications (responsive)',
      'Optimisation SEO technique',
      'Intégration d\'API & solutions SaaS sur mesure',
    ],
  },
  {
    category: 'Projet Sur Mesure',
    title: 'Solutions technologiques de A à Z',
    description:
      'Conception et développement de projets uniques et complexes adaptés à vos besoins technologiques spécifiques.',
    items: [
      'Cahier des charges & prototypage rapide',
      'Développement agile et itératif',
      'Accompagnement & transfert technologique',
      'Support continu et évolutivité garantie',
    ],
  },
]

const servicesEn = [
  {
    category: 'Software Design',
    title: 'Custom Software Architectures',
    description:
      'Designing robust, scalable systems tailored to your specific workflows.',
    items: [
      'Requirements analysis & architecture',
      'Business applications development',
      'Source code optimization',
      'Proactive software maintenance',
    ],
  },
  {
    category: 'Hardware Components',
    title: 'Hardware & Infrastructure Expertise',
    description:
      'Advice and integration of cutting-edge IT hardware to optimize your performance.',
    items: [
      'Selection & integration of critical components',
      'Workstation assembly',
      'Hardware performance diagnostics',
      'Infrastructure upgrades',
    ],
  },
  {
    category: 'Support & Assistance',
    title: 'Technical Support & AI Chatbot',
    description:
      'Intelligent, instant assistance via our AI chatbot to resolve your daily technical questions.',
    items: [
      'AI Chatbot support available 24/7',
      'Secure remote troubleshooting',
      'Instant resolution in site chat',
      'User support and guided diagnostics',
    ],
    isConstruction: true,
  },
  {
    category: 'Digital Security',
    title: 'Audits, Compliance & Cybersecurity',
    description:
      'Full system security with deep audits and proactive defense implementation.',
    items: [
      'Vulnerability audits & Pentesting',
      'Network security & Zero-Trust protocols',
      'Advanced ransomware protection',
      'Disaster recovery & business continuity plans',
    ],
  },
  {
    category: 'Automation & AI',
    title: 'AI-Powered Optimization',
    description:
      'Integration of AI solutions to automate processes and boost productivity.',
    items: [
      'Workflow automation',
      'AI model integration',
      'Optimization scripts',
      'Intelligent data analysis',
    ],
  },
  {
    category: 'Web Development',
    title: 'Premium Digital Experiences',
    description:
      'Designing modern, high-performance, user-oriented websites and web apps.',
    items: [
      'High-performance showcase websites',
      'E-commerce & web platforms',
      'Technical SEO optimization',
      'API integration & custom SaaS solutions',
    ],
  },
  {
    category: 'Custom Project',
    title: 'End-to-End Technological Solutions',
    description:
      'Design and development of unique, complex projects tailored to your specific tech needs.',
    items: [
      'Specifications & rapid prototyping',
      'Agile & iterative development',
      'Guidance & knowledge transfer',
      'Continuous support & guaranteed scalability',
    ],
  },
]

const servicesList = computed(() => {
  return store.locale === 'fr' ? servicesFr : servicesEn
})
</script>

<template>
  <section id="services" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">
        {{ store.locale === 'fr' ? 'Expertise' : 'Expertise' }}
      </p>
      <h2>
        {{ store.locale === 'fr' ? 'Des services structurés pour accompagner votre croissance.' : 'Structured services to support your growth.' }}
      </h2>
    </div>

    <div class="services-grid">
      <ServiceCard
        v-for="(service, index) in servicesList"
        :key="service.title"
        :service="service"
        class="reveal"
        :class="{ 'featured-card': index === 6 }"
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

@media (min-width: 1100px) {
  .services-grid .featured-card {
    grid-column: span 3;
  }
}

@media (max-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .services-grid .featured-card {
    grid-column: span 2;
  }
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .services-grid .featured-card {
    grid-column: span 1;
  }
}
</style>
