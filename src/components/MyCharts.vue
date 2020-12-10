<template>
  <div ref="chartDom"></div>
</template>

<script>
var echarts = require("echarts");
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";

export default {
  props: {
    option: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    option: {
      handler(val) {
        this.myChart.setOption(val);
      },
      deep: true,
    },
  },
  created() {
    this.resize = debounce(this.resize, 300); // 防抖
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestory() {
    removeListener(this.$refs.chartDom, this.resize);
    // 销毁实例，实例销毁后无法再被使用
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    resize() {
      this.myChart.resize();
    },
    renderChart() {
      this.myChart = echarts.init(this.$refs.chartDom);
      this.myChart.setOption(this.option);
    },
  },
};
</script>
