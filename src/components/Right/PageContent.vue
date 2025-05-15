<template>
  <div class="right section">
    <!--ページタイトル-->
    <PageTitle :title="name" @title-edit="updateTitle" />
    <PageMdContent :mdContent="mdContent" />    
  </div>
</template>

<script setup>
import {
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, watch } from "vue";
import PageTitle from "./PageTitle.vue";
import PageMdContent from "./PageMdContent.vue";

//親コンポーネントから受け取るページの内容
//読み取り専用
const props = defineProps({
  db: Firestore,
  currentPageId: String,
});


const name = ref("");
const mdContent = ref("");


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
