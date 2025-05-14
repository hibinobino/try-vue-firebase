<template>
  <div class="font-sans">
    <LoginScreen v-if="!isLoggedIn" />
    <UserScreen :db="db" :userUid="userUid" v-if="isLoggedIn" />
  </div>
</template>

<script setup>
import LoginScreen from "./components/LoginScreen.vue";
import UserScreen from "./components/UserScreen.vue";
import { ref } from "vue";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const isLoggedIn = ref(false);
const userUid = ref("");

const fbApiKey = import.meta.env.VITE_FIREBASE_APIKEY
const fbAuthDomain = import.meta.env.VITE_FIREBASE_AUTHDOMAIN
const fbProjectId = import.meta.env.VITE_FIREBASE_PROJECTID
const fbStorageBucket = import.meta.env.VITE_FIREBASE_STORAGEBUCKET
const fbMsgSenderId = import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID
const fbAppId = import.meta.env.VITE_FIREBASE_APPID
//Firebase準備
const firebaseConfig = {
  apiKey: fbApiKey,
  authDomain: fbAuthDomain,
  projectId: fbProjectId,
  storageBucket: fbStorageBucket,
  messagingSenderId: fbMsgSenderId,
  appId: fbAppId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

//ログイン状態を確認
onAuthStateChanged(auth, (user) => {
  if (user) {
    userUid.value = user.uid;
    isLoggedIn.value = true;
  } else {
    userUid.value = "";
    isLoggedIn.value = false;
  }
});
</script>

<style scoped></style>
