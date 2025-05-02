import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* ---Firebase--- */
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGtWbXsHGQ3kKoahKhwljnTZjjBp9wFmE",
  authDomain: "try-vue-firebase-8bf69.firebaseapp.com",
  projectId: "try-vue-firebase-8bf69",
  storageBucket: "try-vue-firebase-8bf69.firebasestorage.app",
  messagingSenderId: "52805983968",
  appId: "1:52805983968:web:334b2cd4bdfbf3e70a7a85"
};

const app = initializeApp(firebaseConfig);

createApp(App).mount('#app')


