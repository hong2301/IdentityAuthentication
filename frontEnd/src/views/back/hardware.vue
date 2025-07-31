<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'

const cmdStore = useCmdStore()

onMounted(() => {
  cmdStore.backBtn = 1
  cmdStore.closeBtn = 1
  cmdStore.resetBtn = 1
})
</script>

<template>
  <div class="content">硬件测试</div>
</template>

<style scoped>
.content {
}
</style>
