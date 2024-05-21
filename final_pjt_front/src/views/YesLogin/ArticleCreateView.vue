<template>
  <div class = "container border border-white">
    <h1>게시글 작성</h1>
    <ArticleCreateForm/> 
  </div>
</template>

<script setup>
import ArticleCreateForm from '@/components/ArticleCreateForm.vue';
</script>

<style scoped>
div {
  color: white;
}
</style>