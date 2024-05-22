<template>
  <button @click="likeArticleComment(commentId)">
    <span v-if = "isArticleCommentLike === false">🤍</span>
    <span v-else-if = "isArticleCommentLike === true">❤</span>
  </button>

</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
const props = defineProps({
  commentId : Number,
  comment : Object
})

const articleStore = useArticleStore()
const counterStore = useCounterStore()

// 게시글 댓글 좋아요
const isArticleCommentLike =  ref(false)


const likeArticleComment = function(commentId) {
  axios({
    method :'get',
    url : `${articleStore.API_URL}/api/v2/comment/${commentId}/likes/`,
    headers : {
      Authorization : `Token ${counterStore.token}`
    },
  })
  .then(res => {
    // console.log('성공')
    isArticleCommentLike.value = res.data.is_liked
    articleStore.getArticleComment()
  })
  .catch(e => {
    console.log('실패')
  })
}

onMounted(() => {
  if (props.comment.likes_user.includes(counterStore.userId)) {
    isArticleCommentLike.value = true;
  } else {
    isArticleCommentLike.value = false;
  }
});

</script>

<style scoped>

</style>