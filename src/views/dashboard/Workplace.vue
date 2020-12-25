<template>
  <div>
    <h1>{{ name }}</h1>
    <button @click="getName">获取</button>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/utils/request.js";
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    getName() {
      api
        .get({
          url: "/api/lishijr",
        })
        .then((res) => {
          console.log(res.data);
          // this.name = res.data.weather;
        });
    },
  },
};
</script>
<style scoped>
</style>
