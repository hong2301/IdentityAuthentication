<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'

const emit = defineEmits(['update:active', 'clickCard'])

//// 摄像头模块
const videoRef = ref<HTMLVideoElement>()
let mediaStream: MediaStream | null = null

// 开启摄像头
const startCamera = async () => {
  try {
    // 请求摄像头权限
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true, // 启用视频
      audio: false, // 禁用音频
    })
    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream
    }
  } catch (error: any) {
    console.error('摄像头访问失败:', error)
    alert(`无法访问摄像头: ${error.message}`)
  }
}

// 拍照
const capturePhoto = () => {
  if (!videoRef.value || !mediaStream) return

  const video = videoRef.value
  const sourceWidth = video.videoWidth
  const sourceHeight = video.videoHeight

  // 目标比例 32:22 ≈ 1.4545
  const targetRatio = 22 / 32

  // 计算裁剪区域（保持居中）
  let cropWidth, cropHeight, cropX, cropY

  // 如果视频比目标比例更宽（如 16:9），则裁剪左右两侧
  if (sourceWidth / sourceHeight > targetRatio) {
    cropHeight = sourceHeight
    cropWidth = cropHeight * targetRatio
    cropX = (sourceWidth - cropWidth) / 2
    cropY = 0
  }
  // 如果视频比目标比例更高（如 4:3），则裁剪上下两侧
  else {
    cropWidth = sourceWidth
    cropHeight = cropWidth / targetRatio
    cropX = 0
    cropY = (sourceHeight - cropHeight) / 2
  }
  // 创建 canvas，尺寸为目标比例
  const canvas = document.createElement('canvas')
  canvas.width = cropWidth // 最终宽度
  canvas.height = cropHeight // 最终高度

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  // 裁剪并绘制图像
  ctx.drawImage(
    video,
    cropX,
    cropY, // 源图像裁剪起始点
    cropWidth,
    cropHeight, // 源图像裁剪尺寸
    0,
    0, // 画布起始点
    canvas.width,
    canvas.height, // 画布绘制尺寸
  )

  return {
    active: 0,
    data: canvas.toDataURL('image/jpeg', 0.9), // 可调整图片质量（0-1）
  }
}

// 关闭摄像头
const stopCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track: { stop: () => any }) => track.stop())
    mediaStream = null
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null
  }
}

onMounted(() => {
  startCamera()
})

// 组件卸载时关闭摄像头
onUnmounted(() => {
  stopCamera()
})

defineExpose({
  stopCamera,
  capturePhoto,
})
</script>

<template>
  <video class="overture" ref="videoRef" autoplay playsinline></video>
</template>

<style scoped>
.overture {
}
</style>
