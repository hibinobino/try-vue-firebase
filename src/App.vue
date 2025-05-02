<template>
  <LoginScreen v-if="!isLoggedIn" />
  <div>{{ checkRedirected }}</div>  
  <div>{{ checkStateChanged }}</div>  
</template>

<script setup>
import LoginScreen from "./components/LoginScreen.vue"

import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { ref } from "vue";

const isLoggedIn = ref(false);

const checkRedirected = ref("")
const checkStateChanged = ref("")

onAuthStateChanged(getAuth(), (user) => {
  console.log("checkAuthState: " + user);
  if (user) {
    checkStateChanged.value="Logged in successfully."
    isLoggedIn.value = true;
  } else {
    checkStateChanged.value="Not logged in."
    isLoggedIn.value = false;
  }
});

</script>

<style scoped>
</style>
