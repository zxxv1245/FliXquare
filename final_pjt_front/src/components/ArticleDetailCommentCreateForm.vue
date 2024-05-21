<template>
  <div>
    <form @submit.prevent = 'createComment'>
      <input type="text" name="" id="" v-model = "content">
      <input type="submit" value = "작성">
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useArticleStore } from '@/stores/articles';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue'

const content = ref(null)
const counterStore = useCounterStore()
const articleStore = useArticleStore()

const createComment = function() {
  axios({
    method :'post',
    url : `${articleStore.API_URL}/api/v2/articles/${articleStore.article.id}/comments/`,
    headers : {
        Authorization : `Token ${counterStore.token}`
      },
      data : {content : content.value}
  })
    .then(res => {
      console.log('성공')
      content.value = ''
    })
    .catch(e => {
      console.log('실패')
    })
}

</script>

<style scoped>

</style>