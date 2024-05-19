<template>
  <div>
    <h1>MovieView</h1>
    <div>
      <MovieRecommend/>
      <MovieLatest/>
      <MovieTopten/>
      <MovieGenre/>
    </div>
  </div>
</template>

<script setup>
import MovieRecommend from '@/components/MovieRecommend.vue';
import MovieLatest from '@/components/MovieLatest.vue';
import MovieTopten from '@/components/MovieTopten.vue';
import MovieGenre from '@/components/MovieGenre.vue';

import { ref, onMounted } from 'vue'
import { useMoviestore } from '@/stores/movies'

const moviestore = useMoviestore()


onMounted(() => {
  moviestore.fillMovies()
})




</script>

<style scoped>
div {
  color: white;
}

</style>