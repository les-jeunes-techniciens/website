import { reactive } from 'vue'

export const store = reactive({
  selectedService: '',
  locale: 'fr',
  setService(service) {
    this.selectedService = service
  },
  setLocale(lang) {
    this.locale = lang
  },
})
