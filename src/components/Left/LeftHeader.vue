<template>
  <div class="left-h1">Your Book<button class="left-btn">...</button></div>
</template>

<script setup>

//コンポーネントイベントを定義する
const emits = defineEmits(["add-page"]);

//--------------------------------------
//ボタンを押したら親に通知する
//--------------------------------------

//追加ボタン
const clickAddPage = () => {
  const name = window.prompt("ページタイトルを入力してください。","New Page")
  emits("add-page", name);
};

</script>
