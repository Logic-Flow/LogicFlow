<!--  -->
<template>
  <div
    v-show="data.has"
    class="examples"
    @click.stop="menuItemEvents.handleExamplesItemClick(data.name)"
  >
    <div :class="`with-thumbnail ${data.name}`" v-if="type === 'thumbnail'">
      <div
        :class="`hover-font sub-title ${animations.handleIconFold(data.fold)}`"
        @click.stop="animations.toggleFold(data)"
      >
        <p v-html="tools.hightLight(data, inputValue)"></p>
        <span class="fold-icon"></span>
      </div>
      <CollapseTransition>
        <div v-show="!data.fold" class="sub-items">
          <div v-for="(example, index) in data.examples" :key="example.key">
            <a
              draggable="false"
              @click.stop="
                () => {
                  menuItemEvents.clickItem(`${example.name}`);
                  menuItemEvents.toggleSelectedByPath(config, data.name);
                }
              "
              :class="`${example.name} hover-bkg sub-item`"
              :href="`#${example.key}`"
            >
              <img draggable="false" class="thumbnail" />
            </a>
          </div>
        </div>
      </CollapseTransition>
    </div>
    <div v-else :class="`${data.name} hover-bkg`">
      <a
        :href="`#${data.key}`"
        @click="menuItemEvents.toggleSelectedByPath(config, data.name)"
        v-html="tools.hightLight(data, inputValue)"
      >
      </a>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import CollapseTransition from '../SideBarTransition/transition.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return [
        {
          key: '',
          name: '',
          examples: [],
        },
      ];
    },
  },
});

const config = inject('config');
const type = computed(() => {
  return inject('type').value;
});
const tools = inject('tools');
const menuItemEvents = inject('menuItemEvents');
const animations = inject('animations');
const inputValue = inject('inputValue');
</script>
<style lang="scss" scoped>
@import './scoped.scss';
</style>
