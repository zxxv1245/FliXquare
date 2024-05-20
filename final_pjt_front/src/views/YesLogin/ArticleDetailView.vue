<template>
  <div class = "container border border-white">
    <h2>게시글 상세정보</h2>
    <h2>제목 : {{ articleStore.article.title }}</h2>
    <p>내용 : {{ articleStore.article.content }}</p>
    
    <RouterLink 
      :to = "{name : 'ArticleUpdateView', params : {'articleId' : articleStore.article.id }}">ArticleUpdate</RouterLink>
    <button @click = "deleteArticle">삭제</button>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterLink,RouterView } from 'vue-router'
import { ref,onMounted } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useRoute } from 'vue-router';

const route = useRoute()
const articleStore = useArticleStore()

onMounted(()=> {
  articleStore.getArticleDetail(route.params.articleId)
})


const deleteArticle = function() {
  articleStore.deleteArticle(route.params.articleId)
}
</script>

<style scoped>
div {
  color: white;
}
</style>