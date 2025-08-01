<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
const cmdStore = useCmdStore()

const nextPageData = ref({
  path: '/layout/overtime',
  seconds: 30000,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '身份证信息获取超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  over: 1,
})

onMounted(() => {
  cmdStore.backBtn = 1
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="title">请刷二代身份证</div>
    <div class="card"></div>
    <overtime :time-num="300" :nextPageData="nextPageData" class="overtime" />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.overtime {
  position: fixed;
  top: 10vh;
  left: 0;
}
.title {
  margin-bottom: 1%;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 80%;
  height: 80%;
  background-color: blue;
  border-radius: 4vh;
  border: 1vh solid white;
}
</style>
