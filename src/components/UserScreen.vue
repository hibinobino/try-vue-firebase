<template>
  <div>
    <div class="flex flex-row">
      <div class="left section">
        <div class="flex-grow">
          <UserInfoSection :db="db" />

          <PageListHeader :db="db" @new-page="setCurrentPageId"/>
          <PageListItems
            :db="db"
            :currentPageId="currentPageId"
            @select-page="setCurrentPageId"
          />
        </div>
        <LogoutSection />
      </div>
      <PageContent :currentPageId="currentPageId" :db="db"/>
    </div>
  </div>
</template>

<script setup>
import PageContent from "./Right/PageContent.vue";
import PageListHeader from "./Left/PageListSection-Header.vue";
import PageListItems from "./Left/PageListSection-Items.vue";
import UserInfoSection from "./Left/UserInfoSection.vue";
import LogoutSection from "./Left/LogoutSection.vue";
import { getAuth, signOut } from "firebase/auth";
import { doc, Firestore, updateDoc, serverTimestamp } from "firebase/firestore";
import { onMounted, ref, watch } from "vue";

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
</script>

<style scoped></style>
