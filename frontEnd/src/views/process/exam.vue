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
    <div class="card-box">
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    </div>
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
.overtime {
  position: fixed;
  top: 10vh;
  left: 0;
}
</style>
