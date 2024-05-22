<template>
  <div class = "container">
    <div class="h2 text-center my-5">커뮤니티</div>
    <div class="h5 text-center mt-5">영화와 관련된 여러분의 이야기를 들려주세요.</div>
    <div class="d-flex justify-content-between my-2 mx-2">
      <form action="#">
        <select name="Categoty">
          <option value="all">전체</option>
          <option value="movie">영화</option>
          <option value="like">인기</option>
        </select>
      </form>
      <RouterLink :to = "{name : 'ArticleCreateView'}" class="text-white">
        <button type="button" class="btn btn-danger btn-sm text-center">
          ArticleCreate
        </button>
      </RouterLink>
    </div>
    <div class="d-flex justify-content-between mx-2">
      <div class="h5" style="margin-bottom: 0px;">게시글 제목</div>
      <div class="" style="margin-bottom: 0px;">작성자 | 카테고리 | 작성일</div>
    </div>
    <ArticleCard
      v-for = "article in articleStore.articles"
      :key = "article.id"
      :my-article = "article"/>
  </div>
</template>

<script setup>
  import ArticleCard from '@/components/ArticleCard.vue';
  import { RouterLink } from 'vue-router'
  import { useArticleStore } from '@/stores/articles'
  import { ref, onMounted } from 'vue'

  const articleStore = useArticleStore()
  
  onMounted(()=> {
    articleStore.getArticles()
    articleStore.getCategory()
  })
</script>

<style scoped>
div {
  color: white;
  
}

</style>