<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const cmdStore = useCmdStore()
const nextPageData = ref({
  path: '/',
  seconds: 30000,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '听力检测超时',
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
const ContinueBtn: btnType = {
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    router.push('/process/fileComplaint')
  },
}

const timeoutBtn = ref(false)
const overtimeRef = ref()
const btns = ref<btnType[]>([backBtn, ContinueBtn])
const overtimeBtns = ref<btnType[]>([
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

const runCanvas = () => {
  const canvas = document.querySelector('.board') as HTMLCanvasElement

  const ctx = canvas.getContext('2d')!

  // 设置画布大小（适配屏幕）
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()

  // 绘画设置
  ctx.strokeStyle = '#000000' // 线条颜色
  ctx.lineWidth = 3 // 线条粗细
  ctx.lineCap = 'round' // 线条端点圆润
  ctx.lineJoin = 'round' // 线条连接圆润

  // 绘画状态
  let isDrawing = false
  let lastX = 0
  let lastY = 0

  // 开始绘画（触摸/鼠标按下）
  function startDrawing(e: MouseEvent | Touch) {
    isDrawing = true
    const pos = getPosition(e)
    ;[lastX, lastY] = [pos.x, pos.y]
  }

  // 绘画中（触摸移动/鼠标移动）
  function draw(e: MouseEvent | Touch) {
    if (!isDrawing) return

    const pos = getPosition(e)
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ;[lastX, lastY] = [pos.x, pos.y]
  }

  // 结束绘画（触摸结束/鼠标抬起）
  function stopDrawing() {
    isDrawing = false
  }

  // 获取坐标（兼容触摸和鼠标事件）
  function getPosition(e: any) {
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX || e.touches[0].clientX) - rect.left,
      y: (e.clientY || e.touches[0].clientY) - rect.top,
    }
  }

  // 鼠标事件监听
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mouseout', stopDrawing)

  // 触摸事件监听（移动端支持）
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault() // 阻止触摸滚动
    startDrawing(e.touches[0])
  })
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault() // 阻止触摸滚动
    draw(e.touches[0])
  })
  canvas.addEventListener('touchend', stopDrawing)
}

onMounted(() => {
  cmdStore.overBtn = 1
  runCanvas()
})
</script>

<template>
  <div class="content">
    <div class="title">请您在触屏感应框内签名之后点击确认，不要超出</div>
    <canvas class="board">
      <div class="line1"></div>
      <div class="line2"></div>
    </canvas>
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
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.board {
  width: 60%;
  height: 80%;
  background-color: white;
  border-radius: 2vh;
  border: 0.5vh solid wheat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none; /* 禁止触摸默认行为 */
}
.line1 {
  position: absolute;
  height: 100%;
  border: 2px dashed black;
}
.line2 {
  position: absolute;
  width: 100%;
  border: 2px dashed black;
}
.overtime {
  position: fixed;
  top: 0;
  right: 16vw;
  height: 10vh;
  display: flex;
  align-items: center;
}
</style>
