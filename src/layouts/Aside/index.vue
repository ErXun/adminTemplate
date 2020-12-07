<template>
  <div style="width: 256px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="clickPage(item)"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";
import { check } from "../../utils/auth";
export default {
  components: {
    "sub-menu": SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData,
    };
  },
  methods: {
    getMenuData(routes) {
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children);
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenMenu &&
          item.children
        ) {
          menuData.push(...this.getMenuData(item.children));
        }
      }
      return menuData;
    },
  },
  clickPage(item) {
    console.log('---');
    this.$router.push({ path: item.path, query: this.$route.query });
  },
};
</script>
