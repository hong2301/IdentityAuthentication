<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'
import { read } from '@/api/cardReader'
import { delay } from '@/utils/delay'
const cmdStore = useCmdStore()

const projectStore = useProjectStore()
const timeoutBtn = ref(false)
const overtimeRef = ref()
const nextPageData = ref({
  path: '/',
  seconds: 10,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '身份证信息获取超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  over: 1,
})

const btns = ref<btnType[]>([
  // {
  //   label: '返回',
  //   key: 'back',
  //   type: 'primary',
  //   icon: markRaw(Back),
  //   position: 'left',
  //   onClick: () => {
  //     backHandleBack()
  //   },
  // },
  // {
  //   label: '继续',
  //   key: 'continue',
  //   type: 'success',
  //   icon: markRaw(Right),
  //   position: 'right',
  //   onClick: () => {
  //     // backHandleCon()
  //   },
  // },
])
const overtimeBtns = ref<btnType[]>([
  // {
  //   label: '返回',
  //   key: 'back',
  //   type: 'primary',
  //   icon: markRaw(Back),
  //   position: 'left',
  //   onClick: () => {
  //     projectStore.back()
  //   },
  // },
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

// const backHandleBack = () => {
//   projectStore.back()
// }

const backHandleCon = async () => {
  let getBtn = true
  while (getBtn) {
    const readResult = await read()
    if (readResult.result.code !== -1) {
      projectStore.setVlaueForNowProject('name', readResult.result.name)
      projectStore.setVlaueForNowProject('id', readResult.result.idCode)
      projectStore.setVlaueForNowProject('gender', readResult.result.sex)
      projectStore.nextStep()
      getBtn = false
    } else {
      await delay(500)
    }
  }
}

onMounted(() => {
  cmdStore.overBtn = 1
  backHandleCon()
})
</script>

<template>
  <div class="content">
    <div class="title">请刷二代身份证</div>
    <div class="card"></div>
    <BtnBox :btns="btns" />
    <overtime
      ref="overtimeRef"
      v-model:timeout-btn="timeoutBtn"
      :btns="overtimeBtns"
      :time-num="30"
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
.title {
  margin-bottom: 1%;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 80%;
  height: 80%;
  background-color: blue;
  border-radius: 4vh;
  border: 1vh solid white;
}
</style>
