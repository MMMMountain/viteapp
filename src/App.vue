<script setup lang="ts">
// import Icon from "./components/Icon";  不以这样的方式去使用，我们使用组件自动注册的方式去做
Tools.LocalStorage.setItem("test", "18200387136");
let show = ref(false);
const onConfirm = () => {};
const changeLpk = () => {
  const isChinese = Tools.LocalStorage.getItem("locale") === "zh-CN";
  if (isChinese) app.getAppCtl().changeLocale("en-US");
  else app.getAppCtl().changeLocale("zh-CN");
};
</script>

<template>
  <Icon icon="icon-time" />
  <van-button type="primary" @click="changeLpk">{{ lpk("Index") }}</van-button>
  <van-calendar v-model:show="show" @confirm="onConfirm" />
  <div class="theme">
    <div class="theme-item" v-for="index in 3">{{ index }}</div>
  </div>
</template>

<style scoped lang="scss">
.theme {
  display: flex;
  justify-content: space-between;
  .theme-item {
    margin: 10px 20px;
    width: 30%;
    padding: 30px 0;
    text-align: center;
    background-color: var(--theme-color-6);
    color: #fff;
  }
}
</style>
