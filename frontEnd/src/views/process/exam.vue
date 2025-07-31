<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const cmdStore = useCmdStore()
const router = useRouter()

const timeStep = ref(30)

const runTime = () => {
  timeStep.value = 30
  const setIntervalData = setInterval(() => {
    timeStep.value--
    if (timeStep.value <= 0) {
      clearInterval(setIntervalData)
      router.push('overtime')
    }
  }, 1000)
}

onMounted(() => {
  cmdStore.backBtn = 1
  runTime()
})
</script>

<template>
  <div class="content">
    <div class="card-box">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-box {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 30%;
  height: 50%;
  background-color: red;
}
</style>
