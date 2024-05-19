<template>
  <div>
    <h1>PopularView</h1>
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