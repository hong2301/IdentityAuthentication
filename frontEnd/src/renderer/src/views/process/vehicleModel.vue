<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref, markRaw } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import CarCard from '@/components/carCard.vue'
import type { carType } from '@/types/car'
import { useProjectStore } from '@/stores/project'
const cmdStore = useCmdStore()

const nextPageData = ref({
  path: '/layout/overtime',
  seconds: 30000,
  secondsLabel: '点击继续可重试，否则即将前往首页:',
  label: '车型选择超时',
  icon: 'Timer',
  type: 0,
  continue: 1,
  back:1,
  over: 1,
})

const timeoutBtn=ref(false)
const overtimeRef=ref()

const btns = ref<btnType[]>([
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
      showCard.value = true
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
      timeoutBtn.value=false
      overtimeRef.value.runTime()
    },
  },
])

const selectCar = ref('')
const showCard = ref(false)

const carType1 = ref<carType[]>([
  {
    text: '小型汽车',
    fontSize: 2,
    number: 'C1',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '小型自动挡汽车',
    fontSize: 2,
    number: 'C2',
    active: 0,
    img: '../assets/log.png',
  },
])
const carType2 = ref<carType[]>([
  {
    text: '大型客车',
    fontSize: 1.2,
    number: 'A1',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '牵引车',
    fontSize: 1.2,
    number: 'A2',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '城市公交车',
    fontSize: 1.2,
    number: 'A3',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '中型客车',
    fontSize: 1.2,
    number: 'B1',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '大型汽车',
    fontSize: 1.2,
    number: 'B2',
    active: 0,
    img: '../assets/log.png',
  },
])
const carType3 = ref<carType[]>([
  {
    text: '普通三轮摩托车',
    fontSize: 1.2,
    number: 'D',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '普通二轮摩托车',
    fontSize: 1.2,
    number: 'E',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '轻便摩托车',
    fontSize: 1.2,
    number: 'F',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '低速载货车',
    fontSize: 1.2,
    number: 'C3',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '三轮汽车',
    fontSize: 1.2,
    number: 'C4',
    active: 0,
    img: '../assets/log.png',
  },
])
const carType4 = ref<carType[]>([
  {
    text: '残疾人专用自动挡汽车',
    fontSize: 1,
    number: 'C5',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '轻型牵引挂车',
    fontSize: 1.2,
    number: 'C6',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '轮式自行机械车',
    fontSize: 1.2,
    number: 'M',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '无轨电车',
    fontSize: 1.2,
    number: 'N',
    active: 0,
    img: '../assets/log.png',
  },
  {
    text: '有轨电车',
    fontSize: 1.2,
    number: 'P',
    active: 0,
    img: '../assets/log.png',
  },
])

// 选择变化
const clickCarCard = () => {
  selectCar.value = ''
  carType1.value.forEach((item) => {
    if (item.active === 1) {
      selectCar.value += item.number + ', '
    }
  })
  carType2.value.forEach((item) => {
    if (item.active === 1) {
      selectCar.value += item.number + ', '
    }
  })
  carType3.value.forEach((item) => {
    if (item.active === 1) {
      selectCar.value += item.number + ', '
    }
  })
  carType4.value.forEach((item) => {
    if (item.active === 1) {
      selectCar.value += item.number + ', '
    }
  })
}

// 确定信息
const over=()=>{
  const projectStore=useProjectStore()
  projectStore.examData.carType=selectCar.value
    router.push('/layout/confurm')
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
        <CarCard
          v-for="(cItem, cIndex) in carType1"
          :key="cIndex"
          :number="cItem.number"
          :text="cItem.text"
          :font-size="cItem.fontSize"
          v-model:active="cItem.active"
          :img="cItem.img"
          @click-card="clickCarCard"
          class="card1"
        />
      </div>
      <div class="row2">
        <CarCard
          v-for="(cItem, cIndex) in carType2"
          :key="cIndex"
          :number="cItem.number"
          :text="cItem.text"
          :font-size="cItem.fontSize"
          v-model:active="cItem.active"
          :img="cItem.img"
          @click-card="clickCarCard"
          class="card2"
        />
      </div>
      <div class="row3">
        <CarCard
          v-for="(cItem, cIndex) in carType3"
          :key="cIndex"
          :number="cItem.number"
          :text="cItem.text"
          :font-size="cItem.fontSize"
          v-model:active="cItem.active"
          :img="cItem.img"
          @click-card="clickCarCard"
          class="card3"
        />
      </div>
      <div class="row4">
        <CarCard
          v-for="(cItem, cIndex) in carType4"
          :key="cIndex"
          :number="cItem.number"
          :text="cItem.text"
          :font-size="cItem.fontSize"
          v-model:active="cItem.active"
          :img="cItem.img"
          @click-card="clickCarCard"
          class="card4"
        />
      </div>
    </div>
    <div class="title1">您选择的车型有: {{ selectCar.slice(0, -2) }}</div>
    <BtnBox :btns="btns" />
    <el-dialog v-model="showCard"  width="800">
      <template #header>
        信息确认
      </template>
      <div class="body">
        <div style="width: 100%; display: flex; justify-content: center">
          请参考下图实例核对选择的准架车型是否正确，如有多个准架车型，请务必选择。
        </div>
        <div class="img-box">
          <img class="img"></img>
          <img class="img"></img>
        </div>
        <div>当前准架车型有: <span style="color: brown;">{{ selectCar.slice(0, -2) }}</span></div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="large" @click="showCard = false">
            <span style="font-size: 1.5rem">重选</span>
          </el-button>
          <el-button size="large" type="primary" @click="over">
            <span style="font-size: 1.5rem">确定</span>
          </el-button>
        </div>
      </template>
    </el-dialog>
     <overtime ref="overtimeRef" v-model:timeout-btn="timeoutBtn" :btns="overtimeBtns" :time-num="300" :nextPageData="nextPageData" class="overtime" />
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
  position: relative;
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
.title1 {
  position: absolute;
  font-size: 2rem;
  color: rgb(255, 255, 0);
  font-weight: 800;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -9%;
}
.car-box {
  width: 90%;
  height: 90%;
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
}
.card2 {
  width: 19%;
  height: 100%;
}
.card3 {
  width: 19%;
  height: 100%;
}
.card4 {
  width: 19%;
  height: 100%;
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
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid rgba(85, 140, 202, 1);
  padding: 2%;
  color: rgba(0, 0, 0, 1);
  font-weight: 800;
}
.img-box{
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-block: 2%;
}
.img{
  width: 45%;
  height: 100%;
    background-color: red;
}
</style>
