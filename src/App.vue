<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import FunctioningSection from './components/home/FunctioningSection.vue'
import GovernanceSection from './components/home/GovernanceSection.vue'
import HeroSection from './components/home/HeroSection.vue'
import MissionSection from './components/home/MissionSection.vue'
import RevenueVisionSection from './components/home/RevenueVisionSection.vue'
import SiteHeader from './components/home/SiteHeader.vue'
import StorySection from './components/home/StorySection.vue'
import TeamLifecycleSection from './components/home/TeamLifecycleSection.vue'

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
