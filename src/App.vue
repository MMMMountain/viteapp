<script setup lang="ts">
Tools.LocalStorage.setItem("test","18200387136")
</script>
<template>
  <div class="dis-f">kaiyuan 10years</div>
  {{app.getConfig('baseUrl')}}
  {{Tools.LocalStorage.getItem('test')}}
</template>
<style scoped>
  .dis-f{
    display: flex;
    color:red
  }
</style>

