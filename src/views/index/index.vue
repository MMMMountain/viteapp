<script setup lang="ts"></script>

<template>
  <div class="index-w">
    <div class="title">
      index.vue
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="['My']">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
      <!-- <router-view></router-view> -->
      <ul class="g-flex-rsbc">
        <li>
          <router-link :to="{ name: 'home' }">{{
            lpk("page.index.Title")
          }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'blogIndex' }">{{
            lpk("Blog")
          }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'my' }">{{
            lpk("page.my.Title")
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index-w {
  background-color: pink;
  .title {
    margin: 30px;
  }
}
</style>
