<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { useRouterStore } from '@/stores/router'
import { onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import { useRoute } from 'vue-router'
import { Timer } from '@element-plus/icons-vue'

const route = useRoute()
const cmdStore = useCmdStore()
const routerStore = useRouterStore()

const query = route.query

const isContinue = () => {
  if (query?.continue) {
    cmdStore.continueBtn = 1
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
        color: `${Number(query.type) === 0 ? 'brown' : 'rgba(85, 140, 202, 1)'}`,
      }"
    >
      <div
        class="border"
        :style="{
          border: `4px solid ${Number(query.type) === 0 ? 'brown' : 'rgba(85, 140, 202, 1)'}`,
        }"
      >
        <el-icon v-if="query.icon === 'Timer'" class="icon"><Timer /></el-icon>
        <div class="label">{{ query.label }}</div>
      </div>
    </div>
    <overtime
      path="/layout"
      :label="String(query.secondsLabel)"
      :time-num="Number(query.seconds)"
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
}
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
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
