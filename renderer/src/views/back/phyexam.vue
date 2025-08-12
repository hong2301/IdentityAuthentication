<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref, reactive } from 'vue'
import { VideoCamera, Setting, Printer } from '@element-plus/icons-vue'

const cmdStore = useCmdStore()

const activeTag = ref('1')
const form = reactive({
  isEasy: false,
  printMode: false,
  afreshNum: 1,
  promptVolume: 1,
  hearing: [1, 0, 6, 8, 9, 10],
  saveVideo: false,
  vision: 0,
  checkHoes: false,
  checkUp: false,
  checkDoor: false,
  print: false,
  checkEye: false,
  inputNo: false,
  snap: true,
  prove: false,
  precon: false,
  checkPoison: false,
  checkLiving: false,
  ankle: {
    btn: false,
    threshold: 0,
  },
})

const handleOpen = (value: string) => {
  activeTag.value = value
}

onMounted(() => {})
</script>

<template>
  <div class="content">
    <el-menu default-active="1" @select="handleOpen">
      <el-menu-item index="1" class="menu-title">
        <el-icon><Setting /></el-icon>
        <span>基本设置</span>
      </el-menu-item>
      <el-menu-item index="2" class="menu-title">
        <el-icon><VideoCamera /></el-icon>
        <span>媒体设置</span>
      </el-menu-item>
      <el-menu-item index="3" class="menu-title">
        <el-icon><Printer /></el-icon>
        <span>打印设置</span>
      </el-menu-item>
    </el-menu>
    <div v-if="activeTag === '1'" class="content-right">
      <div class="left content-item">
        <el-form :model="form" label-width="auto" size="large" label-position="left" class="form">
          <el-form-item label="检测脱鞋功能">
            <el-switch v-model="form.checkHoes" />
          </el-form-item>
          <el-form-item label="检测开门功能">
            <el-switch v-model="form.checkDoor" />
          </el-form-item>
          <el-form-item label="上升屏">
            <el-switch v-model="form.checkUp" />
          </el-form-item>
          <el-form-item label="体检不合格打印体检表">
            <el-switch v-model="form.print" />
          </el-form-item>
          <el-form-item label="视力检测人眼识别功能">
            <el-switch v-model="form.checkEye" />
          </el-form-item>
          <el-form-item label="体检简易模式">
            <el-switch v-model="form.isEasy" />
          </el-form-item>
          <el-form-item label="视力检测人眼识别功能">
            <el-radio-group v-model="form.vision">
              <el-radio :value="0">3米</el-radio>
              <el-radio :value="1">5米</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="脚腕检测:" label-position="top" size="default">
            <div class="form-item-content1">
              <div style="display: flex; width: 70%">
                <div class="tl-item-title">踮脚阈值:</div>
                <el-input-number v-model="form.afreshNum" :min="1" :max="10">
                  <template #suffix>
                    <span>cm</span>
                  </template>
                </el-input-number>
              </div>

              <el-switch v-model="form.ankle.btn" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="right content-item">
        <el-form :model="form" label-width="auto" size="large" label-position="left" class="form">
          <el-form-item label="手动输入档案编号">
            <el-switch v-model="form.inputNo" />
          </el-form-item>
          <el-form-item label="摄像头抓拍功能">
            <el-switch v-model="form.snap" />
          </el-form-item>
          <el-form-item label="人证合一核验功能">
            <el-switch v-model="form.prove" />
          </el-form-item>
          <el-form-item label="在逃人员防控功能">
            <el-switch v-model="form.precon" />
          </el-form-item>
          <el-form-item label="吸毒、精神疾病人员检测功能">
            <el-switch v-model="form.checkPoison" />
          </el-form-item>
          <el-form-item label="活体检测功能">
            <el-switch v-model="form.checkLiving" />
          </el-form-item>
          <el-form-item label="重新检查次数">
            <el-input-number v-model="form.afreshNum" :min="1" :max="10" size="default" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="activeTag === '2'" class="content-right">2</div>
    <div v-if="activeTag === '3'" class="content-right">3</div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.content-right {
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  padding: 5%;
  display: flex;
  justify-content: space-between;
}
.menu-title {
  font-size: 1.5rem;
  height: 10%;
}
.content-item {
  width: 45%;
  height: 100%;
}
.left {
}
.form-item-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tl-item {
  width: 18%;
  display: flex;
  color: rgb(96, 98, 102);
  justify-content: space-between;
}
.tl-item-title {
  font-size: 1.2rem;
  color: rgb(96, 98, 102);
  margin-right: 1%;
}
.tl-item-input {
  width: 70%;
}
.left-bottom {
  width: 100%;
  height: 20%;
  display: flex;
}
.right {
}
.form {
  font-size: 1.7rem !important;
  font-weight: 800;
}

.form * {
  font-size: inherit !important; /* 强制所有子元素继承 */
  font-weight: inherit !important; /* 强制所有子元素继承 */
}
.form-item-content1 {
  padding-left: 2%;
  font-size: 1.2rem !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
