<template>
  <div id="md-content-area" spellcheck="false">
    <!--プレビュー用-->
    <div class="focus:outline-none focus:ring-0 bg-red-100">
      {{ mdContentText }}
    </div>

    <!--編集用-->
    <div ref="refRootDiv">
      <div
        v-for="(line, i) in mdContentLines"
        class="bg-blue-100"
        contenteditable="true"
        @input="(e) => onInput_updateMdContent(i, e)"
        @keydown.enter.prevent="(e) => onEnter_BreakLine(i, e)"
        @keydown.backspace = "(e) => onBackSpace(i, e)"
      >
        {{ line }}
      </div>
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
const refRootDiv = ref(null);

const mdContentText = ref("");
const mdContentLines = ref(Array < String > []);
const mdContentParsed = ref("");

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

const onInput_updateMdContent = (index, event) => {
  //該当の配列の内容を更新
  mdContentLines.value[i] = event.target.innerText;
updateWholeContent()
};

const updateWholeContent =()=>{  
  //本文全体を更新
  mdContentText.value = mdContentLines.value.join("\n");
  mdContentLines.value = mdContentText.value.split("\n");
}

const onBackSpace = (index, event) =>{
  //編集中のブロックが1行目の場合、中止する
  if(index == 0 ) return

  //キャレットが先頭になければ中止する
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const offset = range.startOffset; //キャレット位置

  if (offset != 0) return

  //上の行に現在の行を合体させる
  mdContentLines.value[index-1]+=mdContentLines.value[index]
  
  //現在の行を削除する
  mdContentLines.value.splice(index,1)
  
  //本文全体を更新
  updateWholeContent()
}

const onEnter_BreakLine = (index, event) => {
  //キャレットの位置を取得する
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  //キャレットの範囲を削除する
  const range = selection.getRangeAt(0);
  range.deleteContents(); // 選択範囲を削除（キャレットだけなら無視される）

  const container = range.startContainer;
  const offset = range.startOffset;

  // キャレット前後の文字列を取得
  const before = mdContentLines.value[index].slice(0, offset);
  const after = mdContentLines.value[index].slice(offset);

  //現在の要素を更新する
  mdContentLines.value[index] = before;

  //次の行に挿入する
  mdContentLines.value.splice(index + 1, 0, after);

  //本文全体を更新
  updateWholeContent()

  //キャレットを次の行の先頭に置く
  const editableDivs = refRootDiv.value.querySelectorAll("[contenteditable]");
  const target = editableDivs[index + 1];
  if (!target) return;

  target.focus(); // まずフォーカス
  const newRange = document.createRange();
  const sel = window.getSelection();

  const textNode = target.firstChild;
  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    newRange.setStart(textNode, 0); // 先頭（0文字目）
  } else {
    newRange.setStart(target, 0); // テキストが無い場合でも対応
  }

  newRange.collapse(true); // 範囲を1点に
  sel.removeAllRanges();
  sel.addRange(newRange);
};

watch(props, (newP, oldP) => {
  mdContentText.value = newP.mdContent;
  mdContentLines.value = mdContentText.value.split("\n");
});
</script>
