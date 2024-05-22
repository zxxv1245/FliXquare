<template>
  <div class="d-flex flex-column align-items-center">
    <!-- 이번 주 추천 영화 컴포넌트 -->
    <MovieTopten />
    <MovieRecommend/>
    <h3>최신 영화 18선!!</h3>
    <MovieLatest />
    <MovieGenre v-for="genre in counterStore.userGenre" :key="genre" :genre="genre" />
  </div>
</template>

<script setup>
import MovieRecommend from '@/components/MovieRecommend.vue';
import MovieLatest from '@/components/MovieLatest.vue';
import MovieTopten from '@/components/MovieTopten.vue';
import MovieGenre from '@/components/MovieGenre.vue';

import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();

</script>

<style scoped>
div {
  color: white;
}

</style>
