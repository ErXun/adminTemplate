<template>
  <div>
    <h1>填空题</h1>
    <div>
      <!-- <div v-for="(item, index) in examList" :key="item.id" class="question">
        <h1>{{ index + 1 }}. {{ item.content }}</h1>
        <span v-for="(qs, index) in item.question" :key="index">
          <a-input
          allowClear
            class="qInput"
            :addonBefore="index + 1"
            @blur="onChange(item.id, $event, item.question)"
          />
        </span>
      </div> -->

      <div v-for="item in examList" :key="item.id" class="question">
        <p :id="item.id" ref="qs" v-html="item.content" @input="input"></p>
      </div>
      <a-button type="primary" @click="click">提交</a-button>

      <div v-if="answerArray.length > 0" style="margin-top: 20px" :key="count">
        <a-button
          v-for="(item, index) in answerArray"
          :key="item.id"
          :type="item.answerLength !== 0 ? 'primary' : 'danger'"
          >{{ index + 1 }}</a-button
        >
      </div>

      <!-- <div v-if="answerArray.length > 0" style="margin-top: 20px" :key="count">
        <a-button
          v-for="(item, index) in answerArray"
          :key="item.id"
          :type="item.answerLength !== 0 ? 'primary' : 'danger'"
          >{{ index + 1 }}</a-button
        >
      </div> -->
    </div>
  </div>
</template>

<script>
// import examJson from "../../../mock/exam.json";

export default {
  data() {
    return {
      // examList: examJson.list,
      examList: [],
      str: "",
      id: "",
      count: 0,
      answerArray: [
        {
          answer: "",
          id: "001",
        },
        {
          answer: "",
          id: "002",
        },
        {
          answer: "",
          id: "003",
        },
      ],
      markArr: [],
    };
  },

  mounted() {
    // setInterval(() => {
    //   this.click();
    //   console.log("000");
    // }, 800);
  },
  methods: {
    input(e) {
      //获取p标签
      let p = e.target.parentNode;
      let id = p.id; //可以获取到该题的id
      //获取p下面的全部input框
      let children = Array.from(p.children);
      //筛选出填了值的input框
      let arr = children.filter((child) => {
        return child.value;
      });
      if (arr.length) {
        console.log("点亮");
        this.markArr.push({ id, val: arr });
        //如果有填了值的input框，说明该题需要点亮
      } else {
        console.log("置灰");
        this.markArr.push({ id, val: arr });
        //如果都没有填值，则该题置灰
      }
      console.log(this.markArr, "markArr");
    },
    click() {
      let { answerArray } = this;
      let qsArray = this.$refs.qs;
      let newArr = [];
      console.log(qsArray);
      qsArray.forEach((qs) => {
        let children = Array.from(qs.children);
        let answer = children.map((child) => child.value).toString();
        let answerLength = children.map((child) => child.value).join("").length;
        answerArray.forEach((ele, index) => {
          if (ele.id === qs.id) {
            answerArray.splice(index, 1, {
              id: qs.id,
              answer,
              answerLength,
            });
          }
        });
      });
      console.log(answerArray);
    },

    //
    onChange(id, e) {
      let { answerArray, idArr } = this;
      const inputValue = e.target.value;
      if (answerArray.length > 0) {
        if (idArr.indexOf(id) < 0) {
          console.log("+++");
          answerArray.push({
            id: id,
            answerStr: inputValue,
          });
          idArr.push(id);
        } else {
          console.log("---");
          answerArray.forEach((ele) => {
            if (ele.id === id) {
              ele.answerStr = inputValue;
            }
          });
        }
      } else {
        answerArray.push({
          id: id,
          answerStr: inputValue,
        });
        idArr.push(id);
      }
    },
  },
};
</script>
<style scoped>
.question {
  border-bottom: 1px solid #ccc;
  margin: 20px;
  padding: 20px;
}
.qInput {
  display: inline-block;
  margin: 10px 0 10px 10px;
  width: 250px;
}
</style>
