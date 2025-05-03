<template>
  <div>
    <GoogleButton @click="googleLogin" />
  </div>
</template>

<script setup>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import GoogleButton from "./GoogleButton.vue"

const auth = getAuth();
const provider = new GoogleAuthProvider();

const googleLogin = () => {
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

</script>

<style scoped></style>
