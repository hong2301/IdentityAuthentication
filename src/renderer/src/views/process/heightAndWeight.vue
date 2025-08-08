<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right, Select } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'
import report from '@/components/report.vue'

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
const ContinueCheckBtn: btnType = {
  label: '开始',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    runStep.value = 1
    title.value = title2
    btns.value = []
    startCheck()
  },
}

const timeoutBtn = ref(false)
const overtimeRef = ref()
const btns = ref<btnType[]>([ContinueCheckBtn])
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
const title1 = '请将鞋和帽子脱掉, 站立踏板区测试, 点击按钮开始测试'
const title2 = '身高检测: 立于踏板区, 头部目视前方'
const title = ref(title1)
const runStep = ref(0)
const heightCheck = ref(170)
const weightCheck = ref(170)
const checkResult = ref(0)

// 开始检测
const startCheck = () => {
  checkResult.value = 1
}

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="title">{{ title }}</div>
    <div v-if="runStep === 0" class="body">
      <div class="example"></div>
    </div>
    <div v-if="runStep === 1" class="body1">
      <div class="show1">
        <div class="example2"></div>
        <div class="example2"></div>
      </div>
      <div class="show">
        <div class="content-box">身高: {{ heightCheck }} cm</div>
        <div class="content-box">体重: {{ weightCheck }} kg</div>
        <div class="wan1"></div>
        <div class="wan2"></div>
      </div>
      <div class="show2">
        <div class="warn"></div>
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
    v-if="checkResult"
    :type="1"
    path="/process/fileComplaint"
    :seconds="3"
    secondsLabel="即将进行下一步: "
    :btns="[ContinueBtn]"
  >
    <div class="box">
      <div class="title1">身高体重检测检测完成</div>
      <div class="result">检测结果:</div>
      <div class="result">身高:</div>
      <div class="result">体重:</div>
      <div class="result">下肢长度差:</div>
      <div class="result">脚腕活动:</div>
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
.body {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.body1 {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.show {
  width: 33%;
  height: 90%;
  border: 0.5vh solid rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  background: linear-gradient(135deg, #1a4b8c 0%, #2a7be4 100%);
  background-size: 200% 200%; /* Double size for animation */
  box-shadow: 0 8px 32px rgba(0, 98, 255, 0.2);
  position: relative;
  overflow: hidden;
  padding: 20px;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: gradientFlow 1s ease infinite;
}

/* Glowing border effect */
.show::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 14px; /* Slightly larger than container */
  background: linear-gradient(
    45deg,
    rgba(42, 123, 228, 0.8),
    rgba(255, 255, 255, 0.2),
    rgba(42, 123, 228, 0.8)
  );
  z-index: -1;
  opacity: 0.7;
  animation: borderPulse 1s linear infinite;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

@keyframes borderPulse {
  0% {
    opacity: 0.5;
    background-position: 0% 0%;
  }
  50% {
    opacity: 0.9;
    background-position: 100% 100%;
  }
  100% {
    opacity: 0.5;
    background-position: 0% 0%;
  }
}
.content-box {
  width: 100%;
  height: 48%;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
}
.wan1 {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  border-top: 2px solid rgba(255, 255, 255, 0.5);
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 6px 0 0 0;
}
.wan2 {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 0 0 6px 0;
}
.show1 {
  width: 33%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.show2 {
  width: 33%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.warn {
  width: 50%;
  height: 50%;
  border: 0.5vh solid white;
}
.example2 {
  width: 45%;
  height: 45%;
  border: 0.5vh solid white;
}
.example {
  width: 30%;
  height: 90%;
  border: 1vh solid white;
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
  width: 100%;
  display: flex;
  justify-content: center;
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
