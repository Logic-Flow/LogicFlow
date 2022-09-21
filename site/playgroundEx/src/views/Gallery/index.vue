<!--  -->
<template>
  <div class="gallery">
    <div v-for="item in config" :key="item.key">
      <div
        v-for="examples in item.children"
        :key="examples.key"
        :id="examples.key"
      >
        <h2>{{ examples.name }}</h2>
        <div class="case-wrap">
          <div
            v-for="example in examples.examples"
            :key="example.key"
            class="case"
            :id="example.key"
            @click="jumpTo(example.key)"
          >
            <img src="" alt="" />
            <div>{{ example.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const jumpTo = (hash) => {
  type.value = 'thumbnail';
  router.push({
    name: 'Playground',
    hash: `#${hash}`,
  });
};
const config = inject('originConfig');
const type = inject('type');
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
