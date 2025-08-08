// stores/projectStore.ts

import { ref } from 'vue' // watch 不再需要了
import { defineStore } from 'pinia'
import type { examDataType, projectType } from '@/types/project'
import { useRouter } from 'vue-router'
import { useCmdStore } from './cmd'

export const useProjectStore = defineStore(
    'project', // store 的 id
    () => {
        // --- 状态定义 (与之前完全一样) ---
        const nowProject = ref<projectType>({
            name: '',
            process: [],
            step: 0
        })

        const examData = ref<examDataType>({
            projectName: '',
            identity: { id: '', name: '', gender: '' },
            photo: '',
            phone: '',
            carType: ''
        })

        // --- 逻辑定义 (与之前完全一样) ---
        const router = useRouter()
        const cmdStore = useCmdStore()

        const mountProject = (project: projectType) => {
            nowProject.value = project
        }

        const getStep = () => {
            let step = -1
            const currentUrl = window.location.href;
            nowProject.value.process.forEach((item, index) => {
                if (currentUrl.includes(item.path)) {
                    step = index
                }
            })
            return step
        }

        const nextStep = () => {
            cmdStore.overBtn = 1
            const step = getStep() + 1
            router.push(nowProject.value.process[step].path)
        }

        const back = () => {
            const step = getStep() - 1
            if (step < 0) {
                cmdStore.overBtn = 0
            }
            router.push(nowProject.value.process[step].path)
        }

        const setVlaueForNowProject = (key: string, value: any) => {
            const step = getStep()
            if (step >= 0 && step < nowProject.value.process.length) {
                nowProject.value.process[step].data[key] = value
            } else {
                console.error(`Invalid step index: ${step} in setVlaueForNowProject`)
            }
        }

        return { mountProject, nextStep, setVlaueForNowProject, examData, nowProject, back, getStep }
    },
    {
        // 3. 添加持久化配置
        persist: true,
    }
)
