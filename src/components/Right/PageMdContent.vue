<template>
  <div id="md-content-area" spellcheck="false">
    <!--プレビュー用-->
    <div class="focus:outline-none focus:ring-0 bg-red-100">
      {{ mdContentText }}
    </div>

    <!--編集用-->
    <div
      v-for="(line, i) in mdContentLines"
      class="focus:outline-none focus:ring-0 bg-blue-100"
      contenteditable="true"
      ref="refDivBlock"
      @input="(e)=>onInput_updateMdContent(i,e)"
    >
      {{ line }}
    </div>
  </div>
</template>
<script setup>
import { Marked } from "marked";
import { split } from "postcss/lib/list";
import { ref, watch } from "vue";

const props = defineProps({
  mdContent: String,
});

const emits = defineEmits(["mdcontent-edit"]);
const refDivBlock = ref(null);

const mdContentText = ref("");
const mdContentLines = ref(Array < String > []);
const mdContentParsed = ref("");

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

const onInput_updateMdContent = (index,event) => {
  //該当の配列の内容を更新
  mdContentLines.value[i] = event.target.innerText

  //本文全体を更新
  mdContentText.value = mdContentLines.value.join("\n")
};

watch(props, (newP, oldP) => {
  mdContentText.value = newP.mdContent;
  mdContentLines.value = mdContentText.value.split("\n");
});
</script>
