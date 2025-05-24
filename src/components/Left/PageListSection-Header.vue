<template>
  <div class="left-header text-xs">
    <div class="flex-grow">Pages</div>
    <button class="left-btn" @click="addPage">＋</button>
  </div>
</template>

<script setup>
import { getAuth } from "firebase/auth";
import { Firestore, addDoc, collection, serverTimestamp } from "firebase/firestore";

//Firestore情報を引き継ぐ
const props = defineProps({
  db: Firestore,
});

//ページの追加完了を報告する
const emits = defineEmits(["new-page"])

const user = getAuth().currentUser

//新規ページ追加
const addPage = () => {
  //ページ名を入力させる
  const strName = window.prompt(
    "ページタイトルを入力してください。",
    "New Page"
  );
  if (strName != null) {
    //pagesコレクションに自動IDでページを追加
    addDoc(collection(props.db, "pages"), {
      name: strName,
      uid: user.uid,
      createdDateTime: serverTimestamp(),
      mdContent: "## Header 2\n\n- Test List  \nNext Line",
    })
      .then((newDoc) => {
        console.log("Created new page.");
        //ページの追加を親に報告する
        emits("new-page",newDoc.id)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

</script>
