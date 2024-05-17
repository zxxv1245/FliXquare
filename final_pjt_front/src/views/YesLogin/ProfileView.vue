<template>
  <div>
    <h1>ProfileView</h1>
    <RouterLink :to = "{name : 'ProfileUpdateView'}">ProfileUpdateView</RouterLink> | 
    <RouterLink :to = "{name : 'GenreUpdateView'}">GenreUpdateView</RouterLink> | 
    <RouterLink :to = "{name : 'StoreView'}">StoreView</RouterLink>
    
  </div>
  <RouterView/>
</template>

<script setup>
  import { RouterLink,RouterView } from 'vue-router'
</script>

<style scoped>

</style>