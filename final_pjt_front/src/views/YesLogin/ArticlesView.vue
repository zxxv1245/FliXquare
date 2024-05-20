<template>
  <div>
    <h1>ArticlesView</h1>
    
    <RouterLink :to = "{name : 'ArticleCreateView'}">ArticleCreate</RouterLink>
    <!-- <span> | </span> -->
    <!-- <RouterLink :to = "{name : 'ArticleDetailView'}">ArticleDetail</RouterLink>
    <span> | </span> -->
    
    <ArticleCard/>
    <RouterView/>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import ArticleCard from '@/components/ArticleCard.vue';
</script>

<style scoped>
div {
  color: white
}

</style>