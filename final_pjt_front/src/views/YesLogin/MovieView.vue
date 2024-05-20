<template>
  <div>
    <h1>MovieView</h1>
    <div>
      <!-- 이번 주 추천 영화 컴포넌트 -->
    </div>
    <div>
      <MovieTopten/>
      <MovieRecommend/>
      <MovieLatest/>
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
  moviestore.fillLatest()
  moviestore.getGenre()
})


</script>

<style scoped>
div {
  color: white;
}

</style>