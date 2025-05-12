<template>
  <PageListHeader :db="db" @added-new-page="loadPageItems" />
  <PageListItems
    :db="db"
    :pages="pageItems"
    @deleted-page="loadPageItems"
    @select-page="openPageId"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import PageListHeader from "./PageListSection-Header.vue";
import PageListItems from "./PageListSection-Items.vue";
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

//ページ情報を受信する
const props = defineProps({
  db: Firestore,
});

const emits = defineEmits(["open-page-id"]);

const pageItems = ref(Array < QueryDocumentSnapshot > []);
const user = getAuth().currentUser;

//ページ一覧を取得する
const loadPageItems = () => {
  console.log("Loading page list");
  //クエリでページを絞り込んで取得する
  const pagesQuery = query(
    collection(props.db, "pages"),
    where("uid", "==", user.uid), //絞り込み条件、ログイン中のユーザーのものであること
    orderBy("createdDateTime", "desc") //日付順に並び変え
  );
  //絞り込んだページを取得
  getDocs(pagesQuery).then((pagesSnap) => {
    pageItems.value = pagesSnap.docs;
  });
};

//起動時にページ一覧を読み込み
onMounted(() => {
  console.log("mounted!");
  loadPageItems()
  openPageId(pageItems.value[0])
});

//開きたいページのIDを通知する
const openPageId = (pageId) => {
  emits("open-page-id", pageId);
};
</script>
