<script setup>
import { defineAsyncComponent } from 'vue'
import HeroSection from './components/hero-section.vue'
import SiteNavbar from './components/site-navbar.vue'
import useScrollReveal from './use-scroll-reveal.js'
import useCursorGrid from './cursor-grid.js'

const ServicesSection = defineAsyncComponent(() => import('./components/services-section.vue'))
const ProjectsSection = defineAsyncComponent(() => import('./components/projects-section.vue'))
const AboutSection = defineAsyncComponent(() => import('./components/about-section.vue'))
const ContactSection = defineAsyncComponent(() => import('./components/contact-section.vue'))
const SiteFooter = defineAsyncComponent(() => import('./components/site-footer.vue'))
const SupportChatbot = defineAsyncComponent(() => import('./components/support-chatbot.vue'))

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
  <SupportChatbot />
</template>
