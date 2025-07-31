<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Back, Refresh, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const cmdStore = useCmdStore()
const titleEnd = ref<string[]>([])
const inBackBtn = ref(false)
const backPassWord = ref('')

// 返回
const goToRoot = () => {
  router.go(-1)
}
// 关机
const close = () => {
  console.log('关机')
}
// 重启
const reset = () => {
  console.log('重启')
}

const no = ref('')

// 获取编号
const getNo = () => {
  no.value = '10000000'
}

// 后台进入
const inBack = () => {
  const img = document.getElementById('log')
  if (img) {
    let pressTimer: number | undefined

    img.addEventListener('mousedown', (e) => {
      pressTimer = setTimeout(() => {
        inBackBtn.value = true
      }, 1000) // 1000ms = 1秒，长按时间阈值
    })

    img.addEventListener('mouseup', () => {
      clearTimeout(pressTimer) // 如果提前松开，取消长按事件
    })

    img.addEventListener('mouseleave', () => {
      clearTimeout(pressTimer) // 鼠标移出时也取消
    })
  }
}

onMounted(() => {
  getNo()
  getTitleEnd()
  inBack()
})

// 获取副标题
const getTitleEnd = () => {
  const [, ...subRoutes] = route.matched
  titleEnd.value = []
  subRoutes.forEach((item) => {
    if (item.name !== '首页') titleEnd.value.push(item.name as string)
  })
}

const appendNumber = (num: number) => {
  if (backPassWord.value.length < 6) {
    backPassWord.value += num.toString()
  }
}
const deleteNumber = () => {
  backPassWord.value = backPassWord.value.slice(0, -1)
}
const clearNumber = () => {
  backPassWord.value = ''
}

const inBackNo = () => {
  inBackBtn.value = false
}

const inBackGo = () => {
  const password = '666666'
  if (backPassWord.value !== password) {
    ElMessage.error('密码错误!')
  } else {
    inBackBtn.value = false
    router.push('layout/back')
  }
}

// 监控路由变化
watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log('路由从', oldPath, '跳转到', newPath)

    // 关闭所有cmd
    cmdStore.close()

    // 副标题
    getTitleEnd()
  },
)
</script>

<template>
  <div class="overture">
    <div class="head">
      <div class="left">
        <img id="log" class="log" src="../assets/log.png" mode="scaleToFill" />
        <div class="title-box">
          <div class="title">
            驾驶人身体条件自助检测
            <span v-for="(tItem, tIndex) in titleEnd" :key="tIndex" class="title-end">
              / {{ tItem }}</span
            >
          </div>
          <div id="no" class="number">设备编号:{{ no }}</div>
        </div>
      </div>
      <div class="cmd-box"></div>
      <el-button v-if="cmdStore.resetBtn" type="warning" @click="reset" :icon="Refresh">
        重启
      </el-button>
      <el-button v-if="cmdStore.closeBtn" type="danger" @click="close" :icon="SwitchButton">
        关机
      </el-button>
      <el-button v-if="cmdStore.backBtn" type="primary" @click="goToRoot" :icon="Back">
        返回
      </el-button>
    </div>
    <div class="content-box">
      <router-view />
    </div>
    <el-dialog v-model="inBackBtn" title="进入后台设置" width="500">
      <el-input
        v-model="backPassWord"
        type="password"
        show-password
        placeholder="请输入密码"
        size="large"
      ></el-input>
      <div class="number-keyboard">
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="appendNumber(1)">1</button>
          <button class="keyboard-btn" @click="appendNumber(2)">2</button>
          <button class="keyboard-btn" @click="appendNumber(3)">3</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="appendNumber(4)">4</button>
          <button class="keyboard-btn" @click="appendNumber(5)">5</button>
          <button class="keyboard-btn" @click="appendNumber(6)">6</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="appendNumber(7)">7</button>
          <button class="keyboard-btn" @click="appendNumber(8)">8</button>
          <button class="keyboard-btn" @click="appendNumber(9)">9</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="clearNumber">清空</button>
          <button class="keyboard-btn" @click="appendNumber(0)">0</button>
          <button class="keyboard-btn" @click="deleteNumber">删除</button>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="inBackNo">取消</el-button>
          <el-button type="primary" @click="inBackGo"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.overture {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.head {
  width: 100%;
  height: 10vh;
  background-color: rgb(58, 106, 187);
  display: flex;
  align-items: center;
  padding-inline: 2%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(136, 167, 220);
  justify-content: space-between;
}
.left {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
}
.cmd-box {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: flex-end;
}
.log {
  height: 60%;
  aspect-ratio: 1.88;
}
.title-box {
  margin-left: 2vh;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 3vh;
  line-height: 4vh;
  font-weight: 800;
  color: white;
}
.title-end {
  font-size: 2.5vh;
}
.number {
  line-height: 2vh;
  font-size: 1.5vh;
  font-weight: 200;
  color: white;
  display: flex;
}
.content-box {
  width: 100%;
  height: 90vh;
  /* 政务蓝背景 + 中心高光渐变 */
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(85, 140, 202, 1) 70%
  );
  /* 政务蓝底色（备用，如果浏览器不支持渐变时显示） */
  background-color: rgba(85, 140, 202, 1);
}
.number-keyboard {
  margin-top: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
}

.keyboard-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.keyboard-btn {
  width: 30%;
  height: 50px;
  font-size: 18px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.keyboard-btn:hover {
  background-color: #f5f7fa;
}

.keyboard-btn:active {
  background-color: #ebeef5;
}
</style>
