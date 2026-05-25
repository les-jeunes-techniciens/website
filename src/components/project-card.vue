<script setup>
import { store } from '../store'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
defineEmits(['open'])
</script>

<template>
  <article class="project-card" @click="$emit('open')">
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
    <div class="project-footer">
      <span class="tech-tag">{{ project.technology }}</span>
      <span class="more-link">{{ store.locale === 'fr' ? 'Détails ↗' : 'Details ↗' }}</span>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.tech-tag {
  display: inline-flex;
  margin-top: 0.8rem;
  color: var(--primary);
  font-size: 0.86rem;
  font-weight: 800;
}

.more-link {
  display: inline-flex;
  margin-top: 0.8rem;
  color: var(--secondary);
  font-size: 0.86rem;
  font-weight: 800;
  opacity: 0.7;
  transition: opacity 200ms ease, transform 200ms ease;
}

.project-card:hover .more-link {
  opacity: 1;
  transform: translateX(3px);
}
</style>
