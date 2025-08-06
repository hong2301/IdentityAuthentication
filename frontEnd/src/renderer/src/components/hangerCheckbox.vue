<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits(['update:active'])

// 定义 props
const props = defineProps({
  label: {
    type: String,
    default: '具有',
  },
  fontSize: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: '#a52a2a',
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const mainActive = ref(props.active)

const active = () => {
  mainActive.value = !mainActive.value
  emit('update:active', mainActive.value)
}

onMounted(() => {})
</script>

<template>
  <div class="overture">
    <div class="checkbox" :style="{ height: `${fontSize}rem` }" @click="active">
      <div
        v-if="mainActive"
        class="hanger"
        :style="{ fontSize: `${fontSize * 2}rem`, color: `${color}` }"
      >
        √
      </div>
    </div>
    <div style="width: 1vw; flex-shrink: 0; flex-grow: 0"></div>
    <slot></slot>
    <div class="label" :style="{ fontSize: `${fontSize}rem` }">{{ label }}</div>
  </div>
</template>

<style scoped>
.overture {
}
.overture > div {
  line-height: 1;
}
.label {
  white-space: nowrap;
  flex-shrink: 0;
  flex-grow: 0;
}
.checkbox {
  flex-shrink: 0;
  flex-grow: 0;
  aspect-ratio: 1;
  box-sizing: border-box;
  border: 0.2vh solid black;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hanger {
  position: absolute;
  font-weight: 800;
}
</style>
