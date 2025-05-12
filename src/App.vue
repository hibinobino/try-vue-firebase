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

//Firebase準備
const firebaseConfig = {
  apiKey: "AIzaSyDGtWbXsHGQ3kKoahKhwljnTZjjBp9wFmE",
  authDomain: "try-vue-firebase-8bf69.firebaseapp.com",
  projectId: "try-vue-firebase-8bf69",
  storageBucket: "try-vue-firebase-8bf69.firebasestorage.app",
  messagingSenderId: "52805983968",
  appId: "1:52805983968:web:334b2cd4bdfbf3e70a7a85",
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
