<template>
  <div class = "container border border-white">
    <form @submit.prevent = "updateArticle">
      <div>
        <label for="title">제목</label>
        <input type="text" name="" id="title" v-model = "title">
      </div>
      <div>
        <label for="content">내용</label>
        <textarea name="" id="content" cols="30" rows="10" v-model = "content"></textarea>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref,onMounted,watch } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useRoute } from 'vue-router';



const route = useRoute()
const articleStore = useArticleStore()

const title = ref(null)
const content = ref(null)

onMounted(()=>{
  articleStore.updateArticle(route.params.articleId)
  title.value = articleStore.updateTitle
    content.value = articleStore.updateContent
})



</script>

<style scoped>

</style>