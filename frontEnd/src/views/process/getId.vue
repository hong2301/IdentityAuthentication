<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted } from 'vue'

const cmdStore = useCmdStore()

onMounted(() => {
  cmdStore.backBtn = 1
})
</script>

<template>
  <div class="content">获取身份证</div>
</template>

<style scoped>
.content {
}
</style>
