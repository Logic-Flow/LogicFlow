import { reactive } from 'vue';

export const useMenuItemEvent = () => {
  const el = reactive({
    cur: {
      name: '',
      node: '',
    },
  });

  const selected = reactive({
    fthr: {
      name: '',
      node: '',
    },
    grdFthr: {
      name: '',
      node: '',
    },
  });

  const clickItem = (className) => {
    if (el.cur.name === '') {
      el.cur.name = className;
    } else {
      if (el.cur.node.classList.contains('item-active')) {
        el.cur.node.classList.toggle('item-active');
      }
      if (el.cur.node.classList.contains('thumbnail-active')) {
        el.cur.node.classList.toggle('thumbnail-active');
      }
    }
    el.cur.name = className;
    el.cur.node = document.querySelector(`.${el.cur.name}`);
    el.cur.node.classList.toggle('item-active');
    el.cur.node.classList.toggle('thumbnail-active');
  };

  const handleExamplesItemClick = (className) => {
    props.type !== 'withThumbnail' && clickItem(className);
  };

  const toggleSelected = (flag, next) => {
    const cur = selected[flag];
    if (cur.name !== '') {
      if (cur.name !== next) {
        cur.node.classList.remove('selected');
      }
    }
    cur.name = next;
    cur.node = document.querySelector(`.${cur.name}`);
    cur.node.classList.add('selected');
  };

  const thumbnailClick = (fthrClass, grdFthrClass) => {
    fthrClass && toggleSelected('fthr', fthrClass);
    grdFthrClass && toggleSelected('grdFthr', grdFthrClass);
  };

  return {
    clickItem,
    handleExamplesItemClick,
    thumbnailClick,
  };
};

export const useAnimations = () => {
  const toggleFold = (topic) => {
    topic.fold = !topic.fold;
  };

  const handleIconFold = (flag) => {
    return flag ? 'fold-icon-collapse' : 'fold-icon-open';
  };

  return {
    toggleFold,
    handleIconFold,
  };
};

export const useTools = () => {
  const initConfig = (data) => {
    data.topic.forEach((topic) => {
      topic.fold = true;
      topic.examples.forEach((example) => {
        example.fold = true;
      });
    });
  };

  const filter = (config, target) => {
    config.topic.forEach((topic) => {
      let count = 0;
      topic.examples.forEach((item) => {
        if (item.name.includes(target)) {
          item.has = true;
          count++;
        } else {
          item.has = false;
        }
      });
      if (count === 0) {
        topic.has = false;
      } else {
        topic.has = true;
      }
    });
    return config;
  };

  return {
    filter,
    initConfig,
  };
};
