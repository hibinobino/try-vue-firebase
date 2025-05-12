<template>
  <ul>
    <li class="left-item" v-for="page in pages">
      <div class="flex-grow" @click="loadPage(page)">
        📝 {{ page.data().name }}
      </div>
      <button class="left-btn" @click="deletePage(page)">Delete</button>
    </li>
  </ul>
</template>

<script setup>
import {
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";

//ページ情報を受信する
const props = defineProps({
  db: Firestore,
  pages: Array < QueryDocumentSnapshot > [],
});

//ページを削除したら報告する
const emits = defineEmits(["deleted-page","select-page"]);

//ページを削除
const deletePage = (pageSnap) => {
  deleteDoc(doc(props.db, "pages", pageSnap.id))
    .then(() => {
      //削除したページIDを報告する
      console.log("deleted " + pageSnap.id);
      emits("deleted-page", pageSnap.id);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const loadPage = (pageSnap) => {
  //クリックしたページのデータを取得
  const targetDoc = doc(props.db, "pages", pageSnap.id);
  getDoc(targetDoc)
    .then((targetSnap) => {
      //取得したデータを親に通知する
      emits("select-page", targetSnap);
    })
    .catch((e) => {
      alert("Failed to load page.");
    });
};
</script>
