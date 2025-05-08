<template>
  <div class="right section">
    <!--ページタイトル-->
    <input
      type="text"
      class="focus:outline-none focus:ring-0 text-4xl font-bold h-12 selection:bg-blue-200"
      v-model="editName"
    />
    <div class="text-sm text-gray-400 font-bold">
      <div>Created: 2025-01-01 12:00</div>
      <div>Updated: 2025-01-01 12:00</div>
    </div>

    <div v-html="mdParser.parse(editMdContent)" class="text-blue-500"></div>
    <input
      type="text"
      class="focus:outline-none focus:ring-0 font-bold selection:bg-blue-200"
      v-model="editMdContent"
    />
  </div>
</template>

<script setup>
import { Marked } from "marked";
import { ref, watch } from "vue";

//親コンポーネントから受け取るページの内容
//読み取り専用
const props = defineProps({
  pageData: Object,
});

//保存イベント
const emits = defineEmits(["save-page"]);

//編集内容を格納する
//読み書きできる
const currentPageId = ref(props.pageData.pageId);
const editName = ref(props.pageData.name);
const editMdContent = ref(props.pageData.mdContent);

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

//ページが変わるとpropsが変わるので
//その都度内容を読み込みなおす
watch(props, (newProps) => {
  //alert("props changed!")

  //保存用
  //内容を親に渡す
  emits("save-page", currentPageId.value, editName.value, editMdContent.value);

  //内容を更新する
  currentPageId.value = newProps.pageData.pageId;
  editName.value = newProps.pageData.name;
  editMdContent.value = newProps.pageData.mdContent;
});
</script>
