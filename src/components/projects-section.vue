<script setup>
import { computed, ref, nextTick } from 'vue'
import { store } from '../store'
import ProjectCard from './project-card.vue'

const projectsFr = [
  {
    title: 'Écosystème Web Premium',
    description:
      'Développement de plateformes modernes et performantes, optimisées pour le référencement et l’expérience utilisateur.',
    technology: 'React, Vue.js, Vite, Node.js, Architecture Cloud',
    detailedDescription:
      'Conception et développement complet d’applications et sites web haute performance. Nous combinons des architectures modernes (React, Vue 3, Single Page Application) avec une couche de rendu ultra-rapide et un hébergement cloud optimisé pour garantir des temps de chargement records et un SEO optimal.',
    softwareUsed: ['React', 'Vue.js', 'Vite', 'Node.js', 'Git', 'VS Code', 'Docker', 'TailwindCSS', 'Figma', 'Nginx', 'GitHub Actions'],
    benefits: [
      'Temps de chargement divisé par 3',
      'Indexation SEO maximisée sur Google',
      'Interface responsive fluide et moderne',
      'Sécurité accrue contre les attaques web'
    ],
    deliverables: ['Code source propre & documenté', 'Rapports de performance Lighthouse > 95%', 'Hébergement cloud configuré']
  },
  {
    title: 'Flux d’Automatisation IA',
    description:
      'Intégration d’agents intelligents pour automatiser la gestion des données, le service client et les workflows internes.',
    technology: 'Python, OpenAI API, LangChain, Automatisation No-Code',
    detailedDescription:
      'Mise en place d’agents intelligents et de flux de travail automatisés connectés à vos outils quotidiens. En utilisant l’IA générative et des technologies comme LangChain, nous permettons à vos équipes de se concentrer sur l’essentiel en automatisant la saisie de données, l’analyse de documents et les réponses clients de premier niveau.',
    softwareUsed: ['Python', 'OpenAI API', 'LangChain', 'Git', 'VS Code', 'Make / Zapier', 'Docker', 'PostgreSQL', 'Jupyter Notebooks'],
    benefits: [
      'Réduction de 70% du temps sur les tâches répétitives',
      'Traitement de données 24h/24 sans interruption',
      'Intégration transparente avec vos API existantes',
      'Réponses clients instantanées et personnalisées'
    ],
    deliverables: ['Scripts de traitement automatisés', 'Tableau de bord de suivi', 'Documentation d\'utilisation']
  },
  {
    title: 'Audit & Sécurité',
    description:
      'Analyse approfondie des infrastructures numériques pour garantir la confidentialité et l’intégrité de vos données.',
    technology: 'Pentesting, MFA, Chiffrement, Normes de Sécurité',
    detailedDescription:
      'Audit de sécurité complet et tests d’intrusion (Pentesting) pour identifier et corriger les failles avant qu’elles ne soient exploitées. Nous mettons en œuvre des protocoles rigoureux de chiffrement, d’authentification multifacteur (MFA) et formons vos équipes aux bonnes pratiques cyber.',
    softwareUsed: ['Wireshark', 'Nmap', 'Burp Suite', 'Git', 'VS Code', 'Linux Security Tools', 'OpenSSL', 'Docker'],
    benefits: [
      'Protection totale contre les rançongiciels (Ransomware)',
      'Conformité avec les normes de protection des données',
      'Sensibilisation et réduction des risques humains',
      'Sérénité totale concernant la confidentialité client'
    ],
    deliverables: ['Rapport d’audit détaillé des vulnérabilités', 'Plan de remédiation priorisé', 'Attestation de conformité de sécurité']
  },
  {
    title: 'Infrastructure SI',
    description:
      'Mise en place et maintenance de serveurs, réseaux et postes de travail pour une productivité maximale.',
    technology: 'Virtualisation, Monitoring, Sauvegarde, Réseaux',
    detailedDescription:
      'Conception, déploiement et administration d’infrastructures informatiques locales et cloud. Nous mettons en place des politiques de sauvegarde automatique, des systèmes de monitoring en temps réel pour prévenir les pannes et configurons des réseaux sécurisés et ultra-rapides.',
    softwareUsed: ['Proxmox / VMware', 'Docker', 'Zabbix / Prometheus', 'Git', 'VS Code', 'Portainer', 'Linux Server', 'TrueNAS', 'Nginx'],
    benefits: [
      'Disponibilité système (Uptime) garantie à 99.9%',
      'Sauvegardes automatiques redondées (stratégie 3-2-1)',
      'Détection proactive des anomalies réseau',
      'Performance réseau maximisée pour les postes'
    ],
    deliverables: ['Schéma d’architecture réseau détaillé', 'Système de monitoring configuré', 'Plan de sauvegarde automatisé']
  },
  {
    title: 'Outils Métiers Sur Mesure',
    description:
      'Conception d’applications internes spécifiques pour la gestion de stocks, de projets ou de relations clients.',
    technology: 'React, PostgreSQL, API REST, Docker',
    detailedDescription:
      'Développement de logiciels professionnels internes sur mesure, conçus spécifiquement pour s’adapter à vos processus métiers uniques. Qu’il s’agisse de gestion de stocks, de CRM personnalisé ou de facturation automatique, nous créons des outils ergonomiques qui éliminent les frictions opérationnelles.',
    softwareUsed: ['React', 'PostgreSQL', 'Express.js', 'Git', 'VS Code', 'Docker', 'TailwindCSS', 'Figma', 'Prisma ORM'],
    benefits: [
      'Centralisation de toutes vos données opérationnelles',
      'Zéro frais d’abonnement logiciel récurrent',
      'Évolutivité totale selon la croissance de l’entreprise',
      'Interface intuitive ne nécessitant pas de formation complexe'
    ],
    deliverables: ['Application web interne complète', 'Base de données relationnelle sécurisée', 'Code source modulaire et évolutif']
  },
  {
    title: 'Conseil Technologique',
    description:
      'Accompagnement stratégique pour le choix et l’implémentation des meilleures solutions du marché.',
    technology: 'Analyse de besoins, Roadmap, Formation, Veille',
    detailedDescription:
      'Accompagnement et conseil stratégique pour guider votre transition numérique. Nous analysons vos flux de travail actuels, identifions les meilleures technologies du marché à adopter et concevons une feuille de route claire pour implémenter ces solutions sans perturber vos opérations en cours.',
    softwareUsed: ['Figma', 'Miro', 'Git', 'VS Code', 'Office / Workspace Suites', 'Notion', 'Lighthouse', 'Veille technologique active'],
    benefits: [
      'Choix technologiques sécurisés et pérennes',
      'Économies substantielles sur les licences logicielles',
      'Feuille de route de transition claire et planifiée',
      'Acculturation réussie de vos collaborateurs'
    ],
    deliverables: ['Cahier des charges & Spécifications', 'Roadmap de transition numérique', 'Guide comparatif des technologies']
  },
]

