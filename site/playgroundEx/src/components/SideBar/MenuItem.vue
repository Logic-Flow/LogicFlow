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
              @click.stop="
                () => {
                  menuItemEvents.clickItem(`${example.name}`);
                  menuItemEvents.toggleSelectedByPath(config, data.name);
                }
              "
              :class="`${example.name} hover-bkg sub-item`"
              :href="`#${example.key}`"
            >
              <img
                class="thumbnail"
                :src="`/src/assets/screenshots/${example.key}.png`"
              />
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
import { inject } from 'vue';
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
const type = inject('type');
const tools = inject('tools');
const menuItemEvents = inject('menuItemEvents');
const animations = inject('animations');
const inputValue = inject('inputValue');
</script>
<style lang="scss" scoped>
@import './scoped.scss';
</style>
