<template>
  <div class="left-item2" @click="googleLogout">Logout</div>
</template>

<script setup>
import { getAuth } from "firebase/auth";

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
