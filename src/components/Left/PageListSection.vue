<template>
  <PageListHeader :db="db" @added-new-page="" />
  <ul>
    <PageListItems
      v-for="page in pages"
      :page="page"
      :db="db"
      @deleted-page:=""
      @loaded-page=""
    />
  </ul>
</template>

<script setup>
import PageListHeader from "./PageListSection-Header.vue";
import PageListItems from "./PageListSection-Items.vue";
import { Firestore, QueryDocumentSnapshot } from "firebase/firestore";

//ページ情報を受信する
const props = defineProps({
  db: Firestore,
  pages: Array < QueryDocumentSnapshot > [],
});
</script>
