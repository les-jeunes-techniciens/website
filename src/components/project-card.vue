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
