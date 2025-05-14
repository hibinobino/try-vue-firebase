<template>
  <div class="left-header">
    <div class="flex-grow">Your Book</div>
    <button class="left-btn">...</button>
  </div>
</template>

<script setup>
import { getAuth } from 'firebase/auth';
import {
  doc,
  Firestore,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, onMounted, render } from "vue";

const props=defineProps({
  db: Firestore
})
//ユーザー情報を取得
const user = getAuth().currentUser

//初回ログイン時、usersコレクションにユーザーを追加する
onMounted(() => {
  console.log("Checking for user data: " + user.uid);
  const docRef = doc(props.db, "users", user.uid);
console.log("check")
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Existing user signed in.");
        //取得できればユーザーデータを更新する
        updateDoc(docRef, {
          loginDateTime: serverTimestamp(), //ログイン日時を更新する
        })
          .then(() => {
            console.log("Updated user data: loginDateTime.");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        console.log("New user signed in.");
        //取得できなかった場合は初回ログインとして
        //新規にユーザーデータを作成する
        setDoc(docRef, {
          email: user.email,
          createdDateTime: serverTimestamp(),
          loginDateTime: serverTimestamp(),
        })
          .then(() => {
            console.log("created user data.");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    })
    .catch((error) => {});

  console.log("UserInfo")
});

</script>
