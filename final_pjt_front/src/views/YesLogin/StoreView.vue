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
import { NavigationFailureType } from 'vue-router';

const movieStore = useMoviestore()

const myMovies = ref([])
const counterStore = useCounterStore()


onMounted(() => {
  // console.log(counterStore.userId)
  myMovies.value = movieStore.movies.filter((movie) => {
    // console.log(movie.store_user)
    return movie.store_user.includes(counterStore.userId)
  });
  console.log(myMovies.value);
});

</script>

<style scoped>
div {
  color: white
}

</style>