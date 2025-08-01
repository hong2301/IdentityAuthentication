<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import router from '@/router'

const cmdStore = useCmdStore()

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
  label: {
    type: String,
    default: '操作过时',
  },
  icon: {
    type: String,
    default: 'Timer',
  },
  type: {
    type: Number,
    default: 0,
  },
  continue: {
    type: Number,
    default: 0,
  },
  over: {
    type: Number,
    default: 0,
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
      router.push('/layout')
    }
  }, 1000)
}

onMounted(() => {
  runTime()
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
        <el-icon v-if="icon === 'Timer'" class="icon"><Timer /></el-icon>
        <div class="label">{{ label }}</div>
      </div>
    </div>
    <div class="overtime">
      <span class="overtime-label">{{ secondsLabel }} </span>
      <span :style="{ color: 'white' }">{{ timeStep }}秒</span>
    </div>
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
  z-index: 999;
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
