<script setup lang="ts">
import { read } from './api/cardReader'

read().then((res) => {
  console.log(res)
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
