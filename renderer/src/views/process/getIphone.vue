<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import BtnBox from '@/components/btnBox.vue'
const cmdStore = useCmdStore()
import numberKey from '@/components/numberKey.vue'
import { useProjectStore } from '@/stores/project'
import Report from '@/components/report.vue'

const projectStore = useProjectStore()
const timeoutBtn = ref(false)
const overtimeRef = ref()
const nextPageData = ref({
  path: '/',
  seconds: 10,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '电话输入超时获取超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  over: 1,
})
const password = ref('')
const reportBtn = ref(0)

const btns = ref<btnType[]>([
  {
    label: '返回',
    key: 'back',
    type: 'primary',
    icon: markRaw(Back),
    position: 'left',
    onClick: () => {
      backHandleBack()
    },
  },
  {
    label: '继续',
    key: 'continue',
    type: 'success',
    icon: markRaw(Right),
    position: 'right',
    onClick: () => {
      backHandleCon()
    },
  },
])
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
const re = ref<btnType>({
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    reportBtn.value = 0
  },
})

const backHandleBack = () => {
  projectStore.back()
}

const backHandleCon = () => {
  if (password.value.length === 11) {
    projectStore.setVlaueForNowProject('phone', password.value)
    projectStore.nextStep()
  } else {
    reportBtn.value = 1
  }
}

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <numberKey v-model:password="password" />
    <BtnBox :btns="btns" />
    <overtime
      ref="overtimeRef"
      v-model:timeout-btn="timeoutBtn"
      :btns="overtimeBtns"
      :time-num="30"
      :nextPageData="nextPageData"
      class="overtime"
    />
    <report
      v-if="reportBtn"
      v-model:btn="reportBtn"
      :path="projectStore.nowProject.process[projectStore.getStep()].path"
      :type="0"
      :seconds="3"
      :btns="[re]"
      secondsLabel="点击继续重试: "
    >
      <div class="box">
        <div class="title1">手机号码有误</div>
        <div class="result">请检查是否为11位手机号码</div>
      </div>
    </report>
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
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.title1 {
  font-size: 3.5rem;
  font-weight: 800;
}
.result {
  color: brown;
  font-size: 2rem;
  font-weight: 800;
}
.des {
  color: brown;
  font-size: 2rem;
  font-weight: 800;
}
</style>
