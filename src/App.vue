<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let observer

onMounted(() => {
  const items = document.querySelectorAll('[data-reveal]')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  items.forEach((item) => observer.observe(item))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="page-shell">
    <div class="page-glow page-glow-left"></div>
    <div class="page-glow page-glow-right"></div>
    <div class="page-grid-lines"></div>

    <header class="topbar">
      <a class="brand" href="#" aria-label="Les jeunes techniciens">
        <span class="brand-mark">LJT</span>
        <span class="brand-copy">
          <strong>Les jeunes techniciens</strong>
          <span>Organisation étudiante en informatique du Cégep de Trois-Rivières</span>
        </span>
      </a>

      <nav class="topnav" aria-label="Navigation principale">
        <a href="#mission">Projet</a>
        <a href="#structure">Structure</a>
        <a href="#fonctionnement">Fonctionnement</a>
        <a href="#vision">Vision</a>
        <a class="login-button" href="#">Connexion</a>
      </nav>
    </header>

    <main>
      <p class="intro-line reveal-up is-visible">
        À Trois-Rivières, une relève technique est en train de se construire autour de projets concrets.
      </p>

      <section class="hero section-spacing">
        <div class="hero-copy reveal-up is-visible">
          <span class="section-label">Organisation étudiante ambitieuse</span>
          <p class="hero-kicker">Créer. Collaborer. Livrer. Évoluer.</p>
          <h1>Des projets réels pour former une relève capable de bâtir plus grand.</h1>
          <p class="hero-text">
            Les jeunes techniciens est une initiative du Cégep de Trois-Rivières
            qui transforme les compétences étudiantes en expériences concrètes,
            professionnelles et valorisantes, au service de projets utiles et
            d’une vision durable.
          </p>

          <div class="hero-actions">
            <a class="primary-button" href="#mission">Découvrir le projet</a>
            <a class="secondary-button" href="#vision">Explorer la vision</a>
          </div>

          <div class="hero-ribbon">
            <span>Projets réels</span>
            <span>Équipe structurée</span>
            <span>Vision évolutive</span>
          </div>

          <div class="hero-mini-links">
            <a href="#fonctionnement">Voir comment ça fonctionne</a>
            <a href="#vision">Comprendre l’ambition du projet</a>
          </div>
        </div>

        <aside class="hero-aside reveal-up is-visible" aria-label="Aperçu du projet">
          <div class="hero-feature-card spotlight-card">
            <span class="mini-label">Positionnement</span>
            <h2>Une vitrine crédible pour apprendre vite, livrer mieux et évoluer sérieusement.</h2>
            <p>
              Le projet rassemble l’énergie étudiante, la rigueur d’une vraie
              organisation et la promesse de mandats concrets qui développent
              autant les compétences que la confiance.
            </p>
          </div>

          <div class="hero-stat-grid">
            <article class="stat-card">
              <strong>Projets concrets</strong>
              <span>Des mandats qui développent des réflexes professionnels dès maintenant.</span>
            </article>
            <article class="stat-card">
              <strong>Collaboration active</strong>
              <span>Une dynamique d’équipe qui relie étudiants, conseil et partenaires.</span>
            </article>
            <article class="stat-card">
              <strong>Potentiel réel</strong>
              <span>Une base sérieuse pouvant mener vers une véritable startup.</span>
            </article>
          </div>
        </aside>
      </section>

      <section class="mission-band section-spacing reveal-up" data-reveal id="mission">
        <div class="mission-grid">
          <div>
            <span class="section-label">Présentation du projet</span>
            <h2>Une structure pensée pour faire grandir les étudiants à travers des projets réels.</h2>
          </div>
          <p>
            Le projet vise à créer une organisation étudiante en informatique
            capable de réaliser des mandats concrets, de développer des
            compétences solides et de bâtir progressivement une structure
            évolutive, crédible et professionnelle.
          </p>
        </div>
      </section>

      <section class="story section-spacing">
        <div class="section-heading reveal-up" data-reveal>
          <span class="section-label">Vision</span>
          <h2>Former une relève capable de livrer, de collaborer et de construire dans la durée.</h2>
          <p>
            La vision est claire : offrir un environnement où les étudiants
            travaillent sur de vrais projets, développent des compétences
            concrètes, évoluent dans une structure sérieuse et contribuent à une
            organisation qui peut grandir durablement.
          </p>
        </div>

        <div class="story-grid">
          <article class="story-card reveal-up" data-reveal>
            <span class="card-index">01</span>
            <h3>Travailler sur du réel</h3>
            <p>
              Les projets sont choisis pour leur utilité, leur faisabilité et
              leur capacité à créer une vraie expérience terrain.
            </p>
          </article>

          <article class="story-card reveal-up" data-reveal>
            <span class="card-index">02</span>
            <h3>Développer des compétences concrètes</h3>
            <p>
              Technique, autonomie, communication, gestion et collaboration :
              chaque mandat fait progresser l’équipe de façon tangible.
            </p>
          </article>

          <article class="story-card reveal-up" data-reveal>
            <span class="card-index">03</span>
            <h3>Évoluer vers une structure forte</h3>
            <p>
              Le projet avance vers une organisation reconnue, stable et
              potentiellement entrepreneuriale.
            </p>
          </article>
        </div>

        <div class="story-marquee reveal-up" data-reveal aria-hidden="true">
          <span>Collaboration</span>
          <span>Professionnalisme</span>
          <span>Mandats réels</span>
          <span>Apprentissage concret</span>
          <span>Vision d’avenir</span>
        </div>
      </section>

      <section class="dual-section section-spacing" id="structure">
        <article class="editorial-card reveal-left" data-reveal>
          <span class="section-label">Responsable du projet / Conseil exécutif</span>
          <h2>Porter la vision, coordonner l’action et ouvrir les opportunités.</h2>
          <p>
            Le conseil exécutif donne l’impulsion au projet. Il structure la
            direction générale, coordonne les activités, développe les contacts
            et maintient le lien avec le cégep et les partenaires.
          </p>
          <ul class="editorial-list">
            <li>Définir la vision et les objectifs</li>
            <li>Coordonner les activités du projet</li>
            <li>Développer les opportunités et les contrats</li>
            <li>Assurer le lien avec le cégep et les partenaires</li>
          </ul>
        </article>

        <article class="editorial-card reveal-right" data-reveal>
          <span class="section-label">Conseil d’administration</span>
          <h2>Valider avec rigueur pour garder le projet solide et crédible.</h2>
          <p>
            Le CA analyse les opportunités, évalue la faisabilité des mandats et
            encadre les orientations majeures afin de soutenir un développement
            responsable et durable.
          </p>
          <ul class="editorial-list">
            <li>Analyser et valider les opportunités de contrats</li>
            <li>Évaluer la faisabilité et les ressources disponibles</li>
            <li>Prendre les décisions importantes</li>
            <li>Encadrer les orientations du projet</li>
          </ul>
        </article>
      </section>

      <section class="single-panel section-spacing reveal-up" data-reveal>
        <div class="single-panel-copy">
          <span class="section-label">Équipe opérationnelle / Équipe technique</span>
          <h2>Faire avancer les projets, élever la qualité et transformer l’expérience en compétence.</h2>
          <p>
            L’équipe opérationnelle réalise les mandats, collabore sur les
            livrables, participe à l’évolution de l’organisation et développe ses
            compétences dans un contexte concret, stimulant et professionnalisant.
          </p>
        </div>
      </section>

      <section class="contract-section section-spacing" id="fonctionnement">
        <div class="section-heading reveal-up" data-reveal>
          <span class="section-label">Fonctionnement</span>
          <h2>Une méthode souple, inspirée de l’agile, pensée pour avancer avec clarté.</h2>
          <p>
            Le projet favorise la collaboration, la communication et
            l’efficacité, sans enfermer l’équipe dans une structure trop rigide.
            L’objectif est de rester simple, lisible et efficace.
          </p>
        </div>

        <div class="contract-grid">
          <article class="contract-card reveal-up" data-reveal>
            <span class="mini-label">Décision</span>
            <h3>Une gouvernance claire</h3>
            <p>
              Les opportunités sont proposées par le conseil exécutif, analysées
              par le CA puis validées à la majorité selon la faisabilité et les
              ressources disponibles.
            </p>
          </article>

          <article class="contract-card featured reveal-up" data-reveal>
            <span class="mini-label">Acceptation</span>
            <h3>Des projets choisis avec discernement</h3>
            <p>
              Chaque mandat est évalué selon les compétences présentes, le temps
              disponible et le réalisme global du projet.
            </p>
          </article>

          <article class="contract-card reveal-up" data-reveal>
            <span class="mini-label">Répartition</span>
            <h3>Des rôles attribués intelligemment</h3>
            <p>
              Le travail est réparti selon les compétences, suivi dans le temps
              puis ajusté au besoin pour protéger la qualité et l’équilibre.
            </p>
          </article>
        </div>
      </section>

      <section class="timeline-section section-spacing">
        <div class="timeline-header reveal-up" data-reveal>
          <span class="section-label">Valeurs et communication</span>
          <h2>Une culture de travail basée sur la transparence, le respect et l’élan collectif.</h2>
        </div>

        <div class="timeline">
          <article class="timeline-item reveal-up" data-reveal>
            <span>1</span>
            <div>
              <h3>Valeurs fondamentales</h3>
              <p>Transparence, communication ouverte, esprit d’équipe, autonomie et amélioration continue.</p>
            </div>
          </article>
          <article class="timeline-item reveal-up" data-reveal>
            <span>2</span>
            <div>
              <h3>Communication claire</h3>
              <p>Des canaux dédiés, des échanges respectueux et un partage d’information régulier pour garder le cap.</p>
            </div>
          </article>
          <article class="timeline-item reveal-up" data-reveal>
            <span>3</span>
            <div>
              <h3>Rencontres efficaces</h3>
              <p>Des points hebdomadaires ou aux deux semaines, centrés sur l’avancement, les blocages et les priorités.</p>
            </div>
          </article>
          <article class="timeline-item reveal-up" data-reveal>
            <span>4</span>
            <div>
              <h3>Engagement responsable</h3>
              <p>Chaque membre contribue selon ses capacités, respecte ses engagements et communique en cas de difficulté.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="tool-section section-spacing">
        <div class="section-heading reveal-up" data-reveal>
          <span class="section-label">Outils de travail</span>
          <h2>Une boîte à outils simple pour garder l’organisation fluide et performante.</h2>
        </div>

        <div class="tool-grid">
          <article class="tool-card reveal-up" data-reveal>
            <strong>Discord</strong>
            <p>Pour les annonces, les échanges rapides et les canaux de projet.</p>
          </article>
          <article class="tool-card reveal-up" data-reveal>
            <strong>Trello</strong>
            <p>Pour visualiser l’avancement, répartir les tâches et garder le rythme.</p>
          </article>
          <article class="tool-card reveal-up" data-reveal>
            <strong>GitHub</strong>
            <p>Pour structurer le code, les contributions et le travail collaboratif.</p>
          </article>
          <article class="tool-card reveal-up" data-reveal>
            <strong>Google Drive</strong>
            <p>Pour centraliser la documentation, les références et les contenus du projet.</p>
          </article>
        </div>
      </section>

      <section class="dual-section section-spacing">
        <article class="editorial-card reveal-left" data-reveal>
          <span class="section-label">Entrée dans le projet</span>
          <h2>Une porte ouverte, avec un minimum de validation pour protéger la qualité.</h2>
          <p>
            Le projet est accessible à tous, mais l’intégration passe par une
            discussion avec le conseil afin d’évaluer la motivation, le sérieux
            et les compétences de base.
          </p>
          <ul class="editorial-list">
            <li>Discussion avec le conseil administratif et exécutif</li>
            <li>Évaluation de la motivation et du sérieux</li>
            <li>Validation des compétences de base</li>
          </ul>
        </article>

        <article class="editorial-card reveal-right" data-reveal>
          <span class="section-label">Gestion des membres</span>
          <h2>Un cadre souple, mais fondé sur la responsabilité individuelle.</h2>
          <p>
            En cas d’inactivité ou de non-respect des engagements, une discussion
            est engagée pour ajuster la participation ou retirer un membre si la
            situation l’exige.
          </p>
          <ul class="editorial-list">
            <li>Discussion ouverte avec le membre concerné</li>
            <li>Ajustement du rôle ou des attentes</li>
            <li>Retrait du projet si nécessaire</li>
          </ul>
        </article>
      </section>

      <section class="dual-section section-spacing">
        <article class="editorial-card reveal-left" data-reveal>
          <span class="section-label">Propriété du travail</span>
          <h2>Le client reçoit le produit final, les étudiants conservent la valeur de l’expérience.</h2>
          <p>
            Les règles sont simples : le client devient propriétaire du produit
            final, les étudiants peuvent intégrer leur travail à leur portfolio
            et les contributions peuvent être reconnues lorsque c’est possible.
          </p>
        </article>

        <article class="editorial-card reveal-right" data-reveal>
          <span class="section-label">Approche progressive</span>
          <h2>Construire l’équipe, livrer, puis structurer la croissance avec méthode.</h2>
          <p>
            Le projet avance étape par étape : construire l’équipe, réaliser des
            projets internes, développer des mandats réels puis consolider une
            organisation de plus en plus mature.
          </p>
        </article>
      </section>

      <section class="revenue-section section-spacing reveal-up" data-reveal>
        <div class="section-heading">
          <span class="section-label">Modèle de revenus</span>
          <h2>Une répartition claire pour encourager l’implication et soutenir la croissance du projet.</h2>
        </div>

        <div class="revenue-grid">
          <article class="revenue-card">
            <strong>Sources de revenus</strong>
            <ul class="editorial-list">
              <li>Réalisation de projets pour des clients externes</li>
              <li>Dons et subventions</li>
              <li>Opportunités liées au cégep ou à des partenaires</li>
            </ul>
          </article>

          <article class="revenue-card featured">
            <strong>Répartition des mandats</strong>
            <ul class="editorial-list">
              <li>Une part pour l’acquisition du contrat</li>
              <li>Une rémunération pour les membres qui réalisent le mandat</li>
              <li>Un pourcentage conservé pour les frais, les outils et le développement de l’OBNL</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="cta-section section-spacing reveal-up" data-reveal id="vision">
        <div class="cta-copy">
          <span class="section-label">Vision à long terme</span>
          <h2>Faire émerger une organisation reconnue, stable et suffisamment forte pour aller encore plus loin.</h2>
          <p>
            À long terme, Les jeunes techniciens veut devenir une structure
            étudiante reconnue, compétente et durable, capable de collaborer
            solidement avec le cégep et d’ouvrir la voie à une véritable startup.
          </p>
        </div>

        <div class="cta-actions">
          <a class="primary-button" href="#">Rejoindre le projet</a>
          <a class="secondary-button subtle-button" href="#">Nous contacter</a>
        </div>
      </section>
    </main>
  </div>
</template>
