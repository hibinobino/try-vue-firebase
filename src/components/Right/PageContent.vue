<template>
  <div class="right section">
    <!--ページタイトル-->
    <PageTitle :title="name" @title-edit="updateTitle" />
    <div class="text-sm text-gray-400 font-bold">
      <div>Created: 2025-01-01 12:00</div>
      <div>Updated: 2025-01-01 12:00</div>
    </div>
    <div
      v-html="mdParser.parse(mdContent)"
      contenteditable="true"
      class="focus:outline-none focus:ring-0"
    ></div>
    <div
      v-html="
        mdParser.parse(
          '# This is an H1\n\n## This is an H2\n\n###### This is an H6'
        )
      "
      contenteditable="true"
      class="focus:outline-none focus:ring-0"
    ></div>
  </div>
</template>

<script setup>
import {
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Marked } from "marked";
import { onMounted, ref, watch } from "vue";
import PageTitle from "./PageTitle.vue";

//親コンポーネントから受け取るページの内容
//読み取り専用
const props = defineProps({
  db: Firestore,
  currentPageId: String,
});

//現在のページIDを管理
const currentPageId = ref();

//ページデータを格納する
const pageData = ref(DocumentSnapshot);

const mdContent = ref("");
const name = ref("");

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

//ページ読み込み
const loadPageData = (pageId) => {
  console.log("Loading page ID: " + pageId);
  const docRef = doc(props.db, "pages", pageId);

  getDoc(docRef)
    .then((docSnap) => {
      mdContent.value = docSnap.data().mdContent;
      name.value = docSnap.data().name;
      console.log("Loaded page ID: " + pageId);
    })
    .catch((error) => {
      console.log("loadPageData failed." + error.message);
    });
};

/*
onMounted(() => {
  //ページ読み込み時にデータ取得
  loadPageData(props.currentPageId);
});
*/
watch(props, (newP, oldP) => {
  console.log("props changed");
  //ページを切り替えたら今のページを保存して
  //新しいページを開く
  loadPageData(newP.currentPageId);
});

//書き換えられたページタイトルをFirestoreに送信する
const updateTitle = (titleText) => {
  updateDoc(doc(props.db, "pages", props.currentPageId), {
    name: titleText,
  }).then(() => {

  }).catch((error)=>{
    console.log("error updateTitle: " + error.message)
  });
};
</script>
