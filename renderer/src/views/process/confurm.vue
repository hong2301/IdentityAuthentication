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
import tabel from '@/components/tabel.vue'

const nextPageData = ref({
  path: '/',
  seconds: 10,
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
      projectStore.back()
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
const data = ref<any[]>([])

const btns = ref<btnType[]>([
  {
    label: '返回',
    key: 'back',
    type: 'primary',
    icon: markRaw(Back),
    position: 'left',
    onClick: () => {
      projectStore.back()
    },
  },
  {
    label: '继续',
    key: 'continue',
    type: 'success',
    icon: markRaw(Right),
    position: 'right',
    onClick: () => {
      projectStore.nextStep()
    },
  },
])

const getData = () => {
  const projectData = projectStore.getNowProject()
  data.value.push({
    key: '办理业务类型',
    value: projectData.projectName,
  })
  data.value.push({
    key: '姓名',
    value: projectData.getId.name,
  })
  data.value.push({
    key: '性别',
    value: projectData.getId.gander,
  })
  data.value.push({
    key: '手机号码',
    value: projectData.getIphone.phone,
  })
  data.value.push({
    key: '身份证',
    value: projectData.getId.id,
  })
  data.value.push({
    key: '准驾车型',
    value: projectData.vehicleModel.carType,
  })
}

onMounted(() => {
  cmdStore.overBtn = 1
  getData()
})
</script>

<template>
  <div class="content">
    <div class="body">
      <tabel :row="data" />
    </div>
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
.body {
  width: 70%;
  height: 90%;
}
</style>
