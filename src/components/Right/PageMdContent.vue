<template>
  <div
    id="md-content-area"
    spellcheck="false"
  >
    <div
      contenteditable="true"
      class="focus:outline-none focus:ring-0 bg-red-100"
    ref="refMdContent"
    @input="mdContentEdit"
    >{{ mdContentText }}</div>
    <div
      v-html="mdContentParsed"
      class="focus:outline-none focus:ring-0 bg-blue-100"
    ></div>
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
const refMdContent = ref(null);

const mdContentText = ref("");
const mdContentLines = ref(Array<String>[])
const mdContentParsed = ref("");

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

const mdContentEdit = (e) => {
  mdContentText.value = refMdContent.value.innerText;
  //mdContentLines.value=split(mdContentText.value,)
  mdContentParsed.value = mdParser.parse(mdContentText.value);
};

watch(props, (newP, oldP) => {
  mdContentText.value = newP.mdContent;
  mdContentLines.value = mdContentText.value.split("\n")
});
</script>
