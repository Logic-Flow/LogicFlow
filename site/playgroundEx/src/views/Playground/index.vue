<!--  -->
<template>
  <div>
    <div class="lf-playground" :class="src">
      <playground-project id="ide-project" :project-src="src">
      </playground-project>
      <div class="ide">
        <div class="preview">
          <playground-preview id="ide-preview" project="ide-project">
          </playground-preview>
        </div>
        <div class="editor">
          <playground-tab-bar
            project="ide-project"
            editor="ide-editor"
            editable-file-system="true"
          ></playground-tab-bar>
          <playground-file-editor
            id="ide-editor"
            project="ide-project"
            line-numbers
          ></playground-file-editor>
        </div>
      </div>
      <div class="urlDiv">1</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const src = computed(() => {
  return `/playground_json/${route.hash.slice(1)}.playground.json`;
});
onMounted(() => {
  // let count = 0;
  // if (history.state.back === '/examples/gallery') {
  //   router.go(0);
  // }
  const timer = setInterval(() => {
    const urlDiv = document.querySelector('.urlDiv');
    const el = document
      .querySelector('#ide-preview')
      ?.shadowRoot?.querySelector('iframe')?.src;
    // count++;
    // if (count === 5) {
    //   router.go(0);
    // }
    if (el?.includes('playground-elements')) {
      urlDiv.innerText = el;
      clearInterval(timer);
    }
  }, 1000);
});

const CLG = (flag) => {
  console.log(flag);
};
</script>
<style lang="scss" scoped>
@import url('./style.scss');
</style>
