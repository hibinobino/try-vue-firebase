<template>
  <div>
    <button @click="googleLogout">Logout</button>
  </div>
</template>

<script setup>
import {
  getAuth,
  signOut
} from "firebase/auth";

const auth = getAuth();

const googleLogout = () => {
  signOut(auth)
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
