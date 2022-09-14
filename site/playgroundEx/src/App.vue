<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { provide } from 'vue';

import SideBarVue from './components/SideBar/index.vue';
import config from '../examples/config.json';

provide('config', config);
</script>

<template>
  <div class="container">
    <SideBarVue></SideBarVue>
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
