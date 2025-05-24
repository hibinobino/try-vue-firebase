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
      @input="(e) => onInput_updateMdContent(i, e)"
      @keydown.enter.prevent="(e) => onEnter_BreakLine(i, e)"
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

const onInput_updateMdContent = (index, event) => {
  //該当の配列の内容を更新
  mdContentLines.value[i] = event.target.innerText;

  //本文全体を更新
  mdContentText.value = mdContentLines.value.join("\n");
};

const onEnter_BreakLine = (index, event) => {
  //キャレットの位置を取得する
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  //キャレットの範囲を削除する
  const range = selection.getRangeAt(0);
  range.deleteContents(); // 選択範囲を削除（キャレットだけなら無視される）

  const container = range.startContainer;
  let text = container.textContent || "";
  let offset = range.startOffset;

  // キャレット前後の文字列を取得
  const before = text.slice(0, offset);
  const after = text.slice(offset);

  //現在の要素を置き換える
  mdContentLines.value[index] = before;

  //次の行に挿入する
  mdContentLines.value.splice(index + 1, 0, after);

  //本文全体を更新
  mdContentText.value = mdContentLines.value.join("\n");
};

watch(props, (newP, oldP) => {
  mdContentText.value = newP.mdContent;
  mdContentLines.value = mdContentText.value.split("\n");
});
</script>
