<template>
  <div>
    <div @click="showDrawer" class="setting">
      <a-icon type="setting"></a-icon>
    </div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <h2>整体风格定制</h2>
      <a-radio-group
        :value="$route.query.navTheme || 'dark'"
        @change="(e) => changeSideTheme('navTheme', e.target.value)"
      >
        <a-radio value="dark"> 黑色 </a-radio>
        <a-radio value="light"> 白色 </a-radio>
      </a-radio-group>
      <h2>导航模式</h2>
      <a-radio-group
        :value="$route.query.navLayout || 'left'"
        @change="(e) => changeSideTheme('navLayout', e.target.value)"
      >
        <a-radio value="left"> 左侧 </a-radio>
        <a-radio value="top"> 顶部 </a-radio>
      </a-radio-group>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    changeSideTheme(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    },
  },
};
</script>

<style lang="less">
.setting {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: #1890ff;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
