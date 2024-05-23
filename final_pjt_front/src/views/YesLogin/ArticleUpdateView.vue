<template>
  <div>
    <ArticleUpdateForm
      :article = "article"/>
  </div>
</template>

<script setup>
import ArticleUpdateForm from '@/components/ArticleUpdateForm.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore()
const article = ref({})
const route = useRoute()

axios({
  method : 'get',
  url : `${counterStore.API_URL}/api/v2/articles/${route.params.articleId}/`,
  headers : {
    Authorization : `Token ${counterStore.token}`
  }
})
  .then(res => {
    article.value = res.data
  })
  .catch(e => {
    console.log(e)
  })

</script>

<style scoped>
div {
  color: white;
}
</style>