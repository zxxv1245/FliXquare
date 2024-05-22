<template>
  <div>
    <h1>내 찜 목록 구현 안됨</h1>
    <!-- <MovieCard/> -->

  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue'
import { useMoviestore } from '@/stores/movies'
import { useCounterStore } from '@/stores/counter'
import { ref, onMounted, computed } from 'vue'


const movieStore = useMoviestore()
const store = useCounterStore()
const movies = movieStore.movies



</script>

<style scoped>
div {
  color: white
}

</style>