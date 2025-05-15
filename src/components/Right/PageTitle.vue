<template>
    <div
      class="focus:outline-none focus:ring-0 text-4xl font-bold h-12 selection:bg-blue-200"
      contenteditable="true"
      ref="refTitle"
      @input="titleEdit"
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

const titleEdit = ()=>{
    //console.log(refTitle.value.innerText)
    emits("title-edit",refTitle.value.innerText)
}

watch(props,(newP,oldP)=>{
    titleText.value  = newP.title
})
</script>