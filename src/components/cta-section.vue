<script setup>
import { store } from '../store'
</script>

<template>
  <section class="cta-section reveal">
    <div class="cta-container">
      <div class="cta-content">
        <p class="section-kicker cta-kicker">
          {{ store.locale === 'fr' ? 'Développement sur mesure' : 'Custom Development' }}
        </p>
        <h2>
          {{ store.locale === 'fr' ? 'Prêt à donner vie à vos projets ?' : 'Ready to bring your projects to life?' }}
        </h2>
        <p class="cta-description">
          {{ store.locale === 'fr' ? 'Que vous ayez besoin d\'une architecture logicielle unique, d\'une infrastructure robuste ou de sécuriser vos actifs, notre équipe est là pour transformer vos défis en succès.' : 'Whether you need a unique software architecture, a robust infrastructure, or to secure your assets, our team is here to transform your challenges into successes.' }}
        </p>
        <div class="cta-actions">
          <a href="#contact" class="cta-button">
            {{ store.locale === 'fr' ? 'T\'es prêt ? Commençons !' : 'Ready? Let\'s start!' }} <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: clamp(3rem, 6vw, 5rem) 0;
  display: flex;
  justify-content: center;
}

.cta-container {
  width: 100%;
  max-width: 960px;
  background: linear-gradient(135deg, rgba(17, 40, 33, 0.7) 0%, rgba(10, 20, 16, 0.9) 100%);
  border: 1px solid var(--line-strong);
  border-radius: 28px;
  padding: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-strong);
  backdrop-filter: blur(18px);
}

.cta-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.08) 0%, transparent 60%);
  pointer-events: none;
}

.cta-kicker {
  margin-bottom: 1.25rem;
}

.cta-container h2 {
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.25rem;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.cta-description {
  max-width: 620px;
  margin: 0 auto 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--muted);
}

.cta-actions {
  display: flex;
  justify-content: center;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  padding: 1rem 2.75rem;
  border-radius: 14px;
  color: #050b09;
  font-weight: 800;
  font-size: 1.1rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  box-shadow: 0 12px 30px rgba(52, 211, 153, 0.4);
  transition: all 300ms cubic-bezier(0.2, 0.85, 0.28, 1);
  overflow: hidden;
  z-index: 1;
}

.cta-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transition: left 600ms cubic-bezier(0.2, 0.85, 0.28, 1);
  z-index: -1;
}

.cta-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 40px rgba(52, 211, 153, 0.55);
}

.cta-button:hover::before {
  left: 100%;
}

.arrow {
  margin-left: 0.5rem;
  font-weight: 900;
  transition: transform 200ms ease;
}

.cta-button:hover .arrow {
  transform: translateX(5px);
}
</style>
