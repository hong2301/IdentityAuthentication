<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import pushButton from '@/components/pushButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cmdStore = useCmdStore()

const btns = ref([
  {
    title: '体检设置',
    icon: '12',
    path: 'back/phyexam',
  },
  {
    title: '业务记录',
    icon: '',
    path: 'back/business',
  },
  {
    title: '修改密码',
    icon: '',
    path: 'back/password',
  },
  {
    title: '打印机设置',
    icon: '',
    path: 'back/printer',
  },
  {
    title: '摄像头设置',
    icon: '',
    path: 'back/camera',
  },
  {
    title: '操作时间',
    icon: '',
    path: 'back/operatingTime',
  },
  {
    title: '操作流程',
    icon: '',
    path: 'back/operationProcess',
  },
  {
    title: '硬件测试',
    icon: '',
    path: 'back/hardware',
  },
  {
    title: '拖鞋设置',
    icon: '',
    path: 'back/shoes',
  },
  {
    title: '证件设置',
    icon: '',
    path: 'back/certificate',
  },
  {
    title: '相机设置',
    icon: '',
    path: 'back/photographn',
  },
  {
    title: '网络支付',
    icon: '',
    path: 'back/network',
  },
  {
    title: '拍照设置',
    icon: '',
    path: 'back/snapv',
  },
  {
    title: '准驾车型设置',
    icon: '',
    path: 'back/carType',
  },
])

const clickBtn = (bItem: { title: string; icon: string; path: string }) => {
  if (bItem.path) {
    router.push(bItem.path) // 跳转到指定路径
  }
}

onMounted(() => {

})
</script>

<template>
  <div class="content">
    <div class="btn-box">
      <div v-for="(bItem, bIndex) in btns" :key="bIndex" class="btn-item" @click="clickBtn(bItem)">
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
