<template>
  <div class = "container border border-white">
    <RouterLink :to = "{name : 'ArticleDetailView', params : {'articleId' : myArticle.id}}">{{ myArticle.title }}</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink,RouterView } from 'vue-router';
defineProps({
  myArticle :Object
})
</script>

<style scoped>

</style>