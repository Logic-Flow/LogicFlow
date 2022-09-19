<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { provide } from 'vue';

import SideBarVue from './components/SideBar/index.vue';
import MenuVue from './components/SideBar/Menu.vue';
import config from '../examples/config.json';
const type = 'thumbnail';
</script>

<template>
  <div class="container">
    <!-- <SideBarVue :type="type" :menuConfig="config.topic"></SideBarVue> -->
    <MenuVue :type="type" :menuConfig="config.topic"></MenuVue>
    <div class="main"></div>
  </div>
</template>

<style>
body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
}
.main {
  background-color: #fff;
  width: 100%;
}
</style>
