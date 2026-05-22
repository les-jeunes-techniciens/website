<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="project-card">
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
    <span>{{ project.technology }}</span>
  </article>
</template>

<style scoped>
.project-card span {
  display: inline-flex;
  margin-top: 0.8rem;
  color: var(--primary);
  font-size: 0.86rem;
  font-weight: 800;
}
</style>
