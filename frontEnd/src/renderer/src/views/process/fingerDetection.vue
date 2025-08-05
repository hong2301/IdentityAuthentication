<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Camera, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const cmdStore = useCmdStore()
const nextPageData = ref({
  path: '/',
  seconds: 30000,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '拍照超时',
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
const snapBtnOpt: btnType = {
  label: '拍照',
  key: 'snap',
  type: 'success',
  icon: markRaw(Camera),
  position: 'right',
  onClick: () => {
    clickSnap()
  },
}
const continueBtn: btnType = {
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    router.push('/process/vehicleModel')
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
const btns = ref<btnType[]>([backBtn, snapBtnOpt])
const photoData = ref([
  {
    active: 0,
  },
  {
    active: 0,
  },
])

let number = 2
const nowNumber = ref(1)
let countdown = 5
const nowCountdown = ref(5)
const snapBtn = ref(0)
let interval: number | undefined

// 点击拍照
const clickSnap = () => {
  snapBtn.value = 1
  btns.value = [backBtn]
  runTime()
}

// 倒计时
const runTime = () => {
  nowCountdown.value = countdown
  clearInterval(interval)
  interval = setInterval(() => {
    nowCountdown.value--
    if (nowCountdown.value <= 0) {
      clearInterval(interval)
      nowNumber.value++
      nowCountdown.value = countdown
      if (nowNumber.value > number) {
        snapBtn.value = 2
        btns.value = [backBtn, continueBtn]
      } else {
        snapBtn.value = 0
        btns.value = [backBtn, snapBtnOpt]
      }
    }
  }, 1000)
}

// 获取拍照次数
const getNumber = () => {
  number = 2
}
// 获取拍照倒计时
const getCountdown = () => {
  countdown = 1
  nowCountdown.value = countdown
}
// 选择照片
const clickImg = (index: number) => {
  photoData.value.forEach((item) => {
    item.active = 0
  })
  photoData.value[index].active = 1
  projectStore.examData.photo = photoData.value[index]
}

onMounted(() => {
  cmdStore.overBtn = 1
  getNumber()
  getCountdown()
})
</script>

<template>
  <div class="content">
    <div class="body" v-if="snapBtn !== 2">
      <div class="example">
        <div class="img">
          <div class="img-content"></div>
        </div>
        <div class="img">
          <div class="img-content"></div>
        </div>
      </div>
      <div class="frame">
        <div v-if="snapBtn === 1" class="prompt">
          <div class="icon">⬆︎</div>
          <div class="label1">请看前方镜头</div>
        </div>
      </div>
      <div class="example">
        <div class="img">
          <div class="img-content">
            <div class="number-box">
              <div class="label">拍照次数</div>
              <div class="value">{{ nowNumber }}</div>
            </div>
          </div>
        </div>
        <div class="img">
          <div class="img-content">
            <div class="number-box">
              <div class="label">倒计时</div>
              <div class="value">{{ nowCountdown }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body" v-else>
      <div class="okBox">
        <div v-for="(item, index) in photoData" :key="index" class="okImg" @click="clickImg(index)">
          <div class="okImgContent" :class="[`${item.active && 'okImgContent-active'}`]"></div>
        </div>
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
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
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
  width: 30%;
  height: 90%;
  margin-inline: 4%;
  border: 1vh solid white;
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
</style>
