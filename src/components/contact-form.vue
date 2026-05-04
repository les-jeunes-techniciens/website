<script setup>
import { computed, reactive, ref } from 'vue'

const serviceTypes = [
  'Cybersécurité',
  'IA & automatisation',
  'Services informatiques',
  'Création de sites web',
  'Projets personnalisés',
  'Mandats sur mesure',
  'Autre',
]

const form = reactive({
  name: '',
  email: '',
  clientType: '',
  serviceType: '',
  message: '',
})

const touchedFields = reactive({
  name: false,
  email: false,
  clientType: false,
  serviceType: false,
  message: false,
})

const isSubmitting = ref(false)
const statusMessage = ref('')
const hasSubmittedSuccessfully = ref(false)

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))

const nameLabel = computed(() =>
  form.clientType === 'Entreprise' ? "Nom de l'entreprise" : 'Nom',
)

const nameError = computed(() =>
  form.clientType === 'Entreprise'
    ? "Le nom de l'entreprise est requis."
    : 'Le nom est requis.',
)

const validationErrors = computed(() => ({
  name: touchedFields.name && !form.name.trim() ? nameError.value : '',
  email:
    touchedFields.email && !isEmailValid.value
      ? 'Entrez une adresse email valide.'
      : '',
  clientType:
    touchedFields.clientType && !form.clientType ? 'Sélectionnez un type de client.' : '',
  serviceType:
    touchedFields.serviceType && !form.serviceType ? 'Sélectionnez un type de service.' : '',
  message: touchedFields.message && !form.message.trim() ? 'Le message est requis.' : '',
}))

const isFormValid = computed(
  () =>
    form.name.trim() &&
    isEmailValid.value &&
    form.clientType &&
    form.serviceType &&
    form.message.trim(),
)

function markFieldTouched(fieldName) {
  touchedFields[fieldName] = true
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.clientType = ''
  form.serviceType = ''
  form.message = ''
  touchedFields.name = false
  touchedFields.email = false
  touchedFields.clientType = false
  touchedFields.serviceType = false
  touchedFields.message = false
}

async function submitForm() {
  touchedFields.name = true
  touchedFields.email = true
  touchedFields.clientType = true
  touchedFields.serviceType = true
  touchedFields.message = true
  statusMessage.value = ''
  hasSubmittedSuccessfully.value = false

  if (!isFormValid.value) return

  isSubmitting.value = true

  const contactPayload = {
    name: form.name.trim(),
    email: form.email.trim(),
    clientType: form.clientType,
    serviceType: form.serviceType,
    message: form.message.trim(),
  }

  await Promise.resolve(contactPayload)

  statusMessage.value = 'Merci, votre demande a été envoyée.'
  hasSubmittedSuccessfully.value = true
  isSubmitting.value = false
  resetForm()
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="submitForm">
    <label>
      <span class="animated-label-wrapper">
        <Transition name="label-swap" mode="out-in">
          <span :key="nameLabel">{{ nameLabel }}</span>
        </Transition>
      </span>
      <input
        v-model="form.name"
        name="name"
        type="text"
        :autocomplete="form.clientType === 'Entreprise' ? 'organization' : 'name'"
        :aria-invalid="Boolean(validationErrors.name)"
        @blur="markFieldTouched('name')"
      />
      <span v-if="validationErrors.name" class="field-error">{{ validationErrors.name }}</span>
    </label>

    <label>
      Email
      <input
        v-model="form.email"
        name="email"
        type="email"
        autocomplete="email"
        :aria-invalid="Boolean(validationErrors.email)"
        @blur="markFieldTouched('email')"
      />
      <span v-if="validationErrors.email" class="field-error">{{ validationErrors.email }}</span>
    </label>

    <label>
      Type de client
      <select
        v-model="form.clientType"
        name="clientType"
        :aria-invalid="Boolean(validationErrors.clientType)"
        @blur="markFieldTouched('clientType')"
      >
        <option value="" disabled>Choisir une option</option>
        <option value="Entreprise">Entreprise</option>
        <option value="Particulier">Particulier</option>
      </select>
      <span v-if="validationErrors.clientType" class="field-error">
        {{ validationErrors.clientType }}
      </span>
    </label>

    <label>
      Type de service
      <select
        v-model="form.serviceType"
        name="serviceType"
        :aria-invalid="Boolean(validationErrors.serviceType)"
        @blur="markFieldTouched('serviceType')"
      >
        <option value="" disabled>Choisir une option</option>
        <option v-for="serviceType in serviceTypes" :key="serviceType" :value="serviceType">
          {{ serviceType }}
        </option>
      </select>
      <span v-if="validationErrors.serviceType" class="field-error">
        {{ validationErrors.serviceType }}
      </span>
    </label>

    <label>
      Message
      <textarea
        v-model="form.message"
        name="message"
        rows="6"
        :aria-invalid="Boolean(validationErrors.message)"
        @blur="markFieldTouched('message')"
      ></textarea>
      <span v-if="validationErrors.message" class="field-error">
        {{ validationErrors.message }}
      </span>
    </label>

    <button class="primary-button" type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Envoi...' : 'Envoyer la demande' }}
    </button>

    <p
      v-if="statusMessage"
      :class="['form-message', { 'is-success': hasSubmittedSuccessfully }]"
      role="status"
    >
      {{ statusMessage }}
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  display: grid;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2rem);
}

.contact-form label {
  display: grid;
  gap: 0.45rem;
  color: var(--deep);
  font-weight: 800;
  transition: color 320ms ease;
}

.animated-label-wrapper {
  display: block;
  min-height: 1.7rem;
  overflow: hidden;
}

.label-swap-enter-active,
.label-swap-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.label-swap-enter-from {
  opacity: 0;
  transform: translateY(0.35rem);
}

.label-swap-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 0.9rem 1rem;
  color: var(--ink);
  background: var(--field);
  outline: none;
  transition:
    background-color 320ms ease,
    border-color 200ms ease,
    box-shadow 200ms ease,
    color 320ms ease;
}

.contact-form textarea {
  resize: vertical;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-color: var(--green);
  box-shadow: 0 0 0 4px rgba(21, 207, 192, 0.14);
}

.contact-form [aria-invalid='true'] {
  border-color: #d94343;
}

.field-error,
.form-message {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 800;
  color: #b62929;
}

.form-message.is-success {
  color: var(--green);
}
</style>
