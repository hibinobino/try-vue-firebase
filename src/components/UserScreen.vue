<template>
  <div>
    <div class="flex flex-row">
      <div class="left section">
        <div class="flex-grow">
          <UserInfoSection :db="db"/>
          
          <PageListSection :db="db" @open-page-id="setCurrentPageId" />
        </div>
        <LogoutSection />
      </div>
      <PageContent :current-page-id="currentPageId" />
    </div>
  </div>
</template>

<script setup>
import PageContent from "./Right/PageContent.vue";
import PageListSection from "./Left/PageListSection.vue";
import UserInfoSection from "./Left/UserInfoSection.vue";
import LogoutSection from "./Left/LogoutSection.vue";
import { getAuth, signOut } from "firebase/auth";
import {
  doc,
  Firestore,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref} from "vue";

const props = defineProps({
  db: Firestore,
});
const auth = getAuth();
const user = auth.currentUser;

//閲覧中のページIDを格納
const currentPageId = ref("");
//閲覧中のページIDを更新
const setCurrentPageId = (pageId) => {
  currentPageId.value = pageId;
};


//ページ内容を書き込む
const savePage = (pageId, editName, editMdContent) => {
  const targetPage = doc(props.db, "pages", pageId);

  updateDoc(targetPage, {
    name: editName,
    mdContent: editMdContent,
    updatedDateTime: serverTimestamp(),
  }).catch((e) => {
    alert("Failed to save page. Changes are discarded.");
  });
};
</script>

<style scoped></style>
