<template>
  <div>
    <button @click="addDocument">addDocument</button>
    <button @click="getDocument">getDocument</button>
    <LogoutScreen />
  </div>
</template>

<script setup>
import LogoutScreen from "./LogoutScreen.vue"

import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const props = defineProps({
  db: Firestore,
  userUid: String,
});
const auth = getAuth();

// Add a new document in collection "cities"
const addDocument = () => {
  const col = collection(props.db, "test-collection");
  setDoc(doc(col, "test-doc"), {
    name: "商品名",
  })
    .then(() => {
      alert("書き込み成功！");
    })
    .catch((error) => {
      alert("書き込みエラー");
    });
};
const getDocument = async () => {
  const docSnap = await getDoc(doc(props.db, "test-collection", "test-doc"));
  if (docSnap.exists()) {
    alert("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    alert("No such document!");
  }
};

//初回ログイン時、usersコレクションにユーザーを追加する
(() => {
  console.log("Checking for user data...")
  getDoc(doc(props.db, "users", props.uid)) //ユーザーデータを取得する
    .then((userDoc) => {
      //取得できればデータを更新する
      updateDoc(userDoc, {
        loginDateTime: Timestamp.now(), //ログイン日時
      }).then(()=>{
        console.log("updated user data: loginDateTime.")
      })
    })
    .error(() => {
      //取得できなかったらデータを新規に追加する
      setDoc(doc(props.db, "users", props.uid), {
        email: auth.getUser(props.uid).email,
        createdDateTime: Timestamp.now(),
        loginDateTime: Timestamp.now(),
      }).then(()=>{
        console.log("created user data.")
      });
    });
});
</script>

<style scoped></style>