const projectsEn = [
  {
    title: 'Premium Web Ecosystem',
    description:
      'Development of modern, high-performance platforms optimized for SEO and user experience.',
    technology: 'React, Vue.js, Vite, Node.js, Cloud Architecture',
    detailedDescription:
      'Complete design and development of high-performance web applications and sites. We combine modern architectures (React, Vue 3, Single Page Application) with an ultra-fast rendering layer and optimized cloud hosting to guarantee record-breaking load times and optimal SEO.',
    softwareUsed: ['React', 'Vue.js', 'Vite', 'Node.js', 'Git', 'VS Code', 'Docker', 'TailwindCSS', 'Figma', 'Nginx', 'GitHub Actions'],
    benefits: [
      'Load times divided by 3',
      'Maximized Google SEO indexing',
      'Fluid & modern responsive interface',
      'Increased security against web attacks'
    ],
    deliverables: ['Clean & documented source code', 'Lighthouse performance reports > 95%', 'Configured cloud hosting']
  },
  {
    title: 'AI Automation Workflows',
    description:
      'Integration of internal agents to automate data management, customer service, and workflows.',
    technology: 'Python, OpenAI API, LangChain, No-Code Automation',
    detailedDescription:
      'Implementation of intelligent agents and automated workflows connected to your daily tools. Using generative AI and technologies like LangChain, we enable your teams to focus on the essentials by automating data entry, document analysis, and first-level customer replies.',
    softwareUsed: ['Python', 'OpenAI API', 'LangChain', 'Git', 'VS Code', 'Make / Zapier', 'Docker', 'PostgreSQL', 'Jupyter Notebooks'],
    benefits: [
      '70% reduction in time spent on repetitive tasks',
      '24/7 data processing without interruption',
      'Seamless integration with your existing APIs',
      'Instant and personalized customer replies'
    ],
    deliverables: ['Automated processing scripts', 'Monitoring dashboard', 'User documentation']
  },
  {
    title: 'Audit & Security',
    description:
      'In-depth analysis of digital infrastructures to guarantee the confidentiality and integrity of your data.',
    technology: 'Pentesting, MFA, Encryption, Security Standards',
    detailedDescription:
      'Comprehensive security audit and penetration testing (Pentesting) to identify and fix vulnerabilities before they can be exploited. We implement rigorous encryption protocols, multi-factor authentication (MFA), and train your teams on cyber best practices.',
    softwareUsed: ['Wireshark', 'Nmap', 'Burp Suite', 'Git', 'VS Code', 'Linux Security Tools', 'OpenSSL', 'Docker'],
    benefits: [
      'Total protection against ransomware',
      'Compliance with data protection standards',
      'Human risk awareness & reduction',
      'Total peace of mind regarding client confidentiality'
    ],
    deliverables: ['Detailed vulnerability audit report', 'Prioritized remediation plan', 'Security compliance certificate']
  },
  {
    title: 'IT Infrastructure',
    description:
      'Setup and maintenance of servers, networks, and workstations for maximum productivity.',
    technology: 'Virtualization, Monitoring, Backup, Networks',
    detailedDescription:
      'Design, deployment, and administration of local and cloud IT infrastructures. We set up automatic backup policies, real-time monitoring systems to prevent outages, and configure secure, ultra-fast networks.',
    softwareUsed: ['Proxmox / VMware', 'Docker', 'Zabbix / Prometheus', 'Git', 'VS Code', 'Portainer', 'Linux Server', 'TrueNAS', 'Nginx'],
    benefits: [
      'System availability (Uptime) guaranteed at 99.9%',
      'Redundant automatic backups (3-2-1 strategy)',
      'Proactive network anomaly detection',
      'Maximized network performance for workstations'
    ],
    deliverables: ['Detailed network architecture diagram', 'Configured monitoring system', 'Automated backup plan']
  },
  {
    title: 'Custom Business Tools',
    description:
      'Design of specific internal applications for stock, project, or customer relation management.',
    technology: 'React, PostgreSQL, REST API, Docker',
    detailedDescription:
      'Development of custom professional internal software, designed specifically to adapt to your unique business processes. Whether stock management, custom CRM, or automated billing, we build ergonomic tools that eliminate operational friction.',
    softwareUsed: ['React', 'PostgreSQL', 'Express.js', 'Git', 'VS Code', 'Docker', 'TailwindCSS', 'Figma', 'Prisma ORM'],
    benefits: [
      'Centralization of all operational data',
      'Zero recurring software subscription fees',
      'Total scalability to match business growth',
      'Intuitive interface requiring no complex training'
    ],
    deliverables: ['Complete internal web application', 'Secure relational database', 'Modular & scalable source code']
  },
  {
    title: 'IT Consulting',
    description:
      'Strategic guidance for selecting and implementing the best market solutions.',
    technology: 'Needs Analysis, Roadmap, Training, Tech Watch',
    detailedDescription:
      'Strategic consulting and support to guide your digital transition. We analyze your current workflows, identify the best market technologies to adopt, and design a clear roadmap to implement these solutions without disrupting your ongoing operations.',
    softwareUsed: ['Figma', 'Miro', 'Git', 'VS Code', 'Office / Workspace Suites', 'Notion', 'Lighthouse', 'Tech Watch'],
    benefits: [
      'Secure and durable technological choices',
      'Substantial savings on software licenses',
      'Clear and planned transition roadmap',
      'Successful integration of your employees'
    ],
    deliverables: ['Specifications & Requirements', 'Digital transition roadmap', 'Technology comparison guide']
  },
]

