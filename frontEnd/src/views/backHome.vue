<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import pushButton from '@/components/pushButton.vue'

const cmdStore = useCmdStore()
const btns = ref([
  {
    title: '体检设置',
    icon: '12',
  },
  {
    title: '业务记录',
    icon: '',
  },
  {
    title: '修改密码',
    icon: '',
  },
  {
    title: '打印机设置',
    icon: '',
  },
  {
    title: '摄像头设置',
    icon: '',
  },
  {
    title: '操作时间',
    icon: '',
  },
  {
    title: '操作流程',
    icon: '',
  },
  {
    title: '硬件测试',
    icon: '',
  },
  {
    title: '拖鞋设置',
    icon: '',
  },
  {
    title: '证件设置',
    icon: '',
  },
  {
    title: '相机设置',
    icon: '',
  },
  {
    title: '网络支付',
    icon: '',
  },
  {
    title: '拍照设置',
    icon: '',
  },
  {
    title: '准驾车型设置',
    icon: '',
  },
])

onMounted(() => {
  cmdStore.backBtn = 1
  cmdStore.closeBtn = 1
  cmdStore.resetBtn = 1
})
</script>

<template>
  <div class="content">
    <div class="btn-box">
      <div v-for="(bItem, bIndex) in btns" :key="bIndex" class="btn-item">
        <pushButton :data="bItem" :width="120" :height="120" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 创建5列等宽的网格 */
  gap: 50px; /* 设置网格项之间的间隙 */
}
.btn-item {
  cursor: pointer;
}
</style>
