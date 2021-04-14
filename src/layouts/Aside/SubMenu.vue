<template>
  <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" /><span>{{
        menuInfo.meta.title
      }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="clickSubPage(item)"
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
export default {
  name: "SubMenu",
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
   clickSubPage(item) {
    this.$router.push({ path: item.path, query: this.$route.query });
  },
  },
};
</script>

