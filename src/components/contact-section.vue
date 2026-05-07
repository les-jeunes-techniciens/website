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
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1fr);
  gap: 1.25rem;
  align-items: start;
}

@media (max-width: 900px) {
  .contact-section {
    grid-template-columns: 1fr;
  }
}
</style>
