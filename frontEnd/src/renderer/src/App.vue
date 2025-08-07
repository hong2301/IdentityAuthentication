<script setup lang="ts">
import { onMounted } from 'vue'
const { electronAPI } = window

async function displaySystemInfo() {
  try {
    const info = await electronAPI.system.getInfo()
    console.log('System Info:', info)
  } catch (error) {
    console.error('Failed to get system info:', error)
  }
}

onMounted(() => {
  displaySystemInfo()
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
