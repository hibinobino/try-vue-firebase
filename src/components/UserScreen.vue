<template>
  <div>
    <div class="flex flex-row">
      <div class="left section">
        <div class="flex-grow">
          <LeftHeader />
          <PageListSection
            @delete-page="deletePage"
            @open-page="openPage"
            :pages="pages"
          />
        </div>

        <div>
          <div class="left-item2" @click="googleLogout">Logout</div>
        </div>
      </div>
      <PageContent
        :pageData="selectedPageData"
        @save-page="savePage"
      />
    </div>
  </div>
</template>

<script setup>
import PageContent from "./Right/PageContent.vue";
import PageListSection from "./Left/PageListSection.vue";
import LeftHeader from "./Left/LeftHeader.vue";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  query,
  getDocs,
  where,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { ref, onMounted } from "vue";

const props = defineProps({
  db: Firestore,
});
const auth = getAuth();
const user = auth.currentUser;

//既存ページ表示用
const pages = ref([]);

//現在のページの内容をオブジェクトにする
const selectedPageData =ref({
  pageId: "",
  name: "",
  mdContent: ""
})

//新規ページ追加用
const addPage = () => {
  const strName = window.prompt(
    "ページタイトルを入力してください。",
    "New Page"
  );
  if (strName != null) {
    //pagesコレクションに自動IDでページを追加
    addDoc(collection(props.db, "pages"), {
      name: strName,
      uid: user.uid,
      createdDateTime: serverTimestamp(),
      mdContent: "## Header 2/n/n- Test List  /nNext Line",
    })
      .then(() => {
        console.log("Created new page.");
        loadPages();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

//ページを開く
const openPage = (pageId) => {
  //ドキュメントを取得してmdContentを右ページに渡す
  getDoc(doc(props.db, "pages", pageId))
    .then((doc) => {
      //alert(doc.data().mdContent);
      //selectName.value = doc.data().name;
      //selectMdContent.value = doc.data().mdContent;

      selectedPageData.value ={
        id: pageId,
        name: doc.data().name,
        mdContent: doc.data().mdContent
      }
    })
    .catch((e) => {
      //失敗したらメッセージ表示
      alert("読み込みに失敗しました。" + e);
    });
};

//ページを削除
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
    where("uid", "==", user.uid),
    orderBy("createdDateTime", "desc")
  );
  getDocs(pagesQuery).then((pagesDocs) => {
    pages.value = pagesDocs.docs.map((pagedoc) => ({
      id: pagedoc.id,
      data: pagedoc.data(),
    }));
  });
};
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

//ページ内容を書き込む
const savePage = (pageId, editName, editMdContent) => {
  const targetPage = doc(props.db, "pages", pageId);

  updateDoc(targetPage, {
    name: editName,
    mdContent: editMdContent,
    updatedDateTime: serverTimestamp()
  }).catch((e) => {
    alert("Failed to save page. Changes are discarded.");
  });
};
</script>

<style scoped></style>
