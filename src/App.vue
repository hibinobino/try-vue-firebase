<template>
  <LoginScreen v-if="!isLoggedIn" />
  <LogoutScreen v-if="isLoggedIn" />
</template>

<script setup>
import LoginScreen from "./components/LoginScreen.vue"
import LogoutScreen from "./components/LogoutScreen.vue"

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import { ref } from "vue";

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
