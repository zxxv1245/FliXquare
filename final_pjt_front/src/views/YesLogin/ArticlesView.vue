<template>
  <div>
    <h1>ArticlesView</h1>
    <RouterLink :to = "{name : 'ArticleCreateView'}">ArticleCreate</RouterLink> | 
    <RouterLink :to = "{name : 'ArticleDetailView'}">ArticleDetail</RouterLink> | 
    
    <ArticleCard/>
    <RouterView/>
  </div>
</template>

<script setup>
  import { RouterLink,RouterView } from 'vue-router'
  import ArticleCard from '@/components/ArticleCard.vue';
</script>

<style scoped>

</style>