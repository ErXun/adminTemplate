<template>
  <div>
    <a-row type="flex" align="middle">
      <a-col :span="6" class="labelClass">
        <span v-if="isRequest" class="isRequest">*</span>
        {{ label }}:
      </a-col>

      <a-col :span="14">
        <!--选择下拉框-->
        <a-select
          v-if="itemType === 'select'"
          size="default"
          style="width: 100%"
          v-model="modelSelect"
          @change="onChange"
          allowClear
          :disabled="isDisabled"
          :placeholder="placeholder"
        >
          <a-select-option v-for="item in selectItems" :key="item.value">{{
            item.title
          }}</a-select-option>
        </a-select>
        <!--搜索里的日期选择-->
        <a-date-picker
          v-else-if="itemType === 'dateSearch'"
          style="width: 100%"
          size="default"
          v-model="modelItem"
          @change="onChange"
          :format="dateFormat"
          :disabled="isDisabled"
          :placeholder="placeholder"
          :default-value="defaultValuePlus ? moment(defaultValuePlus) : null"
        />
        <!--树选择-->
        <a-tree-select
          v-else-if="itemType === 'tree'"
          size="default"
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="selectItems"
          v-model="modelSelect"
          tree-default-expand-all
          :replaceFields="replaceFields"
          @change="onChange"
          allowClear
          :disabled="isDisabled"
          :placeholder="placeholder"
        />
        <!--数字输入框-->
        <a-input
          v-else-if="itemType === 'number'"
          :type="'text'"
          v-model="modelItem"
          @change="onChange"
          oninput="value=value.replace(/[^\d.]/g, '')"
          allowClear
          :disabled="isDisabled"
          :placeholder="placeholder"
        />
        <!-- 普通 input 输入框 -->
        <a-input
          v-else
          v-model.trim="modelItem"
          :type="itemType"
          @change="onChange"
          allowClear
          :disabled="isDisabled"
          :placeholder="placeholder"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  model: {
    prop: "model",
    event: "change-plus",
  },
  props: {
    model: {
      type: String,
      default: "",
    },
    defaultValuePlus: {
      // 默认数据
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    itemType: {
      type: String,
      default: "",
    },
    selectItems: {
      type: Array,
      default: () => [],
    },
    dateFormat: {
      // 日期格式
      type: String,
      default: "YYYY-MM-DD",
    },
    replaceFields: {
      // tree-select 中替换 value 的绑定值
      type: Object,
      default: () => ({ value: "value" }),
    },
    isRequest: {
      // 选项不为空时，前面的提示符
      type: Boolean,
      default: false,
    },
    isDisabled: {
      // 是否禁用选项
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      modelItem:
        this.defaultValuePlus && this.itemType === "dateSearch"
          ? moment(this.defaultValuePlus, this.dateFormat)
          : this.defaultValuePlus,
      modelSelect: undefined,
    };
  },
  mounted() {},
  methods: {
    moment,
    onChange(e, s) {
      this.$emit("change-plus", this.modelItem);
      if (this.itemType === "dateSearch") {
        this.$emit("change-plus", s);
      } else if (this.itemType === "select" || this.itemType === "tree") {
        this.$emit("change-plus", e);
      }
    },
  },
};
</script>
<style scoped lang='less'>
.labelClass {
  text-align: center;
  .isRequest {
    color: red;
    font-size: 18px;
    height: 16px;
    line-height: 16px;
    // vertical-align: middle;
  }
}
</style>
