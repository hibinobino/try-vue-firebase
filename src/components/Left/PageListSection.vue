<template>
  <PageListHeader :db="db" @added-new-page="loadPageItems" />
  <ul>
    <PageListItems
      v-for="pageItem in pageItems"
      :page="pageItem"
      :db="db"
      @deleted-page:="loadPageItems"
      @loaded-page=""
    />
  </ul>
</template>

<script setup>
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

//ページ情報を受信する
const props = defineProps({
  db: Firestore,
});

const pageItems = Ref(Array<QueryDocumentSnapshot>[])

//ページ一覧を取得する
const loadPageItems = () => {
  //クエリでページを絞り込んで取得する
  const pagesQuery = query(
    collection(props.db, "pages"),
    where("uid", "==", user.uid), //絞り込み条件、ログイン中のユーザーのものであること
    orderBy("createdDateTime", "desc") //日付順に並び変え
  );
  //絞り込んだページを取得
  getDocs(pagesQuery).then((pagesSnap) => {
    pageItems.value = pagesSnap.docs
  });
};
</script>
