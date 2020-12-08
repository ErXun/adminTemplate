<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout class="home" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        v-model="collapsed"
        :trigger="null"
        collapsible
        width="256px"
      >
        <h1 class="title">Ant Desgin Vue Plus</h1>
        <aside-plus :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header clearfix">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <header-plus class="headerInfo"></header-plus>
        </a-layout-header>
        <a-layout-content>
          <content-plus class="content" />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <footer-plus />
        </a-layout-footer>
      </a-layout>
      <authorized :authority="['admin']">
        <drawer-plus class="drawer" />
      </authorized>
    </a-layout>
  </div>
</template>

<script>
import HeaderPlus from "./Header";
import AsidePlus from "./Aside";
import ContentPlus from "./Content";
import FooterPlus from "./Footer";
import DrawerPlus from "../components/setDrawer";
export default {
  name: "Home",
  components: {
    HeaderPlus,
    AsidePlus,
    ContentPlus,
    FooterPlus,
    DrawerPlus,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  .title {
    height: 64px;
    line-height: 64px;
    color: #fff;
    text-align: center;
    overflow: hidden;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .header {
    background: #fff;
    padding: 0;
    .headerInfo {
      float: right;
    }
  }
  .content {
    background: #fff;
    margin: 15px;
    height: 100%;
  }
  .drawer {
    position: absolute;
    right: 1%;
    top: 30%;
  }
}
.nav-theme-light .home .title {
  color: #000;
}
</style>
