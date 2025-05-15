<template>
  <div id="md-content-area" spellcheck="false"  ref="refMdContent" @input="mdContentEdit">
    <div
      contenteditable="true"
      class="focus:outline-none focus:ring-0"
    >{{ mdContentText }}</div>
  </div>
</template>
<script setup>
import { Marked } from "marked";
import { ref, watch } from "vue";

const props = defineProps({
  mdContent: String,
});

const emits = defineEmits(["mdcontent-edit"])
const refMdContent = ref(null)

const mdContentText = ref("")
const mdContentRendered = ref("")

//mdContentをMarkDownに変換する用
const mdParser = new Marked();

const mdContentEdit = () =>{
    
}

watch(props,(newP,oldP)=>{
    mdContentText.value  = newP.title
})
</script>
