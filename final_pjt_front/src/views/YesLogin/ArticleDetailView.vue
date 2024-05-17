<template>
  <div>
    <h1>ArticleDetailView</h1>
    <RouterLink :to = "{name : 'ArticleUpdateView'}">ArticleUpdate</RouterLink>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterLink,RouterView } from 'vue-router'
</script>

<style scoped>

</style>