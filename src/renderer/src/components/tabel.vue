<script setup lang="ts">
import { onMounted } from 'vue'

// 定义 props
const props = defineProps({
  title: {
    type: String,
    default: '信息确认',
  },
  row: {
    type: Object,
    default: () => {},
  },
})

onMounted(() => {})
</script>

<template>
  <div class="overture">
    <div class="body">
      <div class="title">{{ title }}</div>
      <div class="text-box">
        <div v-for="(item, index) in row" :key="index" class="line">
          <div class="left">{{ item.key }}</div>
          <div class="right">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overture {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 2%;
}
.body {
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid rgba(85, 140, 202, 1);
}
.title {
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 800;
  color: rgba(85, 140, 202, 1);
  border-bottom: 2px solid rgba(85, 140, 202, 1);
}
.text-box {
  color: rgba(85, 140, 202, 1);
  font-size: 2.5rem;
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
}
.line {
  flex: 1;
  width: 100%;
  border-bottom: 2px solid rgba(85, 140, 202, 1);
  display: flex;
}
.left {
  width: 40%;
  height: 100%;
  border-right: 2px solid rgba(85, 140, 202, 1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3%;
  margin-right: 3%;
}
.right {
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
