<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted } from 'vue'

const cmdStore = useCmdStore()
onMounted(() => {
  cmdStore.backBtn = 1
})
</script>

<template>
  <div class="overture">后台设置</div>
</template>

<style scoped>
.overture {
}
</style>
