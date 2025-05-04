<template>
  <li class="page-list-item" v-for="page in pages">
    <div>{{ page.data.name }}</div>
    <button class="left-btn" @click="clickDeletePage(page.id)">Delete</button>
  </li>
</template>

<script setup>
import { QueryDocumentSnapshot } from "firebase/firestore";

//ページ情報を受信する
const props = defineProps({
  pages: Array < QueryDocumentSnapshot > [],
});

//コンポーネントイベントを定義する
const emits = defineEmits(["delete-page"]);

//削除ボタンを押したら親に通知する
const clickDeletePage = (pageId) => {
  emits("delete-page", pageId);
};
</script>
