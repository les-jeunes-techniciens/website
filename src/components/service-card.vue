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

<style scoped>
.service-card {
  padding: 1.5rem;
}

.card-kicker {
  margin: 0 0 1rem;
  color: var(--green);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.service-card ul {
  display: grid;
  gap: 0.55rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.service-card li {
  position: relative;
  padding-left: 1.1rem;
}

.service-card li::before {
  content: "";
  position: absolute;
  top: 0.72rem;
  left: 0;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--turquoise);
}
</style>
