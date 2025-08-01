<script setup lang="ts">
import { useCmdStore } from '@/stores/cmd'
import { onMounted, ref } from 'vue'
import overtime from '@/components/overtime.vue'
import type { projectType } from '@/types/project'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const cmdStore = useCmdStore()

const project = ref<projectType[]>([])

// 开始进程
const clickProject = (data: projectType) => {
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
          path: '/layout/getId',
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
          path: '/layout/fingerCheck',
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
          path: '/layout/getId',
          state: 0,
        },
      ],
      step: 0,
    },
  ]
}

onMounted(() => {
  cmdStore.backBtn = 1
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
    <overtime
      path="/layout/overtime?seconds=3&secondsLabel=即将前往首页:&label=操作超时&icon=Timer&type=0"
      class="overtime"
    />
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
  height: 50%;
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
  top: 10vh;
  left: 0;
}
</style>
