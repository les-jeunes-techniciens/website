<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '../store'

const currentImageIndex = ref(0)
const images = ['/President.png', '/VP.png']
let fadeInterval

onMounted(() => {
  fadeInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 10000)
})

onUnmounted(() => {
  if (fadeInterval) clearInterval(fadeInterval)
})
</script>

<template>
  <section id="accueil" class="hero-section">
    <div class="hero-container">
      <div class="hero-content reveal">
        <template v-if="store.locale === 'fr'">
          <h1>CONCEPTION DE SOLUTIONS LOGICIELLES</h1>
          <p>
            Nous accompagnons votre croissance avec des solutions numériques innovantes, 
            alliant cybersécurité de pointe et automatisation intelligente.
          </p>
          <div class="hero-actions">
            <a class="primary-button" href="#contact">Démarrer un projet</a>
            <a class="hero-secondary" href="#services">
              <span class="play-icon">▶</span> Voir nos services
            </a>
          </div>
        </template>
        <template v-else>
          <h1>CUSTOM SOFTWARE SOLUTIONS</h1>
          <p>
            We empower your growth with innovative digital systems, 
            combining state-of-the-art cybersecurity and intelligent automation.
          </p>
          <div class="hero-actions">
            <a class="primary-button" href="#contact">Start a Project</a>
            <a class="hero-secondary" href="#services">
              <span class="play-icon">▶</span> Explore Services
            </a>
          </div>
        </template>
      </div>

      <div class="hero-illustration reveal delay-one">
        <div class="hero-images">
          <img 
            v-for="(image, index) in images" 
            :key="image"
            :src="image" 
            :alt="`Team Member ${index + 1}`"
            :class="{ active: currentImageIndex === index }"
            class="hero-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  padding: clamp(5rem, 12vw, 10rem) 0;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.hero-kicker {
  margin-bottom: 1.5rem !important;
  display: block;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5.5vw, 4.8rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 2rem;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: #ffffff;
}

.hero-content p:not(.section-kicker) {
  font-size: 1.2rem;
  color: var(--muted);
  max-width: 580px;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.hero-illustration img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.hero-images {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  border-radius: 24px;
  filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5));
  animation: float 6s ease-in-out infinite;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  z-index: 1;
}

.hero-image.active {
  opacity: 1;
  z-index: 2;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.hero-secondary {
  background: transparent;
  border: none;
  color: var(--ink);
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: transform 200ms ease, color 200ms ease;
}

.hero-secondary:hover {
  color: var(--secondary);
  transform: translateX(8px);
}

.play-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid var(--secondary);
  border-radius: 50%;
  color: var(--secondary);
  font-size: 0.9rem;
  transition: background 200ms ease;
}

.hero-secondary:hover .play-icon {
  background: rgba(99, 102, 241, 0.2);
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-content p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-illustration {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
