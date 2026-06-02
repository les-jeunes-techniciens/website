<script setup>
import { store } from '../store'
import ContactForm from './contact-form.vue'
</script>

<template>
  <section id="contact" class="contact-section page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">
        {{ store.locale === 'fr' ? 'Contact' : 'Contact' }}
      </p>
      <h2>
        {{ store.locale === 'fr' ? 'Parlez-nous de votre besoin.' : 'Tell us about your needs.' }}
      </h2>
      <p>
        {{ store.locale === 'fr' ? 'Décrivez votre projet, votre problème ou l’aide recherchée. Nous analyserons votre demande et vous répondrons avec une approche simple et réaliste.' : 'Describe your project, your problem, or the support you are seeking. We will analyze your request and get back to you with a simple, realistic approach.' }}
      </p>
    </div>

    <ContactForm class="reveal delay-one" />
  </section>
</template>

<style scoped>
.contact-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
}

.contact-section .section-heading {
  max-width: 800px;
}

.contact-section .section-heading p:not(.section-kicker) {
  margin-left: auto;
  margin-right: auto;
}

.contact-form {
  width: 100%;
  max-width: 720px;
  text-align: left;
}
</style>