<template>
  <PageListHeader :db="db"/>
  <ul>
    <PageListItems v-for="page in pages" :page="page" />
  </ul>
</template>

<script setup>
import PageListHeader from "./PageListSection-Header.vue";
import PageListItems from "./PageListSection-Items.vue";
import { QueryDocumentSnapshot } from "firebase/firestore";

//ページ情報を受信する
const props = defineProps({
  pages: Array < QueryDocumentSnapshot > [],
});

//コンポーネントイベントを定義する
const emits = defineEmits(["delete-page", "open-page"]);

//--------------------------------------
//ボタンを押したら親に通知する
//--------------------------------------

//削除ボタン
const clickDeletePage = (pageId) => {
  emits("delete-page", pageId);
};

//ページボタン
const clickOpenPage = (pageId) => {
  emits("open-page", pageId);
};
</script>
