<template>
  <div id="test">
    <a-button type="primary" @click="clickDraggableModal"> 按钮一 </a-button>
    <h3>以下是文件HELLO.java中的源代码，请分析该代码的运行结果( )</h3>
    <pre class="line-numbers">
      <code class="language-java">
          public class Hello{
                public static void main(String[] args)
                {
                  String str = "Hello World";
                  System.out.print(str);
                }
          }
      </code>
    </pre>

    <h3>js显示:</h3>
    <pre
      class="line-numbers"
    ><code class="language-js">require("lib/ace"); ##引入
editor.setTheme("ace/theme/solarized_dark");##设置模theme-solarized_dark.js模板文件
editor.getSession().setMode("ace/mode/javascript"); ##设置程序语言模式
editor.setValue("the new text here");##设置内容
editor.getValue(); ##取值</code></pre>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    Prism.highlightAll();
  },
  methods: {},
};
</script>

<style scoped>
</style>
