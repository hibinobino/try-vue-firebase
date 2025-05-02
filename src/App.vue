<template>
  <LoginScreen v-if="!isLoggedIn" />
  <UserScreen :db="db" v-if="isLoggedIn" />
  <LogoutScreen v-if="isLoggedIn" />
</template>

<script setup>
/* ---Vue Component--- */
import LoginScreen from "./components/LoginScreen.vue"
import LogoutScreen from "./components/LogoutScreen.vue"
import UserScreen from "./components/UserScreen.vue"

import { ref } from "vue";

/* ---Firebase--- */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGtWbXsHGQ3kKoahKhwljnTZjjBp9wFmE",
  authDomain: "try-vue-firebase-8bf69.firebaseapp.com",
  projectId: "try-vue-firebase-8bf69",
  storageBucket: "try-vue-firebase-8bf69.firebasestorage.app",
  messagingSenderId: "52805983968",
  appId: "1:52805983968:web:334b2cd4bdfbf3e70a7a85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const isLoggedIn = ref(false);
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  //console.log("checkAuthState: " + user);
  if (user) {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});

</script>

<style scoped>
</style>
