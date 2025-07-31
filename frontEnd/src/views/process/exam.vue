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
    <div class="title">请选择下一步要进行的操作</div>
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
  flex-direction: column;
}
.title {
  margin-bottom: 2%;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-box {
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 30%;
  height: 100%;
  background: linear-gradient(145deg, #1a56b4, #0d47a1);
  border-radius: 2%;
  cursor: pointer;
}
.overtime {
  position: fixed;
  top: 10vh;
  left: 0;
}
</style>
