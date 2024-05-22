<template>
  <button @click="storeMovie(movieId)">
    <span v-if="isMovieStore===false">찜</span>
    <span v-else>찜 해제</span>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';

const props = defineProps({
  movieId : Number,
  movie : Object
})

const movieStore = useMoviestore()
const counterStore = useCounterStore()

// 영화 찜하기
const isMovieStore = ref(null)
const storeMovie = function(movieId) {
  axios({
    method :'get',
    url : `${counterStore.API_URL}/api/v1/movie/${movieId}/store/`,
    headers : {
        Authorization : `Token ${counterStore.token}`
      },
  })
    .then(res => {
      // console.log('성공')
      isMovieStore.value = res.data.is_liked
      movieStore.fillMovies();
    })
    .catch(e => {
      console.log('실패')
    })
}

onMounted(() => {
  if (props.movie.store_user.includes(counterStore.userId)) {
    isMovieStore.value = true;
  } else {
    isMovieStore.value = false;
  }
})

</script>

<style scoped>

</style>