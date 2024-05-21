<template>
  <div class="d-flex flex-column align-items-center">
    <div v-if="!isLoading">
      <!-- 로딩 중임을 표시하는 컴포넌트나 메시지 -->
      <h1>로딩하고 있소</h1>
      <p>Loading...</p>
    </div>
    <div v-else>
      <!-- 이번 주 추천 영화 컴포넌트 -->
      <!-- 주간 추천 영화를 위한 특정 컴포넌트나 내용을 여기에 추가할 수 있습니다 -->
      <MovieTopten />
      <MovieRecommend />
      <h3>최신 영화 18선!!</h3>
      <MovieLatest />
      <!-- <div v-for="genre in counterStore.userGenre" :key="genre">
        <MovieGenre :genre="genre" />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import MovieRecommend from '@/components/MovieRecommend.vue';
import MovieLatest from '@/components/MovieLatest.vue';
import MovieTopten from '@/components/MovieTopten.vue';
import MovieGenre from '@/components/MovieGenre.vue';

import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';

const moviestore = useMoviestore();
const counterStore = useCounterStore();

const isLoading = ref(false);

const loaddata = async () => { 
  await moviestore.getGenre();
  await moviestore.getMovieTitle();
  await moviestore.getUserGenre();
  isLoading.value = true;
  console.log(moviestore.messages);
};


loaddata()

</script>

<style scoped>
div {
  color: white;
}

</style>
