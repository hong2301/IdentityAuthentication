<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<template>
  <div class="content">
    <div class="btn-box">
      <div class="btn"></div>
      <div class="btn"></div>
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
.btn-box {
  display: flex;
  width: 70%;
  justify-content: space-between;
}
.btn {
  width: 40%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: aqua;
}
</style>
