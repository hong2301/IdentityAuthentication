<script setup lang="ts">
import { onMounted } from 'vue'
import overtime from '@/components/overtime.vue'

onMounted(() => {})
</script>

<template>
  <div class="content">
    <div class="mask"></div>
    <div class="card">
      <div class="border"></div>
    </div>
    <overtime path="/layout" label="即将返回首页: " :time-num="3" type="normal" class="overtime" />
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
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
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
  border: 2px solid rgb(58, 106, 187);
}
.overtime {
  z-index: 1000;
}
</style>
