<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'

const cmdStore = useCmdStore()

onMounted(() => {})
</script>

<template>
  <div class="content">证件设置</div>
</template>

<style scoped>
.content {
}
</style>
