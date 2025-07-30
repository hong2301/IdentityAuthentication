import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCmdStore = defineStore('cmd', () => {
  const backBtn = ref(0)
  const closeBtn = ref(0)
  const resetBtn = ref(0)

  const close = () => {
    backBtn.value = 0
    closeBtn.value = 0
    resetBtn.value = 0
  }

  return { backBtn, closeBtn, resetBtn, close }
})
