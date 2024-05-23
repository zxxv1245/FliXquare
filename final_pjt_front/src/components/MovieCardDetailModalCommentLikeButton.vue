<template>
  <p @click="likeMovieComment(commentId)" class = "pTag">
    <span v-if = "isMovieCommentLike === false">❤</span>
    <span class="red" v-else>❤</span>
  </p>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useMoviestore } from '@/stores/movies';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
const props = defineProps({
  commentId : Number,
  comment : Object
})

const movieStore = useMoviestore()
const counterStore = useCounterStore()

// 게시글 좋아요
const isMovieCommentLike = ref(false)
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
        movieStore.getMovieComment()
      })
      .catch(e => {
        console.log('실패')
      })
  }


  onMounted(() => {
  if (props.comment.likes_user.includes(counterStore.userId)) {
    isMovieCommentLike.value = true;
  } else {
    isMovieCommentLike.value = false;
  }
});

</script>

<style scoped>
.pTag {
  display: inline;
}
.red {
  color: red;
}

</style>