import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCmdStore = defineStore('cmd', () => {
  const overBtn = ref(0)



  const close = () => {
    overBtn.value = 0
  }

  return { overBtn, close }
})
