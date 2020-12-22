<template>
  <div class="divBox">
    <a-list
      :grid="{ gutter: 0, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }"
      :data-source="searchData"
      class="listPlus"
      :key="searchKey"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item, index"
        :rowKey="index"
        class="listItem"
      >
        <search-item
          v-model="modelObj[item.name]"
          :label="item.label"
          :itemType="item.itemType"
          :defaultValuePlus="item.defaultValuePlus"
          :selectItems="item.selectItems"
          :dateFormat="item.dateFormat"
          :replaceFields="item.replaceFields"
          :isRequest="item.isRequest"
          :isDisabled="item.isDisabled"
          :placeholder="item.placeholder"
          :style="{ display: index < count ? 'block' : 'none' }"
        >
        </search-item>
      </a-list-item>
    </a-list>
    <div :class="{ btnLocation: expand ? false : true, btn: true }">
      <a-button @click="reset">重置</a-button>
      <a-button type="primary" :style="{ marginLeft: '20px' }" @click="search"
        >查询</a-button
      >
      <a :style="isShow" @click="toggle" :disabled="isDisabled">
        更多
        <a-icon :type="expand ? 'up' : 'down'" />
      </a>
    </div>
  </div>
</template>

<script>
import SearchItem from "./components/SearchItem.vue";

export default {
  components: {
    SearchItem,
  },
  props: {
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      modelObj: {},
      searchKey: 0,
      expand: false,
    };
  },
  computed: {
    count() {
      return this.expand ? 30 : 3;
    },
    isDisabled() {
      return this.searchData.length >= 4 ? false : true;
    },
    isShow() {
      return this.isDisabled === true
        ? { display: "none", marginLeft: "8px", fontSize: "12px" }
        : { display: "inlineBlock", marginLeft: "8px", fontSize: "12px" };
    },
  },
  watch: {
    modelObj: {
      handler: function (val, oldVal) {
        console.log(val);
      },
      deep: true,
    },
  },

  methods: {
    reset() {
      let arr = this.searchData;
      arr.forEach((ele) => {
        if (ele.itemType === "dateSearch") {
          if (ele.defaultValuePlus) {
            ele.defaultValuePlus = null;
          }
        }
      });
      this.modelObj = {};
      this.searchKey++;
    },
    search() {
      this.$emit("search", this.modelObj);
    },
    toggle() {
      this.expand = !this.expand;
    },
  },
};
</script>

<style scoped lang="less">
.divBox {
  border-bottom: 3px solid #f0f2f5;
  position: relative;
  .listPlus {
    padding: 20px 10px 0;
  }
  .btn {
    text-align: right;
    margin-right: 75px;
    margin-bottom: 10px;
  }
  .btnLocation {
    position: absolute;
    bottom: 12%;
    right: 1%;
  }
}
</style>
