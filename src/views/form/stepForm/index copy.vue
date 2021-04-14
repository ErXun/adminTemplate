<template>
  <div>
    <h1>填空题</h1>
    <div>
      <!-- <div v-for="(item, index) in examList" :key="item.id" class="question"> -->
      <div v-for="(item, index) in examList" :key="item.id" class="question">
        <!-- <h1 v-html="item.content"></h1> -->
        <h1>{{ index + 1 }}. {{ item.content }}</h1>
        <span v-for="(qs, index) in item.question" :key="index">
          <a-input
            class="qInput"
            :addonBefore="index + 1"
            :id="item.id"
            @blur="onChange(item.id, $event, item.question)"
          />
        </span>
      </div>
      <a-button type="primary">提交</a-button>
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
      answerArray: [],
      idArr: [],
    };
  },
  mounted() {
    // console.log(examJson);
  },
  template: "<a-input></a-input>",
  filters: {
    strChange(value) {
      if (value.indexOf("<input>")) {
        return "白日依山尽，流";
      }
    },
  },
  methods: {
    onChange(id, e, length) {
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
      console.log(answerArray);
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
