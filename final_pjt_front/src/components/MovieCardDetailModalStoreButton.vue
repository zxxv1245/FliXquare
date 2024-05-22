<template>
  <button @click="storeMovie(movieId)">
    <span v-if="isMovieStore===false">찜하기</span>
    <span v-else>찜해제</span>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';

const props = defineProps({
  movieId : Number
})

const movieStore = useMoviestore()
const counterStore = useCounterStore()

// 게시글 좋아요
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
      })
      .catch(e => {
        console.log('실패')
      })
  }

onMounted(() => {
  const movie = movieStore.movies.find((movie) => movie.id === props.movieId)
  const flag = movie.store_user.includes(counterStore.userId)
  isMovieStore.value = flag
})

watch(isMovieStore, (storeStatus) => {
  if (storeStatus.value) {
    isMovieStore.value = storeStatus.value
  }
})


</script>

<style scoped>

</style>