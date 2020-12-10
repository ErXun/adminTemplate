<template>
  <div>
    <my-charts :option="option" style="height: 400px"></my-charts>
    <!-- <my-charts style="height: 400px"></my-charts> -->
  </div>
</template>

<script>
import MyCharts from "../../components/MyCharts";
export default {
  components: {
    MyCharts,
  },
  data() {
    return {
      option: {
        title: {
          text: "echarts 入门",
        },
        tooltip: {},
        xAxis: {
          data: ["math", "English", "Chinese", "music", "history"],
        },
        yAxis: {},
        series: [
          {
            name: "分数",
            type: "bar",
            data: ["80", "70", "90", "100", "90"],
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.option.series[0].data = ["800", "700", "90", "100", "90"];
    }, 3000);
  },
};
</script>
<style scoped>
</style>
