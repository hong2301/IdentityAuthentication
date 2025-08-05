<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import router from '@/router'
import btnBox from './btnBox.vue'
import type { btnType } from '@/types/components'

const emit = defineEmits(['continue', 'back'])

// 定义 props
const props = defineProps({
  seconds: {
    type: Number,
    default: 30,
  },
  secondsLabel: {
    type: String,
    default: '即将前往首页:',
  },
  type: {
    type: Number,
    default: 0,
  },
  btns: {
    type: Array as () => btnType[],
    default: () => [],
  },
  path: {
    type: String,
    default: '/',
  },
})

const timeStep = ref(props.seconds)
let setIntervalData: number | undefined

const runTime = () => {
  timeStep.value = props.seconds
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
    setIntervalData = undefined
  }
}

onMounted(() => {
  runTime()
})
onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <div class="content">
    <div class="mask"></div>
    <div
      class="card"
      :style="{
        color: `${Number(type) === 0 ? 'brown' : 'rgba(85, 140, 202, 1)'}`,
      }"
    >
      <div
        class="border"
        :style="{
          border: `4px solid ${Number(type) === 0 ? 'brown' : 'rgba(85, 140, 202, 1)'}`,
        }"
      >
        <slot></slot>
      </div>
    </div>
    <div class="overtime">
      <span class="overtime-label">{{ secondsLabel }} </span>
      <span :style="{ color: 'white' }">{{ timeStep }}秒</span>
    </div>
    <btnBox style="z-index: 10001" :btns="btns" />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  top: 0;
  left: 0;
}
.card {
  width: 50%;
  height: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
  z-index: 1000;
}
.border {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.label {
  position: absolute;
  bottom: 2vh;
  font-size: 2rem;
  font-weight: 800;
}

.icon {
  transform-origin: center;
  transform: translateY(-2vh) scale(17);
}
.overtime {
  z-index: 1000;
  font-weight: 800;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
}
.overtime-label {
  color: white;
}
</style>
