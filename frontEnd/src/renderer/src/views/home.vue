<script setup lang="ts">
import { onMounted, ref } from 'vue'

const no = ref('')

// 获取编号
const getNo = () => {
  no.value = '10000000'
}
onMounted(() => {
  getNo()
})
</script>

<template>
  <div class="overture">
    <div class="head">
      <img class="log" src="../assets/log.png" mode="scaleToFill" />
      <div class="title-box">
        <div class="title">车驾管自助体检机<span class="title-end"> -- 后台设置</span></div>
        <div id="no" class="number">设备编号:{{ no }}</div>
      </div>
      <el-button>退出</el-button>
    </div>
    <div class="content-box"></div>
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
  height: 60px;
  background-color: rgb(58, 106, 187);
  display: flex;
  align-items: center;
  padding-inline: 2%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(136, 167, 220);
}
.log {
  height: 60%;
  aspect-ratio: 1.88;
}
.title-box {
  margin-left: 1%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 1.1rem;
  line-height: 24px;
  font-weight: 800;
  color: white;
}
.title-end {
  font-size: 0.8rem;
}
.number {
  font-size: 0.6rem;
  line-height: 12px;
  font-weight: 200;
  color: white;
  display: flex;
}
.content-box {
  width: 100%;
  flex: 1;
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
