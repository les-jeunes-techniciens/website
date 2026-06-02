<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { store } from '../store'

const serviceTypesFr = [
  'Conception Logicielle',
  'Composants Matériels',
  'Support & Assistance',
  'Sécurité Numérique',
  'Automatisation & IA',
  'Développement Web',
  'Projet Sur Mesure',
]

const serviceTypesEn = [
  'Software Design',
  'Hardware Components',
  'Support & Assistance',
  'Digital Security',
  'Automation & AI',
  'Web Development',
  'Custom Project',
]

const serviceTypes = computed(() => {
  return store.locale === 'fr' ? serviceTypesFr : serviceTypesEn
})

const budgetOptionsFr = [
  'Moins de 500 $',
  '500 $ à 1 000 $',
  '1 000 $ à 2 500 $',
  '2 500 $ et plus',
  'À discuter',
]

const budgetOptionsEn = [
  'Under $500',
  '$500 to $1,000',
  '$1,000 to $2,500',
  '$2,500 and more',
  'To be discussed',
]

const budgetOptions = computed(() => {
  return store.locale === 'fr' ? budgetOptionsFr : budgetOptionsEn
})

// Sync with store
watch(() => store.selectedService, (newVal) => {
  if (newVal) {
    const index = serviceTypesFr.indexOf(newVal) !== -1 ? serviceTypesFr.indexOf(newVal) : serviceTypesEn.indexOf(newVal)
    if (index !== -1) {
      form.serviceType = store.locale === 'fr' ? serviceTypesFr[index] : serviceTypesEn[index]
    } else {
      form.serviceType = newVal
    }
  }
})

// Real-time translation of selected options when locale changes
watch(() => store.locale, (newLang) => {
  // Translate clientType value in-place
  if (form.clientType === 'Entreprise' || form.clientType === 'Company') {
    form.clientType = newLang === 'fr' ? 'Entreprise' : 'Company'
  } else if (form.clientType === 'Particulier' || form.clientType === 'Individual') {
    form.clientType = newLang === 'fr' ? 'Particulier' : 'Individual'
  } else if (form.clientType === 'Projet interne / cégep' || form.clientType === 'Internal project / college') {
    form.clientType = newLang === 'fr' ? 'Projet interne / cégep' : 'Internal project / college'
  }

  // Translate serviceType value in-place
  const sIndex = newLang === 'fr' ? serviceTypesEn.indexOf(form.serviceType) : serviceTypesFr.indexOf(form.serviceType)
  if (sIndex !== -1) {
    form.serviceType = newLang === 'fr' ? serviceTypesFr[sIndex] : serviceTypesEn[sIndex]
  }

  // Translate budget value in-place
  const bIndex = newLang === 'fr' ? budgetOptionsEn.indexOf(form.budget) : budgetOptionsFr.indexOf(form.budget)
  if (bIndex !== -1) {
    form.budget = newLang === 'fr' ? budgetOptionsFr[bIndex] : budgetOptionsEn[bIndex]
  }
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  clientType: '',
  serviceType: '',
  budget: '',
  message: '',
})

// Initialize serviceType properly
if (store.selectedService) {
  const index = serviceTypesFr.indexOf(store.selectedService) !== -1 ? serviceTypesFr.indexOf(store.selectedService) : serviceTypesEn.indexOf(store.selectedService)
  if (index !== -1) {
    form.serviceType = store.locale === 'fr' ? serviceTypesFr[index] : serviceTypesEn[index]
  }
}

const touchedFields = reactive({
  name: false,
  email: false,
  clientType: false,
  serviceType: false,
  budget: false,
  message: false,
})

const isSubmitting = ref(false)
const statusMessage = ref('')
const hasSubmittedSuccessfully = ref(false)

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))

const nameLabel = computed(() => {
  if (store.locale === 'fr') {
    return form.clientType === 'Entreprise' ? "Nom de l'entreprise" : 'Nom'
  } else {
    return form.clientType === 'Company' ? 'Company name' : 'Name'
  }
})

