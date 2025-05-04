<template>
  <div class="h-screen w-screen flex justify-center items-center bg-violet-100">
    <div class="shadow-2xl rounded-lg w-xl m-auto bg-white p-10 space-y-10">
      <div class="flex justify-center"><h1 class="text-6xl">Notion-like App</h1></div>
      <div class="flex justify-center"><GoogleButton @click="googleLogin" /></div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "./GoogleButton.vue";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const googleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("Login successful.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Login failed.");
    });
};
</script>

<style scoped></style>
