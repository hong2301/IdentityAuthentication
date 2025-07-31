<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, onUnmounted, ref, type PropType } from 'vue'
import { useRouter } from 'vue-router'

// 定义 props
const props = defineProps({
  path: {
    type: String,
    default: 'overtime',
  },
  label: {
    type: String,
    default: '请在倒计时结束前进行操作: ',
  },
  timeNum: {
    type: Number,
    default: 30,
  },
  type: {
    type: String as PropType<'normal' | 'danger'>, // 枚举类型
    default: 'danger', // 默认普通类型
    validator: (value: string) => {
      return ['normal', 'danger'].includes(value) // 验证器确保只接受这两个值
    },
  },
})

const cmdStore = useCmdStore()
const router = useRouter()

const timeStep = ref(props.timeNum)
let setIntervalData: number | undefined

const runTime = () => {
  timeStep.value = props.timeNum
  setIntervalData = setInterval(() => {
    timeStep.value--
    if (timeStep.value <= 0) {
      clearInterval(setIntervalData)
      router.push(props.path)
    }
  }, 1000)
}

const clearTimer = () => {
  if (setIntervalData) {
    clearInterval(setIntervalData)
  }
}

onMounted(() => {
  cmdStore.backBtn = 1
  runTime()
})

// 组件卸载时清除计时器
onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <div class="com">
    <span class="label">{{ label }} </span>
    <span :style="{ color: `${type === 'danger' ? 'brown' : 'white'}` }">{{ timeStep }}秒</span>
  </div>
</template>

<style scoped>
.com {
  position: relative;
  font-weight: 800;
  font-size: 1.4rem;
  padding: 1%;
}

.com::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  /* 梯形效果 - 上边比下边窄 */
  clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%);
  /* 半透明蓝色渐变背景 */
  /* background: rgba(51, 169, 254); */
}
.label {
  color: white;
}
</style>