const nameError = computed(() => {
  if (store.locale === 'fr') {
    return form.clientType === 'Entreprise'
      ? "Le nom de l'entreprise est requis."
      : 'Le nom est requis.'
  } else {
    return form.clientType === 'Company'
      ? 'Company name is required.'
      : 'Name is required.'
  }
})

const validationErrors = computed(() => ({
  name: touchedFields.name && !form.name.trim() ? nameError.value : '',
  email:
    touchedFields.email && !isEmailValid.value
      ? (store.locale === 'fr' ? 'Entrez une adresse email valide.' : 'Enter a valid email address.')
      : '',
  clientType:
    touchedFields.clientType && !form.clientType 
      ? (store.locale === 'fr' ? 'Sélectionnez un type de client.' : 'Select a client type.') 
      : '',
  serviceType:
    touchedFields.serviceType && !form.serviceType 
      ? (store.locale === 'fr' ? 'Sélectionnez un type de service.' : 'Select a service type.') 
      : '',
  budget: touchedFields.budget && !form.budget 
      ? (store.locale === 'fr' ? 'Sélectionnez un budget.' : 'Select a budget.') 
      : '',
  message: touchedFields.message && !form.message.trim() 
      ? (store.locale === 'fr' ? 'Le message est requis.' : 'Message is required.') 
      : '',
}))

const isFormValid = computed(
  () =>
    form.name.trim() &&
    isEmailValid.value &&
    form.clientType &&
    form.serviceType &&
    form.budget &&
    form.message.trim(),
)

function markFieldTouched(fieldName) {
  touchedFields[fieldName] = true
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.clientType = ''
  form.serviceType = ''
  form.budget = ''
  form.message = ''
  touchedFields.name = false
  touchedFields.email = false
  touchedFields.clientType = false
  touchedFields.serviceType = false
  touchedFields.budget = false
  touchedFields.message = false
}

