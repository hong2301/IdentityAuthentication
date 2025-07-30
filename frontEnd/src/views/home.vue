<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted } from 'vue'

const cmdStore = useCmdStore()
onMounted(() => {
  cmdStore.backBtn = 0
})
</script>

<template>
  <div class="content">
    <router-link to="/layout/back">后台</router-link>
  </div>
</template>

<style scoped>
.content {
}
</style>
