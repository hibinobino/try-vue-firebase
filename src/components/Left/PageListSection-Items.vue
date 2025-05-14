<template>
  <ul>
    <li class="left-item" v-for="page in pageItems" v-bind:class="{'bg-gray-200': page.id==selectedPageId}">
      <div class="flex-grow" @click="selectPage(page.id)">
        📝 {{ page.data().name }}
      </div>
      <button class="left-btn" @click="deletePage(page)">Delete</button>
    </li>
  </ul>
</template>

<script setup>
import { getAuth } from "firebase/auth";
import {
  deleteDoc,
  doc,
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { onMounted, ref, watch } from "vue";

//ページ情報を受信する
const props = defineProps({
  db: Firestore,
  currentPageId: String
});

const selectedPageId = ref("");

//ページを削除したら報告する
const emits = defineEmits(["deleted-page", "select-page"]);

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
    loadPageItems()
};

const selectPage = (pageId) => {
  //選択中のページのボタンの色を管理
  selectedPageId.value = pageId;
  //表示したいページのIDを通知する
  emits("select-page", pageId);
};

//起動時にページ一覧を読み込み
onMounted(() => {
  loadPageItems()
});

watch(props,(newP,oldP)=>{
  loadPageItems()
  selectedPageId.value=newP.currentPageId
  console.log("watch updated")
})
</script>
