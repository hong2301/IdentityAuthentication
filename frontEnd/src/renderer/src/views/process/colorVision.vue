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
const sure: btnType = {
  label: '确定',
  key: 'sure',
  type: 'success',
  icon: markRaw(Select),
  position: 'right',
  onClick: () => {
    nextCheck()
  },
}
const ContinueBtn: btnType = {
  label: '继续',
  key: 'continue',
  type: 'success',
  icon: markRaw(Right),
  position: 'right',
  onClick: () => {
    router.push('/process/vision')
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
const btns = ref<btnType[]>([backBtn, sure])
const checkMaterial = [
  {
    img: '',
    answer: 0,
    nowSelect: 0,
    keys: [
      {
        label: '鸟',
        active: 0,
      },
      {
        label: '86',
        active: 0,
      },
      {
        label: '825',
        active: 0,
      },
      {
        label: '522',
        active: 0,
      },
      {
        label: '60',
        active: 0,
      },
      {
        label: '兔子',
        active: 0,
      },
      {
        label: '鱼',
        active: 0,
      },
      {
        label: '29',
        active: 0,
      },
    ],
  },
  {
    img: '',
    answer: 0,
    nowSelect: 0,
    keys: [
      {
        label: '猪',
        active: 0,
      },
      {
        label: '86',
        active: 0,
      },
      {
        label: '825',
        active: 0,
      },
      {
        label: '522',
        active: 0,
      },
      {
        label: '60',
        active: 0,
      },
      {
        label: '兔子',
        active: 0,
      },
      {
        label: '鱼',
        active: 0,
      },
      {
        label: '29',
        active: 0,
      },
    ],
  },
]
// 当前检测到第几次
const nowRunIndex = ref(0)
// 检测次数
const maxRunNum = 2
//  检测结果报告
const checkResult = ref(0)
// 显示的内容
const showCheckData = ref(checkMaterial[nowRunIndex.value])

// 选择
const clickKey = (index: number) => {
  showCheckData.value.keys.forEach((item) => {
    item.active = 0
  })
  showCheckData.value.keys[index].active = 1
  showCheckData.value.nowSelect = index
}
// 检测
const nextCheck = () => {
  if (showCheckData.value.nowSelect === showCheckData.value.answer) {
    console.log('通过')
  } else {
    console.log('不通过')
  }
  nowRunIndex.value++
  const maxNum = Math.min(maxRunNum + 1, checkMaterial.length)
  if (nowRunIndex.value >= maxNum) {
    checkResult.value = 1
  } else {
    showCheckData.value = checkMaterial[nowRunIndex.value]
  }
}

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="title">辨色力检测: 请在底部选择您在图片看到的内容</div>
    <div class="checkBox">
      <div class="img">{{}}</div>
      <div class="key">
        <div
          v-for="(kItem, kIndex) in showCheckData.keys"
          :key="kIndex"
          class="keyItem"
          :class="[`${kItem.active && 'keyItem-active'}`]"
          @click="clickKey(kIndex)"
        >
          {{ kItem.label }}
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
  <report
    v-if="checkResult"
    :type="1"
    path="/process/vision"
    :seconds="300"
    secondsLabel="即将进行下一步: "
    :btns="[backBtn, ContinueBtn]"
  >
    <div class="box">
      <div class="title1">辨色力检测完成</div>
      <div class="result">检测结果: 合格</div>
      <div class="des">无红绿色盲题</div>
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkBox {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.img {
  width: 55%;
  height: 80%;
  border: 1vh solid white;
  box-sizing: border-box;
}
.key {
  width: 65%;
  height: 15%;
  display: flex;
  justify-content: space-between;
}
.keyItem {
  display: flex;
  justify-content: center;
  align-items: center;
  /* 基本样式 */
  height: 100%;
  aspect-ratio: 1;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  border-radius: 8px;
  border: none;
  box-shadow:
    0 4px 0 #b5b5b5,
    0 5px 5px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 white,
    inset 0 -3px 0 #d9d9d9;

  /* 文字样式 */
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;

  /* 3D效果 */
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: all 0.08s ease;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}

/* 按下效果 */
.keyItem-active {
  transform: translateY(4px);
  box-shadow:
    0 1px 0 #b5b5b5,
    0 2px 2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 white,
    inset 0 -3px 0 #d9d9d9;
  background: linear-gradient(145deg, #d9d9d9, #f2f2f2);
}

/* 按键边缘高光 */
.keyItem::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  height: 15px;
  border-radius: 5px 5px 0 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
}

/* 按键底部阴影 */
.keyItem::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 4px;
  right: 4px;
  height: 5px;
  background: #a3a3a3;
  border-radius: 0 0 5px 5px;
  filter: blur(2px);
  z-index: -1;
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
