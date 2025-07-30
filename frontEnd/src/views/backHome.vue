<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted } from 'vue'
import pushButton from '@/components/pushButton.vue'

const cmdStore = useCmdStore()
onMounted(() => {
  cmdStore.backBtn = 1
})
</script>

<template>
  <div class="content">1</div>
</template>

<style scoped>
.content {
}
</style>
