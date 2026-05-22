<script setup>
import ContactForm from './contact-form.vue'
</script>

<template>
  <section id="contact" class="contact-section page-section">
    <div class="section-heading reveal">
      <p class="section-kicker">Contact</p>
      <h2>Parlez-nous de votre besoin.</h2>
      <p>
        Décrivez votre projet, votre problème ou l’aide recherchée. Nous analyserons votre demande et vous répondrons avec une approche simple et réaliste.
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
  text-align: left; /* Keep form labels left-aligned for usability */
}
</style>
