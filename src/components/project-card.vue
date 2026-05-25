<script setup>
const emit = defineEmits(['openProject'])

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

function handleClick() {
  emit('openProject', project)
}
</script>

<template>
  <article class="project-card" @click="handleClick">
    <h3>{{ project.title }}</h3>
    <p>{{ project.summary }}</p>
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
