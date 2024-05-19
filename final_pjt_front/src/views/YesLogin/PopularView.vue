<template>
  <div>
    <h1>PopularView</h1>
    <h2>인기</h2>
    <h3>인기 없음</h3>
    <MovieCard
    v-for="movie in moviestore.movies"
    :key="movie.id"
    :movie="movie"
    />

  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue';

import { useMoviestore } from '@/stores/movies'
const moviestore = useMoviestore()


</script>

<style scoped>

</style>