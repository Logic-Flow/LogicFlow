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
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const src = computed(() => {
  return `../../../playground_json/${route.hash.slice(1)}.playground.json`;
});
</script>
<style lang="scss" scoped>
@import url('./style.scss');
</style>
