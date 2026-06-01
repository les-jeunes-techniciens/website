<script setup>
import { store } from '../store'

defineProps({
  service: {
    type: Object,
    required: true,
  },
})

function selectService(category) {
  store.setService(category)
  const targetElement = document.getElementById('service-selection-field')
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <article class="service-card" :class="{ 'is-construction': service.isConstruction }" @click="selectService(service.category)">
    <div class="card-header">
      <p class="card-kicker">{{ service.category }}</p>
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
    </div>
    <ul>
      <li v-for="item in service.items" :key="item">
        <span class="bullet">→</span>
        <span class="item-text">{{ item }}</span>
      </li>
    </ul>
    <div v-if="service.isConstruction" class="construction-overlay">
      <span>{{ store.locale === 'fr' ? 'En construction' : 'In construction' }}</span>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  position: relative;
  padding: 2rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 24px;
  cursor: pointer;
  transition: all 300ms ease;
  overflow: hidden;
}

.service-card:hover {
  border-color: var(--secondary);
  background: var(--surface-strong);
  transform: translateY(-5px);
  box-shadow: var(--shadow-strong);
}

.service-card.is-construction {
  background: #4a5a52;
  border-color: #5a6a62;
  opacity: 0.8;
}

.service-card.is-construction:hover {
  background: #4a5a52;
  border-color: #5a6a62;
  transform: none;
  box-shadow: none;
}

.construction-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 300ms ease;
  overflow: hidden;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
}

.construction-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    #ff8c00,
    #ff8c00 15px,
    #1a1a1a 15px,
    #1a1a1a 30px
  );
  animation: stripes-move 2s linear infinite;
}

@keyframes stripes-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(60px);
  }
}

.construction-overlay span {
  position: relative;
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 11;
  white-space: nowrap;
  line-height: 1;
}

.service-card.is-construction:hover .construction-overlay {
  opacity: 1;
}

.card-kicker {
  margin: 0 0 1rem;
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.service-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.service-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--muted);
}

.service-card ul {
  display: grid;
  gap: 0.75rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.service-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--ink);
}

.bullet {
  color: var(--secondary);
  font-weight: 900;
  line-height: 1.4;
}

.item-text {
  line-height: 1.4;
}

@media (min-width: 1100px) {
  .service-card.featured-card {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 3rem;
    align-items: center;
  }
  .service-card.featured-card ul {
    margin-top: 0;
  }
}
</style>
