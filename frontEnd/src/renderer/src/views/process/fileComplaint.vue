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
const data = ref({
  isOrganicHeartDisease: false,
  isVertigo: false,
  isEpilepsy: false,
  isHysteria: false,
  isMeniere: false,
  isTremorParalysis: false,
  isMentalDisease: false,
  isDementia: false,
  isPhysicalDisability: false,
  isDrugTaking: false,
  isEnsure: false,
})

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="body">
      <div class="body-content">
        <div class="left">申告事项</div>
        <div class="right">
          <div class="row1">本人如是申告, 具有下列疾病或者情况:</div>
          <div class="row2">
            <div class="line">
              <div class="checkItem">
                <el-checkbox v-model="data.isOrganicHeartDisease" />
                <div class="label">器质性心脏病</div>
              </div>
              <div class="checkItem">
                <el-checkbox v-model="data.isVertigo" />
                <div class="label">眩晕</div>
              </div>
              <div class="checkItem">
                <el-checkbox v-model="data.isEpilepsy" />
                <div class="label">癫痫</div>
              </div>
              <div class="checkItem">
                <el-checkbox v-model="data.isHysteria" />
                <div class="label">癔症</div>
              </div>
            </div>
            <div class="line">
              <div class="checkItem">
                <el-checkbox v-model="data.isMeniere" />
                <div class="label">美尼尔氏症</div>
              </div>
              <div class="checkItem">
                <el-checkbox v-model="data.isTremorParalysis" />
                <div class="label">震癫麻痹</div>
              </div>
              <div class="checkItem">
                <el-checkbox v-model="data.isMentalDisease" />
                <div class="label">精神病</div>
              </div>
              <div class="checkItem">
                <el-checkbox v-model="data.isDementia" />
                <div class="label">痴呆</div>
              </div>
            </div>
            <div class="line">
              <div class="checkItem">
                <el-checkbox v-model="data.isPhysicalDisability" />
                <div class="label">影响肢体活动的神经系统疾病等妨碍安全驾驶疾病</div>
              </div>
              <div class="checkItem"></div>
              <div class="checkItem"></div>
              <div class="checkItem"></div>
            </div>
            <div class="line">
              <div class="checkItem">
                <el-checkbox v-model="data.isDrugTaking" />
                <div class="label">吸食、注射毒品、长期服用依赖性精神药品成瘾尚未戒除</div>
              </div>
              <div class="checkItem"></div>
              <div class="checkItem"></div>
              <div class="checkItem"></div>
            </div>
          </div>
          <div class="row3">
            <div class="line">
              <div class="checkItem">
                <el-checkbox fill="#a52a2a" v-model="data.isEnsure" />
                <div class="label-box">
                  <div class="label" style="margin-bottom: 5%">
                    上述申告为本人真实情况和真实意思表示，
                  </div>

                  <div class="label">如果不属实本人自愿承担相应的法律责任</div>
                </div>
              </div>
              <div class="checkItem"></div>
              <div class="checkItem"></div>
              <div class="checkItem"></div>
            </div>
          </div>
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
  flex-direction: column;
}
.body {
  width: 90%;
  height: 80%;
  border: 0.5vh solid white;
}
.body-content {
  width: 100%;
  height: 100%;
  border: 0.5vh solid rgba(85, 140, 202, 1);
  box-sizing: border-box;
  background-color: white;
  display: flex;
}
.right {
  width: 80%;
  height: 100%;
}
.left {
  width: 20%;
  height: 100%;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border: 2px solid black;
  box-sizing: border-box;
  font-weight: 800;
}
.row1 {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 800;
  font-weight: 800;
  font-size: 2rem;
  border: 2px solid black;
  border-left: none;
  box-sizing: border-box;
}
.row2 {
  width: 100%;
  height: 70%;
  box-sizing: border-box;
  border: 2px solid black;
  border-left: none;
  border-top: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.line {
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.checkItem {
  width: 22%;
  height: 100%;
  display: flex;
  align-items: center;
}
.label {
  font-size: 1.8rem;
  color: black;
  line-height: 1.8rem;
  margin-left: 5%;
  white-space: nowrap; /* 强制不换行 */
}
.label-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: translate(10%, -50%);
}
.label-box * {
  color: #a52a2a;
}
.row3 {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 800;
  font-weight: 800;
  font-size: 2rem;
  border: 2px solid black;
  border-top: none;
  border-left: none;
  box-sizing: border-box;
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