const projectsList = computed(() => {
  return store.locale === 'fr' ? projectsFr : projectsEn
})

const selectedProject = ref(null)

function openModal(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden' // Empêche le défilement de la page arrière
}

function closeModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

function handleCtaClick() {
  if (!selectedProject.value) return
  
  const title = selectedProject.value.title
  let service = ''
  
  if (title === 'Écosystème Web Premium' || title === 'Premium Web Ecosystem') {
    service = 'Développement Web'
  } else if (title === 'Flux d’Automatisation IA' || title === 'AI Automation Workflows') {
    service = 'Automatisation & IA'
  } else if (title === 'Audit & Sécurité' || title === 'Audit & Security') {
    service = 'Sécurité Numérique'
  } else if (title === 'Infrastructure SI' || title === 'IT Infrastructure') {
    service = 'Composants Matériels'
  } else if (title === 'Outils Métiers Sur Mesure' || title === 'Custom Business Tools') {
    service = 'Conception Logicielle'
  } else if (title === 'Conseil Technologique' || title === 'IT Consulting') {
    service = 'Projet Sur Mesure'
  }
  
  if (service) {
    store.setService(service)
  }
  
  closeModal()

  nextTick(() => {
    const targetElement = document.getElementById('service-selection-field')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}
</script>

<template>
  <section id="solutions" class="page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">
        {{ store.locale === 'fr' ? 'Réalisations' : 'Realizations' }}
      </p>
      <h2>
        {{ store.locale === 'fr' ? 'Des solutions concrètes pour propulser votre entreprise.' : 'Concrete solutions to propel your business.' }}
      </h2>
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="project in projectsList"
        :key="project.title"
        :project="project"
        class="reveal"
        @open="openModal(project)"
      />
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
          <div class="modal-card">
            <button class="close-button" @click="closeModal" :aria-label="store.locale === 'fr' ? 'Fermer la fenêtre' : 'Close window'">×</button>
            
            <header class="modal-header">
              <span class="modal-tech">{{ selectedProject.technology }}</span>
              <h2>{{ selectedProject.title }}</h2>
            </header>

            <div class="modal-body">
              <section class="modal-desc-section">
                <h3>
                  {{ store.locale === 'fr' ? 'Description détaillée' : 'Detailed Description' }}
                </h3>
                <p>{{ selectedProject.detailedDescription }}</p>
              </section>

              <section class="modal-tools-section">
                <h3>
                  {{ store.locale === 'fr' ? 'Logiciels & Outils utilisés' : 'Software & Tools Used' }}
                </h3>
                <div class="tools-grid">
                  <span v-for="tool in selectedProject.softwareUsed" :key="tool" class="tool-tag">
                    {{ tool }}
                  </span>
                </div>
              </section>

              <div class="modal-grid-two-cols">
                <section class="modal-benefits">
                  <h3>
                    {{ store.locale === 'fr' ? 'Bénéfices clés' : 'Key Benefits' }}
                  </h3>
                  <ul>
                    <li v-for="benefit in selectedProject.benefits" :key="benefit">
                      <span class="check-icon">✓</span>
                      <span>{{ benefit }}</span>
                    </li>
                  </ul>
                </section>

                <section class="modal-deliverables">
                  <h3>
                    {{ store.locale === 'fr' ? 'Livrables' : 'Deliverables' }}
                  </h3>
                  <ul>
                    <li v-for="deliv in selectedProject.deliverables" :key="deliv">
                      <span class="bullet-icon">✦</span>
                      <span>{{ deliv }}</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>

            <footer class="modal-footer">
              <a href="#contact" class="primary-button modal-cta-btn" @click="handleCtaClick">
                {{ store.locale === 'fr' ? 'Discuter de ce type de projet' : 'Discuss this type of project' }}
              </a>
            </footer>
          </div>
        </div>
      </Transition>
    </Teleport>
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

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 9, 7, 0.7);
  backdrop-filter: blur(16px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.5rem;
}

.modal-card {
  position: relative;
  background: var(--surface-strong);
  border: 1px solid var(--line-strong);
  border-radius: 28px;
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 3rem;
  box-shadow: var(--shadow-strong);
  animation: modalScaleUp 350ms cubic-bezier(0.2, 0.85, 0.28, 1) both;
}

@keyframes modalScaleUp {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(15px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--deep);
  border: none;
  font-size: 1.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 200ms ease;
}

.close-button:hover {
  background: var(--line-strong);
  transform: rotate(90deg);
}

.modal-header {
  margin-bottom: 2rem;
  padding-right: 2rem;
}

.modal-tech {
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  display: block;
  margin-bottom: 0.5rem;
}

.modal-header h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.15;
  margin-bottom: 0;
}

