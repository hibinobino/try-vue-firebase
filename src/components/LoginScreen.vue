<template>
  <div>
    <button @click="googleLogin">Login with Google Account</button>
    <button @click="googleLogout">Logout</button>
    <div v-if="isLoggedIn">{{ user }}</div>
  </div>
</template>

<script setup>
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { ref } from "vue";

const isLoggedIn = ref(false);

const googleLogin = () => {
  signInWithRedirect(getAuth(), new GoogleAuthProvider());
};

const googleLogout = () => {
  signOut(getAuth())
    .then(() => {
      console.log("Signed out successfully.");
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

</script>

<style scoped></style>
