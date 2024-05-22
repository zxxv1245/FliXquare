<template>
  <button @click="storeMovie(movieId)">
    <span v-if = "isMovieStore === false">영입</span>
    <span class = "red" v-else>방출</span>
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

</script>

<style scoped>

</style>