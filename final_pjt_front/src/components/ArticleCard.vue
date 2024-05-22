<template>
  <div class = "container bg-danger border border-white rounded-pill mt-3 d-flex justify-content-between">
    <RouterLink :to = "{name : 'ArticleDetailView', params : {'articleId' : myArticle.id}}" class="fs-5 text-white">{{ myArticle.title }}</RouterLink>
    <span>
      {{ myArticle.user.username }} | 
      {{ myArticle.category.name }} | 
      {{ myArticle.created_at.substring(0,10) }}
    </span>
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