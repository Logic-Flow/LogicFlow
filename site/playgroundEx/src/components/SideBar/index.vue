<template>
  <div :class="`menu-wrap rem-17 ${widthHidden && 'rem-0'}`">
    <div class="menu rem-17">
      <div v-for="topic in config.topic" :key="topic.key">
        <div class="menu-item">
          <span
            :class="`topic hover-font ${handleIconFold(topic.fold)}`"
            @click.stop="animations.toggleFold(topic)"
          >
            <strong>
              {{ topic.name }}
            </strong>
            <span class="fold-icon"></span>
          </span>
          <CollapseTransition>
            <div :class="`examples-wrap ${topic.name}`" v-show="!topic.fold">
              <div
                v-for="item in topic.examples"
                :key="item.key"
                @click.stop="menuItemEvents.handleExamplesItemClick(item.name)"
                class="examples"
              >
                <div
                  class="with-thumbnail"
                  v-if="type === 'withThumbnail'"
                  :class="item.name"
                >
                  <div
                    @click.stop="animations.toggleFold(item)"
                    :class="`hover-font sub-title ${handleIconFold(item.fold)}`"
                  >
                    <span>
                      {{ item.name }}
                    </span>
                    <span class="fold-icon"></span>
                  </div>
                  <CollapseTransition>
                    <div v-show="!item.fold" class="sub-items">
                      <div v-for="(e, index) in topic.examples" :key="e.key">
                        <a
                          @click.stop="
                            menuItemEvents.clickItem(
                              `sub-${item.name}-${index}-${e.name}`,
                            )
                          "
                          :class="`sub-${item.name}-${index}-${e.name} hover-bkg sub-item`"
                          :href="`#${item.name}`"
                        >
                          <img
                            class="thumbnail"
                            :src="`/src/assets/screenshots/${e.key}.png`"
                          />
                        </a>
                      </div>
                    </div>
                  </CollapseTransition>
                </div>
                <div v-else :class="`${item.name} hover-bkg`">
                  <a :href="`#${item.name}`">
                    {{ item.name }}
                  </a>
                </div>
              </div>
            </div>
          </CollapseTransition>
        </div>
      </div>
    </div>
    <div class="fold-tool" @click="animations.handleWidthHidden">
      <span :class="`${widthHidden && 'fold-tool-transform'}`"> 〈 </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, inject } from 'vue';
import CollapseTransition from '../SideBarTransition/transition.vue';
const conf = inject('config');
const config = ref(Object.assign({}, conf));

const initConfig = (data) => {
  data.topic.forEach((topic) => {
    topic.fold = true;
    topic.examples.forEach((example) => {
      example.fold = true;
    });
  });
};

initConfig(config.value);

const widthHidden = ref(false);

const props = defineProps({
  type: {
    type: String,
    default: 'withThumbnail', // 包含缩略图/
  },
});

const handleIconFold = (flag) => {
  return flag ? 'fold-icon-open' : 'fold-icon-collapse';
};

const useMenuItemEvent = () => {
  const el = reactive({
    prev: {
      name: '',
      node: '',
    },
    cur: {
      name: '',
      node: '',
    },
  });

  const clickItem = (className) => {
    if (el.prev.name === '') {
      el.prev.name = el.cur.name = className;
      el.prev.node = el.cur.node = document.querySelector(`.${className}`);
      el.cur.node.classList.toggle('item-active');
    } else {
      el.prev.name = el.cur.name;
      el.prev.node = document.querySelector(`.${el.cur.name}`);
      el.prev.node.classList.toggle('item-active');
      el.cur.name = className;
      el.cur.node = document.querySelector(`.${className}`);
      el.cur.node.classList.toggle('item-active');
    }
  };

  const handleExamplesItemClick = (className) => {
    props.type !== 'withThumbnail' && menuItemEvents.clickItem(className);
  };

  return {
    clickItem,
    handleExamplesItemClick,
  };
};

const useAnimations = () => {
  const toggleFold = (topic) => {
    topic.fold = !topic.fold;
  };
  const handleWidthHidden = () => {
    widthHidden.value = !widthHidden.value;
  };

  const jumpTo = () => {};

  return {
    toggleFold,
    handleWidthHidden,
  };
};

const animations = useAnimations();
const menuItemEvents = useMenuItemEvent();

onMounted(() => {
  config.value.topic.forEach((topic) => {
    const el = document.querySelector(`.${topic.name}`);
    el.style.height = el.scrollHeight + 'px';
  });
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
