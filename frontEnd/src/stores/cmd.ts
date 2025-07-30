import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCmdStore = defineStore('cmd', () => {
  const backBtn = ref(0)

  return { backBtn }
})
