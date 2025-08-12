<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'

const cmdStore = useCmdStore()

onMounted(() => {})
</script>

<template>
  <div class="content">密码修改</div>
</template>

<style scoped>
.content {
}
</style>
