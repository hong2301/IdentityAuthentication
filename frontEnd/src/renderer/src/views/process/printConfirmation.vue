<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { markRaw, onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Refresh, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
import { useProjectStore } from '@/stores/project'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

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
  onClick: async () => {
    const element = document.querySelector('.paper') as HTMLElement

    // 1. 将 HTML 转为 Canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 提高清晰度
      logging: false, // 关闭调试日志
      useCORS: true, // 允许跨域图片
    })

    // 2. 计算 PDF 尺寸（A4 标准：210mm x 297mm）
    const imgData = canvas.toDataURL('image/png')
    const pdfWidth = 210 // mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    // 3. 生成 PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

    // 4. 下载 PDF
    pdf.save('exported-document.pdf')
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

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="paper">
      <div class="title">机动车驾驶人身体条件证明</div>
      <div class="paper-content">
        <div class="basic">
          <div class="title1" style="border-right: 2px solid black">
            申<br />请<br />人<br />填<br />报<br />事<br />项
          </div>
          <div class="basic-content">
            <div style="height: 45%; display: flex">
              <div
                class="title1"
                style="
                  border-right: 2px solid black;
                  border-bottom: 2px solid black;
                  box-sizing: border-box;
                "
              >
                申<br />请<br />人<br />填<br />报<br />事<br />项
              </div>
              <div style="flex: 1; height: 100%">
                <div
                  style="
                    height: 25%;
                    width: 100%;
                    border-bottom: 2px solid black;
                    display: flex;
                    box-sizing: border-box;
                  "
                >
                  <div
                    class="label"
                    style="width: 9.09%; height: 100%; border-right: 2px solid black"
                  >
                    姓名
                  </div>
                  <div
                    class="input"
                    style="width: 18.18%; height: 100%; border-right: 2px solid black"
                  >
                    于瑞星
                  </div>
                  <div
                    class="label"
                    style="width: 9.09%; height: 100%; border-right: 2px solid black"
                  >
                    性别
                  </div>
                  <div
                    class="input"
                    style="width: 9.09%; height: 100%; border-right: 2px solid black"
                  >
                    男
                  </div>
                  <div
                    class="label"
                    style="width: 18.18%; height: 100%; border-right: 2px solid black"
                  >
                    出生日期
                  </div>
                  <div
                    class="input"
                    style="width: 18.18%; height: 100%; border-right: 2px solid black"
                  >
                    1986-11-13
                  </div>
                  <div
                    class="label"
                    style="width: 9.09%; height: 100%; border-right: 2px solid black"
                  >
                    国籍
                  </div>
                  <div class="input" style="width: 9.09%; height: 100%">中国</div>
                </div>
                <div
                  style="
                    height: 25%;
                    width: 100%;
                    border-bottom: 2px solid black;
                    display: flex;
                    box-sizing: border-box;
                  "
                >
                  <div
                    class="label"
                    style="width: 9.09%; height: 100%; border-right: 2px solid black"
                  >
                    身份证明名称
                  </div>
                  <div
                    class="input"
                    style="width: 27.27%; height: 100%; border-right: 2px solid black"
                  >
                    居民身份证
                  </div>
                  <div
                    class="label"
                    style="width: 9.09%; height: 100%; border-right: 2px solid black"
                  >
                    号码
                  </div>
                  <div class="input" style="height: 100%">441521200302022220</div>
                </div>
                <div
                  style="
                    height: 25%;
                    width: 100%;
                    border-bottom: 2px solid black;
                    display: flex;
                    box-sizing: border-box;
                  "
                >
                  <div
                    class="label"
                    style="width: 18.18%; height: 100%; border-right: 2px solid black"
                  >
                    申请/已具有的准驾车型代号
                  </div>
                  <div
                    class="input"
                    style="width: 27.27%; height: 100%; border-right: 2px solid black"
                  >
                    B1
                  </div>
                  <div
                    class="label"
                    style="width: 18.18%; height: 100%; border-right: 2px solid black"
                  >
                    档案编号
                  </div>
                  <div class="input" style="height: 100%">123</div>
                </div>
                <div
                  style="
                    height: 25%;
                    width: 100%;
                    border-bottom: 2px solid black;
                    display: flex;
                    box-sizing: border-box;
                  "
                >
                  <div class="label" style="width: 7%; height: 100%; border-right: 2px solid black">
                    邮寄地址
                  </div>
                  <div
                    class="input"
                    style="width: 38.45%; height: 100%; border-right: 2px solid black"
                  >
                    济南市市中区融汇城四区1号楼1单元
                  </div>
                  <div
                    class="label"
                    style="width: 18.18%; height: 100%; border-right: 2px solid black"
                  >
                    档案编号
                  </div>
                  <div class="input" style="height: 100%">123</div>
                </div>
              </div>
            </div>
            <div style="height: 55%">
              <div class="title1" style="border-right: 2px solid black; box-sizing: border-box">
                申<br />告<br />事<br />项
              </div>
            </div>
          </div>
        </div>
        <div class="health">
          <div class="title1" style="border-right: 2px solid black">
            医<br />疗<br />机<br />构<br />填<br />表<br />事<br />项
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
.paper {
  width: 50%;
  height: 95%;
  background-color: white;
  padding: 0.5%;
}
.title {
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
.paper-content {
  width: 100%;
  height: 95%;
  border: 3px solid black;
  box-sizing: border-box;
}
.basic {
  width: 100%;
  height: 55%;
  border-bottom: 2px solid black;
  display: flex;
}
.basic-content {
  height: 100%;
  flex: 1;
}
.title1 {
  width: 2vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  box-sizing: border-box;
}
.health {
  width: 100%;
  height: 45%;
}
.overtime {
  position: fixed;
  top: 0;
  right: 16vw;
  height: 10vh;
  display: flex;
  align-items: center;
}
.label {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: black;
  box-sizing: border-box;
}
.input {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: brown;
  justify-content: flex-start;
  padding-left: 1%;
  box-sizing: border-box;
}
</style>
