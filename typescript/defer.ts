/*
  通过延迟加载优化白屏时间
*/

/*
import { ref } from 'vue'
const frame = ref(0)
function updateFrame() {
  frame.value++
  requestAnimationFrame(updateFrame)
}
updateFrame()
export function useDefer() {
  return function(n: number) {
    return frame.value > n
  }
}
*/

/*
<template>
  <div v-for="n in 100" :key="n">
    <heavy-component v-if="defer(n)" />
  </div>
</template>

<script setup lang="ts">
import { useDefer } from 'utils/defer.ts'
const defer = useDefer()
</script>
*/