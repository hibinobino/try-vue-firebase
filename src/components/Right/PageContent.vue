<template>
  <div class="right section">
    <!--ページタイトル-->
    <input
      type="text"
      class="focus:outline-none focus:ring-0 text-4xl font-bold h-12 selection:bg-blue-200"
      v-model="name"
    />
    <div class="text-sm text-gray-400 font-bold">
    <div>Created: 2025-01-01 12:00</div>
    <div>Updated: 2025-01-01 12:00</div>
    </div>
    
    <div v-html="mdHTML"></div>
    <input
      type="text"
      class="focus:outline-none focus:ring-0 font-bold selection:bg-blue-200"
      v-model="name"
    />
    <input
      type="text"
      class="focus:outline-none focus:ring-0 font-bold selection:bg-blue-200"
      v-model="name"
    />
  </div>
</template>

<script setup>
import { Marked } from 'marked';
import { ref } from 'vue';

const name = ref("New Page")
const mdContent = ref("## Markup text here.")

const mdParser = new Marked()
const mdHTML = ref(mdParser.parse("## Title Text"))


</script>