.modal-body {
  display: grid;
  gap: 2rem;
  text-align: left;
}

.modal-body h3 {
  font-size: 1.1rem;
  color: var(--deep);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-desc-section p {
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 0;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tool-tag {
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid var(--line);
  color: var(--primary);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(52, 211, 153, 0.03);
  transition: all 200ms ease;
}

.tool-tag:hover {
  border-color: var(--primary);
  background: rgba(52, 211, 153, 0.15);
  box-shadow: 0 4px 12px rgba(52, 211, 153, 0.12);
  transform: translateY(-1px);
}

.modal-grid-two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.modal-benefits ul,
.modal-deliverables ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.65rem;
}

.modal-benefits li,
.modal-deliverables li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.98rem;
  color: var(--ink);
  line-height: 1.4;
}

.check-icon {
  color: var(--primary);
  font-weight: 900;
}

.bullet-icon {
  color: var(--secondary);
}

.modal-footer {
  margin-top: 2.5rem;
  display: flex;
  justify-content: flex-end;
}

.modal-cta-btn {
  min-height: 3rem;
  padding: 0.75rem 1.75rem;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 300ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
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
  
  .modal-grid-two-cols {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-card {
    padding: 2rem 1.5rem;
  }
  
  .modal-footer {
    justify-content: center;
  }
  
  .modal-cta-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
