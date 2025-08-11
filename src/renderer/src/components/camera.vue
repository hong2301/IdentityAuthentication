<script setup lang="ts">
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import { GestureRecognizer, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision'
import { delay } from '@/utils/delay'
import evaluateFingerFunction from '@/utils/finger'

const emit = defineEmits([])

// 定义 props
const props = defineProps({
  fingerCheckBtn: {
    type: Boolean,
    default: false,
  },
})

// 手势识别器实例
let gestureRecognizer: any = null
// 识别器识别的类型(图片/视频)
const runningMode = ref()
// 视频手势信息
const videoGestureInfo = ref<any>({})
// 手势枚举
const enumGesture: any = {
  Closed_Fist: '握紧拳头',
  Open_Palm: '张开手掌',
  Thumb_Up: '竖起大拇指',
  Thumb_Down: '拇指朝下',
  Pointing_Up: '指向上',
  Victory: '胜利',
  None: '未识别',
}

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

// 创建手势识别器
const createGestureRecognizer = async (timeout: number = 999999999) => {
  // 加载指定版本的MediaPipe视觉任务WebAssembly模块
  const vision = await FilesetResolver.forVisionTasks('/wasm')

  // 创建了一个手势识别器实例(这个手势识别器实例使用的是指定版本的MediaPipe视觉任务WebAssembly模块)
  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    // 识别器配置
    baseOptions: {
      // 指向手势识别模型的路径
      modelAssetPath: '/gesture_recognizer.task',
      // 设置为GPU以尝试利用图形处理单元进行加速,提高模型推理的速度
      delegate: 'GPU',
    },
    // 检测手掌的数量
    numHands: 2,
  })
  console.log('手势识别器加载完毕')
  // 识别视频中的手势
  const predictWebcamResult = await predictWebcam(timeout)

  return evaluateFingerFunction(predictWebcamResult)
}
const predictWebcam = (timeout: number = 999999999): Promise<{ type: number; value: number }[]> => {
  return new Promise(async (resolve) => {
    const rows: { type: number; value: number }[] = []
    let video: HTMLVideoElement | null = null
    let stream: MediaStream | null = null
    let animationFrameId: number | null = null
    let videoLoadedListener: (() => void) | null = null

    // 清理资源的函数
    const cleanup = () => {
      // 取消动画帧循环
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }

      // 移除事件监听器
      if (video && videoLoadedListener) {
        video.removeEventListener('loadeddata', videoLoadedListener)
        videoLoadedListener = null
      }

      // 关闭摄像头流
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        stream = null
      }

      // 清空video引用
      if (video) {
        video.srcObject = null
        video = null
      }
    }

    // 设置超时定时器
    const timeoutId = setTimeout(() => {
      cleanup()
      resolve(rows) // 超时后返回已收集的数据
    }, timeout)

    try {
      // 判断手势识别器是否加载完成
      if (!gestureRecognizer) {
        throw new Error('手势识别器未加载完成')
      }

      if (runningMode.value !== 'VIDEO') {
        // 设置识别器识别的类型为视频
        runningMode.value = 'VIDEO'
        await gestureRecognizer.setOptions({ runningMode: runningMode.value })
      }

      await gestureRecognizer.setOptions({ numHands: 2 })

      await nextTick()

      // 获取video元素
      video = document.getElementById('webcam') as HTMLVideoElement
      // 获取视频手势节点绘制的canvas元素
      const canvasElement = document.getElementById('output_canvas') as HTMLCanvasElement

      // 设置canvas的宽度和高度为video的宽度和高度
      // 检查视频是否已加载有效数据
      while (video.videoWidth === 0 || video.videoHeight === 0) {
        await delay(500)
      }
      canvasElement.width = video.videoWidth
      canvasElement.height = video.videoHeight
      const diff = video.videoWidth - video.clientWidth

      // 获取canvas的上下文
      const canvasCtx = canvasElement.getContext('2d') as CanvasRenderingContext2D

      // 设置上次识别视频手势的时间
      let lastVideoTime = -1

      // 识别视频中的手势
      const predictWebcam = () => {
        // 获取当前视频的时间
        let nowInMs = Date.now()
        let results: any = {}

        // 如果视频的时间发生变化,则识别视频中的手势
        if (video && video.currentTime !== lastVideoTime) {
          // 替换上次识别视频手势的时间
          lastVideoTime = video.currentTime
          results = gestureRecognizer.recognizeForVideo(video, nowInMs)
        }

        // 保存当前的canvas状态
        canvasCtx.save()
        // 清除canvas的内容
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
        canvasCtx.beginPath()
        canvasCtx.rect(diff / 2, 0, video?.clientWidth ?? 1000, canvasElement.height) // x, y, width, height
        canvasCtx.clip() // 后续绘制只会在这个区域内生效

        // 创建drawingUtils实例,用于可视化MediaPipeVision任务的结果
        const drawingUtils = new DrawingUtils(canvasCtx)
        // 判断是否识别到手势
        if (results.landmarks) {
          // 循环绘制手势的节点
          for (const landmarks of results.landmarks) {
            // 绘制手势连接线
            drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
              // 连接线的颜色
              color: '#00FF00',
              // 连接线的宽度
              lineWidth: 3,
            })
            // 绘制手势关节点
            drawingUtils.drawLandmarks(landmarks, {
              // 关节点的颜色
              color: '#FF0000',
              // 关节点的半径
              radius: 2.5,
            })
          }
        }
        // 恢复canvas的状态
        canvasCtx.restore()

        // 判断是否识别到手势数据
        if (results?.gestures?.length > 0) {
          videoGestureInfo.value.categoryName = enumGesture[results.gestures[0][0].categoryName]
          videoGestureInfo.value.categoryScore = Number(
            (results.gestures[0][0].score * 100).toFixed(2),
          )
          videoGestureInfo.value.handedness = results.handednesses[0][0].displayName
          rows.push({
            type: videoGestureInfo.value.categoryName === '握紧拳头' ? 0 : 1,
            value: videoGestureInfo.value.categoryScore,
          })
        } else {
          videoGestureInfo.value.categoryName = ''
          videoGestureInfo.value.categoryScore = ''
          videoGestureInfo.value.handedness = ''
        }

        // 继续识别视频中的手势
        animationFrameId = requestAnimationFrame(predictWebcam)
      }

      // 打开摄像头
      stream = await navigator.mediaDevices.getUserMedia({ video: true })
      video.srcObject = stream

      // 添加事件监听器并保存引用以便后续移除
      videoLoadedListener = predictWebcam
      video.addEventListener('loadeddata', videoLoadedListener)
    } catch (error) {
      // 发生错误时清理资源并reject
      cleanup()
      clearTimeout(timeoutId)
      throw error
    }

    // 添加一个finally处理，确保Promise resolve时清理资源
    const originalResolve = resolve
    resolve = (value) => {
      cleanup()
      clearTimeout(timeoutId)
      originalResolve(value)
    }
  })
}

onMounted(() => {
  startCamera()
  if (props.fingerCheckBtn) {
    createGestureRecognizer()
  }
})

// 组件卸载时关闭摄像头
onUnmounted(() => {
  stopCamera()
})

defineExpose({
  stopCamera,
  capturePhoto,
  createGestureRecognizer,
})
</script>

<template>
  <div class="overture">
    <video class="video" ref="videoRef" id="webcam" autoplay playsinline></video>
    <canvas class="canvas" id="output_canvas"></canvas>
  </div>
</template>

<style scoped>
.overture {
  position: relative;
  width: 100%; /* 父容器宽度 */
  height: 100%; /* 父容器高度（根据实际需求调整） */
  overflow: hidden; /* 超出部分隐藏 */
}

.video {
  position: absolute;
  width: 100%;
  height: 100%; /* 固定高度 */
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中起始点 */
  transform: translate(-50%, -50%); /* 同时处理水平和垂直居中 */
  object-fit: cover;
}
.canvas {
  position: absolute;
  height: 100%; /* 固定高度 */
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中起始点 */
  transform: translate(-50%, -50%); /* 同时处理水平和垂直居中 */
}
</style>
