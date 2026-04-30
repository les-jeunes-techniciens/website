<script setup>
import ContactForm from './components/contact-form.vue'
import ProjectCard from './components/project-card.vue'
import ServiceCard from './components/service-card.vue'
import SiteFooter from './components/site-footer.vue'
import SiteNavbar from './components/site-navbar.vue'

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
];

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

const values = ['Transparence', 'Simplicité', 'Orientation résultats']

const proofPoints = [
  'Une équipe encadrée, motivée et orientée performance',
  'Des solutions pensées pour attirer, convaincre et convertir',
  'Une communication simple, rapide et transparente',
]
</script>

<template>
  <SiteNavbar />

  <main>
    <section id="accueil" class="hero-section">
      <div class="hero-content reveal">
        <p class="section-kicker">Organisation étudiante en informatique</p>
        <h1>Des services techniques sérieux, humains et orientés résultats.</h1>
        <p>
          Les Jeunes Techniciens accompagnent les entreprises et les particuliers avec
          des solutions concrètes en cybersécurité, automatisation, web et support
          informatique.
        </p>
        <a class="primary-button" href="#contact">Nous contacter</a>
      </div>

      <div class="hero-panel reveal delay-one">
        <span>Approche</span>
        <strong>Stratégie claire, exécution rapide, impact mesurable.</strong>
        <p>
          Nous transformons vos besoins en actions concrètes pour renforcer votre
          présence, optimiser vos processus et générer des résultats.
        </p>
      </div>
    </section>

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

    <section id="a-propos" class="about-section page-section">
      <div class="section-heading reveal">
        <p class="section-kicker">À propos</p>
        <h2>Une équipe étudiante avec l’énergie d’une startup et le sérieux d’un partenaire.</h2>
      </div>

      <div class="about-grid">
        <div class="about-copy">
          <p>
            Les Jeunes Techniciens donnent aux entreprises et aux particuliers accès à
            une relève motivée, curieuse et concrète. Notre force: transformer les idées
            en solutions utiles, avec une approche claire, humaine et orientée résultats.
          </p>
          <p>
            Chaque mandat est pensé pour créer un impact visible: mieux présenter
            votre offre, simplifier vos opérations, augmenter votre efficacité et
            soutenir votre croissance. Nous travaillons comme une jeune entreprise:
            rapidement, simplement et avec le souci de bien faire.
          </p>
        </div>

        <div class="about-card">
          <h3>Pourquoi travailler avec nous?</h3>
          <ul>
            <li v-for="proofPoint in proofPoints" :key="proofPoint">{{ proofPoint }}</li>
          </ul>
        </div>
      </div>

      <div class="values-row">
        <div>
          <p class="section-kicker">Nos valeurs</p>
          <p>Un cadre simple pour créer une relation de confiance dès le premier échange.</p>
        </div>
        <div class="values-list">
          <span v-for="value in values" :key="value">{{ value }}</span>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section page-section">
      <div class="section-heading reveal">
        <p class="section-kicker">Contact</p>
        <h2>Parlez-nous de votre besoin.</h2>
        <p>
          Une demande claire reçoit une réponse claire. Décrivez votre projet, votre
          problème ou l’aide recherchée.
        </p>
      </div>

      <ContactForm class="reveal delay-one" />
    </section>
  </main>

  <SiteFooter />
</template>
