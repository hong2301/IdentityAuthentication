import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { projectType } from '@/types/project'
import { useRouter } from 'vue-router'


export const useProjectStore = defineStore('preject', () => {
    const nowProject = ref<projectType>({})
    const router = useRouter()

    const mountProject = (project: projectType) => {
        nowProject.value = project
    }

    const nextStep = () => {
        router.push(nowProject.value.process[nowProject.value.step].path)
    }

    return { mountProject, nextStep }
})
