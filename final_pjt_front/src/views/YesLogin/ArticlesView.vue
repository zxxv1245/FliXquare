<template>
  <div class = "container border border-white">
    <form action="#">
      <select name="Categoty">
        <option value="all">전체</option>
        <option value="movie">영화</option>
        <option value="like">인기</option>
      </select>
    </form>
    <RouterLink :to = "{name : 'ArticleCreateView'}">ArticleCreate</RouterLink>
    <ArticleCard
      v-for = "article in articleStore.articles"
      :key = "article.id"
      :my-article = "article"/>
    
    
    <!-- <span> | </span> -->
    <!-- <RouterLink :to = "{name : 'ArticleDetailView'}">ArticleDetail</RouterLink>
    <span> | </span> -->
    
    <RouterView/>
  </div>
</template>

<script setup>
  import ArticleCard from '@/components/ArticleCard.vue';
  import { RouterLink, RouterView } from 'vue-router'
  import { useArticleStore } from '@/stores/articles'
  import { ref,onMounted } from 'vue'

  const articleStore = useArticleStore()
  
  onMounted(()=> {
    articleStore.getArticles()
  })
</script>

<style scoped>
div {
  color: white;
  
}

</style>