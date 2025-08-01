<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { btnType } from '@/types/components'
import { Back, Right } from '@element-plus/icons-vue'
import router from '@/router'
import BtnBox from '@/components/btnBox.vue'
const cmdStore = useCmdStore()
import numberKey from '@/components/numberKey.vue'

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
    icon: Back,
    position: 'left',
    onClick: () => {
      backHandleBack()
    },
  },
  {
    label: '继续',
    key: 'continue',
    type: 'success',
    icon: Right,
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
  // router.push('/layout/getIphone')
}

onMounted(() => {
  cmdStore.overBtn = 1
})
</script>

<template>
  <div class="content">
    <numberKey />
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
.overtime {
  position: fixed;
  top: 0;
  right: 16vw;
  height: 10vh;
  display: flex;
  align-items: center;
}
</style>
