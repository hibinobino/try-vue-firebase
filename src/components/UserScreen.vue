<template>
  <div>
    <button @click="addDocument">addDocument</button>
    <button @click="getDocument">getDocument</button>
    <div>
      <button @click="addPage">addNewPage</button>
    </div>
    <LogoutScreen />
  </div>
</template>

<script setup>
import LogoutScreen from "./LogoutScreen.vue";

import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { onMounted } from "vue";

const props = defineProps({
  db: Firestore,
  userUid: String,
});
const auth = getAuth();
const user = auth.currentUser;

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
const addPage = () => {
  //pagesコレクションに自動IDでページを追加
  addDoc(collection(props.db, "pages"), {
    name: "New Page",
    uid: user.uid,
    createdDateTime: serverTimestamp()
  }).then(()=>{
    console.log("Created new page.")
  }).catch((error) =>{
    console.log(error.message)
  })
}

//初回ログイン時、usersコレクションにユーザーを追加する
onMounted(() => {
  console.log("Checking for user data: " +user.uid);
  const docRef = doc(props.db, "users", user.uid);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Existing user signed in.");
        //取得できればユーザーデータを更新する
        updateDoc(docRef, {
          loginDateTime: serverTimestamp(), //ログイン日時を更新する
        }).then(() => {
          console.log("Updated user data: loginDateTime.");
        }).catch((error) =>{
          console.log(error.message)
        });
      } else {
        console.log("New user signed in.");
        //取得できなかった場合は初回ログインとして
        //新規にユーザーデータを作成する
        setDoc(docRef, {
          email: user.email,
          createdDateTime: serverTimestamp(),
          loginDateTime: serverTimestamp(),
        }).then(() => {
          console.log("created user data.");
        }).catch((error) =>{
          console.log(error.message)
        });
      }
    })
    .catch((error) => {});
});
</script>

<style scoped></style>
