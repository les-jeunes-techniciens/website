import { reactive } from 'vue'

export const store = reactive({
  selectedService: '',
  setService(service) {
    this.selectedService = service
  },
})
