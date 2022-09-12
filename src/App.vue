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
  <div class="app-w">
    <!-- <div class="title">app-view</div> -->
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app-w {
  height: 100vh;
  .title {
    padding: 30px;
  }
}
</style>
