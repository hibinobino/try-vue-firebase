<template>
  <div>
    <button @click="addDocument">addDocument</button>
    <button @click="getDocument">getDocument</button>
  </div>
</template>

<script setup>
import {
  collection,
  doc,
  Firestore,
  setDoc,
  Timestamp,
  getDoc
} from "firebase/firestore";

const props = defineProps({
  db: Firestore,
});

// Add a new document in collection "cities"
const addDocument = () => {
  const col = collection(props.db, "test-collection");
  setDoc(doc(col, "test-doc"), {
    name: "商品名",
  })
    .then(() => {
      alert("書き込み成功！");
    })
    .catch((error) => {
      alert("書き込みエラー");
    });
};
const getDocument = async () => {
  const docSnap = await getDoc(doc(props.db,"test-collection", "test-doc"))
  if (docSnap.exists()) {
  alert("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  alert("No such document!");
}
};
</script>

<style scoped></style>
