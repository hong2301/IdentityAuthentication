import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCmdStore = defineStore('cmd', () => {
  const backBtn = ref(0)
  const closeBtn = ref(0)
  const resetBtn = ref(0)
  const continueBtn = ref(0)
  const overBtn = ref(0)
  // 
  const layoutContinueClicked = ref(false)

  // 操作方法
  const triggerLayoutButton = () => {
    console.log('继续')
    layoutContinueClicked.value = true
    setTimeout(() => layoutContinueClicked.value = false, 100)
  }


  const close = () => {
    backBtn.value = 0
    closeBtn.value = 0
    resetBtn.value = 0
    continueBtn.value = 0
    overBtn.value = 0
  }

  return { backBtn, closeBtn, resetBtn, continueBtn, overBtn, layoutContinueClicked, triggerLayoutButton, close }
})
