<template>
  <button @click="likeArticle(articleId)">
    <span v-if = "isArticleLike === false">🤍 좋아요</span>
    <span class = "red" v-else-if = "isArticleLike === true">❤ 좋아요 취소(좋아요를 한 상태)</span>
    <span v-else>null</span>
  </button>
</template>

<script setup>
import { ref,computed, onMounted, watch } from 'vue'
import { useArticleStore } from '@/stores/articles';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';

const props = defineProps({
  articleId : Number,
  article : Object
})

const articleStore = useArticleStore()
const counterStore = useCounterStore()

// 게시글 좋아요
const isArticleLike = ref(null)




const likeArticle = function(articleId) {
  axios({
    method :'get',
    url : `${articleStore.API_URL}/api/v2/article/${articleId}/likes/`,
    headers : {
        Authorization : `Token ${counterStore.token}`
      },
  })
    .then(res => {
      // console.log(res.data.is_liked)
      isArticleLike.value = res.data.is_liked
    })
    .catch(e => {
      console.log('실패')
    })
}

watch(props.article.likes_user,(newvalue) => {
  if (newvalue.includes(counterStore.userId)) {
    isArticleLike.value = true 
    // console.log(isArticleLike.value)
  } else {
    isArticleLike.value = false
  }
})



// const comments = computed(() => {
//   return articleStore.allComments.filter((comment) => articleStore.article.id === comment.article)
// })

// onMounted(() => {
//   articleStore.getArticleComment()
// })


//
</script>

<style scoped>

</style>