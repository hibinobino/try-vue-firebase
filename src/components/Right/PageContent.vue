<template>
  <div class="right section">
    <!--ページタイトル-->
    <div
      class="focus:outline-none focus:ring-0 text-4xl font-bold h-12 selection:bg-blue-200"
      contenteditable="true"
    >
      title text
    </div>
    <div class="text-sm text-gray-400 font-bold">
      <div>Created: 2025-01-01 12:00</div>
      <div>Updated: 2025-01-01 12:00</div>
    </div>
  </div>
</template>

<script setup>
import { doc, DocumentSnapshot, Firestore, getDoc } from "firebase/firestore";
import { Marked } from "marked";
import { ref, watch } from "vue";

//親コンポーネントから受け取るページの内容
//読み取り専用
const props = defineProps({
  db: Firestore,
  currentPageId: String,
});

//ページデータを格納する
const pageData = ref(DocumentSnapshot);

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

//currentPageIdが変わったらページを再読み込みする
watch(props.currentPageId, (newPageId) => {
  alert("Opened new page: " + newPageId + "\nOld page was: " + currentPageId);
  loadPageData()
});

//ページ読み込み
const loadPageData = (pageId) => {
  const docRef = doc(props.db, "pages", pageId);

  getDoc(docRef)
    .then((docSnap) => {
      pageData.value = docSnap.data();
    })
    .catch((error) => {
      console.log("loadPageData failed.");
    });
};
</script>
