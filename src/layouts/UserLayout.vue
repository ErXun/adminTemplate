<template>
  <div id="user_layout">
    <router-view class="user_layout_container"></router-view>
  </div>
</template>

<script>
export default {};
</script>
<style scoped lang="less">
#user_layout {
  height: 100vh;
  background-color: #2d3a4b;
  .user_layout_container {
    width: 450px;
    padding-top: 110px;
    margin: 0 auto;
  }
}
</style>
