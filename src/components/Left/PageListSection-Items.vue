<template>
  <li class="left-item">
    <div class="flex-grow" @click="loadPage">📝 {{ page.data.name }}</div>
    <button class="left-btn" @click="deletePage">Delete</button>
  </li>
</template>

<script setup>
import {
  doc,
  Firestore,
  getDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";

//ページ情報を受信する
const props = defineProps({
  db: Firestore,
  page: QueryDocumentSnapshot,
});

//ページを削除したら報告する
const emits = defineEmits(["deleted-page", "loaded-page"]);

//ページを削除
const deletePage = () => {
  deleteDoc(doc(props.db, "pages", props.page.id))
    .then(() => {
      //削除したページIDを報告する
      emits("deleted-page", props.page.id);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const loadPage = () => {
  //クリックしたページのデータを取得
  const targetDoc = doc(db, "pages", props.page.id);
  getDoc(targetDoc)
    .then((targetSnap) => {
      //取得したデータを親に報告する
      emits("loaded-page", targetDoc);
    })
    .catch((e) => {
      alert("Failed to load page.");
    });
};
</script>
