<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const window = globalThis.window

const props = defineProps({
  footerHeight: {
    type: Number,
    default: 59
  }
})

const tableHeight = ref(0)
const resizableDiv = ref(null)

const updateTableHeight = () => {
  if (resizableDiv.value) {
    const rect = resizableDiv.value.getBoundingClientRect()
    tableHeight.value = window.innerHeight - rect.y - props.footerHeight
  }
}

onMounted(() => {
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})
</script>
<template>
  <div ref="container">
    <slot name="header" />
    <slot name="toolbar" />
    <slot name="filter" />
    <div ref="resizableDiv">
      <slot
        name="table"
        :table-height="tableHeight"
      />
    </div>
  </div>
</template>
