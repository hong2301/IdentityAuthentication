import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { projectType } from '@/types/project'
import { useRouter } from 'vue-router'
import { useCmdStore } from './cmd'

export const useProjectStore = defineStore('preject', () => {
    const nowProject = ref<projectType>({})
    const router = useRouter()
    const cmdStore = useCmdStore()

    const mountProject = (project: projectType) => {
        nowProject.value = project
    }

    const nextStep = () => {
        cmdStore.overBtn = 1
        router.push(nowProject.value.process[nowProject.value.step].path)
    }

    return { mountProject, nextStep }
})
