<template>
  <div>
    <div>
      <a-table
        :columns="columns"
        :data-source="data"
        :rowKey="(record, index) => index"
      >
      </a-table>
    </div>

    <button @click="getName">获取</button>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api/http.js";

const columns = [
  {
    title: "name",
    dataIndex: "name",
  },
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "email",
    dataIndex: "email",
  },
  {
    title: "date",
    dataIndex: "date",
  },
  {
    title: "ip",
    dataIndex: "ip",
  },
];

export default {
  data() {
    return {
      name: "",
      data: [],
      columns,
    };
  },
  methods: {
    getName() {
      api
        .get({
          url: "/user/userInfo",
        })
        .then((res) => {
          console.log(res.data);
          this.data = res.data.list;
          // this.name = res.data.weather;
        });
    },
  },
};
</script>
<style scoped>
</style>
