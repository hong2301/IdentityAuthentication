<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import { useRoute } from 'vue-router'
import { Timer } from '@element-plus/icons-vue'

const cmdStore = useCmdStore()

// 定义 props
const props = defineProps({
  seconds: {
    type: Number,
    default: 30,
  },
  secondsLabel: {
    type: String,
    default: '即将前往首页:',
  },
  label: {
    type: String,
    default: '操作过时',
  },
  icon: {
    type: String,
    default: 'Timer',
  },
  type: {
    type: Number,
    default: 0,
  },
  continue: {
    type: Number,
    default: 0,
  },
  over: {
    type: Number,
    default: 0,
  },
})

const isContinue = () => {
  if (props?.continue) {
    cmdStore.continueBtn = 1
  }
  if (props?.over) {
    cmdStore.overBtn = 1
  }
}

onMounted(() => {
  isContinue()
  cmdStore.backBtn = 0
})
</script>

<template>
  <div class="content">
    <div class="mask"></div>
    <div
      class="card"
      :style="{
        color: `${Number(type) === 0 ? 'brown' : 'rgba(85, 140, 202, 1)'}`,
      }"
    >
      <div
        class="border"
        :style="{
          border: `4px solid ${Number(type) === 0 ? 'brown' : 'rgba(85, 140, 202, 1)'}`,
        }"
      >
        <el-icon v-if="icon === 'Timer'" class="icon"><Timer /></el-icon>
        <div class="label">{{ label }}</div>
      </div>
    </div>
    <overtime
      path="/layout"
      :label="String(secondsLabel)"
      :time-num="Number(seconds)"
      type="normal"
      class="overtime"
    />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  top: 0;
  left: 0;
}
.card {
  width: 50%;
  height: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
  z-index: 1000;
}
.border {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}
.label {
  position: absolute;
  bottom: 2vh;
  font-size: 2rem;
  font-weight: 800;
}

.icon {
  transform-origin: center;
  transform: translateY(-2vh) scale(17);
}
.overtime {
  z-index: 1000;
}
</style>
