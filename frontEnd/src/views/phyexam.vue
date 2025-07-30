<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref, reactive } from 'vue'

const cmdStore = useCmdStore()

const form = reactive({
  isEasy: false,
  printMode: 0,
  afreshNum: 1,
  promptVolume: 1,
  hearing: [10, 6, 8, 9, 10],
  saveVideo: 0,
  vision: 0,
  checkHoes: 0,
  checkUp: 0,
  checkDoor: 0,
  print: 0,
  checkEye: 0,
  inputNo: 0,
  snap: 0,
  prove: 0,
  precon: 0,
  checkPoison: 0,
  checkLiving: 0,
})

onMounted(() => {
  cmdStore.backBtn = 1
  cmdStore.closeBtn = 1
  cmdStore.resetBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="left content-item">
      <el-form :model="form" label-width="auto" size="large" label-position="left">
        <el-form-item label="打印照片">
          <el-radio-group v-model="form.printMode">
            <el-radio :value="0">直接打印</el-radio>
            <el-radio :value="1">选择打印</el-radio>
            <el-radio :value="2">不打印</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="重新检查次数">
          <el-input-number v-model="form.afreshNum" :min="1" :max="10" size="default" />
        </el-form-item>
        <el-form-item label="提示音效音量">
          <el-input-number v-model="form.promptVolume" :min="1" :max="100" size="default" />
        </el-form-item>
        <el-form-item label="听力测试级别音量" label-position="top" size="default">
          <div class="form-item-content">
            <div class="tl-item">
              <div class="tl-item-title">一级</div>
              <el-input-number
                controls-position="right"
                v-model="form.hearing[0]"
                :min="1"
                :max="100"
                class="tl-item-input"
              />
            </div>
            <div class="tl-item">
              <div class="tl-item-title">二级</div>
              <el-input-number
                controls-position="right"
                v-model="form.hearing[1]"
                :min="1"
                :max="100"
                class="tl-item-input"
              />
            </div>
            <div class="tl-item">
              <div class="tl-item-title">三级</div>
              <el-input-number
                controls-position="right"
                v-model="form.hearing[2]"
                :min="1"
                :max="100"
                class="tl-item-input"
              />
            </div>
            <div class="tl-item">
              <div class="tl-item-title">四级</div>
              <el-input-number
                controls-position="right"
                v-model="form.hearing[3]"
                :min="1"
                :max="100"
                class="tl-item-input"
              />
            </div>
            <div class="tl-item">
              <div class="tl-item-title">五级</div>
              <el-input-number
                controls-position="right"
                v-model="form.hearing[4]"
                :min="1"
                :max="100"
                class="tl-item-input"
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="视频保存方式">
          <el-radio-group v-model="form.saveVideo">
            <el-radio :value="0">本地</el-radio>
            <el-radio :value="1">服务器</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="视力检测标准">
          <el-radio-group v-model="form.vision">
            <el-radio :value="0">3米</el-radio>
            <el-radio :value="1">5米</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="left-bottom">
        <div class="left content-item">
          <el-form :model="form" label-width="auto" size="large" label-position="left">
            <el-form-item label="检测脱鞋功能">
              <el-checkbox v-model="form.checkHoes" />
            </el-form-item>
            <el-form-item label="检测开门功能">
              <el-checkbox v-model="form.checkDoor" />
            </el-form-item>
            <el-form-item label="上升屏">
              <el-checkbox v-model="form.checkUp" />
            </el-form-item>
            <el-form-item label="体检不合格打印体检表">
              <el-checkbox v-model="form.print" />
            </el-form-item>
            <el-form-item label="视力检测人眼识别功能">
              <el-checkbox v-model="form.checkEye" />
            </el-form-item>
            <el-form-item label="体检简易模式">
              <el-checkbox v-model="form.isEasy" />
            </el-form-item>
          </el-form>
        </div>
        <div class="right content-item">
          <el-form :model="form" label-width="auto" size="large" label-position="left">
            <el-form-item label="手动输入档案编号">
              <el-checkbox v-model="form.inputNo" />
            </el-form-item>
            <el-form-item label="摄像头抓拍功能">
              <el-checkbox v-model="form.snap" />
            </el-form-item>
            <el-form-item label="人证合一核验功能">
              <el-checkbox v-model="form.prove" />
            </el-form-item>
            <el-form-item label="在逃人员防控功能">
              <el-checkbox v-model="form.precon" />
            </el-form-item>
            <el-form-item label="吸毒、精神疾病人员检测功能">
              <el-checkbox v-model="form.checkPoison" />
            </el-form-item>
            <el-form-item label="活体检测功能">
              <el-checkbox v-model="form.checkLiving" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="right content-item"></div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 3%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.content-item {
  width: 50%;
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
</style>
