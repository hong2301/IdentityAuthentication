<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'
import report from '@/components/report.vue'
import camera from '@/components/camera.vue'

const reportData = ref<{
  btn: boolean
  path: string
  type: number
  seconds: number
  btns: btnType[]
  secondsLabel: string
}>({
  btn: false,
  path: '',
  btns: [],
  type: 1,
  seconds: 3,
  secondsLabel: '即将进行下一步',
})
const checkResultShow = ref('')
const checkResultText = ref('')
const cameraRef = ref()
const projectStore = useProjectStore()
const cmdStore = useCmdStore()
const nextPageData = ref({
  path: '/',
  seconds: 10,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '手指检测超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  over: 1,
})
const backBtn: btnType = {
  label: '返回',
  key: 'back',
  type: 'primary',
  icon: markRaw(Back),
  position: 'left',
  onClick: () => {
    projectStore.back()
  },
}
const continueBtn: btnType = {
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    projectStore.nextStep()
  },
}
const reContinueBtn: btnType = {
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    location.reload()
  },
}
const timeoutBtn = ref(false)
const overtimeRef = ref()
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
let interval: number | undefined
const btns = ref<btnType[]>([backBtn])

// 手指检测
const check = async () => {
  const result = await cameraRef.value.createGestureRecognizer(10000)
  if (result.reasons[0] === '手指功能正常') {
    checkResultShow.value = '合格'
    projectStore.setVlaueForNowProject('fingerCheck', 1)
    reportData.value.type = 1
    reportData.value.seconds = 3
    reportData.value.btns = [backBtn, continueBtn]
    reportData.value.secondsLabel = '即将前往下一步'
  } else {
    checkResultShow.value = '不合格'
    projectStore.setVlaueForNowProject('fingerCheck', 0)
    reportData.value.type = 0
    reportData.value.seconds = 10
    reportData.value.btns = [backBtn, reContinueBtn]
    reportData.value.secondsLabel = '点击继续可重试，否则即将结束进程'
  }
  checkResultText.value = result.reasons[0]
  reportData.value.btn = true
}

onMounted(async () => {
  cmdStore.overBtn = 1
  check()
})
</script>

<template>
  <div class="content">
    <div class="title">手指检测: 请举起双手, 将手掌完全与头同高</div>
    <div class="body">
      <div class="example">
        <div class="img">
          <div class="img-content">
            <div class="serial">1</div>
          </div>
        </div>
        <div class="img">
          <div class="img-content">
            <div class="serial">2</div>
          </div>
        </div>
      </div>
      <div class="frame">
        <camera ref="cameraRef" class="canvas" />
      </div>
      <div class="example"></div>
    </div>
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
  <report
    v-if="reportData.btn"
    :path="reportData.path"
    :type="reportData.type"
    :seconds="reportData.seconds"
    :secondsLabel="reportData.secondsLabel"
    :btns="reportData.btns"
  >
    <div class="box">
      <div class="title1">手指检测完成</div>
      <div class="result">检测结果: {{ checkResultShow }}</div>
      <div class="des">{{ checkResultText }}</div>
    </div>
  </report>
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
.title {
  margin-bottom: 1%;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.okBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.okImg {
  width: 30%;
  height: 80%;
  border: 0.5vh solid white;
  box-sizing: border-box;
  cursor: pointer;
}
.okImgContent {
  width: 100%;
  height: 100%;
  border: 0.5vh solid rgba(85, 140, 202, 1);
  box-sizing: border-box;
  background-color: white;
}
.okImgContent-active {
  border-color: orange;
  transform: scale(1.05); /* 放大5% */
}
.overtime {
  position: fixed;
  top: 0;
  right: 16vw;
  height: 10vh;
  display: flex;
  align-items: center;
}
.frame {
  position: relative;
  width: 50%;
  height: 90%;
  margin-inline: 1%;
  border: 1vh solid white;
}
.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
.prompt {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.icon {
  font-size: 5rem;
  color: brown;
}
.label1 {
  font-size: 3rem;
  color: rgb(255, 255, 0);
  font-weight: 800;
  margin-bottom: 4%;
}
.example {
  width: 22%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.img {
  height: 48%;
  width: 70%;
  border: 0.5vh solid white;
  box-sizing: border-box;
}
.img-content {
  width: 100%;
  height: 100%;
  border: 0.5vh solid rgba(85, 140, 202, 1);
  box-sizing: border-box;
  background-color: white;
  position: relative;
}
.serial {
  position: absolute;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: gray;
  border: 0.5vh solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
}
.number-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.label {
  color: brown;
  font-size: 2rem;
  font-weight: 800;
}
.value {
  color: brown;
  font-size: 10rem;
  font-weight: 800;
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
