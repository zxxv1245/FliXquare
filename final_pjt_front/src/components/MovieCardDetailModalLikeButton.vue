<template>
  <button @click="likeMovie(movieId)">
    <span v-if = "isMovieLike === false">🤍</span>
    <span class = "red" v-else>❤</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
defineProps({
  movieId : Number
})

const movieStore = useMoviestore()
const counterStore = useCounterStore()

// 게시글 좋아요
const isMovieLike = ref(null)
  const likeMovie = function(movieId) {
    axios({
      method :'get',
      url : `${counterStore.API_URL}/api/v1/movie/${movieId}/likes/`,
      headers : {
          Authorization : `Token ${counterStore.token}`
        },
    })
      .then(res => {
        // console.log('성공')
        isMovieLike.value = res.data.is_liked
      })
      .catch(e => {
        console.log('실패')
      })
  }

</script>

<style scoped>

</style>