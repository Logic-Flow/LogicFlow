<!--  -->
<template>
  <div>
    <div class="lf-playground">
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
      <div class="urlDiv">123</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const src = computed(() => {
  return `../../../playground_json/${route.hash.slice(1)}.playground.json`;
});

onMounted(() => {
  const timer = setInterval(() => {
    const urlDiv = document.querySelector('.urlDiv');
    const el = document
      .querySelector('#ide-preview')
      ?.shadowRoot?.querySelector('iframe')?.src;
    if (el.includes('playground-elements')) {
      urlDiv.innerText = el;
      console.log(el);
      clearInterval(timer);
    }
  }, 1000);
});
</script>
<style lang="scss" scoped>
@import url('./style.scss');
</style>
