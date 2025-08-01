import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', () => {
    const preUrl = ref<string[]>([])
    return { preUrl }
})
