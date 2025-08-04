<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref, markRaw } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import CarCard from '@/components/carCard.vue'
const cmdStore = useCmdStore()

const nextPageData = ref({
  path: '/layout/overtime',
  seconds: 30000,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '身份证信息获取超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  over: 1,
})

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

const backHandleBack = () => {
  router.go(-1)
}

const backHandleCon = () => {
  console.log('继续')
  // router.push('/layout/vehicleModel')
}

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="title">请点击选择准架车型(再次点击可取消选择，可多选进行组合)</div>
    <div class="car-box">
      <div class="row1">
        <CarCard number="C1" text="小型汽车" :font-size="2" class="card1" />
        <CarCard number="C2" text="小型自动挡汽车" :font-size="2" class="card1" />
      </div>
      <div class="row2">
        <CarCard number="A1" text="大型客车" class="card2" />
        <CarCard number="A2" text="牵引车" class="card2" />
        <CarCard number="A3" text="城市公交车" class="card2" />
        <CarCard number="B1" text="中型客车" class="card2" />
        <CarCard number="B2" text="大型汽车" class="card2" />
      </div>
      <div class="row3">
        <CarCard number="D" text="普通三轮摩托车" class="card3" />
        <CarCard number="E" text="普通二轮摩托车" class="card3" />
        <CarCard number="F" text="轻便摩托车" class="card3" />
        <CarCard number="C3" text="低速载货车" class="card3" />
        <CarCard number="C4" text="三轮汽车" class="card3" />
      </div>
      <div class="row4">
        <CarCard number="C5" :font-size="1" text="残疾人专用自动挡汽车" class="card4" />
        <CarCard number="C6" text="轻型牵引挂车" class="card4" />
        <CarCard number="M" text="轮式自行机械车" class="card4" />
        <CarCard number="N" text="无轨电车" class="card4" />
        <CarCard number="P" text="有轨电车" class="card4" />
      </div>
    </div>
    <overtime :time-num="300" :nextPageData="nextPageData" class="overtime" />
    <BtnBox :btns="btns" />
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
.car-box {
  width: 90%;
  height: 90%;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.row1 {
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.row2 {
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row3 {
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.row4 {
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card1 {
  width: 40%;
  height: 100%;
  background-color: aqua;
}
.card2 {
  width: 19%;
  height: 100%;
  background-color: aqua;
}
.card3 {
  width: 19%;
  height: 100%;
  background-color: aqua;
}
.card4 {
  width: 19%;
  height: 100%;
  background-color: aqua;
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
