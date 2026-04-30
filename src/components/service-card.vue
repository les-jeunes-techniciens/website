<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="service-card">
    <p class="card-kicker">{{ service.category }}</p>
    <h3>{{ service.title }}</h3>
    <p>{{ service.description }}</p>
    <ul>
      <li v-for="item in service.items" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>
