<script setup lang="ts">
import { onMounted } from 'vue'

// 定义 props
const props = defineProps({
  data: {
    type: Object as () => { title: string; icon: string },
    required: true,
    default: () => ({ title: '默认标题', icon: '默认图标' }),
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: 'auto',
  },
})

onMounted(() => {
  console.log('按钮', props.data.title, props.data.icon)
})
</script>

<template>
  <div
    class="overture"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
    }"
  >
    <div
      class="icon"
      :style="{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }"
    ></div>
    <div class="title">{{ data.title }}</div>
  </div>
</template>

<style scoped>
.overture {
  cursor: pointer;
}
.icon {
  background-color: aqua;
  border-radius: 20%;
  cursor: pointer;
}
.title {
  width: 100%;
  margin-top: 5%;
  font-weight: 800;
  color: white;
  display: flex;
  justify-content: center;
}
</style>
