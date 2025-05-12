<template>
  <div class="left-header text-xs">
      <div class="flex-grow">Pages</div><button class="left-btn" @click="clickAddPage">+</button>
  </div>
</template>

<script setup>
import { Firestore } from 'firebase/firestore';

const props = defineProps({
  db: Firestore
})
//コンポーネントイベントを定義する
const emits = defineEmits(["add-page"]);

//--------------------------------------
//ボタンを押したら親に通知する
//--------------------------------------

//追加ボタン
const clickAddPage = () => {
  emits("add-page");
};
</script>
