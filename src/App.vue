<script setup>
import LoginScreen from "./components/LoginScreen.vue"

/*---firebase---*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGtWbXsHGQ3kKoahKhwljnTZjjBp9wFmE",
  authDomain: "try-vue-firebase-8bf69.firebaseapp.com",
  projectId: "try-vue-firebase-8bf69",
  storageBucket: "try-vue-firebase-8bf69.firebasestorage.app",
  messagingSenderId: "52805983968",
  appId: "1:52805983968:web:334b2cd4bdfbf3e70a7a85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { ref } from "vue";

const isLoggedIn = ref(false);

getRedirectResult(getAuth())
  .then((result) => {
    if (result) {
      console.log("Logged in successfully.");
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // ...
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

onAuthStateChanged(getAuth(), (user) => {
  console.log("checkAuthState: " + user);
  if (user) {
    console.log("Logged in successfully.");
    isLoggedIn.value = true;
  } else {
    console.log("Not logged in.");
    isLoggedIn.value = false;
  }
});
</script>

<template>
  <LoginScreen />
</template>

<style scoped>
</style>
