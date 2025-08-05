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
import callSound from '@/utils/hardware'

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
    router.push('/process/hearing')
  },
}
const timeoutBtn = ref(false)
const overtimeRef = ref()
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

// 测试次数
const checkMaxNum=3
// 当前测试次数
let nowCheckIndex=1
// 当前点击的方向
let clickDir=''
// 检测结果开关
const checkResult=ref(0)

// 测试流程
const runCheck=async ()=>{
    while(nowCheckIndex<=checkMaxNum){
        nowCheckIndex++
        // 随机调用一个声道
        const randomChannel = Math.random() > 0.5 ;
        const result=callSound(randomChannel? 'right' : 'left')
        if (!result.success) return
        await waitForButtonClick();
        if(clickDir===result.result.direction){
            console.log("对")
        }else{
            console.log("错")
        }
    }
    checkResult.value=1

}

function waitForButtonClick() {
    return new Promise<void>((resolve) => {
        // Assuming you have button elements with IDs 'buttonLeft' and 'buttonRight'
        const buttonLeft = document.getElementById('buttonLeft');
        const buttonRight = document.getElementById('buttonRight');
        if(buttonLeft&&buttonRight){
            const clickHandler = () => {
                // Remove event listeners after one button is clicked
                buttonLeft.removeEventListener('click', clickHandler);
                buttonRight.removeEventListener('click', clickHandler);
                resolve();
            };
            
            buttonLeft.addEventListener('click', clickHandler);
            buttonRight.addEventListener('click', clickHandler);
        }
    });
}

const clickBtn=(dir:'left'|'right')=>{
    clickDir=dir
}

onMounted(() => {
  cmdStore.overBtn = 1
  runCheck()
})
</script>

<template>
  <div class="content">
    <div class="title">听力检测: 请选择听到的声源的方向</div>
    <div class="btn-box">
      <div id="buttonLeft" class="btn" @click="clickBtn('left')">
        <div class="icon-box">
            <img src="@/assets/volume.png" class="img"></img>
        </div>
        <div class="label" >左侧</div>
      </div>
      <div id="buttonRight" class="btn" @click="clickBtn('right')">
          <div class="icon-box">
            <img src="@/assets/volume-right.png" class="img"></img>
        </div>
        <div class="label">右侧</div>
      </div>
    </div>
  </div>
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
    path="/process/hearing"
    :seconds="3"
    secondsLabel="即将进行下一步: "
    :btns="[ContinueBtn]"
  >
    <div class="box">
      <div class="title1">听力检测完成</div>
      <div class="result">检测结果: 合格</div>
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
.btn-box {
  width: 80%;
  height: 85%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon-box {
  height: 70%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img{
    width: 40%;
    aspect-ratio: 1;
}
.label {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 800;
  color: white;
  background-color: rgba(0, 50, 150, 0.2);
  padding-bottom: 5%;
}
.btn {
    cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 30%;
  aspect-ratio: 1;
  border-radius: 50%;
  /* border: 1vh solid white; */

  /* 新增渐变底色 */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(100, 200, 255, 0.8) 0%,
    rgba(0, 100, 200, 0.9) 50%,
    rgba(0, 50, 150, 0.9) 100%
  );

  /* 添加高光效果 */
  box-shadow:
    inset 0 0 15px rgba(255, 255, 255, 0.6),
    inset -5px -5px 10px rgba(0, 0, 100, 0.5),
    0 0 10px rgba(0, 150, 255, 0.6);

  /* 科技感元素 - 发光效果 */
  position: relative;
  overflow: hidden;
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
/* 点击效果 */
.btn:active {
  transform: scale(0.95); /* 按钮轻微缩小 */
  
  /* 改变阴影和高光，模拟按下效果 */
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 0 10px rgba(0, 100, 255, 0.8),
    0 0 5px rgba(0, 150, 255, 0.6);
  
  /* 点击时改变渐变中心点 */
  background: radial-gradient(
    circle at 40% 40%,
    rgba(80, 180, 240, 0.8) 0%,
    rgba(0, 80, 180, 0.9) 50%,
    rgba(0, 30, 120, 0.9) 100%
  );
}

/* 可选：点击时增强光晕效果 */
.btn:active::after {
  opacity: 0.9;
  animation-duration: 3s;
}
</style>
