<template>
  <div>
    <form @submit.prevent = 'createComment'>
      <input type="text" name="" id="" v-model = "content">
      <input type="submit" value = "작성">
    </form>
  </div>
</template>

<script setup>
import { useArticleStore } from '@/stores/articles';
import { ref } from 'vue'

const content = ref(null)
const articleStore = useArticleStore()

const createComment = function() {
  articleStore.createComment(content.value)
  content.value = ''
}

</script>

<style scoped>

</style>