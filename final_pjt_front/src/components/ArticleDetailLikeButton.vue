<template>
  <p @click="likeArticle(articleId)">
    <span v-if = "isArticleLike === false">🤍</span>
    <span class = "red" v-else-if = "isArticleLike === true">❤</span>
  </p>
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
const isArticleLike = ref(false)

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
      articleStore.getArticleDetail(articleId)
    })
    .catch(e => {
      console.log('실패')
    })
}

onMounted(() => {
  if (props.article.likes_user.includes(counterStore.userId)) {
    isArticleLike.value = true;
  } else {
    isArticleLike.value = false;
  }
});


</script>

<style scoped>
p {
  margin: 0px;
  padding-bottom: 0px;
  border: 0px;
}
.red {
  color: red;
  
}
</style>