<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { btnType } from '@/types/components'

// 定义 props
const props = defineProps({
  btns: {
    type: Array as () => btnType[],
    default: () => ({}),
  },
  height: {
    type: Number,
    default: 10,
  },
  bg: {
    type: String,
    default: '',
  },
})

onMounted(() => {})

const leftBtns = computed(() => props.btns.filter((btn) => btn.position === 'left'))

const rightBtns = computed(() => props.btns.filter((btn) => btn.position === 'right'))
</script>

<template>
  <div class="overture" :style="{ height: `${height}vh`, backgroundColor: `${bg}` }">
    <div class="cmd-box-left">
      <el-button
        v-for="(bItem, bIndx) in leftBtns"
        :key="bIndx"
        :type="bItem.type"
        :icon="bItem.icon"
        class="btn"
        round
        @click="bItem.onClick"
      >
        {{ bItem.label }}
      </el-button>
    </div>
    <div class="cmd-box-right">
      <el-button
        v-for="(bItem, bIndx) in rightBtns"
        :key="bIndx"
        :type="bItem.type"
        class="btn"
        round
        @click="bItem.onClick"
      >
        {{ bItem.label }}
        <el-icon class="el-icon--right"> <component :is="bItem.icon" /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.overture {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
}
.cmd-box-left {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cmd-box-right {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn {
  transform: scale(1.7); /* 宽高都放大一倍 */
  transform-origin: center;
  margin-inline: 6%;
  z-index: 1000;
}
</style>
