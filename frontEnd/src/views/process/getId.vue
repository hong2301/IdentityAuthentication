<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted } from 'vue'
import overtime from '@/components/overtime.vue'
const cmdStore = useCmdStore()

onMounted(() => {
  cmdStore.backBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="title">请刷二代身份证</div>
    <div class="card"></div>
    <overtime class="overtime" />
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
