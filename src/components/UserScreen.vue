<template>
  <div>
    <div class="flex flex-row">
      <div class="left section">
        <div class="flex-grow">
          <LeftHeader />
          <PageListSection
            :db="db"
            @notify-open-page-id="setCurrentPageId"
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
  doc,
  Firestore,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, onMounted, render } from "vue";

const props = defineProps({
  db: Firestore,
});
const auth = getAuth();
const user = auth.currentUser;

//閲覧中のページIDを格納
const currentPageId =ref("")

const setCurrentPageId = (pageId) =>{
  currentPageId.value=pageId
}

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
});

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
