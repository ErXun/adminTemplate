<template>
  <div>
    <search-plus :searchData="searchData" @search="search"></search-plus>
    <div>{{ searchParams }}</div>
    <h1>利用 Mock 拦截 ajax 请求</h1>
  </div>
</template>

<script>
import SearchPlus from "../../components/searchPlus/SearchPlus.vue";
import api from "@/api/http.js";
import Mock from "mockjs";

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "00",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "001",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "01",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "011",
        disabled: true,
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "012",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "013",
      },
    ],
  },
];
export default {
  components: {
    SearchPlus,
  },
  data() {
    return {
      treeData,
      searchData: [
        {
          label: "普通Input",
          itemType: "text",
          name: "prop1",
          // defaultValuePlus: "哈哈哈",
          isRequest: true,
          isDisabled: true,
        },
        {
          label: "选择下拉框",
          itemType: "select",
          name: "prop2",
          isDisabled: false,
          placeholder: "请选择饮料",
          selectItems: [
            {
              title: "牛奶",
              value: "1",
            },
            {
              title: "酸奶",
              value: "2",
            },
            {
              title: "椰奶",
              value: "3",
            },
          ],
        },
        {
          label: "默认日期",
          itemType: "dateSearch",
          name: "prop3",
          defaultValuePlus: "2020-12-12",
          placeholder: "请选择日期",
        },
        {
          label: "指定日期格式",
          itemType: "dateSearch",
          name: "prop4",
          dateFormat: "YYYY-MM-DD HH:mm:ss",
          placeholder: "请选择日期",
        },
        {
          label: "数字输入框",
          itemType: "number",
          name: "prop5",
        },
        {
          label: "tree 选择",
          itemType: "tree",
          name: "prop6",
          selectItems: treeData,
          replaceFields: { value: "key" },
          placeholder: "请选择单位",
        },
      ],
      searchParams: null,
    };
  },
  mounted() {
    api
      // .get({ url: "/test" })
      // .get({ url: "/api/lishijr" })
      // .get({ url: "/express/server" })
      // .get({ url: "todos/1" })
      .get({ url: "/user/userInfo" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Mock.mock("/user/userInfo", {
    // Mock.mock("http://jsonplaceholder.typicode.com/todos/1", {
      id: "@id()", // 随机 id
      name: "@cname()", // 随机姓名
      date: "@date()",
      ip: "@ip()",
      email: "@email()",
    });
  },
  methods: {
    search(value) {
      this.searchParams = value;
      console.log(value);
    },
  },
};
</script>
<style scoped>
</style>
