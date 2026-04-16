<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import FunctioningSection from './components/FunctioningSection.vue'
import GovernanceSection from './components/GovernanceSection.vue'
import HeroSection from './components/HeroSection.vue'
import MissionSection from './components/MissionSection.vue'
import RevenueVisionSection from './components/RevenueVisionSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import StorySection from './components/StorySection.vue'
import TeamLifecycleSection from './components/TeamLifecycleSection.vue'

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

    <SiteHeader />

    <main>
      <HeroSection />
      <MissionSection />
      <StorySection />
      <GovernanceSection />
      <FunctioningSection />
      <TeamLifecycleSection />
      <RevenueVisionSection />
    </main>
  </div>
</template>
