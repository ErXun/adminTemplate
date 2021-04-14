<template>
  <div>register</div>
</template>

<script>
export default {
  //
  beforeRouteEnter(to, from, next) {
    console.log("组件激活时执行，即进入该组件");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("组件失活时执行，即离开该组件");
    next();
    console.log("----");
  },
  beforeRouteUpdate(to, from, next) {
    console.log("组件复用时执行，比如，动态路由");
    next();
  },
};
</script>
<style scoped>
</style>
