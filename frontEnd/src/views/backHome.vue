<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted } from 'vue'
import pushButton from '@/components/pushButton.vue'

const cmdStore = useCmdStore()
onMounted(() => {
  cmdStore.backBtn = 1
  cmdStore.closeBtn = 1
  cmdStore.resetBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="btn-box"></div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.btn-box {
}
</style>
