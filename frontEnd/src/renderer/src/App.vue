<script setup lang="ts">
// 引入 axios (通常在组件或工具文件中)
import axios from 'axios'

// 定义一个异步函数来发送请求
const sendPostRequest = async () => {
  // 1. 定义请求的 URL
  const url = 'http://localhost:8888/cardReader/read'

  // 3. 定义请求的配置，包括请求头
  // 这与 curl 命令中的 -H "Content-Type: application/json" 对应
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    // 4. 发送 POST 请求
    // axios.post(url, data, config) 的结构非常清晰
    const response = await axios.post(url,{value:'123'}, config)

    // 5. 处理成功的响应
    console.log('响应状态码:', response.status)
    console.log('响应数据:', response.data) // 服务器返回的数据
  } catch (error) {
    // 6. 处理请求错误
    if (error.response) {
      // 请求已发出，服务器响应状态码不在 2xx 范围内
      console.error('错误响应数据:', error.response.data)
      console.error('错误响应状态码:', error.response.status)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('无响应:', error.request)
    } else {
      // 在设置请求时触发了错误
      console.error('请求配置错误:', error.message)
    }
  }
}

// 调用函数执行请求
sendPostRequest()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
