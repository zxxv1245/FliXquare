<template>
  <div>
    <h1>MovieView</h1>
    <MovieRecommend/>
    <MovieLatest/>
    <MovieTopten/>
    <MovieGenre/>
  </div>
</template>

<script setup>
import MovieRecommend from '@/components/MovieRecommend.vue';
import MovieLatest from '@/components/MovieLatest.vue';
import MovieTopten from '@/components/MovieTopten.vue';
import MovieGenre from '@/components/MovieGenre.vue';
</script>

<style scoped>

</style>