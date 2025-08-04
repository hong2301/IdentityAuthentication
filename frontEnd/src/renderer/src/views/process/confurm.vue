<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import router from '@/router'
const cmdStore = useCmdStore()
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'

const nextPageData = ref({
  path: '/layout/overtime',
  seconds: 30000,
  secondsLabel: '点击继续可重新确认，否则即将前往首页:',
  label: '信息确认超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  over: 1,
})

const timeoutBtn = ref(false)
const overtimeRef = ref()
const projectStore = useProjectStore()

const overtimeBtns = ref<btnType[]>([
  {
    label: '返回',
    key: 'back',
    type: 'primary',
    icon: markRaw(Back),
    position: 'left',
    onClick: () => {
      router.go(-1)
    },
  },
  {
    label: '继续',
    key: 'continue',
    type: 'success',
    icon: markRaw(Right),
    position: 'right',
    onClick: () => {
      timeoutBtn.value = false
      overtimeRef.value.runTime()
    },
  },
])

const btns = ref<btnType[]>([
  {
    label: '返回',
    key: 'back',
    type: 'primary',
    icon: markRaw(Back),
    position: 'left',
    onClick: () => {
      router.go(-1)
    },
  },
  {
    label: '继续',
    key: 'continue',
    type: 'success',
    icon: markRaw(Right),
    position: 'right',
    onClick: () => {},
  },
])

onMounted(() => {
  cmdStore.overBtn = 1
  console.log(projectStore.examData)
})
</script>

<template>
  <div class="content">
    <div class="body"></div>
    <BtnBox :btns="btns" />
    <overtime
      ref="overtimeRef"
      v-model:timeout-btn="timeoutBtn"
      :btns="overtimeBtns"
      :time-num="300"
      :nextPageData="nextPageData"
      class="overtime"
    />
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.overtime {
  position: fixed;
  top: 0;
  right: 16vw;
  height: 10vh;
  display: flex;
  align-items: center;
}
.body {
}
</style>
