<template>
  <div class="w-3xs bg-gray-100 p-2 space-y-1 h-screen text-base">
    <div class="pl-3 pr-3 p-1 rounded-sm font-bold text-gray-500 grid grid-cols-2">
        Your Book<button class="hover:bg-gray-300 cursor-pointer rounded-sm justify-self-end transition duration-200 ease-in-out" >...</button>
    </div>
    <div class="pl-3 pr-3 p-1 rounded-sm font-bold text-xs text-gray-500 grid grid-cols-2">
        Pages<button class="hover:bg-gray-300 cursor-pointer rounded-sm justify-self-end transition duration-200 ease-in-out" @click="addPage">+</button>
    </div>
    <li v-for="page in pages" class="hover:bg-gray-200 pl-3 pr-3 p-1 rounded-sm grid grid-cols-2 cursor-pointer transition duration-200 ease-in-out">
      {{ page.data.name
      }}<button class="hover:bg-gray-300 cursor-pointer rounded-sm justify-self-end text-xs transition duration-200 ease-in-out" @click="deletePage(page.id)">
        Delete
      </button>
    </li>
    <LogoutScreen />
  </div>
</template>
<script setup>
import LogoutScreen from "./LogoutScreen.vue";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  setDoc,
  Timestamp,
  getDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  query,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore";
import { ref, onMounted } from "vue";

const props = defineProps({
  db: Firestore,
});
const auth = getAuth();
const user = auth.currentUser;

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
  const docSnap = await getDoc(doc(props.db, "test-collection", "test-doc"));
  if (docSnap.exists()) {
    alert("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    alert("No such document!");
  }
};

//既存ページ表示用
const pages = ref([]);

//新規ページ追加用
const addPage = () => {
  //pagesコレクションに自動IDでページを追加
  addDoc(collection(props.db, "pages"), {
    name: "New Page",
    uid: user.uid,
    createdDateTime: serverTimestamp(),
  })
    .then(() => {
      console.log("Created new page.");
      loadPages();
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const deletePage = (pageId) => {
  deleteDoc(doc(props.db, "pages", pageId))
    .then(() => {
      loadPages();
    })
    .catch((error) => {
      console.log(error.message);
    });
};

//初回ログイン時、usersコレクションにユーザーを追加する
onMounted(() => {
  console.log("Checking for user data: " + user.uid);
  const docRef = doc(props.db, "users", user.uid);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Existing user signed in.");
        //取得できればユーザーデータを更新する
        updateDoc(docRef, {
          loginDateTime: serverTimestamp(), //ログイン日時を更新する
        })
          .then(() => {
            console.log("Updated user data: loginDateTime.");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        console.log("New user signed in.");
        //取得できなかった場合は初回ログインとして
        //新規にユーザーデータを作成する
        setDoc(docRef, {
          email: user.email,
          createdDateTime: serverTimestamp(),
          loginDateTime: serverTimestamp(),
        })
          .then(() => {
            console.log("created user data.");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    })
    .catch((error) => {});

  loadPages();
});

const loadPages = () => {
  //pagesコレクションを読み取って配列変数に格納する
  const pagesQuery = query(
    collection(props.db, "pages"),
    where("uid", "==", user.uid)
  );
  getDocs(pagesQuery).then((pagesDocs) => {
    pages.value = pagesDocs.docs.map((pagedoc) => ({
      id: pagedoc.id,
      data: pagedoc.data(),
    }));
  });
};
</script>
