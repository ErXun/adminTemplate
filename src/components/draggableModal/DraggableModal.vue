
<template>
  <a-modal
    v-if="footer"
    :class="[modalClass, simpleClass]"
    :visible="showModal"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="width == '100%' ? '70%' : width"
  >
    <slot name="modalBody" style="minheight: 600px"></slot>
  </a-modal>
  <a-modal
    v-else
    :class="modalClass"
    :visible="showModal"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="width == '100%' ? '70%' : width"
    :footer="null"
  >
    <slot name="modalBody"></slot>
  </a-modal>
</template>

<script>
var mouseDownX = 0;
var mouseDownY = 0;
var deltaX = 0;
var deltaY = 0;
var sumX = 0;
var sumY = 0;

var header = null;
var contain = null;
var modalContent = null;
export default {
  components: {},
  props: {
    // 容器的类名
    modalClass: {
      type: String,
      default: () => {
        return "modal-box";
      },
    },
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    width: {
      type: String,
      default: () => {
        return "70%";
      },
    },
    footer: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      showModal: this.visible,
      modalPointer: null,
    };
  },
  computed: {
    simpleClass() {
      return Math.random().toString(36).substring(2);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initialEvent(this.visible);
    });
  },
  created() {},
  beforeDestroy() {
    this.removeMove();
    window.removeEventListener("mouseup", this.removeUp, false);
  },
  methods: {
    handleOk() {
      this.resetNum();
      this.$emit("ok");
    },
    handleCancel() {
      this.resetNum();
      this.$emit("cancel");
    },
    resetNum() {
      mouseDownX = 0;
      mouseDownY = 0;
      deltaX = 0;
      deltaY = 0;
      sumX = 0;
      sumY = 0;
    },
    handleMove(event) {
      const delta1X = event.pageX - mouseDownX;
      const delta1Y = event.pageY - mouseDownY;

      deltaX = delta1X;
      deltaY = delta1Y;
      console.log(delta1X, sumX, delta1Y, sumY);
      modalContent.style.transform = `translate(${delta1X + sumX}px, ${
        delta1Y + sumY
      }px)`;
    },
    initialEvent(visible) {
      console.log("simpleClass===>", this.simpleClass);
      console.log("document===>", document);
      if (visible) {
        setTimeout(() => {
          window.removeEventListener("mouseup", this.removeUp, false);
          contain = document.getElementsByClassName(this.simpleClass)[0];
          header = contain.getElementsByClassName("ant-modal-header")[0];
          modalContent = contain.getElementsByClassName("ant-modal-content")[0];

          modalContent.style.left = 0;
          modalContent.style.transform = "translate(0px,0px)";

          console.log("初始化-header:", header);
          console.log("初始化-contain:", contain);
          console.log("初始化-modalContent:", modalContent);

          header.style.cursor = "all-s `croll";

          contain.onmousedown = (e) => {
            mouseDownX = e.pageX;
            mouseDownY = e.pageY;
            document.body.onselectstart = () => false;
            window.addEventListener("mousemove", this.handleMove, false);
          };

          window.addEventListener("mouseup", this.removeUp, false);
        }, 0);
      }
    },
    removeMove() {
      window.removeEventListener("mousemove", this.handleMove, false);
    },
    removeUp(e) {
      document.body.onselectstart = () => true;

      if (!(e.pageX == mouseDownX && e.pageY == mouseDownY)) {
        sumX = sumX + deltaX;
        sumY = sumY + deltaY;
      }

      this.removeMove();
    },
  },
};
</script>
