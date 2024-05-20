<template>
  <div>
    <h2>최신 영화 18선</h2>
    <div class="row">
      <div class="col col-md-4">
        <!-- <MovieCard
        v-for="movie in movies"
        :movie="movie"


        class="item "
        /> -->


      </div>
    </div>

    
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { useMoviestore } from '@/stores/movies'

const movieStore = useMoviestore()
const movies = movieStore.movies


</script>

<style scoped>


</style>