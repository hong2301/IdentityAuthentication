<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 定义 props
const props = defineProps({
  data: {
    type: Object as () => { title: string; icon: string },
    required: true,
    default: () => ({ title: '默认标题', icon: '默认图标' }),
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
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
    <div class="title" :style="{ fontSize: `${width / 6}px` }">{{ data.title }}</div>
  </div>
</template>

<style scoped>
.overture {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.icon {
  background-color: aqua;
  border-radius: 20%;
  cursor: pointer;
}
.overture:hover {
  transform: scale(1.1); /* 悬停时放大1.2倍 */
}
.overture:active {
  transform: scale(1.2); /* 悬停时放大1.2倍 */
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
