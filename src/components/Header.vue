<script setup lang="ts">
import { onMounted, ref, toRefs, reactive } from "vue";
const props = defineProps({
  modelValue: {
    type: Number,
  },
});
const emit = defineEmits(["update:modelValue"]);
const hamo = reactive({
  sex: "男",
  money: 9999,
});
// ...toRefs(hamo);
const msg = ref("ldf");
onMounted(() => {
  setTimeout(() => {
    emit("update:modelValue", 18200387136);
  }, 5000);
});
console.log("5");
</script>
<template>
  <h2>header</h2>
  <input type="text" v-model="msg" />
  {{ msg }}
  {{ modelValue }}
  <hr />
  hamo:
  {{ hamo.sex }}
  {{ hamo.money }}
</template>
<style lang="scss"></style>
