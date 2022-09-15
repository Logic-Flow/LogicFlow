<template>
  <div :class="`menu-wrap rem-17 ${widthHidden && 'rem-0'}`">
    <div class="menu rem-17">
      <div class="menu-search-wrap">
        <div class="menu-search">
          <span class="menu-search-icon">🔍</span>
          <input
            class="menu-search-input"
            type="text"
            placeholder="搜索"
            v-model="inputValue"
          />
        </div>
        <MenuUp class="menu-search-fold" @click="FoldAll" />
      </div>
      <div v-for="topic in config.topic" :key="topic.key">
        <div :class="`menu-item  ${topic.name}`" v-show="topic.has">
          <span
            :class="`topic hover-font ${animations.handleIconFold(topic.fold)}`"
            @click.stop="animations.toggleFold(topic)"
          >
            <strong>{{ topic.name }}</strong>
            <span class="fold-icon"></span>
          </span>
          <CollapseTransition>
            <div :class="`examples-wrap`" v-show="!topic.fold">
              <div
                v-for="item in topic.examples"
                :key="item.key"
                @click.stop="menuItemEvents.handleExamplesItemClick(item.name)"
              >
                <div v-show="item.has" class="examples">
                  <div
                    :class="`with-thumbnail ${item.name}`"
                    v-if="type === 'withThumbnail'"
                  >
                    <div
                      :class="`hover-font sub-title ${animations.handleIconFold(
                        item.fold,
                      )}`"
                      @click.stop="animations.toggleFold(item)"
                    >
                      <p>{{ item.name }}</p>
                      <span class="fold-icon"></span>
                    </div>
                    <CollapseTransition>
                      <div v-show="!item.fold" class="sub-items">
                        <div
                          v-for="(example, index) in topic.examples"
                          :key="example.key"
                        >
                          <a
                            @click.stop="
                              () => {
                                menuItemEvents.clickItem(
                                  `sub-${item.name}-${index}-${example.name}`,
                                );
                                menuItemEvents.thumbnailClick(
                                  item.name,
                                  topic.name,
                                );
                              }
                            "
                            :class="`sub-${item.name}-${index}-${example.name} hover-bkg sub-item`"
                            :href="`#${item.name}`"
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
                  <div v-else :class="`${item.name} hover-bkg`">
                    <a
                      :href="`#${item.name}`"
                      @click="menuItemEvents.thumbnailClick(topic.name)"
                    >
                      {{ item.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CollapseTransition>
        </div>
      </div>
    </div>
    <div class="fold-tool" @click="handleWidthHidden">
      <span :class="`${widthHidden && 'fold-tool-transform'}`">〈 </span>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue';
import { useAnimations, useMenuItemEvent, useTools } from './composition';
import CollapseTransition from '../SideBarTransition/transition.vue';
import MenuUp from '../svg/menuUp.vue';
import _ from 'lodash';

const props = defineProps({
  type: {
    type: String,
    default: 'withThumbnail', // 包含缩略图/
  },
});

const animations = useAnimations();
const menuItemEvents = useMenuItemEvent();
const tools = useTools();

const injectConfig = inject('config');
const conf = ref(_.cloneDeep(injectConfig));
const config = ref({});
const inputValue = ref('');
const widthHidden = ref(false);

tools.initConfig(conf.value);

const handleWidthHidden = () => {
  widthHidden.value = !widthHidden.value;
};

const FoldAll = () => {
  config.value = tools.filter(_.cloneDeep(conf.value), inputValue.value);
};

watchEffect(() => {
  config.value = tools.filter(_.cloneDeep(conf.value), inputValue.value);
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
