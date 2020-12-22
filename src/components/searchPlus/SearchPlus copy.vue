<template>
  <div>
    <search-item v-model="model"> </search-item>
  </div>
</template>

<script>
import SearchItem from "./components/SearchItem.vue";
export default {
  components: {
    SearchItem,
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    model(val, oldVal) {
      console.log(val, "sss", oldVal);
    },
  },
};
</script>

<style>
</style>
