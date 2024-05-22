<template>
  <button @click="likeMovie(movieId)">
    <span v-if = "isMovieLike === false" class="text-black">♡</span>
    <span class="text-danger" v-else>❤</span>
  </button>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
const props = defineProps({
  movieId : Number,
  movie : Object
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
        movieStore.fillMovies();
      })
      .catch(e => {
        console.log('실패')
      })
  }

  onMounted(() => {
  if (props.movie.likes_user.includes(counterStore.userId)) {
    isMovieLike.value = true;
  } else {
    isMovieLike.value = false;
  }
});



</script>

<style scoped>

</style>