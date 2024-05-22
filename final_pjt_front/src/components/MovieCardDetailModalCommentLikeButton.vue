<template>
  <button @click="likeMovieComment(commentId)">
    <span v-if = "isMovieCommentLike === false">🤍</span>
    <span class = "red" v-else>❤</span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
defineProps({
  commentId : Number
})

const movieStore = useMoviestore()
const counterStore = useCounterStore()

// 게시글 좋아요
const isMovieCommentLike = ref(null)
  const likeMovieComment = function(commentId) {
    axios({
      method :'get',
      url : `${counterStore.API_URL}/api/v1/comment/${commentId}/likes/`,
      headers : {
          Authorization : `Token ${counterStore.token}`
        },
    })
      .then(res => {
        // console.log('성공')
        isMovieCommentLike.value = res.data.is_liked
      })
      .catch(e => {
        console.log('실패')
      })
  }

</script>

<style scoped>

</style>