<script setup>
import AboutSection from './components/about-section.vue'
import ContactSection from './components/contact-section.vue'
import HeroSection from './components/hero-section.vue'
import ProjectsSection from './components/projects-section.vue'
import ServicesSection from './components/services-section.vue'
import SiteFooter from './components/site-footer.vue'
import SiteNavbar from './components/site-navbar.vue'
import useScrollReveal from './use-scroll-reveal.js'
import useCursorGrid from './cursor-grid.js'

useScrollReveal()
useCursorGrid()
</script>

<template>
  <SiteNavbar />

  <main>
    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <AboutSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
