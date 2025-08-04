<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 定义 props
const props = defineProps({
  number: {
    type: String,
    default: 'C1',
  },
  text: {
    type: String,
    default: '小型汽车',
  },
  fontSize: {
    type: Number,
    default: 1.2,
  },
  active: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: '../assets/log.png',
  },
})

onMounted(() => {})
</script>

<template>
  <div class="overture" :class="{ 'active-overture': active }">
    <div class="left">
      <div
        class="number"
        :style="{ fontSize: `${fontSize}rem` }"
        :class="{ 'active-number': active }"
      >
        {{ number }}
      </div>
    </div>
    <div class="right">
      <div class="img-box">
        <img class="img" src="../assets/log.png" mode="scaleToFill" />
      </div>
      <div class="text" :style="{ fontSize: `${fontSize}rem` }">{{ text }}</div>
    </div>
  </div>
</template>

<style scoped>
.overture {
  border-radius: 1vh;
  border: 2px solid rgb(255, 255, 255);
  background: linear-gradient(to top, #1e90ff, #87cefa);
  display: flex;
  cursor: pointer;
}
.left {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.img-box {
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  width: 80%;
  height: 80%;
}
.text {
  height: 25%;
  width: 100%;
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: center;
  white-space: nowrap;
}
.number {
  border: 1px solid rgb(255, 255, 255);
  width: 75%;
  aspect-ratio: 1;
  background: linear-gradient(145deg, #1a56b4, #0d47a1);
  border-radius: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
}
/* 新增 active 状态样式 */
.active-overture {
  border: 2px solid rgb(255, 255, 255); /* 边框变橙色 */
  background: linear-gradient(to top, #ff8c00, #ffd700); /* 橙色到浅橙渐变 */
}

.active-number {
  border: 1px solid rgb(255, 255, 255); /* 边框变橙色 */
  background: orange !important; /* 纯橙色背景 */
  color: white; /* 文字颜色保持白色 */
}
</style>
