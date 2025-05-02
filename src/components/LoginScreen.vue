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
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref } from "vue";

const isLoggedIn = ref(false);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const googleLogin = () => {
  //signInWithRedirect(getAuth(), new GoogleAuthProvider());
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("Login successful.")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Login failed.")
    });
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
