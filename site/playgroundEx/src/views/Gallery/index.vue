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
.gallery {
  height: 100%;
  width: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
}
.case-wrap {
  display: flex;
  flex-wrap: wrap;
  transition: 0.25s;
  .case {
    width: 240px;
    // height: 180px;
    // background: #ccc;
    margin: 10px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s;
    img {
      width: 240px;
      height: 160px;
      transition: 0.3s;
      border: none;
    }
    &:hover {
      // background-color: #000;
      img {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0px 3px 10px 1px #e2e2e2;
      }
    }
  }
}
</style>
