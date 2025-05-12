<template>
  <div class="right section">
    <!--ページタイトル-->
    <div
      class="focus:outline-none focus:ring-0 text-4xl font-bold h-12 selection:bg-blue-200"
      contenteditable="true">title text</div>
    <div class="text-sm text-gray-400 font-bold">
      <div>Created: 2025-01-01 12:00</div>
      <div>Updated: 2025-01-01 12:00</div>
    </div>

  </div>
</template>

<script setup>
import { DocumentSnapshot } from "firebase/firestore";
import { Marked } from "marked";
import { ref, watch } from "vue";

//親コンポーネントから受け取るページの内容
//読み取り専用
const props = defineProps({
  currentPageId: String
});


//ページデータを格納する
const pageData = ref(DocumentSnapshot);

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

//ページが変わるとcurrentPageIdが変わるので
//その都度内容を読み込みなおす
watch(currentPageId, (newPageId) => {
  alert("Opened new page: "+newPageId+"\nOld page was: "+currentPageId)

});
</script>
