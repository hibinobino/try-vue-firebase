<template>
    <li class="left-item">
      <div class="flex-grow" @click="clickOpenPage(page.id)">
        📝 {{ page.data.name }}
      </div>
      <button class="left-btn" @click="clickDeletePage(page.id)">Delete</button>
    </li>
</template>

<script setup>
import { QueryDocumentSnapshot } from "firebase/firestore";

//ページ情報を受信する
const props = defineProps({
  page: QueryDocumentSnapshot
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