async function submitForm() {
  touchedFields.name = true
  touchedFields.email = true
  touchedFields.clientType = true
  touchedFields.serviceType = true
  touchedFields.budget = true
  touchedFields.message = true
  statusMessage.value = ''
  hasSubmittedSuccessfully.value = false

  if (!isFormValid.value) return

  isSubmitting.value = true

  const contactPayload = {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    clientType: form.clientType,
    serviceType: form.serviceType,
    budget: form.budget,
    message: form.message.trim(),
  }

  const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL || import.meta.env.VITE_DISCORD_WEBHOOK

  try {
    if (!webhookUrl) throw new Error('Missing webhook URL')

    const content = `New contact request:\nName: ${contactPayload.name}\nEmail: ${contactPayload.email}\nPhone: ${contactPayload.phone}\nClient type: ${contactPayload.clientType}\nService: ${contactPayload.serviceType}\nBudget: ${contactPayload.budget}\nMessage: ${contactPayload.message}`

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })

    if (!res.ok) throw new Error(`Webhook error: ${res.status}`)

    statusMessage.value = store.locale === 'fr' ? 'Merci, votre demande a été envoyée.' : 'Thank you, your request has been sent.'
    hasSubmittedSuccessfully.value = true
    resetForm()
  } catch (err) {
    console.error(err)
    statusMessage.value = store.locale === 'fr' ? "Une erreur est survenue. Réessayez plus tard." : 'An error occurred. Please try again later.'
    hasSubmittedSuccessfully.value = false
  } finally {
    isSubmitting.value = false
  }
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
        :autocomplete="form.clientType === 'Entreprise' || form.clientType === 'Company' ? 'organization' : 'name'"
        :aria-invalid="Boolean(validationErrors.name)"
        @blur="markFieldTouched('name')"
      />
      <span v-if="validationErrors.name" class="field-error">{{ validationErrors.name }}</span>
    </label>

    <label>
      {{ store.locale === 'fr' ? 'Email' : 'Email' }}
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
      {{ store.locale === 'fr' ? 'Téléphone (optionnel)' : 'Phone (optional)' }}
      <input v-model="form.phone" name="phone" type="tel" autocomplete="tel" />
    </label>

    <label>
      {{ store.locale === 'fr' ? 'Type de client' : 'Client type' }}
      <select
        v-model="form.clientType"
        name="clientType"
        :aria-invalid="Boolean(validationErrors.clientType)"
        @blur="markFieldTouched('clientType')"
      >
        <option value="" disabled>{{ store.locale === 'fr' ? 'Choisir une option' : 'Choose an option' }}</option>
        <option :value="store.locale === 'fr' ? 'Entreprise' : 'Company'">{{ store.locale === 'fr' ? 'Entreprise' : 'Company' }}</option>
        <option :value="store.locale === 'fr' ? 'Particulier' : 'Individual'">{{ store.locale === 'fr' ? 'Particulier' : 'Individual' }}</option>
        <option :value="store.locale === 'fr' ? 'Projet interne / cégep' : 'Internal project / college'">{{ store.locale === 'fr' ? 'Projet interne / cégep' : 'Internal project / college' }}</option>
      </select>
      <span v-if="validationErrors.clientType" class="field-error">
        {{ validationErrors.clientType }}
      </span>
    </label>

    <label id="service-selection-field">
      {{ store.locale === 'fr' ? 'Type de service' : 'Service type' }}
      <select
        v-model="form.serviceType"
        name="serviceType"
        :aria-invalid="Boolean(validationErrors.serviceType)"
        @blur="markFieldTouched('serviceType')"
      >
        <option value="" disabled>{{ store.locale === 'fr' ? 'Choisir une option' : 'Choose an option' }}</option>
        <option v-for="serviceType in serviceTypes" :key="serviceType" :value="serviceType">
          {{ serviceType }}
        </option>
      </select>
      <span v-if="validationErrors.serviceType" class="field-error">
        {{ validationErrors.serviceType }}
      </span>
    </label>

    <label>
      {{ store.locale === 'fr' ? 'Budget approximatif' : 'Approximate budget' }}
      <select
        v-model="form.budget"
        name="budget"
        :aria-invalid="Boolean(validationErrors.budget)"
        @blur="markFieldTouched('budget')"
      >
        <option value="" disabled>{{ store.locale === 'fr' ? 'Choisir une option' : 'Choose an option' }}</option>
        <option v-for="option in budgetOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <span v-if="validationErrors.budget" class="field-error">
        {{ validationErrors.budget }}
      </span>
    </label>

    <label>
      {{ store.locale === 'fr' ? 'Message' : 'Message' }}
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
      {{ isSubmitting ? (store.locale === 'fr' ? 'Envoi...' : 'Sending...') : (store.locale === 'fr' ? 'Envoyer la demande' : 'Send Request') }}
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
  gap: 1.2rem;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  text-align: left;
}

.contact-form label {
  display: grid;
  gap: 0.45rem;
  color: var(--deep);
  font-weight: 800;
  transition: color 320ms ease;
  text-align: left;
  align-items: flex-start;
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
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25rem;
  text-align: left;
  text-align-last: left;
  transition:
    background-color 320ms ease,
    border-color 200ms ease,
    box-shadow 200ms ease,
    color 320ms ease;
}

.contact-form textarea {
  resize: none;
  min-height: 11rem;
  max-height: 11rem;
  height: 11rem;
}

.contact-form input,
.contact-form textarea {
  background-image: none;
}

.contact-form option {
  background: #112821;
  color: #ffffff;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.12);
}

.contact-form [aria-invalid='true'] {
  border-color: #ef4444;
}

.contact-form .primary-button {
  justify-self: start;
  min-width: 280px;
  margin-top: 1.5rem;
}

.field-error,
.form-message {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 700;
  color: #ef4444;
  text-align: left;
}

.form-message.is-success {
  color: var(--primary);
}
</style>
