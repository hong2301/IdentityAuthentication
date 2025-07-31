<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const clickExam = () => {
  router.push('layout/exam')
}

const clickSnap = () => {
  router.push('layout/snap')
}

onMounted(() => {})
</script>

<template>
  <div class="content">
    <div class="btn-box">
      <div class="btn" @click="clickExam">
        <div class="btn-content">
          <el-icon class="btn-icon"><Monitor /></el-icon>
          <span class="btn-text">体检</span>
        </div>
        <div class="pulse-ring"></div>
      </div>
      <div class="btn" @click="clickSnap">
        <div class="btn-content">
          <el-icon class="btn-icon"><Monitor /></el-icon>
          <span class="btn-text">拍照</span>
        </div>
        <div class="pulse-ring"></div>
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
  display: flex;
  width: 70%;
  justify-content: space-between;
}
.btn {
  position: relative;
  width: 40%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: linear-gradient(145deg, #1a56b4, #0d47a1);
  box-shadow:
    0 0 15px rgba(13, 71, 161, 0.6),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.tech-health-btn:hover {
  transform: scale(1.05);
  box-shadow:
    0 0 25px rgba(13, 71, 161, 0.8),
    inset 0 0 15px rgba(255, 255, 255, 0.3);
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.btn-icon {
  font-size: 32px;
  color: white;
  margin-bottom: 8px;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
}

.btn-text {
  font-size: 22px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite;
  opacity: 0;
  z-index: 1;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
</style>
