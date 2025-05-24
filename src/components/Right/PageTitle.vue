<template>
    <div
      class="focus:outline-none focus:ring-0 text-4xl font-bold h-12 selection:bg-blue-200"
      contenteditable="true"
      ref="refTitle"
      @input="onInput_emitTitleEdit"
    >
      {{ titleText }}
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    title: String
})
const emits = defineEmits(["title-edit"])
const refTitle = ref(null)
const titleText = ref("")

//タイトル文字編集即DB反映
const onInput_emitTitleEdit = ()=>{
    emits("title-edit",refTitle.value.innerText)
}

//ページの切り替え等でタイトルが変わったら表示を反映
watch(props,(newP,oldP)=>{
    titleText.value  = newP.title
})
</script>