<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, CaretLeft, CaretRight, CaretTop, CaretBottom, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'
import report from '@/components/report.vue'
import camera from '@/components/camera.vue'
import { delay } from '@/utils/delay'
import { testVisual } from '@/utils/vision'

let answerDir = ''
const reportData = ref<{
  btn: boolean
  path: string
  type: number
  seconds: number
  btns: btnType[]
  secondsLabel: string
  result: {
    label: string
    left: number
    right: number
  }
}>({
  btn: false,
  path: '',
  btns: [],
  type: 1,
  seconds: 3,
  secondsLabel: '即将进行下一步',
  result: {
    label: '',
    left: 0,
    right: 0,
  },
})
const projectStore = useProjectStore()
const cmdStore = useCmdStore()
const nextPageData = ref({
  path: '/',
  seconds: 30000,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '视力检测超时',
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
    router.go(-1)
  },
}
const leftBtn: btnType = {
  label: '左',
  key: 'left',
  type: 'primary',
  icon: markRaw(CaretLeft),
  position: 'right',
  onClick: () => {
    if (!isBlock.value) return
    answerDir = 'left'
  },
}
const rightBtn: btnType = {
  label: '右',
  key: 'right',
  type: 'primary',
  icon: markRaw(CaretRight),
  position: 'right',
  onClick: () => {
    if (!isBlock.value) return
    answerDir = 'right'
  },
}
const upBtn: btnType = {
  label: '上',
  key: 'up',
  type: 'primary',
  icon: markRaw(CaretTop),
  position: 'right',
  onClick: () => {
    if (!isBlock.value) return
    answerDir = 'top'
  },
}
const bottomBtn: btnType = {
  label: '下',
  key: 'bottom',
  type: 'primary',
  icon: markRaw(CaretBottom),
  position: 'right',
  onClick: () => {
    if (!isBlock.value) return
    answerDir = 'bottom'
  },
}
const ContinueBtn: btnType = {
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    router.push('/process/colorVision')
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
const btns = ref<btnType[]>([backBtn, leftBtn, rightBtn, upBtn, bottomBtn])
// 测试配置
let testOption = {
  minNum: 3,
  maxLevel: 5,
  minLevel: 3,
}
// 是否遮挡眼睛
const isBlock = ref(false)
// 当前测试模式
const nowDir = ref('left')
// 摄像头对象
const cameraRef = ref()

// 检测是否有遮挡
const checkBlock = () => {
  // 启动识别器方法
  cameraRef.value.createFaceDetector(40000, { isEyeBlock: true })
}
// 识别器检测回调
const blockState = (state: boolean = true) => {
  isBlock.value = state
}

// 检测
const checkLeft = async () => {
  nowDir.value = 'left'

  // 测视力循环
  let run = true
  let testLog: { level: number; dir: string; result: boolean }[] = []
  while (run) {
    // 获取题目
    const testVisualResult = testVisual(testLog)
    if (testVisualResult.state) {
      testLog = testVisualResult.data
    } else {
      run = false
    }
    if (run) {
      answerDir = ''
      console.log('提问', testVisualResult.data[testVisualResult.data.length - 1].dir)
      // 回答
      while (answerDir === '') {
        await delay(100)
      }
      if (answerDir === testVisualResult.data[testVisualResult.data.length - 1].dir) {
        testVisualResult.data[testVisualResult.data.length - 1].result = true
      }
    } else {
      console.log(testVisualResult.lever)
    }
  }
}
const checkRight = async () => {
  nowDir.value = 'left'
  await delay(3000)
}

// 获取测试配置
const getTestOption = () => {
  testOption = {
    minNum: 3,
    maxLevel: 5,
    minLevel: 3,
  }
}

onMounted(async () => {
  cmdStore.overBtn = 1
  getTestOption()
  checkBlock()
  await checkLeft()
  await checkRight()
})
</script>

<template>
  <div class="content">
    <div class="title">
      请根据前方视力表所指[E]开口方向按下<span style="color: brown">右侧</span>按钮
    </div>
    <div class="body">
      <div class="example">
        <div class="img"></div>
        <div class="label2">请留意前方屏幕</div>
        <div class="img"></div>
        <div class="label2">请按下右侧按钮</div>
      </div>
      <div class="frame-box">
        <div class="frame">
          <div v-if="!isBlock" class="frame-prompt">
            开始{{ nowDir === 'left' ? '左眼' : '右眼' }}视力检测
          </div>
        </div>
      </div>

      <div class="example1">
        <camera ref="cameraRef" @action="blockState" class="canvas" />
      </div>
    </div>
  </div>
  <BtnBox :btns="btns" />
  <overtime
    ref="overtimeRef"
    v-model:timeout-btn="timeoutBtn"
    :btns="overtimeBtns"
    :time-num="300"
    :nextPageData="nextPageData"
    class="overtime"
  />
  <report
    v-if="reportData.btn"
    :type="reportData.type"
    :path="reportData.path"
    :seconds="reportData.seconds"
    :secondsLabel="reportData.secondsLabel"
    :btns="[...btns, ContinueBtn]"
  >
    <div class="box">
      <div class="title1">视力检测完成</div>
      <div class="result">检测结果: {{ reportData.result.label }}</div>
      <div class="des">左眼视力: {{ reportData.result.left }}</div>
      <div class="des">右眼视力: {{ reportData.result.right }}</div>
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
.frame-box {
  width: 40%;
  height: 80%;
  margin-inline: 4%;
  border-radius: 2vw;
  border: 0.2vh solid white;
  padding: 2px;
}
.frame {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  border: 1vh solid white;
  border-radius: 2vw;
  display: flex;
  justify-content: center;
  background-color: white;
}
.frame-prompt {
  position: absolute;
  font-size: 2.5rem;
  color: brown;
  bottom: 10%;
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
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.example1 {
  width: 22%;
  height: 80%;
  border: 0.5vh solid white;
  position: relative;
}
.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
.img {
  height: 40%;
  width: 100%;
  border: 0.5vh solid white;
  box-sizing: border-box;
}
.label2 {
  font-size: 2rem;
  color: white;
  font-weight: 800;
  margin-bottom: 8%;
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
