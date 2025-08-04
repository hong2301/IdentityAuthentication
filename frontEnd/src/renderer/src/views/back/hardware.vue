<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'

const cmdStore = useCmdStore()

onMounted(() => {})
</script>

<template>
  <div class="content">硬件测试</div>
</template>

<style scoped>
.content {
}
</style>
