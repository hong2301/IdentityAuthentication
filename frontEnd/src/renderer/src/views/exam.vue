<script setup lang="ts">
import { onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { projectType } from '@/types/project'
import { useProjectStore } from '@/stores/project'
import btnBox from '@/components/btnBox.vue'
import type { btnType } from '@/types/components'
import { Back } from '@element-plus/icons-vue'
import router from '@/router'

const projectStore = useProjectStore()

const project = ref<projectType[]>([])

const nextPageData = ref({
  path: '/',
  seconds: 3,
  secondsLabel: '则即将前往首页: ',
  label: '操作超时',
  icon: 'Timer',
  type: 0,
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
])

const backHandleBack = () => {
  router.go(-1)
}

// 开始进程
const clickProject = (data: projectType) => {
  projectStore.examData.projectName = data.name
  projectStore.mountProject(data)
  projectStore.nextStep()
}

// 获取进程组
const getProject = () => {
  project.value = [
    {
      name: '初次领证',
      process: [
        {
          name: '身份证获取',
          path: '/process/getId',
          state: 0,
        },
      ],
      step: 0,
    },
    {
      name: '申领增驾',
      process: [
        {
          name: '手指检测',
          path: '/process/fingerCheck',
          state: 0,
        },
      ],
      step: 0,
    },
    {
      name: '年审体检',
      process: [
        {
          name: '身份证获取',
          path: '/process/getId',
          state: 0,
        },
      ],
      step: 0,
    },
  ]
}

onMounted(() => {
  getProject()
})
</script>

<template>
  <div class="content">
    <div class="title">请选择下一步要进行的操作</div>
    <div class="card-box">
      <div
        v-for="(pItem, pIndex) in project"
        :key="pIndex"
        class="card"
        @click="clickProject(pItem)"
      >
        {{ pItem.name }}
      </div>
    </div>
    <overtime :time-num="300" :nextPageData="nextPageData" class="overtime" />
    <btnBox :btns="btns" />
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
.title {
  margin-bottom: 2%;
  font-size: 3rem;
  color: white;
  font-weight: 800;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-box {
  width: 80%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 30%;
  height: 100%;
  background: linear-gradient(145deg, #1a56b4, #0d47a1);
  border-radius: 2%;
  cursor: pointer;
}
.overtime {
  position: fixed;
  top: 0;
  right: 2vw;
  height: 10vh;
  display: flex;
  align-items: center;
}
</style>
