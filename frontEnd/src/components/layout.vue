<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Back, Refresh, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const cmdStore = useCmdStore()
const titleEnd = ref<string[]>([])

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

onMounted(() => {
  getNo()
  getTitleEnd()
})

// 获取副标题
const getTitleEnd = () => {
  const [, ...subRoutes] = route.matched
  titleEnd.value = []
  subRoutes.forEach((item) => {
    titleEnd.value.push(item.name as string)
  })
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
        <img class="log" src="../assets/log.png" mode="scaleToFill" />
        <div class="title-box">
          <div class="title">
            车驾管自助体检机
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
  font-weight: 800;
  color: white;
}
.title-end {
  font-size: 2.5vh;
}
.number {
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
</style>
