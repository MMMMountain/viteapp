<template>
  <i :class="`iconfont ${icon}`"></i>
</template>

<script setup lang="ts">
interface IIconProps {
  icon: string;
}

const props = defineProps<IIconProps>();
// 转成响应式的props
const { icon } = toRefs(props);
</script>

<style scoped></style>
