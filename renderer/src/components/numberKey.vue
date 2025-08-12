<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DeleteFilled, CaretLeft } from '@element-plus/icons-vue'

const emit = defineEmits(['update:password'])

// 定义 props
const props = defineProps({
  password: {
    type: String,
    default: '',
  },
})

const backPassWord = ref(props.password)

const appendNumber = (num: number) => {
  if (backPassWord.value.length < 11) {
    backPassWord.value += num.toString()
    emit('update:password', backPassWord.value)
  }
}
const deleteNumber = () => {
  backPassWord.value = backPassWord.value.slice(0, -1)
  emit('update:password', backPassWord.value)
}
const clearNumber = () => {
  backPassWord.value = ''
  emit('update:password', backPassWord.value)
}

onMounted(() => {})
</script>

<template>
  <div class="content">
    <div class="key-box">
      <el-input v-model="backPassWord" placeholder="请输入电话号码" size="large"></el-input>
      <div class="number-keyboard">
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="appendNumber(1)">1</button>
          <button class="keyboard-btn" @click="appendNumber(2)">2</button>
          <button class="keyboard-btn" @click="appendNumber(3)">3</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="appendNumber(4)">4</button>
          <button class="keyboard-btn" @click="appendNumber(5)">5</button>
          <button class="keyboard-btn" @click="appendNumber(6)">6</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-btn" @click="appendNumber(7)">7</button>
          <button class="keyboard-btn" @click="appendNumber(8)">8</button>
          <button class="keyboard-btn" @click="appendNumber(9)">9</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-btn" style="color: brown" @click="clearNumber">
            <el-icon><DeleteFilled /></el-icon>
            清空
          </button>
          <button class="keyboard-btn" @click="appendNumber(0)">0</button>
          <button class="keyboard-btn" @click="deleteNumber">
            <el-icon><CaretLeft /></el-icon>
            删除
          </button>
        </div>
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
  flex-direction: column;
}
.key-box {
  width: 50%;
}
.number-keyboard {
  margin-top: 2vh;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 2vh;
}

.keyboard-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.keyboard-btn {
  width: 30%;
  height: 5rem;
  font-size: 2rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
}

.keyboard-btn:hover {
  background-color: #f5f7fa;
}

.keyboard-btn:active {
  background-color: #ebeef5;
}
</style>
